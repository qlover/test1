const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
	entry: './app/index.js',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/'
	},

	devServer: {
		contentBase: './dist',
	},
	plugins: [
		// new CleanWebpackPlugin(['dist']),
		// new HtmlWebpackPlugin({}),
	],

	module: {
		rules: [{
			test: /\.(js|jsx)$/,
			use: 'babel-loader',
			exclude: /node_modules/
		}, {
			test: /\.less$/,
			use: [
				'style-loader', 'css-loader', 'less-loader'
			],
			exclude: /node_modules/
		}]
	},

	mode: 'development'
}