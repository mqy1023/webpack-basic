const merge = require('webpack-merge');
const webpackBase = require('./webpack.base.js');
const webpack = require('webpack');
const APP = require('../app.js')
let webpackConfig = {
  mode: 'development',// webpack打包模式
  devServer: {},
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      IS_DEV: 'true'
    })
  ]
}
if (APP.proxy instanceof Object) {
  webpackConfig.devServer.proxy = APP.proxy
}
module.exports = merge(webpackBase, webpackConfig)
