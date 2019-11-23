const merge = require('webpack-merge');
const webpackBase = require('./webpack.base.js');
const webpack = require('webpack');
module.exports = merge(webpackBase, {
  mode: 'development',// webpack打包模式
  devServer: {
    proxy: {
      '/image': {
        target: 'http://tool.h5-x.com/',
        changeOrigin: true
      }
    }
  },
  devtool: 'cheap-module-eval-source-map',
  plugins:[
    new webpack.DefinePlugin({
      IS_DEV: 'true'
    })
  ]
})
