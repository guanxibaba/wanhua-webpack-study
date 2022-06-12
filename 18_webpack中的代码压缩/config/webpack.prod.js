const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const glob = require("glob");
const PurgecssPlugin = require("purgecss-webpack-plugin");
const resolveApp = require("./paths");
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: 'source-map',
  optimization: {
    usedExports: true,
    // 是否对代码进行优化，为true时，才会执行minimizer
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        // 是否将注释剥离到单独的文件
        extractComments: false,
        // terser的配置
        terserOptions: {
          compress: {
            // 是否使用函数参数名代理arguments,在打包完成时，一般对形参进行了优化，使用了arguments[index]来代替
            arguments: false,
            // 是否移除访问不到的代码，也就是在一整个依赖图都未用到的代码
            dead_code: true
          },
          mangle: true,
          // 删除未使用的变量和函数
          toplevel: true,
          keep_classnames: true,
          keep_fnames: true
        }
      })
    ]
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      }
    ],
  },
  plugins: [
    new CleanWebpackPlugin({}),
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
      chunkFilename: "css/[name][hash:6].css"
    }),
    // 对代码进行gzip压缩
    new CompressionPlugin({
      test: /\.(css|js)$/, // 匹配哪些文件需要压缩
      minRatio: 0.8, // 压缩比例
      algorithm: "gzip", // 压缩算法
    }),
    // 对css进行tree Shaking
    new PurgecssPlugin({
      // 匹配需要检测的文件
      paths: glob.sync(`${resolveApp('./src')}/**/*`, { nodir: true }),
      safelist: function () {
        return {
          // 白名单，默认情况下这两个标签的样式都是会被删除的
          standard: ['html', 'body'],
        }
      }
    })
  ],
};
