var express = require('express');
var timeout = require('connect-timeout');

var webpackTransform = require('./webpackTransform.js');

var app = express()
	.use(express.static('public'))
	.use(timeout(60000));

app.get('/webpack', function (req, res) {
	var source = req.query.source;
	var loadersString = req.query.loaders || 'raw';

	webpackTransform(source, loadersString)
		.then(function (output) {
			res.json({output: output.toString()});
		})
		.catch(function (error) {
			console.error(error);
			res.json({error: error});
		});
});

app.listen(8080, function () {
	console.log('Listening on port 8080');
});
