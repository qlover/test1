const webpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const config = require('./webpack.config.js');



// config.entry.app.unshift("webpack-dev-server/client?http://localhost:5000/", "webpack/hot/only-dev-server");
const HOST = 'localhost';
// devServer 配置信息
// https://webpack.js.org/configuration/dev-server/#
const options = {
  publicPath: config.output.publicPath,
  // 记得不指定服务器的目录
  // contentBase: './dist',
  // 是否开起热更新
  // 开户热更新，一定要配置 webpack 的热模块
  hot: true,
  // 是否自动打开浏览器
  open: true,
  host: 'localhost',

  // 代理
  proxy: {
    '/kugou': {
        target: 'http://m.kugou.com/',
        changeOrigin:true,
        pathRewrite: {"^/kugou" : ""}
    },
    "/yy_kugou": {
        target: "http://www.kugou.com/yy/",
        changeOrigin: true,
        pathRewrite: {"^/yy_kugou" : ""}
    },
    "/mobilecdn": {
        target: "http://mobilecdn.kugou.com",
        changeOrigin: true,
        pathRewrite: {"^/mobilecdn" : ""}
    }
  }
};

webpackDevServer.addDevServerEntrypoints(config, options);
const compiler = webpack(config);
const server = new webpackDevServer(compiler, options);

server.listen(5000, 'localhost', () => {
  console.log('dev server listening on port 5000');
});