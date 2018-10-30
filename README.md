
# 多页面Webpack4脚手架

## 项目构成
<pre>
├── build                        // webpack配置目录
│   ├── build-entries.js     		 // 入口文件
│   ├── utils.js     		         // 工具文件
│   ├── webpack.config.base.js   // 基础构建
│   ├── webpack.config.dev.js    // 开发模式构建
│   ├── webpack.config.prod.js   // 生产模式构建
├── config               		       // 配置目录
├── dist               		       // 生产目录
├── src                		       // 开发目录
│   ├── common                   // 公共文件
│   ├── components               // 公共组件      
│   ├── components               // 工程目录
│   │   ├── xxx                  // 子工程
├── static                		    // 静态目录
├── .babelrc                		 // babel配置
├── .editorconfig                // editorconfig配置
├── .eslintignore                // eslint排除的检测范围
├── .eslintrc.js                 // eslint配置
├── postcss.config.js            // postcss配置
</pre>

## 技术栈
+ Webpack4：现代 JavaScript 应用程序的静态模块打包器  (自动化构建工具)
+ editorconfig：编辑器样式风格的统一配置             (统一代码风格工具)
+ eslint：JavaScript和JSX检查工具                  (TS/ES代码语法检测)
+ babel：JavaScript 语法转换器                     (TS/ES代码转换器)
+ postcss: 使用JavaScript转换CSS的工具              (CSS预处理平台)
+ 支持各种CSS扩展语言的转化及压缩：css、less、sass、stylus
+ 支持各种格式文件的预处理以及压缩：文字类、图片类、影音类
+ 之后还会加入: 单元测试、端对端测试、...

## 使用说明
> 需要NodeJS环境、git环境，
> 我所使用的版本：node v10.1.0 npm 6.3.0

2. npm run dev 开始开发

4. npm run build 构建dist生产目录

5. npm run dev   构建热更新服务

6. 开始进行开发
