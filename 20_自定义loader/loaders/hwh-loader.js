// 每一个loader必须返回结果 可以通过return或this.callback()返回结果
const { getOptions } = require('loader-utils');
const { validate } = require('schema-utils');
const hwhloader = require('../hy-schema/hwh-laoder.json')

// 同步loader
// module.exports = function (context) {
//   console.log(context, '这是我自定义的loader');
//   // 通常在有错误的情况下使用this.callback()返回结果
//   this.callback(null, context);
//   // return context;
// }

// 异步loader
module.exports = function (context) {
  const callback = this.async();
  // 获取传入的参数，传入上下文
  const options = getOptions(this);
  // 校验参数 通过json文件验证参数
  validate(hwhloader, options)
  console.log(options, '传入的参数');
  setTimeout(() => {
    console.log(context, '这是我自定义的loader');
    callback(null, context);
  }, 2000)


}

module.exports.pitch = function () {
  console.log('loader 1');
}