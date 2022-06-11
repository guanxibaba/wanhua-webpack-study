const path = require("path");
/**
 * 避免我们在配置配置文件时，每次需要写../这种形式。我们可以使用api来拼接路径
 */
// node的api，可以获取当前的绝对路径
const appDir = process.cwd();
const resoleApp = (dir) => path.resolve(appDir, dir);

module.exports = resoleApp;
