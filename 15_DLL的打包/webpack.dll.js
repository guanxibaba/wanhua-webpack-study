const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  // 配置多入口
  entry: {
    react: ["react", "react-dom"],
  },
  output: {
    // 设置打包后的文件夹
    path: path.resolve(__dirname, "./dll"),
    // 设置打包的文件名
    filename: "[name].dll.js",
    // 包的名字
    library: "dll_[name]",
  },
  // 不生成注释文件
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      }),
    ],
  },
  plugins: [
    new webpack.DllPlugin({
      name: "dll_[name]",
      path: path.resolve(__dirname, "./dll/[name].manifest.json"),
    }),
  ],
};
