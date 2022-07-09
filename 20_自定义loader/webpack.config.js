const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: './src/main.js',
  output: {
    filename: 'builde.js',
    path: path.resolve(__dirname, './build'),
  },
  module: {
    rules: [
      // {
      //   test: /\.js$/i,
      //   use: {
      //     loader: 'hwh-loader',
      //     options: {
      //       name: 'hwh',
      //       age: 18,
      //     }
      //   }
      // },
      // {
      //   test: /\.js$/i,
      //   use: 'hwh-loader2',
      //   enforce: 'pre',
      // },
      {
        test: /\.js$/i,
        use: {
          loader: 'hwh-loader3',
          options: {
            presets: [
              "@babel/preset-env",
            ]
          }
        },
      },
      {
        test: /\.(jpg|png|gif)$/,
        type: 'asset',
        generator: {
          filename: 'img/[name][ext]'
        },
        parser: {
          dataUrlCondition: {
            maxSize: 100 * 1024
          }
        }
      },
      {
        test: /\.md$/i,
        use: [
          "html-loader",
          "hwhmd-loader"
        ]
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  // 自定义loader寻找路径 所有的loader都会在node_modules中寻找。当没有时，会在我们指定的路径找
  resolveLoader: {
    modules: ["./loaders", "node_modules"],
  },
  plugins: [
    new HtmlWebpackPlugin()
  ]
}