//首先引入插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin');

const path = require('path');
const rootPath = path.resolve(__dirname, '..');
const isDev = process.env.NODE_ENV === 'development';
const config = require('../config/index')[isDev ? 'dev' : 'build'];

//  热更新 —— 不刷新整体页面
// if(module && module.hot) {
//     module.hot.accept()
// }

//webpack.config.js
module.exports = {
    // webpack的默认配置 —— 单入口
    // entry: './src/index.js', 
    entry: {
        index: './src/index'
    }, 
    mode: isDev ? 'development' : 'production',
    output: {
        path: path.resolve(rootPath, 'dist'), //必须是绝对路径
        // 考虑到CDN缓存的问题，我们一般会给文件名加上 hash.
        // hash 串太长的话，还可以指定长度，例如 bundle.[hash:6].js
        // filename: 'bundle.[hash].js',
        filename: '[name].bundle.[hash:6].js'
        // publicPath: '/' //通常是CDN地址
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: ['babel-loader'],
                exclude: /node_modules/ // 排除 node_modules 目录
            },
            {
                test: /\.(le|c)ss$/,
                use: [
                    //替换之前的 style-loader
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: isDev,
                            reloadAll: true
                            // publicPath: path.resolve(__dirname, 'dist/css')
                        }
                    },
                    'css-loader', 
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: function () {
                                return [
                                    // require('autoprefixer')({
                                    //     "overrideBrowserslist": [
                                    //         ">0.25%",
                                    //         "not dead"
                                    //     ]
                                    // })
                                    // require('autoprefixer')({
                                    //     "overrideBrowserslist": [
                                    //         "defaults"
                                    //     ]
                                    // })
                                    require('autoprefixer')()
                                ]
                            }
                        }
                    }, 'less-loader'
                ],
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|jpeg|webp|svg|eot|ttf|woff|woff2)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10240, // 10K
                            esModule: false,
                            outputPath: 'assets', // 配置图片资源输出文件夹
                            name: '[name]_[hash:6].[ext]' // 设置图片名 + MD5 哈希值
                        }
                    }
                ],
                exclude: /node_modules/
            }
            // {
            //     test: /.html$/,
            //     use: 'html-withimg-loader'
            // }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html', //打包后的文件名
            chunks: ['index']
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin([
            {
                from: './public/js/*.js',
                to: path.resolve(rootPath, 'dist', 'js'),
                flatten: true
                // ignore: [] // 这里也可以单独配置
            }],
            //可以查阅文档, 继续配置其它要拷贝的文件
            {
                ignore: ['other.js'] //忽略掉 js 目录下的 other.js 
            }
        ),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[hash:6].css', // 输出路径
            chunkFilename: 'css/[id].css'
        }),
        new OptimizeCssPlugin()
    ],
    optimization: {
        splitChunks: {//分割代码块
            cacheGroups: {
                vendor: {
                    //第三方依赖
                    priority: 1, //设置优先级，首先抽离第三方模块
                    name: 'vendor',
                    test: /node_modules/,
                    chunks: 'initial',
                    minSize: 0,
                    minChunks: 1 //最少引入了1次
                },
                //缓存组
                common: {
                    //公共模块
                    chunks: 'initial',
                    name: 'common',
                    minSize: 100, //大小超过100个字节
                    minChunks: 3 //最少引入了3次
                }
            }
        },
        runtimeChunk: {
            name: 'mainifest'
        }
    }
}
