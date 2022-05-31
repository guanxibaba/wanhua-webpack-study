const express = require("express");

const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");

const app = express();

// 加载配置信息
const config = require("../webpack.config.js");

// 将配置信息传递给webpack进行编译
const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler));

app.listen(8888, () => {
  console.log("端口运行成功.....");
});
