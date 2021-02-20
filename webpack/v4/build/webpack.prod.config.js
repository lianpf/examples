const webpack = require('webpack');
const merge = require('webpack-merge');
let webpackBaseConfig = require('./webpack.base.config.js');

const path = require('path');
const rootPath = path.resolve(__dirname, '..');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const smp = new SpeedMeasurePlugin();

const webpackProdConfig = merge(webpackBaseConfig, {
    /**
        * 剥离了那些不需要改动的依赖模块
        * 防止将某些 import 的包(package)打包到 bundle 中，而是在运行时(runtime)再去从外部获取这些扩展依赖(external dependencies)
        * */
    externals: {
        'react': 'react',
        'react-dom': 'react-dom',
        'react-redux': 'react-redux',
    },
    plugins: [
        // 定义环境变量, 区分是开发环境, 还是生产环境
        new webpack.DefinePlugin({
            DEV: JSON.stringify('prod'), //字符串
            FLAG: 'true' //FLAG 是个布尔类型
        }),
        // 清除dist文件夹 不需要传参数喔，它可以找到 outputPath, 设置后就不需要每次build的 时候执行 npm run clear 
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ['**/*', '!dll', '!dll/**']
        }),
        // 静态资源拷贝
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
        // 抛出全局变量 —— webpack 内置模块，记得配置 .eslint 文件
        // new webpack.ProvidePlugin({
        //     React: 'react',
        //     Component: ['react', 'Component'],
        //     Vue: ['vue/dist/vue.esm.js', 'default'],
        //     $: 'jquery',
        //     _map: ['lodash', 'map']
        // })
        new MiniCssExtractPlugin({
            filename: 'css/[name].[hash:6].css', // 输出路径
            chunkFilename: 'css/[id].css'
            //个人习惯将css文件放在单独目录下
            //publicPath:'../'   //如果你的output的publicPath配置的是 './' 这种相对路径，那么如果将css文件放在单独目录下，记得在这里指定一下publicPath 
        }),
        // 将抽离出来的css文件进行压缩
        new OptimizeCssPlugin(),
        // new webpack.HotModuleReplacementPlugin() //热更新插件
        // 为模块提供中间缓存,首次构建时间没有太大变化，但是第二次开始，构建时间大约可以节约 80%
        new HardSourceWebpackPlugin()
        // 分析包
        // new BundleAnalyzerPlugin()
    ]
})

//webpack.prod.config.js
module.exports = smp.wrap(webpackProdConfig)
