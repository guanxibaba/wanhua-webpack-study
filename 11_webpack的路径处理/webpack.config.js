const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  mode: "development",
  devtool: "source-map",
  entry: "./src/index.js",
  output: {
    filename: "build.js",
    path: path.resolve(__dirname, "./build"),
    // 当我们把代码进行打包时，通过打包后的index.html进行运行项目时
    // 默认的引用路径是build.js，而我们这里配置的最终会把引用路径改为./build.js
    // publicPath: "/abc",
  },
  devServer: {
    // 配置为only，当出现编译出错时，我们修改过来了
    // 不会自动刷新页面
    hot: "only",
    static: {
      // directory表示我们需要加载的静态资源的路径
      // 例如我们有一个abcd的文件夹，而在index.html中我们需要引用abcd下面的abc文件
      // 此时在index.html设置script的src为./abc.js
      // 然后再此属性中把directory设置为./abcd，就能访问到abc.js了
      directory: path.resolve(__dirname, "./abcd"),
      // 资源路径，默认是/ 改为/abc后我们访问资源需要加上/abc 例如：http://localhost:8080/abc
      // publicPath: "/abc",
      // 监听文件变化时，自动刷新页面
      watch: true,
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
  ],
};
