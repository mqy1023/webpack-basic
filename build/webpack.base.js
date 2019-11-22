const htmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const APP = require('../app.js');
const path = require('path')
let webpackConfig = {
  entry: {},
  output: { filename: 'js/[name].[contenthash:4].js' },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: 'css/[id].css'
    })
  ],
  resolve: {
    modules: ['../src/js/base', 'node_modules'],
    alias: { '@': path.resolve(__dirname, '../src') }
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|jpeg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              // 超过5KB打包成图片
              limit: APP.image.limit || 5 * 1024,
              // 打包输出目录
              outputPath: APP.image.outputPath || 'images',
              // 打包输出图片名称
              name: '[name]-[hash:4].[ext]',
              // 文件路径
              publicPath: APP.image.publicPath || ''
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [{
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: '../',
          }
        }, 'css-loader', 'postcss-loader']
      },
      {
        test: /\.scss$/,
        use: [{
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: '../',
          }
        }, 'css-loader', 'postcss-loader', 'sass-loader']
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime']
          }
        }
      },
      {
        test: /\.(html)$/i,
        loader: 'html-withimg-loader'
      }
    ]
  }
}
if (typeof APP === 'object') {
  // 遍历配置page
  if (Array.isArray(APP.pages)) {
    APP.pages.map(page => {
      webpackConfig.entry[page.name] = `./src/${page.entry}`;
      webpackConfig.plugins.push(new htmlWebpackPlugin({
        template: './src/' + page.html,
        filename: page.name + '.html',
        chunks: [page.name]
      }))
    })
  }
  // 配置全局第三方模块
  if (Array.isArray(APP.expose)) {
    APP.expose.map(node => {
      webpackConfig.module.rules.push({
        test: require.resolve(node.module_name),
        use: node.name.map(name => {
          return { loader: 'expose-loader', options: name }
        })
      })
    })
  }
}
// 是否需要删除dist目录
if (process.env.npm_lifecycle_event !== 'server') {
  webpackConfig.plugins.push(new CleanWebpackPlugin({}))
}
module.exports = webpackConfig