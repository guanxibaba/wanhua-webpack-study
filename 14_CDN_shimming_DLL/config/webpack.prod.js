const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "production",
  // 需要使用CDN的第三方库
  externals: {
    // key是库名，value是这个库的顶级对象
    dayjs: "dayjs",
    lodash: "_",
  },
  plugins: [new CleanWebpackPlugin({})],
};
