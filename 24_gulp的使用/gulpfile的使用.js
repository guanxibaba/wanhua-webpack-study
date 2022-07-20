
// gulp内，每一个都是异步的，所以要用到回调函数
// 默认第一个参数是回调函数， 在函数执行完毕时，需要调用一下这个函数
function foo(callback) {
  console.log('第一个gulp程序');
  callback()
}

module.exports = {
  foo
}

module.exports.default = (callback) => {
  console.log('default Gulp');
  callback()
}