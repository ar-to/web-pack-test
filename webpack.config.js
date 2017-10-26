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
      rules: [
        { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
        { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
        { test: /\.css$/, use: [ {loader: 'style-loader'}, {loader:'css-loader'} ] },
        { test: /\.(png|jpg|gif)$/, use: [ { loader: 'file-loader' }]},
        { test: /\.(png|jpg|gif)$/, use: [ { loader: 'url-loader', options: { limit: 10000 } }]}
      ]
    },
    devServer: {
      contentBase: './public/dist'
    },
    plugins: [HtmlWebpackPluginConfig]
 };