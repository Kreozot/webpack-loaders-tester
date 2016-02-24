var Promise = require('bluebird');

var webpack = require('webpack');
var webpackConfig = require('./webpackConfig.js');

var fs = Promise.promisifyAll(require('fs'));

var express = require('express');
var timeout = require('connect-timeout');

var app = express()
	// .use(express.static(__dirname + '/public'))
	.use(timeout(60000));

app.get('/webpack', function (req, res) {
	var source = req.query.source;
	fs.writeFileAsync('test.js', source)
		.then(function () {
			return new Promise(function (resolve, reject) {
				webpack(webpackConfig, function (error, stats) {
					if (error) {
						reject(error);
					} else {
						resolve(stats);
					}
				});
			});
		})
		.then(function (stats) {
			console.log(stats.compilation.modules[1]);
			return stats.compilation.modules[1]._source._value;
			// return fs.readFileAsync('./out/entry.js', 'utf8');
		})
		.then(function (output) {
			res.send(output.toString());
		});
});

app.listen(8080, function () {
	console.log('Listening on port 8080');
});
