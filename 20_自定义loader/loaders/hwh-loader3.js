module.exports = function (context) {
  console.log(context, '这是我自定义的loader3');
  return context;
}
module.exports.pitch = function () {
  console.log('loader 3');
}