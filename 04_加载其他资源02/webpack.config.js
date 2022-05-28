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
          {
            loader: "css-loader",
            options: {
              // 表示遇到@import时，引入的文件的css代码会往前几个loader，再执行一次
              importLoaders: 1,
            },
          },
          "postcss-loader",
          // {
          //   loader: "postcss-loader",
          //   // 为这个loader进行配置
          //   options: {
          //     postcssOptions: {
          //       // 配置这个loader所需要的插件
          //       // plugins: [require("autoprefixer")],
          //       // 简写为这种格式，因为postcss-preset-env插件默认配置了autoprefixer，所以可以省略
          //       plugins: ["postcss-preset-env"],
          //     },
          //   },
          // },
          // { loader: "css-loader" }, // 所使用的loader
        ],
      },
      // 配置less的loader
      {
        test: /\.less$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
            },
          },
          "postcss-loader",
          "less-loader",
        ],
      },
      // 配置其他的静态资源
      {
        test: /\.(jpg|pne?g|gif|bmp)$/,
        type: "asset",
        // 设置导出路径及文件名
        generator: {
          filename: "img/[name][hash:6][ext]",
        },
        // 设置图片应该是转为base64的大小还是转为URL的资源
        parser: {
          dataUrlCondition: {
            maxSize: 100 * 1024,
          },
        },
      },
      // 配置字体图标
      {
        test: /\.(eot|ttf|woff2?|svg)$/,
        type: "asset/resource",
        generator: {
          filename: "font/[name][hash:6][ext]",
        },
      },
    ],
  },
};
