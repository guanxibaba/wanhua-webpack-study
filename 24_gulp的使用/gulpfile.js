const { src, dest, watch } = require('gulp');
const babel = require('gulp-babel'); // 转换代码
const uglify = require('gulp-uglify'); // 压缩代码
const terser = require('gulp-terser'); // 丑化代码
const jsTask = () => {
  // src函数输入的是一个文件路径，返回的是一个流
  // 而pipe函数接受一个转换流或可写流，拿到数据之后进行处理，然后再传递给下一个转换流或可写流
  // dest函数接受一个输出路径，并且他会产生一个Node流，这个流可以写入文件
  return (
    src('./src/main.js')
      .pipe(babel({ presets: ['@babel/preset-env'] }))
      // .pipe(uglify())
      .pipe(terser({ mangle: { toplevel: true } }))
      .pipe(dest('./dist'))
  )
}
watch('./src/main.js', jsTask); // 监听文件变化，自动执行jsTask函数 如果想执行多个任务，可以使用series函数
module.exports = {
  jsTask
}