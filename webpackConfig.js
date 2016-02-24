module.exports = function (inputFileName, loadersString) {
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
					loader: loadersString
				}
			]
		}
	};
};
