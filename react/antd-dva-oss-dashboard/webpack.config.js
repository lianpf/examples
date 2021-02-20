
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function (webpackConfig, env) {
  webpackConfig.babel.plugins.push('transform-runtime');
  webpackConfig.babel.plugins.push(['import', {
    libraryName: 'antd',
    style: true,
  }]);

  webpackConfig.output = {
    path: __dirname + '/dist/',
    filename: 'app-[chunkhash].js'
  }

  //自动生成html文件, js,css后加上hash值
  webpackConfig.module.loaders.push(
    { test: /\.hbs$/, loader: "handlebars-loader" }
  );

  webpackConfig.plugins.push(
    new htmlWebpackPlugin({
      hash: true,
      title: '洋葱后台',
      template: 'public/index.hbs',
      inject: true
    })
  );

  // Support hmr
  if (env === 'development') {
    webpackConfig.devtool = '#eval';
    webpackConfig.babel.plugins.push(['dva-hmr', {
      entries: [
        './src/index.js',
      ],
    }]);
  } else {
    webpackConfig.babel.plugins.push('dev-expression');
  }

  // Support CSS Modules
  // Parse all less files as css module.
  webpackConfig.module.loaders.forEach(function(loader, index) {
    if (typeof loader.test === 'function' && loader.test.toString().indexOf('\\.less$') > -1) {
      loader.include = /node_modules/;
      loader.test = /\.less$/;
    }
    if (loader.test.toString() === '/\\.module\\.less$/') {
      loader.exclude = /node_modules/;
      loader.test = /\.less$/;
    }
    if (typeof loader.test === 'function' && loader.test.toString().indexOf('\\.css$') > -1) {
      loader.include = /node_modules/;
      loader.test = /\.css$/;
    }
    if (loader.test.toString() === '/\\.module\\.css$/') {
      loader.exclude = /node_modules/;
      loader.test = /\.css$/;
    }

  });

  return webpackConfig;
};
