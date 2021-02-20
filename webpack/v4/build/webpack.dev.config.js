const webpack = require('webpack');
const merge = require('webpack-merge');
let webpackBaseConfig = require('./webpack.base.config.js');
const path = require('path');
const rootPath = path.resolve(__dirname, '..');

//  热更新 —— 不刷新整体页面
// if(module && module.hot) {
//     module.hot.accept()
// }

//webpack.config.js
module.exports = merge(webpackBaseConfig, {
    devtool: 'cheap-module-eval-source-map', // 开发环境下使用，将编译后的代码映射回原始源代码
    plugins: [
        new webpack.DefinePlugin({
            DEV: JSON.stringify('dev'), //字符串
            FLAG: 'true' //FLAG 是个布尔类型
        })
        // new webpack.DllReferencePlugin({
        //     manifest: require(path.resolve(rootPath, 'dist', 'dll', 'manifest.json'))
        // })
    ],
    devServer: {
        // 代理解决跨域
        // proxy: {
        //     '/api': {
        //         target: 'http://localhost:4000',
        //         pathRewrite: {
        //             '/api': ''
        //         }
        //     }
        // },
        contentBase: path.resolve(rootPath, 'dist'),
        port: '3000', //默认是8080
        // hot: true, // 热更新
        quiet: false, //默认不启用
        inline: true, //默认开启 inline 模式，如果设置为false,开启 iframe 模式
        stats: "errors-only", //终端仅打印 error
        overlay: false, //默认不启用
        clientLogLevel: "silent", //日志等级
        compress: true //是否启用 gzip 压缩
    }
})
