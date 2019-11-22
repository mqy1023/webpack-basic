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
  }
}