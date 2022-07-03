const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/main.js',
  output: {
    filename: 'builde.js',
    path: path.resolve(__dirname, './build'),
  },
  module: {
    rules: [
      {
        test: /\.js$/i,
        use: 'hwh-loader',
      },
      {
        test: /\.js$/i,
        use: 'hwh-loader2',
        enforce: 'pre',
      },
      {
        test: /\.js$/i,
        use: 'hwh-loader3',
      }
    ]
  },
  // 自定义loader寻找路径 所有的loader都会在node_modules中寻找。当没有时，会在我们指定的路径找
  resolveLoader: {
    modules: ["./loaders", "node_modules"],
  }
}