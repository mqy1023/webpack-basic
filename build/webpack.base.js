const htmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const APP = require('../app.js');
const path = require('path');
const projectPath = path.resolve(__dirname, '../src');
let babelLoaderPlugin = ['@babel/plugin-transform-runtime'];
// hash配置
if (!APP.hash) {
  APP.hash = '-[contenthash:4]'
}else if(APP.hash == 'none'){
  APP.hash = ''
}
let webpackConfig = {
  entry: {},
  output: { filename: `js/[name]${APP.hash}.js` },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `css/[name]${APP.hash}.css`,
      chunkFilename: `css/[name]-[id]${APP.hash}.css`
    })
  ],
  resolve: {
    modules: ['../src/js', 'node_modules'],
    alias: { '@': projectPath }
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|jpeg)$/,
        include: projectPath,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: APP.image.limit || 5 * 1024,
              outputPath: APP.image.outputPath || 'images',
              name: `[name]${APP.hash}.[ext]`,
              publicPath: APP.image.publicPath || ''
            }
          }
        ]
      },
      {
        test: /\.css$/,
        include: projectPath,
        use: [{
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: '../',
          }
        }, 'css-loader', 'postcss-loader']
      },
      {
        test: /\.scss$/,
        include: projectPath,
        use: [{
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: '../',
          }
        }, 'css-loader', 'postcss-loader', 'sass-loader']
      },
      {
        test: /\.m?js$/,
        include: projectPath,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: babelLoaderPlugin,
          }
        }
      },
      {
        test: /\.(html)$/i,
        include: projectPath,
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
// 是否是打包构建
if (process.env.npm_lifecycle_event !== 'server') {
  // 需要删除dist目录
  webpackConfig.plugins.push(new CleanWebpackPlugin({}));
  // 添加domain拼接插件
  babelLoaderPlugin.push(proxyLiteralReplace)
}
function proxyLiteralReplace() {
  return {
    visitor: {
      Literal(path) {
        if (path.node.value) {
          for (const key in APP.proxy) {
            let proxy = APP.proxy[key];
            if (new RegExp(`^${key}`).test(path.node.value)) {
              if (proxy.pathRewrite instanceof Object) {
                for (const expression in proxy.pathRewrite) {
                  let pattern = new RegExp(`^${expression}`);
                  path.node.value = path.node.value.replace(pattern, proxy.pathRewrite[expression]);
                }
              }
              path.node.value = (proxy.prod ? proxy.prod : proxy.target) + path.node.value
            }
          }
        }
      }
    }
  };
}
module.exports = webpackConfig