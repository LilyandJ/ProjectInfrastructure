'use strict'

const path = require('path')
const utils = require('../build/utils')

module.exports = {
  projectPath: utils.resolve('/'), // 项目根目录
  srcPath: utils.resolve('/src/'), // 源文件目录
  node_modulesPath: utils.resolve('/node_modules/'), // node_modules目录

  htmlPath: utils.resolve('/src/'), // HTML目录
  jsPath: utils.resolve('/src/main/'), // JS目录

  ignoreJs: ['test'], // 没有入口js文件的html名
  assetsSubDirectory: utils.resolve('/src/static/'), // 静态资源目录(不处理的第三方代码)
  build: {
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsSubDirectory: 'static',
    prodSourceMap: false, // 是否开启SourcMap
    devtool: 'source-map',
    assetsRoot: path.resolve(__dirname, '../dist'), // 构建根目录
    assetsPublicPath: '/', // 相对于服务器根目录的路径，用于加载构建好的资源。
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    host: 'localhost',
    port: 8088,
    autoOpenBrowser: false,
    useEslint: false, // 是否使用ESlint
    showEslintErrorsInOverlay: true, // 设置为true，ESlint-loader将始终返回警告。

    devSourceMap: false, // 是否开启SourceMap
    devtool: 'eval-source-map',

    assetsPublicPath: '/', // 相对于服务器根目录的路径，用于加载资源。
    assetsSubDirectory: 'static',
    proxyTable: {},
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
