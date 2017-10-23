const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: 'index.html',
  inject: 'body'
})
const APP_DIR = path.resolve(__dirname, './src/index.js');
const BUILD_DIR = path.resolve(__dirname, './public/dist/');

module.exports = {
     entry: APP_DIR,
     output: {
         path: BUILD_DIR,
         filename: 'js/app.bundle.js'
     },
    module: {
      loaders: [
        { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
        { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ }
      ]
    },
    devServer: {
      contentBase: './public/dist'
    },
    plugins: [HtmlWebpackPluginConfig]
 };