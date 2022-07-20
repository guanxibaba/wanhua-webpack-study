import commonjs from "@rollup/plugin-commonjs"
import resolve from "@rollup/plugin-node-resolve"

export default {
  // 入口
  input: './src/main.js',

  // 输出
  output: {
    // 输出模板
    format: 'umd',
    name: 'hwhPlugins',
    // 输出文件名
    file: './dist/main.js',
    globals: {
      'lodash': '_'
    }
  },
  external: ['lodash'],
  plugins: [commonjs(), resolve()]

  // 输出多个模板
  // output: [
  //   {
  //     format: 'iife',
  //     file: './dist/iife.js'
  //   },
  //   {
  //     format: 'cjs',
  //     file: './dist/cjs.js'
  //   },
  //   {
  //     format: 'esm',
  //     file: './dist/esm.js'
  //   },
  //   {
  //     format: 'amd',
  //     file: './dist/amd.js'
  //   }
  // ]
}