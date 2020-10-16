### webpack-basic开发文档
[简书链接](https://www.jianshu.com/p/dc33902ba7e4)
#### 指令
* `npm run server` 启动开发环境服务器
* `npm run dev` 启动development环境构建（代码未压缩, 未做代码分离（提取复用模块），保留source-map）
* `npm run prod` 启动production环境构建（代码压缩，代码分离，去除source-map）
* `npm run start` 以dist目录为根目录启动一个本地服务器
* `npm run analys` 启动构建分析并且启动一个可视化的构建数据分析网址
#### IS_DEV
src开发目录下的全局变量true为development环境false为production环境
#### import动态加载
``` js
import('vconsole').then(({default: VConsole})=>{
  this.Console = new VConsole();
})
```

[webpack动态加载友情链接](https://webpack.js.org/api/module-methods/#import)
#### pages
配置多个页面的html和入口文件

app.config.js
``` js
module.exports = {
  pages: [
    {
      name: 'index',// chunk名（输出时的html,js,css名字）
      html: 'pages/index/index.html',// html文件路径
      entry: 'pages/index/index.js'// html对应入口文件
    },
    ...
  ]
}
```
#### expose
expose 用来把模块暴露到全局变量。这个功能对支持依赖其他全局库的库时很有用。

app.config.js
``` js
module.exports = {
 expose: [
    {
      module_name: 'jquery',// 模块名
      name: ['jquery', '$'],// 变量名
    },
    {
      module_name: 'PxLoader',// 模块名
      name: ['PxLoader'],// 变量名
    },
    ...
  ]
}
```
> 注意: 模块必须在你的 bundle 中被 require() 过，否则他们将不会被暴露。

#### assets
 资源管理，这些都是默认配置
 
 app.config.js
 
 ``` js
module.exports = {
  assets: {
    // 不超过5KB的图片转换成base64
    limit: 5 * 1024,
    // 构建资源输出目录
    outputPath: '',
    // 构建资源输出路径（用作cdn）默认为空
    publicPath: ''
    // publicPath: 'http://localhost:8080/images'
  }
}
```

#### hash
我们知道，浏览器为了优化体验，会有缓存机制。如果浏览器判断当前资源没有更新，就不会去服务端下载，而是直接使用本地资源。在webpack的构建中，我们通常使用给文件添加后缀值来改名以及提取公共代码到不会改变的lib包中来解决新资源缓存问题。首先我们来介绍一下通过文件名称是怎么工作的。
[hash介绍](https://www.jianshu.com/p/e609e7b55aa7)

app.config.js

 ``` js
module.exports = {
  /**
  * 资源hash值，防浏览器缓存，客户端不更新
  * none: 不启用hash
  *语法-- 
  * hash: hash是跟整个项目的构建相关，只要项目里有文件更改，整个项目构建的hash值都会更改，并且全部文件都共用相同的hash值
  * chunkhash: chunkhash根据不同的入口文件进行依赖文件解析、构建对应的chunk，生成对应的哈希值。
  * contenthash: 文件内容改变则生成新的hash值
  * :Number为hash长度
  * -为文件名与hash直接的拼接字符
  */
  hash: '-[contenthash:4]'// 默认值
}
```
#### drop_console
production环境下构建时是否去除console默认为true

app.config.js

 ``` js
module.exports = {
  drop_console: false
}
```
#### proxy 
解决开发环境下接口跨域 

app.config.js

 ``` js
module.exports = {
  proxy: {
    '/common': {
      // 指定开发环境代理domain
      target: 'http://tool.h5-x.com',
      // production模式下优先使用prod，prod没有值使用target
      prod: 'http://tool.h5-x.com',
      // 开发环境是否跨域
      changeOrigin: true,
      // 重写路径
      pathRewrite: { '^/common': '' }
    }
  }
}
```
> 注意: /common 开头的字符串都会被规则匹配。
#### outputPath
构建输出目录

app.config.js

 ``` js
module.exports = {
  // outputPath: '/dist', 构建到当前磁盘下的dist目录
  // outputPath: 'D:/dist', 构建到D盘下的dist目录
  // outputPath: 'dist', 构建到当前工作目录下的dist 默认
}
```
