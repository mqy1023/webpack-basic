// 未完成功能，抽取共用css模块，js文件优化
/**
* npm run server：启动开发环境本地服务器
* npm run dev：启动开发项目打包（代码未压缩）
* npm run prod：启动正式环境项目打包（代码压缩）
* npm run start：以dist目录为根目录启动一个服务器
*/
module.exports = {
  // 配置页面
  pages: [
    {
      name: 'index',// 输出的html,js文件名
      html: 'pages/index/index.html',// html文件路径
      entry: 'pages/index/index.js'// html对应入口文件
    },
    {
      name: 'landscape',
      html: 'pages/landscape/landscape.html',
      entry: 'pages/landscape/landscape.js'
    },
    {
      name: 'screen',
      html: 'pages/screen/screen.html',
      entry: 'pages/screen/screen.js'
    }
  ],
  // 配置第三方模块为全局变量,配置过后页面中就不需要引入
  expose: [
    {
      module_name: 'jquery',// 模块名
      name: ['jquery', '$'],// 变量名
    },
    {
      module_name: 'PxLoader',// 模块名
      name: ['PxLoader'],// 变量名
    }
  ],
  // 图片资源管理，这些都是默认配置
  image: {
    // 超过5KB打包成图片
    limit: 5 * 1024,
    // 打包资源输出目录
    outputPath: 'images',
    // 打包资源输出路径（用作cdn）默认为空
    publicPath: ''
    // publicPath: 'http://localhost:8080/images'
  },
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
  hash: '-[contenthash:4]'
}