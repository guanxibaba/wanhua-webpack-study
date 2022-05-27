## webpack学习

> 初步准备

`npm install webpack webpack-cli -g `或`yarn add webpack webpack-cli -g`

`webpack-cli`不是必备的，也可以选择不安装， -g表示全局安装

#### 启动

输入webpack即可编译一个文件夹。但是这个webpack默认指定编译的文件是src。入口文件是src下的index.js

如果当前所需要编译的文件内的子级文件没有src或src下没有index.js都会报错

![image-20220525221742692](E:\练习文件\webpack\webpack.assets\image-20220525221742692.png)



当编译完成之后，会出现一个dist的文件夹。这个文件夹内放着的就是我们被编译好的代码

> 配置局部webpack

为了让别人clone我们的代码时，所有的依赖版本一致。都应该使用局部依赖。

使用`npm init`初始化。然后在`npm install webpack webpack-cli -D`

在`package.json`内的script中配置`build`命令。

此时使用的就是局部的`webpack`了。当局部并没有webpack时。也会找到全局。

或者不配置`package.json`时。可以cd 到 node_modules的.bin下的webpack再进行打包

![image-20220525224332205](E:\练习文件\webpack\webpack.assets\image-20220525224332205.png)

#### 配置

默认情况下，我们的入口文件为src下的index.js。出口文件为dist。当我们的src目录下没有index.js呢？

这个时候就会报错。我们可以通过一些指令或配置来更改这些默认的配置

`npx webpack --entry ./src/main.js --output-path ./build`：表示--entry指定入口文件。--output-path 指定出口文件

==根目录新建webpack.config.js==：通过在这个文件内配置，默认文件名为webpack.config.js

```javascript
const path = require("path");

// 采用commonJS规范
module.exports = {
// 指定入口
entry: "./src/main.js",
// 指定出口
output: {
// 指定输出的文件名
filename: "bundle.js",
// 指定输出的路径 _dirname表示绝对路径
path: path.resolve(__dirname, "./biuld"),
},
}
```

如果我们配置的文件不是叫webpack.config.js呢？

则在package.json内scripts命令内我们配置为打包的build命令内添加`--config 我们的配置文件`添加完之后就可以把我们的文件当作配置文件了

> 依赖图

那webpack怎么知道我们需要哪些，不需要哪些。他会打包哪些，不打包哪些呢？

从入口文件开始，所有存在引入关系的文件都会形成一个依赖图。而webpack会遍历这个依赖图去进行打包

而不存在这个依赖图里面的文件，则不会被打包到

> loader

在webpack内，对于一些css,less等等的模块，他是不知道怎么去对其加载的。如果我们没有配置对应的loader。则webpack会进行报错

==css-loader==

使用css-loader可以让webpack对css进行解析。`yarn add css-loader -D`进行安装

==配置方式==

1. 在引入中添加css-loader!  例如`import 'css-loader!./index.css'`
2. 在webpack配置文件中配置

```javascript
...接上代码片段
// 指定模块如何解析
  module: {
// 配置loader
rules: [
  // 配置css的loader
  {
    test: /\.css$/, // 匹配所有以.css结尾的文件
    use: [
      // webpack的执行顺序为从后往前 也就是我们这里，必须是
      // 先使用css-loader解析css文件
      // 再使用style-loader将css文件内容插入到head中
      "style-loader",
      "css-loader",
      // { loader: "css-loader" }, // 所使用的loader
    ],
  },
  // 配置less的loader
  {
    test: /\.less$/,
    use: ["style-loader", "css-loader", "less-loader"],
  },
],
},
```

配置完成之后，此时css还不能插入到我们的html文件中。还需要通过style-loader把我们的代码插入到html文件

`yarn add style-loader -D` 进行安装。

他的原理就是生成一个style标签，把css-loader所解析的代码放进去。然后在html文件的head标签内插入

==配置如上图==

#### 浏览器兼容性

在开发中，我们通常会考虑一个兼容性的文件。考虑我们的代码应该兼容哪一些浏览器

而市面上的浏览器有很多。那我们应该怎么解决这个问题呢？

> browserlist工具

通过这个工具进行配置我们所需要兼容的浏览器。

```javascript
"browserslist": [
">1%", // 表示市场占有率超过1%
"last 2 versions", // 表示兼容最近的两个大版本
"not dead" // 表示未死的，也就是24个月之内有更新的
]
```

通过以上配置就可以进行查询出满足条件的浏览器。查询用的是`caniuse-lite`工具

==配置方式==

在package.json中配置，如上代码片段

根目录新建.browserslistrc文件。然后进行配置