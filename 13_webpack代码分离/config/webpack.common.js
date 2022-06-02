const { merge } = require("webpack-merge");
const prodConfig = require("./webpack.prod");
const devConfig = require("./webpack.dev");
const resolveApp = require("./paths");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const commonConfig = {
  // 使用多入口的方式可以对代码进行抽离
  entry: {
    // 匹配main.js文件为入口
    main: "./src/js/main",
    // 匹配index.js文件为入口
    index: "./src/index",
    // index: { import: "./src/index.js", dependOn: "shared" },
    // main: { import: "./src/js/main.js", dependOn: "shared" },
    // shared: ["lodash"],
  },
  output: {
    // [name] 打包输出时保留入口文件的文件名
    filename: "[name].bundle.js",
    path: resolveApp("./build"),
  },
  optimization: {
    splitChunks: {
      chunks: "all",
      // 如果一个包的大小小于这个属性的值，那就不会进行拆分
      minSize: 100,
      // 将大于maxSize的包拆分成不小于minSize的包
      maxSize: 200,
      // 用于对拆分的包进行分组，也就是我们可以匹配指定的文件
      // 然后再进行单独的打包
      cacheGroups: {
        foo: {
          test: /foo/,
          filename: "foo.bundle.js",
        },
      },
    },
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
