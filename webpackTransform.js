var Promise = require('bluebird');

var fs = Promise.promisifyAll(require('fs'));
var randomstring = require('randomstring');

var webpack = require('webpack');
var getWebpackConfig = require('./webpackConfig.js');

function webpackTransform(source, loaders) {
	var rnd = randomstring.generate();
	var entryFileName = rnd + '.js';
	var moduleFileName = rnd + '_m.js';

	return Promise
		.all([
			fs.writeFileAsync(moduleFileName, source),
			fs.writeFileAsync(entryFileName, 'require("./' + moduleFileName + '");')
		])
		.then(function () {
			return new Promise(function (resolve, reject) {
				webpack(getWebpackConfig(entryFileName, loaders), function (error, stats) {
					var jsonStats = stats.toJson();
					if (error) {
						reject(error);
					} else if (jsonStats.errors.length > 0) {
						reject(jsonStats.errors);
					} else {
						resolve(stats);
					}
				});
			});
		})
		.then(function (stats) {
			return fs.unlinkAsync('./out/' + entryFileName)
				.then(function () {
					return stats;
				});
		})
		.then(function (stats) {
			return stats.compilation.modules[1]._source._value;
		})
		.finally(function () {
			return Promise.all([
				fs.unlinkAsync(entryFileName),
				fs.unlinkAsync(moduleFileName)
			]);
		});
}

module.exports = webpackTransform;
