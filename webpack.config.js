const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const fs = require('fs');
const entryies = require('./config/getEntry');

const appSrc = path.resolve(fs.realpathSync(process.cwd()), 'src')

// console.log('入口文件路径', entryies)

// console.log('文件路径', appSrc)

module.exports = {
  // 模块的入口文件
  entry: entryies,
  output: {
    // 输出文件的名称
    // filename: 'my-lib.js',
    // 输出文件的存放目录
    path: path.resolve(__dirname, 'lib'),
    publicPath: '/',
    filename: (pathData) => {
      return pathData.chunk.name === 'index' ? '[name].js' : 'components/[name]/index.js';
    },
    chunkFilename: (pathData) => {
      return pathData.chunk.name === 'index' ? '[name].js' : 'components/[name]/index.js';
    },
    devtoolModuleFilenameTemplate: info => path.relative(appSrc, info.absoluteResourcePath).replace(/\\/g, '/'),
    // 输出的代码符合 CommonJS 模块化规范，以供给其它模块导入使用。
    // libraryTarget: 'commonjs2',
    libraryTarget: 'umd',  //用到的模块定义规范
    library: 'myLib',   //库的名字
    // libraryExport: 'default' //default导出整体，默认导出一个对象
  },
  // 通过正则命中所有以 react 或者 babel-runtime 开头的模块
  // 这些模块使用外部的，不能被打包进输出的代码里
  externals: /^(react|babel-runtime)/,
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        // 排除 node_modules 目录下的文件
        // node_modules 目录下的文件都是采用的 ES5 语法，没必要再通过 Babel 去转换
        exclude: path.resolve(__dirname, 'node_modules'),
      },
      {
        // 增加对 CSS 文件的支持
        test: /\.css/,
        // 提取出 Chunk 中的 CSS 代码到单独的文件中
        use: ExtractTextPlugin.extract({
          use: ['css-loader']
        }),
      },
    ]
  },
  plugins: [
    // new MiniCssExtractPlugin({
    //   // Options similar to the same options in webpackOptions.output
    //   // both options are optional
    //   filename: (chunkData) => {
    //     return chunkData.chunk.name === 'index' ? 'lib/[name].css': 'lib/components/[name]/index.css';
    //   },
    //   chunkFilename: 'static/css/[name].chunk.css',
    // }),
    new ExtractTextPlugin({
      // 输出的 CSS 文件名称
      filename: 'index.css',
    }),
  ],
  // 输出 Source Map
  devtool: false,
};
