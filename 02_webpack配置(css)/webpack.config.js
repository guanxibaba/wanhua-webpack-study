const path = require("path");

// 采用commonJS规范
module.exports = {
  // 指定入口
  entry: "./src/main.js",
  // 指定出口
  output: {
    // 指定输出的文件名
    filename: "bundle.js",
    // 指定输出的路径 _dirname表示绝对路径
    path: path.resolve(__dirname, "./biuld"),
  },
  // 指定模块如何解析
  module: {
    // 配置loader
    rules: [
      // 配置css的loader
      {
        test: /\.css$/, // 匹配所有以.css结尾的文件
        use: [
          // webpack的执行顺序为从后往前 也就是我们这里，必须是
          // 先使用css-loader解析css文件
          // 再使用style-loader将css文件内容插入到head中
          "style-loader",
          "css-loader",
          // { loader: "css-loader" }, // 所使用的loader
        ],
      },
      // 配置less的loader
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
    ],
  },
};
