const htmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const APP = require('../app.js');
const path = require('path');
const projectPath = path.resolve(__dirname, '../src');
function costome(babel) {
  return {
    visitor: {
      ExpressionStatement(path) {
        let expression = path.node.expression
        if(expression.callee){
          let object = expression.callee.object;
          let property = expression.callee.property;
          if(object && property){
            if(object.name == '$' || object.name == 'jquery'){
              if(/(ajax|post|get)/.test(property.name)){
                let myarguments = expression.arguments
                if(myarguments[0].type == 'StringLiteral'){
                  console.log(myarguments[0].value)
                }else if(myarguments[0].type == 'ObjectExpression'){
                  myarguments[0].properties.forEach(element => {
                    if(element.key.name == 'url'){
                      console.log(element.value.value)
                    }
                  });
                }
              }
            }
          }
        }
      }
    }
  };
}
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
            plugins: ['@babel/plugin-transform-runtime', costome],
            // plugins: ['@babel/plugin-transform-runtime']
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
// 是否需要删除dist目录
if (process.env.npm_lifecycle_event !== 'server') {
  webpackConfig.plugins.push(new CleanWebpackPlugin({}))
}
module.exports = webpackConfig