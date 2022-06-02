const path = require("path");
const { merge } = require("webpack-merge");

const prodConfig = require("./webpack.prod");
const devConfig = require("./webpack.dev");

const resolveApp = require("./paths");

const commonConfig = {
  context: resolveApp("./"),
  entry: resolveApp("./src/js/main.js"),
  output: {
    filename: "bundle.js",
    path: resolveApp("./build"),
  },
  resolve: {
    extensions: ["*", ".js", ".jsx", ".json"],
  },
};

module.exports = function (env) {
  // 获取当前是什么环境
  const isProduction = env.production;
  // 判断是否是生产环境
  process.env.NODE_ENV = isProduction ? "production" : "development";

  const config = isProduction ? prodConfig : devConfig;

  const mergedConfig = merge(commonConfig, config);
  return mergedConfig;
};
