const merge = require('webpack-merge')
const webpackBase = require('./webpack.base.js')
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
module.exports = merge(webpackBase, {
  mode: 'production',// webpack打包模式
  optimization: {
    minimizer: [
      new TerserJSPlugin({}),
      new OptimizeCSSAssetsPlugin({}),
    ],
    splitChunks: { chunks: "all" }
  }
})