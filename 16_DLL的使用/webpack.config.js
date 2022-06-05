const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const AddAssetHtmlPlugin = require("add-asset-html-webpack-plugin");
const resolveApp = require("./paths");

module.exports = {
  entry: {
    index: "./src/index.js",
    main: "./src/main.js",
  },
  output: {
    path: resolveApp("./build"),
    filename: "js/[name].[chunkhash:6].builde.js",
  },
  resolve: {
    extensions: [".js", ".jsx", ".json"],
  },
  optimization: {
    // 对代码进行压缩相关的操作
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      }),
    ],
    splitChunks: {
      // async异步导入
      // initial同步导入
      // all 异步/同步导入
      chunks: "all",
      // 最小尺寸: 如果拆分出来一个, 那么拆分出来的这个包的大小最小为minSize
      minSize: 20000,
      // 将大于maxSize的包, 拆分成不小于minSize的包
      maxSize: 20000,
      // minChunks表示引入的包, 至少被导入了几次
      minChunks: 1,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          filename: "js/[id]_vendors.js",
          priority: -10,
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  useBuiltIns: "usage",
                  corejs: 3,
                },
              ],
              "@babel/preset-react",
            ],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
    // 告诉webpack我们需要使用到的DLL库，这个manifest.json文件内有对应的依赖
    new webpack.DllReferencePlugin({
      context: resolveApp("./"),
      manifest: resolveApp("./dll/react.manifest.json"),
    }),
    // 在模板内自动引入dll文件
    new AddAssetHtmlPlugin({
      filepath: resolveApp("./dll/react.dll.js"),
      // 如果引入的时候会在路径内自动添加auto的前缀，则加上这个属性就可以解决
      publicPath: "./",
    }),
  ],
};
