const { src, dest, watch, series, parallel } = require('gulp')
const htmlMin = require('gulp-htmlmin')
const babel = require('gulp-babel')
const terser = require('gulp-terser')
const less = require('gulp-less')
const inject = require('gulp-inject')
const browserSync = require('browser-sync')
const del = require('del')

const htmlTask = () => {
  return src('./src/*.html')
    .pipe(htmlMin({
      collapseWhitespace: true,
    }))
    .pipe(dest('./dist'))
}

const jsTask = () => {
  // 使用base属性时，会保存当前匹配的路径
  return src('./src/js/*.js', { base: './src' })
    .pipe(babel({ presets: ['@babel/preset-env'] }))
    .pipe(terser({ mangle: { toplevel: true } }))
    .pipe(dest('./dist'))
}

const cssTask = () => {
  return src('./src/css/*.less', { base: './src' })
    .pipe(less())
    .pipe(dest('./dist'))

}

const injectHtml = () => {
  // 将打包好的文件嵌入到html文件内
  // 需要在html文件添加对应的注释才能嵌入
  // 加入relative 在注入文件时，把路径改为相对路径
  return src('./dist/*.html')
    .pipe(inject(src(['./dist/js/*.js', './dist/css/*.css']), { relative: true }))
    .pipe(dest('./dist'))
}

// 启动一个服务器，并监听文件变化
const br = browserSync.create()
const server = () => {
  // 监听所有文件的变化，一旦有变化 则重新打包
  watch('./src/*.html', series(htmlTask, injectHtml))
  watch('./src/js/*.js', series(jsTask, injectHtml))
  watch('./src/css/*.less', series(cssTask, injectHtml))

  // 启动服务器 并监听dist文件下的所有文件 并刷新浏览器
  br.init({
    files: './dist/*',
    open: true,
    port: 8888,
    server: {
      baseDir: './dist'
    }
  })
}

// 删除dist文件夹
const clean = () => {
  return del(['dist'])
}

// 执行任务 首先删除dist文件夹 再执行打包任务
const buildTask = series(clean, parallel(htmlTask, jsTask, cssTask), injectHtml)

// 再打包任务后，启动一个服务器
const serverTask = series(buildTask, server)

// 暴露出两个任务，这样就可以在package.json中使用 gulp build 和 gulp server
module.exports = {
  buildTask,
  serverTask
}