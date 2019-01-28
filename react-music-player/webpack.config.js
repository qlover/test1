const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const ROOT_PATH = path.resolve(__dirname);
const SRC_PATH = path.resolve(ROOT_PATH, 'app');
const BUILD_PATH = path.resolve(ROOT_PATH, 'dist');

// const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
	mode: 'development',
	devtool: 'eval-source-map',
	entry: {
		app: [path.resolve(SRC_PATH, 'index.js')]
	},

	output: {
		path: BUILD_PATH,
		filename: 'js/[name].[hash:5].js',
		publicPath: '/'
	},

	plugins: [
		// new CleanWebpackPlugin(['dist']),
		new HtmlWebpackPlugin({
			title: 'webpack-react',
			template: './template/index.html',
			filename: 'index.html',
			inject: 'body',
			nowDate: new Date().toLocaleString()
		}),
		// 开户热更新模块
		new webpack.HotModuleReplacementPlugin(),

	],


	module: {
		rules: [{
			test: /\.js$/,
			use: 'babel-loader',
			exclude: /node_modules/
		}, {
			test: /\.css$/,
			use: ['style-loader', 'css-loader'],
			exclude: /node_modules/
		}, {
			test: /\.less$/,
			use: ['less-loader'],
			exclude: /node_modules/
		},{
			test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
			loader: 'url-loader',
			options: {
				limit: 20000,
				name: "[name]-[hash:5].[ext]",
				publicPath: "images/",
				outputPath: 'images/'
			},
		}]
	}
}