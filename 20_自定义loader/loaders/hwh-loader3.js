const babel = require('@babel/core');
const { getOptions } = require('loader-utils');

module.exports = function (context) {
  const callback = this.async();
  const options = getOptions(this);
  console.log(context, '这是我自定义的loader3');
  // 自定义loader处理es6语法
  babel.transform(context, options, (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result.code);
    }
  })
  return context;
}
module.exports.pitch = function () {
  console.log('loader 3');
}