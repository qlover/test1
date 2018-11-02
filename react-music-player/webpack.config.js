const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  devtool: 'inline-source-map',
  entry: './app/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },

  plugins: [
    // 指定清除的路径,然后重新生成 dist
    new CleanWebpackPlugin(['dist']),
    // HTML 管理
    new HtmlWebpackPlugin({
      // 生成 html 文件的标题
      // 有了模板的文件就可以省略该属性了
      // title: 'Output Management',
      // 在指定路径生产 index.html
      filename: '../index.html',
      // 需要模板的路径
      template: './app/index.tpl.html',
      // 将资产给 template 中 HTML 文件的什么地方
      // 'body'所有javascript资源将被放置在body元素的底部
      // 'head'将脚本放在head元素中
      inject: 'body'

    })
  ],

  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      // 只解析 /app/ 目录下的 .js 文件
      include: [
        path.resolve(__dirname, 'app')
      ],
      use: ['babel-loader']
    }, {
      test: /\.less$/,
      use: [
        'style-loader', 'css-loader', 'less-loader'
      ],
      include:[
        path.resolve(__dirname, 'app')
      ]
    }]
  },

  mode: "development"

};