module.exports = function (context, srousemap, meta) {
  console.log(context, '这是我自定义的loader');
  return context;
}

module.exports.pitch = function () {
  console.log('loader 1');
}