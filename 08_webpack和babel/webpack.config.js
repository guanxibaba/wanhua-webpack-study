const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: "source-map",
  entry: "./src/main.js",
  output: {
    filename: "js/bundle.js",
    path: path.resolve(__dirname, "./biuld"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/, // 排除哪些文件
        use: "babel-loader",
        // options: {
        // 通过插件的方式让其js文件转换成我们想要的代码
        // plugins: [
        //   "@babel/plugin-transform-block-scoping",
        //   "@babel/plugin-transform-arrow-functions",
        // ],
        // 通过预设的方式来转换，这样不用下载大量的插件来进行转换
        // presets: ["@babel/preset-env"],
        // },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "hwh webpack",
    }),
  ],
};
