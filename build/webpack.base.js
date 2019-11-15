const htmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const projectConfig = require('../project.config');
let WebpackPlugin = [
  new MiniCssExtractPlugin({
    filename: 'css/[name].css',
    chunkFilename: 'css/[id].css'
  })
]
if (typeof projectConfig === 'object') {
  if (typeof projectConfig.pages === 'object') {
    let pages = projectConfig.pages
    for (const key in pages) {
      if (pages.hasOwnProperty(key)) {
        const element = pages[key];
        WebpackPlugin.unshift(new htmlWebpackPlugin({
          chunksSortMode: 'dependency',
          ...element,
          filename: (element.template.match(/([^/?#]+)$/i) || ['', ''])[1],
        }))
      }
    }
  }
}
if (process.env.npm_lifecycle_event !== 'server') {
  WebpackPlugin.push(new CleanWebpackPlugin({}))
} else {

}
module.exports = {
  optimization: {
    minimizer: [
      new TerserJSPlugin({}),
      new OptimizeCSSAssetsPlugin({}),
    ]
  },
  entry: {
    index: './src/index.js',
    screen: './src/screen.js'
  },
  output: {
    filename: 'js/[name].[contenthash:4].js',
  },
  plugins: WebpackPlugin,
  resolve: {
    modules: ['../src/js/base', 'node_modules'],
  },
  module: {
    noParse: /jquery|pxloader|jquery.transit/,
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
          options: 'jQuery'
        }, {
          loader: 'expose-loader',
          options: '$'
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
  }
}