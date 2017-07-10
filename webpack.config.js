var webpack = require("webpack");
var path = require('path');

module.exports = {
	entry: "./public/javascripts/app.js",
	output: {
		path: path.resolve(__dirname, 'public/javascripts'),
		filename: "bundle.js"
	},
	devServer: {
		inline: true,
		contentBase: './dist',
		port: 3000
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				loader: ["babel-loader?presets[]=es2015,presets[]=stage-0,presets[]=react"]
			},
			{
				test: /\.json$/,
				exclude: /(node_modules)/,
				loader: "json-loader"
			}
		]
	}
}
