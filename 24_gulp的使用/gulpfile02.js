
const { series, parallel } = require('gulp');


function foo(cb) {
  setTimeout(() => {
    console.log('第一个gulp程序');
    cb()
  }, 2000)
}

function foo2(cb) {
  setTimeout(() => {
    console.log('第二个gulp程序');
    cb()
  }, 2000)
}

function foo3(cb) {
  setTimeout(() => {
    console.log('第三个gulp程序');
    cb()
  }, 2000)
}

const myseries = series(foo, parallel(foo2, foo3));
const myparallel = parallel(foo, foo2, foo3);

module.exports = {
  myparallel,
  myseries
}