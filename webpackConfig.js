module.exports = function (inputFileName, loadersConfig) {
	return {
		entry: {
			entry: './' + inputFileName
		},
		output: {
			path: './out/',
			filename: inputFileName
		},
		module: {
			loaders: [
				{
					test: /_m\.js/,
					loaders: loadersConfig
				}
			]
		}
	};
};
