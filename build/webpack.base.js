const htmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const projectConfig = require('../app.js');
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
        test: require.resolve('pxloader'),
        use: {
          loader: 'expose-loader',
          options: 'PxLoader'
        }
      },
      {
        test: require.resolve('jquery'),
        use: [{
          loader: 'expose-loader',
          options: 'jquery',
        },
        {
          loader: 'expose-loader',
          options: '$',
        }]
      },
      {
        test: /\.(png|jpg|gif|jpeg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              // 打包输出目录
              outputPath: 'images',
              // 打包输出图片名称
              name: '[name]-[hash:4].[ext]'
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
  },
  optimization: {
    minimizer: [
      new TerserJSPlugin({}),
      new OptimizeCSSAssetsPlugin({}),
    ],
    splitChunks: { chunks: "all" }
  }
}
if (typeof projectConfig === 'object' && typeof projectConfig.pages === 'object') {
  projectConfig.pages.map(page => {
    webpackConfig.entry[page.name] = `./src/${page.entry}`;
    webpackConfig.plugins.push(new htmlWebpackPlugin({
      template: './src/' + page.html,
      filename: page.name + '.html',
      chunks: [page.name]
    }))
  })
}
if (process.env.npm_lifecycle_event !== 'server') {
  webpackConfig.plugins.push(new CleanWebpackPlugin({}))
}
module.exports = webpackConfig