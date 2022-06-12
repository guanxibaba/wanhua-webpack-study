const { merge } = require("webpack-merge");
const prodConfig = require("./webpack.prod");
const devConfig = require("./webpack.dev");
const resolveApp = require("./paths");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const commonConfig = {
  entry: {
    main: "./src/main",
  },
  output: {
    // [name] 打包输出时保留入口文件的文件名
    filename: "[name].bundle.js",
    path: resolveApp("./build"),
  },
  resolve: {
    extensions: ["*", ".js", ".jsx", ".json"],
  },
  
  plugins: [
    new HtmlWebpackPlugin({
      title: "hwh webpack",
      template: "./index.html",
    }),
  ],
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
