const path = require('path');
const Htmlwebpackplugin = require('html-webpack-plugin');
const AutoUploadPlugin = require('./plugins/AutoUploadPlugin');

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  plugins: [
    new Htmlwebpackplugin(),
    new AutoUploadPlugin({
      host: "47.103.136.95",
      username: "root",
      password: "hwh123456",
      removePath: "/root/test",
    })
  ]
}