import format from "./utils/format.js";
import './css/style.css'
import './css/style.less'
// 在html文件内加上type="module" 就可以使用import语句
// 浏览器默认是支持es Module的，vite就是基于这一特性
const message = 'hello vite'
console.log(message);

console.log(format());