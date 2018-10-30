// 基础配置文件，包含了不同环境通用配置
const path = require('path')
// const fs = require('fs')
const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin') // html-webpack-plugin  用于生成html
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const config = require('../config')
// const vueLoaderConfig = require('./vue-loader.conf')
const utils = require('./utils')
const customConf = require('../config/app.config')
const buildEntries = require('./build-entries')
const HtmlWebpackPlugins = [] // 保存HTMLWebpackPlugin实例
const pages = ((globalPath) => {
  const htmlFiles = {}
  let pageName

  glob.sync(globalPath).forEach((pagePath) => {
    var basename = path.basename(pagePath, path.extname(pagePath))
    pageName = basename
    htmlFiles[pageName] = {}
    htmlFiles[pageName]['chunk'] = basename
    htmlFiles[pageName]['path'] = pagePath
  })
  return htmlFiles
})(utils.resolve('src') + `/${customConf.currentProject}/**/*.html`)
for (const entryName in pages) {
  const conf = {
    // 生成出来的html文件名
    filename: customConf.realProject + '/' + entryName + '.html',
    cdnLink: customConf.cdnLink,
    // 每个html的模版，这里多个页面使用同一个模版
    template: pages[entryName]['path'],
    // 自动将引用插入html
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true
      // more options:
      // https://github.com/kangax/html-minifier#options-quick-reference
    },
    chunks: ['vendor', 'manifest', pages[entryName]['chunk']],
    // necessary to consistently work with multiple chunks via CommonsChunkPlugin
    chunksSortMode: 'dependency'
  }
  /* 入口文件对应html文件（配置多个，一个页面对应一个入口，通过chunks对应） */
  HtmlWebpackPlugins.push(new HtmlWebpackPlugin(conf))
}

const ESLintRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre', // loader种类，pre / post
  // include: [config.srcPath], // 检测的目录
  include: [config.srcPath],
  options: {
    formatter: require('eslint-friendly-formatter'), // 错误信息显示在终端上
    // 如果option设置为true，Loader将始终返回警告。如果您正在使用热模块更换，您可能希望在开发中启用此功能，否则在出现夹板错误时将跳过更新。
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
})

module.exports = {
  // context: config.projectPath, // 入口、插件路径会基于context查找
  entry: buildEntries,
  resolve: {
    extensions: ['.js', '.vue', '.css', '.json'], // 自动补全的扩展名
    alias: { // 省略路径
      '@': utils.resolve('src'),
      'common': utils.resolve('src/common'),
      'components': utils.resolve('src/components'),
      'api': utils.resolve('src/api')
    }
  },
  module: { // 处理字体，生成图片，JS babel
    rules: [
      ...(config.dev.useEslint ? [ESLintRule()] : []),
      {
        test: /\.vue$/,
        loader: 'vue-loader'
        // options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        include: [config.srcPath], // 在源文件目录查询
        exclude: [config.assetsSubDirectory],
        use: [
          { loader: 'babel-loader' }
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        include: [config.srcPath], // 在源文件目录查询
        exclude: [config.assetsSubDirectory], // 忽略第三方的任何代码
        use: [{ // 导入字体文件，并最打包到output.path+ options.name对应的路径中
          loader: 'url-loader',
          options: {
            limit: 8192,
            name: 'fonts/[name].[hash:7].[ext]',
            fallback: 'file-loader'
          }
        }]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        include: [config.srcPath], // 在源文件目录查询
        // exclude: [config.assetsSubDirectory],    // 忽略第三方的任何代码
        use: [{ // 图片文件小于8k时编译成dataUrl直接嵌入页面，超过8k回退使用file-loader
          loader: 'url-loader',
          options: {
            limit: 8192, // 8k
            name: 'images/[name].[hash:7].[ext]', // 回退使用file-loader时的名称
            fallback: 'file-loader' // 当超过8192byte时，会回退使用file-loader
          }
        }]
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: 'media/[name].[hash:7].[ext]',
          fallback: 'file-loader'
        }
      }
    ]
  },
  plugins: [ // 生成HTML文件
    new VueLoaderPlugin(),
    ...HtmlWebpackPlugins // 扩展运算符生成所有HTMLPlugins
  ]
}
