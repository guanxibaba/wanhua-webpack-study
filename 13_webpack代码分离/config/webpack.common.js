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
    // 异步引入的文件，会自动打包一个文件。这个属性用于设置它打包后的name。便于区分
    // 默认情况下，这个id和name打包出来是一致的，如果我们希望修改的话，可以在引入时使用魔法注释来设置
    chunkFilename: "chunk_[id]_[name].js",
  },
  optimization: {
    splitChunks: {
      // 不管我们这里设置的是什么，在代码中，如果有异步引入。默认还是会单独打包文件的
      chunks: "all",
      // 如果一个包的大小小于这个属性的值，那就不会进行拆分
      minSize: 100,
      // 将大于maxSize的包拆分成不小于minSize的包
      maxSize: 200,
      // 用于对拆分的包进行分组，也就是我们可以匹配指定的文件
      // 然后再进行单独的打包
      cacheGroups: {
        // 这个键名是自定义的
        foo: {
          test: /foo/,
          filename: "foo_[id].[hash:6].js",
          // 配置优先级，如果有多个的时候，会根据优先级进行拆分
          priority: -10,
        },
      },
      // 至少被引入的次数 如果引入的次数不超过这个值，就不会拆分
      // 但是如果这个包大于了maxSize，那就会拆分，拆分的条件不是按照cacheGroups的条件
      minChunks: 1,
      // 最大异步请求数量
      maxAsyncRequests: 30,
    },
    // 用于配置告诉webpack模块的id采用什么算法生成
    // natural：按照数字的顺序使用id(不推荐)
    // named 开发时的默认值，一个可读名称的id(开发时推荐)
    // deterministic 确定性的id，在不同的编译中，使用不同的短数字(打包时推荐)
    // chunkIds: "deterministic",
    // 这个配置可以配置runtime相关的代码是否抽取到一个单独的文件中
    // runtime相关的代码指的是在运行环境中，对模块进行解析，加载，模块信息相关的代码
    // 抽离出来之后，有利于浏览器缓存，提高性能
    runtimeChunk: true,
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
