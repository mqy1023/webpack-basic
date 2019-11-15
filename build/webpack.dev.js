const merge = require('webpack-merge')
const webpackBase = require('./webpack.base.js')
module.exports = merge(webpackBase, {
  mode: 'development',// webpack打包模式
  devServer: {
    contentBase: 'src',
    proxy: {
      '/image': {
        target: 'http://tool.h5-x.com/',
        changeOrigin: true
      }
    }
  },
  devtool: 'cheap-module-eval-source-map',
})
