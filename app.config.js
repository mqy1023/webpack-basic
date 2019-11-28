module.exports = {
  pages: [
    {
      name: 'index',
      html: 'pages/index/index.html',
      entry: 'pages/index/index.js'
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
  proxy: {
    '/common': {
      target: 'http://tool.h5-x.com',
      changeOrigin: true,
      pathRewrite: { '^/common': '' }
    }
  }
}