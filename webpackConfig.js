module.exports = {
	entry: {
		test: './entry.js'
	},
	output: {
		path: './out/',
		filename: '[name].js'
	},
	module: {
		loaders: [
			{
				test: /test\.js/,
				loader: 'json'
			}
		]
	}
};
