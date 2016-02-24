var Promise = require('bluebird');

var fs = Promise.promisifyAll(require('fs'));
var randomstring = require('randomstring');

var express = require('express');
var timeout = require('connect-timeout');

var webpackTransform = require('./webpackTransform.js');

var app = express()
	.use(timeout(60000));

app.get('/webpack', function (req, res) {
	var source = req.query.source;
	var loaders = typeof req.query.loaders === 'string' ? [req.query.loaders] : req.query.loaders;

	webpackTransform(source, loaders)
		.then(function (output) {
			res.send(output.toString());
		})
		.catch(function (error) {
			console.error(error);
			res.send(error);
		});
});

app.listen(8080, function () {
	console.log('Listening on port 8080');
});
