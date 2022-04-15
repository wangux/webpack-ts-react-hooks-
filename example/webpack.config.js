/*
 * @Author: your name
 * @Date: 2021-11-05 13:17:54
 * @LastEditTime: 2021-11-08 15:08:03
 * @LastEditors: czx
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \test\webpack.config.js
 */
const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    // JavaScript 执行入口文件
    // entry: './main.js',
    entry: {
        index: ['./src/main'],
    },
    devtool: 'inline-source-map',
    output: {
        // 把所有依赖的模块合并输出到一个 bundle.js 文件
        filename: 'bundle.js',
        // 输出文件都放到 dist 目录下
        path: path.resolve(__dirname, './dist'),
        // library: { //输出一个库，为你的入口做导出的一些配置
        //     name: 'MyLibrary',
        //     type: 'commonjs2'
        // }
    },
    optimization: {
        minimize: true,
        minimizer: [
            // 在 webpack@5 中，你可以使用 `...` 语法来扩展现有的 minimizer（即 `terser-webpack-plugin`），将下一行取消注释
            // `...`,
            new CssMinimizerPlugin(),
        ],
    },
    devServer: {
        static: {
            directory: path.join(__dirname, './dist'),
        },
        compress: true,
        port: 9000,
        hot: true,
    },
    resolve: {
        // 先尝试 ts，tsx 后缀的 TypeScript 源码文件
        extensions: ['.ts', '.tsx', '.js']
    },
    module: {
        // rules: [
        //     {
        //         // 用正则去匹配要用该 loader 转换的 CSS 文件
        //         test: /\.css$/,
        //         // use: ['style-loader', 'css-loader?minimize'],
        //     }
        // ]
        rules: [
            {
                test: /\.tsx?$/,
                use : [
                    {
                    loader : 'babel-loader',
                    },
                    {
                    loader: 'awesome-typescript-loader'
                    },
                    {
                        loader: path.join(__dirname, './loaders/index'),
                    }
                ],
                // 排除 node_modules 目录下的文件
                // node_modules 目录下的文件都是采用的 ES5 语法，没必要再通过 Babel 去转换
                exclude: path.resolve(__dirname, 'node_modules'),
            },
            {
                test: /\.css$/,
                use: [
                    // [style-loader](/loaders/style-loader)
                    // { loader: 'style-loader' },
                    { loader: MiniCssExtractPlugin.loader },
                    // [css-loader](/loaders/css-loader)
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true
                        }
                    },
                    // [sass-loader](/loaders/sass-loader)
                    // { loader: 'sass-loader' }
                ]
            }
        ]
    },
    plugins: [
        new webpack.ProgressPlugin(),
        new HtmlWebpackPlugin({
            title: 'Custom template',
            // Load a custom template (lodash by default)
            template: 'index.html'
        }),
        new MiniCssExtractPlugin({
            filename     : '[id]-[contenthash].css',
            chunkFilename: '[id]-[contenthash].chunk.css',
            ignoreOrder: true,
        })
    ]
};