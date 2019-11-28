const merge = require('webpack-merge')
const webpackBase = require('./webpack.base.js')
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpack = require('webpack');
const APP = require('../app.js');

let webpackConfig = {
  mode: 'production',// webpack打包模式
  optimization: {
    minimizer: [
      new TerserJSPlugin({
        terserOptions: {
          compress: {
            drop_console: typeof APP.drop_console == 'boolean' ? APP.drop_console : true
          }
        }
      }),
      new OptimizeCSSAssetsPlugin(),
    ],
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        common: {
          name: 'common',
          test: /\.css$/,
          chunks: 'all',
          enforce: true,
        },
      }
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      IS_DEV: 'false'
    })
  ]
}

function proxyLiteralReplace() {
  return {
    visitor: {
      Literal(path) {
        if (path.node.value) {
          for (const key in APP.proxy) {
            let proxy = APP.proxy[key];
            let pattern = new RegExp(`^${key}`);
            if (pattern.test(path.node.value)) {
              if (proxy.pathRewrite instanceof Object) {
                for (const key in proxy.pathRewrite) {
                  let pattern = new RegExp(`^${key}`);
                  path.node.value = path.node.value.replace(pattern, proxy.pathRewrite[key]);
                }
              }
              if (proxy.prod) {
                path.node.value += proxy.prod
              } else {
                path.node.value += proxy.target
              }
            }
          }
        }
      }
    }
  };
}
// 是否启动打包分析
if (process.env.npm_lifecycle_event == 'analys') {
  webpackConfig.plugins.push(
    new BundleAnalyzerPlugin()
  )
}
module.exports = merge(webpackBase, webpackConfig)