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

从入口文件开始，所有存在引用关系的文件都会形成一个依赖图。而webpack会遍历这个依赖图去进行打包

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

在开发中，我们通常会考虑一个兼容性的问题。考虑我们的代码应该兼容哪一些浏览器

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

根目录新建`.browserslistrc`文件。然后进行配置

#### postcss

postcss是一个通过JavaScript来转换样式的工具。这个工具可以帮助我们进行一些css的转换和适配。比如自动添加浏览器前缀，css样式的重置等等。但是这个工具实际帮我们做的东西很少。我们还需要借助一些插件才能达到想要的效果

`postcss-cli`：可以在终端中使用postcss-cli

`autoprefixer`：帮助我们加前缀

通过`npx postcss --use autoprefixer -o result.css ./src/js/component.css`命令就能够对指定的文件进行加前缀的功能。后面的是目标文件的路径 result.css是需要输出的文件名。

但是现在这样还是不能进行webpack打包的

![image-20220527201946929](E:\练习文件\webpack\webpack.assets\image-20220527201946929.png)

因为在工作中我们不可能通过终端来对每一个css文件进行加前缀之类的工作。如果css文件过多，则会变得很麻烦。我们可以通过postcss-loader让webpack对齐打包的时候进行处理

`yarn add postcss-loader -D`安装后通过对`webpack.config.js`进行配置，让webpack在对css代码进行解析打包时，做一些相应的操作

```javascript
...接上webpack的配置文件
{
    loader: "postcss-loader",
    // 为这个loader进行配置
    options: {
      postcssOptions: {
        // 配置这个loader所需要的插件
        plugins: [require("autoprefixer")],
      },
    },
 },
```

当我们使用autoprefixer时，只能对属性进行一些添加前缀的工作，而我们一些属性值例如color的值的十六进制的写法。有的浏览器也是不一定支持的

![image-20220527205042103](E:\练习文件\webpack\webpack.assets\image-20220527205042103.png)

此时我们可以通过`postcss-preset-env`进行转换。

`yarn add postcss-preset-env -D`后在配置autoprefixer的地方进行配置即可

```javascript
postcssOptions: {
// 配置这个loader所需要的插件
// plugins: [require("autoprefixer")],
// 简写为这种格式，因为postcss-preset-env插件默认配置了autoprefixer，所以可以省略
plugins: ["postcss-preset-env"],
},
```

配置完后可以发现，当我们在进行打包的时候已经为我们转换好了

![image-20220527205601965](E:\练习文件\webpack\webpack.assets\image-20220527205601965.png)

当我们如果less也需要配置呢？那不是又要跑到less的loader配置下去输入重复的配置吗？

避免解决这个问题，我们可以在根目录建立`postcss.config.js`。然后再我们所需要使用postcss的loader里面加上`postcss-loader`即可

```javascript
postcss.config.js的配置
module.exports = {
  plugins: ["postcss-preset-env"],
};

```

如果我们在css文件内使用@import去引入css文件时会发现，引入的这个css的文件有一些需要做的处理并没有给我们处理。这是因为当我们解析css代码的时候已经走到了css-loader了。而在代码内遇到的@import，这个里面的代码不会再执行css-loader之前的loader了。所以这个引入的css文件内的代码是少了一些处理的。而我们可以通过配置`webpack.config.js`解决这个问题

```javascript
...
{
    loader: "css-loader",
    options: {
      // 表示遇到@import时，引入的文件的css代码会往前几个loader，再执行一次
      importLoaders: 1,
    },
},
```

#### 处理其他的资源

如果我们的项目中有其他的资源例如图片之类的东西。默认webpack也是不知道怎么去打包的

==file-loader==：通过这个loader进行配置，让webpack对图片也进行打包

`yarn add file-loader -D` : 安装依赖后配置`webpack.config.js`文件

```javascript
{
    test: /\.(jpg|pne?g|gif|bmp)$/,
    use: "file-loader",
},
```

> 打包之后的命名

当我们进行了打包之后，文件的命名默认是32个字符的hash值。而如果我们想要对比一下打包前后的图片时，不容易找到，那我们应该怎么让他在打包时，保留原来的命名呢?

可以通过配置loader的options配置

```javascript
{
    loader: "file-loader",
    options: {
      // 图片输出的名称 [name]表示原来的名称 [ext]表示原来的后缀 [hash:6]表示图片的hash值,取前六位
      name: "img/[name].[hash:6].[ext]",
      // 图片输出的路径
      // outputPath: "img",
    },
},
```

> url-loader

如果我们大小图片都进行打包到文件内，则对于小图片来说，则会增加很多不必要的http请求。我们可以通过url-loader来进行打包图片，通过设置`limit`来限制超过了多少kb的图片则打包到build里面。如果没有超过则打包为base64嵌入到js文件内，这样就不用发起请求了。也减少了服务器的压力

`yarn add url-loader -D`安装依赖

```javascript
{
    loader: "url-loader",
    options: {
      // 图片输出的名称 [name]表示原来的名称 [ext]表示原来的后缀 [hash:6]表示图片的hash值,取前六位
      name: "img/[name].[hash:6].[ext]",
      // 图片输出的路径
      // outputPath: "img",
      // 小于100kb的图片则转换成base64 大于100kb的图片则转换成url
      limit: 100 * 1024,
    },
  },
```

可以根据需求来进行设置图片的大小

#### asset module type

在webpack5之前，加载这些资源需要使用一些相关的loader。而在webpack5之后，我们可以直接使用资源模块类型(asset module type)来代替这些loader

`asset/resource`：发送一个单独的文件并导出URL，之前通过file-loader实现

`asset/inline`：导出一个资源的data URL。之前通过url-loader实现

`asset/source`：导出资源的源代码。之前通过使用raw-loader(css-loader)实现

`asset`：根据图片的大小来选择是导出一个单独的文件，还是导出一个资源的data URL

> asset/resource

通过配置`webpack.config.js`：实现file-loader的功能

```javascript
...
{
	test: /\.(jpg|pne?g|gif|bmp)$/,
	type: "asset/resource",
},
```

![image-20220528134934224](E:\练习文件\webpack\webpack.assets\image-20220528134934224.png)

如果想要自定义的文件的输出路径和文件名

```javascript
{
  test: /\.(jpg|pne?g|gif|bmp)$/,
  type: "asset/resource",
  // 配置自定义导出文件和文件名
  generator: {
    filename: "img/[name][hash:6][ext]",
  },
},
或在output配置中配置
assetModuleFilename: "img/[name][hash:6][ext]"
```

> asset

```javascript
{
    test: /\.(jpg|pne?g|gif|bmp)$/,
    type: "asset",
    // 设置导出路径及文件名
    generator: {
      filename: "img/[name][hash:6][ext]",
    },
    // 设置图片应该是转为base64的大小还是转为URL的资源
    parser: {
      dataUrlCondition: {
        maxSize: 100 * 1024,
      },
    },
 },
```

==需要打包字体图标用法也是一致的==

#### plugin

现在我们进行重新打包的时候都是需要手动删除打包后的文件，然后再进行打包。这样打包出来的代码才是最新的。但是每次进行打包之前都需要手动删除一下build文件。这样是很麻烦的。我们可以通过plugin来进行自动给我们替换为最新的代码。

==loader用于特定的模块类型继续转换，而plugin可以用于执行跟广泛的任务。比如打包优化，资源管理，环境变量注入等等==。而我们这种场景可以使用`clean-webpack-plugin`

> clean-webpack-plugin

打包时，自动把原本的打包文件替换为最新的

```javascript
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exprts = {
    plugins: [new CleanWebpackPlugin()]
}
```

配置完成之后我们每次打包就不需要手动删除打包之后的文件了

> html-webpack-plugin

目前我们所打包的文件内都是没有index.html的，也就是我们打包过后的文件是不能运行的，虽然我们可以手动的添加一个html文件，但是每次打包过后都添加一次，也会显得特别的麻烦。==此时html-webpack-plugin==就可以做这样一件事，可以自动生成一个html文件，并把我们打包完成的js文件引入

`yarn add html-webpack-plugin`，安装完后

```javascript
const HtmlWebpackPlugin = require("html-webpack-plugin");

moudle.exports = {
		plugins: [
    new CleanWebpackPlugin(),
    // 配置自动生成index.html
    new HtmlWebpackPlugin({
      // 配置生成的index.html 的title
      title: "hwh webpack",
      // 我们可以指定html模板让它自动去生成一个这样的模板
      template: "public/index.html",
    }),
  ],
}
```

他的工作原理是通过一个ejs的文件的模板去生成的，但是有的时候我们不想要它的模板时，可以自己指定一个模板去生成

> DefinePlugin

在我们自定义的模板中，link中引入了一个icon图标。而这个图标的路径是用一个变量来定义的

![image-20220528163247189](E:\练习文件\webpack\webpack.assets\image-20220528163247189.png)

也就是说我们得有这个全局变量，否则打包的时候就会报错，我们可以通过webpack内输出的一个DefinePlugin内配置全局变量

而我们在打包时，有一些文件是想要webpack直接复制到我们打包好的文件内的，可以通过`copy-webpack-plugin`进行打包复制文件。

```javascript
const { DefinePlugin } = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    plugins: [
        // 定义全局变量
        new DefinePlugin({
          BASE_URL: '"./"',
        }),
        // 复制文件
        new CopyWebpackPlugin({
          patterns: [
            {
              from: "public",
              // 筛选文件 from下的被ignore的文件不会被复制
              globOptions: {
                ignore: ["**/index.html"],
              },
            },
          ],
        }),
    ]
}

```

#### mode

mode的配置，默认是`production`：生产环境，此时打包出来的build文件是经过丑化的。不容易看懂的代码

`development`：开发环境，此时build文件内的代码是比较易读的

CommonJs打包后的源码：`见06_webpack模块化原理下CommonJS下的build.js`

EsModule打包后的源码:`见06_webpack模块化原理下EsModule下的build.js`

#### source-map

我们的代码运行在浏览器上时，通常都是被打包过的，也就是真实跑在浏览器上的代码，与我们编写的源代码是有差异的。比如ES6的代码被转换为ES5的代码。比如代码进行了丑化之类的。

而如果我们的代码在打包运行时，出错了是很难找到出错的位置的，因为浏览器运行的代码并不是我们编写的源代码。

那我们怎么可以让打包过后运行在浏览器的代码与我们编写的代码保持一致呢？==通过source-map可以做到==

它会把已转换的代码，映射到原始的文件，使得浏览器可以重构原始源，并在调试器中显示重建的原始源

