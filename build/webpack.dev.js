const Webpack = require('webpack');
const webpackBase = require('./webpack.base')
const WebpackMerge = require('webpack-merge')
const path = require('path')

module.exports = WebpackMerge(webpackBase,{
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    devServer:{
        port: 8088,
        host:'localhost',
        hot: true,
        contentBase: path.resolve(__dirname,'../dist'),
        inline: true,
    },
    plugins:[
        new Webpack.HotModuleReplacementPlugin()
    ],
})