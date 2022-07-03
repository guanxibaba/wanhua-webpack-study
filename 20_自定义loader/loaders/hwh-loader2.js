module.exports = function (context) {
  console.log(context, '这是我自定义的loader2');
  return context;
}
module.exports.pitch = function () {
  console.log('loader 2');
}