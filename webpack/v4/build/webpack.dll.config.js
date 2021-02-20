//webpack.config.dll.js
// 将不会频繁更新的库进行编译 bundles，单独打包成一个动态链接库，引入
const webpack = require('webpack');
const path = require('path');
const rootPath = path.resolve(__dirname, '..');

module.exports = {
    entry: {
        react: ['react', 'react-dom']
    },
    mode: 'production',
    output: {
        filename: '[name].dll.[hash:6].js',
        path: path.resolve(rootPath, 'dist', 'dll'),
        library: '[name]_dll' //暴露给外部使用
        //libraryTarget 指定如何暴露内容，缺省时就是 var
    },
    plugins: [
        new webpack.DllPlugin({
            //name和library一致
            name: '[name]_dll', 
            path: path.resolve(rootPath, 'dist', 'dll', 'manifest.json') //manifest.json的生成路径
        })
    ]
}
