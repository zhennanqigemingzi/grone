const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const cssExtra = new ExtractTextWebpackPlugin({
    filename:'css/css.css',
})
const sassExtra = new ExtractTextWebpackPlugin({
    filename:'css/sass.css',
})
const VueLoaderPlugin = require('vue-loader/lib/plugin')
console.log(111111111)
if(process.env.NODE_ENV === 'development'){
    console.log('dev')
}else if(process.env.NODE_ENV === 'production'){
    console.log('pro')
}

module.exports = {
  entry: ["@babel/polyfill",path.resolve(__dirname,'../src/main.js')], //配置入口文件
  output: {
      filename: 'js/[name].[hash:8].js',
      path: path.resolve(__dirname,'../dist'), //打包后的目录
  },
  module:{
    rules: [
        {
            test:/\.css$/,
            use:cssExtra.extract({
                fallback:'style-loader',
                use:['css-loader','postcss-loader'],
                publicPath:'../'
            })
        },
        {
            test:/\.scss$/,
            use:sassExtra.extract({
                fallback:'style-loader',
                use:[
                    {
                        loader:'css-loader'
                    },
                    {
                        loader:'postcss-loader',
                    },
                    {
                        loader: 'sass-loader'
                    },
                ],
                publicPath:'../'
            })
        },
        {
            test:/\.(jpe?g|png|gif)$/i,//图片处理
            use:[
                {
                    loader: 'url-loader',
                    options:{
                        limit: 10240,
                        fallback: {
                            loader:'file-loader',
                            options: {
                                name: 'images/[name].[hash:8].[ext]',
                            }
                        }
                    }
                }
            ],
            exclude: /node_modules/
        },
        {
            test:/\.(mp4|webm|ogg|mp3|wav|flac|acc)(\?.*)?$/,//媒体文件
            use:[
                {
                    loader:'url-loader',
                    options:{
                        limit: 10240,
                        fallback: {
                            loader: 'file-loader',
                            options:{
                                name: 'media/[name].[hash:8].[ext]'
                            }
                        }
                    }
                }
            ],
            exclude: /node_modules/
        },
        {
            test:/\.(woff2?|eot|ttf|otf)(\?.*)?$/i,//字体
            use: [
                {
                  loader: 'url-loader',
                  options: {
                    limit: 10240,
                    fallback: {
                      loader: 'file-loader',
                      options: {
                        name: 'fonts/[name].[hash:8].[ext]'
                      }
                    }
                  }
                }
            ],
            exclude: /node_modules/
        },
        {
            test:/\.js$/,
            use:{
                loader: 'babel-loader',
                options: {
                    presets:['@babel/preset-env']
                }
            },
            exclude: /node_modules/
        },
        {
            test:/\.vue$/,
            loader: 'vue-loader',
            include: /src/,
            options:{
                loader: {
                    js: 'babel-loader',
                    css: 'vue-style-loader!css-loader!postcss-loader',
                    scss: 'vue-style-loader!css-loader!postcss-loader!sass-loader',
                    less: 'vue-style-loader!css-loader!postcss-loader!less-loader',  
                }
            },
            exclude: /node_modules/
        }
    ]
  },
  resolve:{
    alias: {
        'vue$':'vue/dist/vue.runtime.esm.js',
        ' @': path.resolve(__dirname,'../src')
    },
    extensions: ['*','.js','.json','.vue']
  },
  
  plugins:[
      new HtmlWebpackPlugin({
          template: path.resolve(__dirname,'../public/index.html'),
          filename:'index.html',
          chunks:['main']
      }),
      new CleanWebpackPlugin(),
      cssExtra,
      sassExtra,
      new VueLoaderPlugin(),
      
  ]
}