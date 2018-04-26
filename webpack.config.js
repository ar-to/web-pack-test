const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: 'index.html',
  inject: 'body'
});
const CopyWebpackPluginConfig = new CopyWebpackPlugin([
  { from: './bower_components/shufflejs/dist/shuffle.min.js', to: 'js/' },
  { from: './bower_components/bootstrap/dist/css/bootstrap.min.css', to: 'css/' }
], { debug: 'info' });

const APP_DIR = path.resolve(__dirname, './src/index.js');
const SHUFFLE_DIR = path.resolve(__dirname, './bower_components/shufflejs/dist/shuffle.min.js');
const BUILD_DIR = path.resolve(__dirname, './public/dist/');

module.exports = {
     entry: {
       app: APP_DIR,
      //  shuffle: SHUFFLE_DIR
     },
     output: {
         path: BUILD_DIR,
         filename: 'js/[name].js'
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
    plugins: [
      HtmlWebpackPluginConfig,
      CopyWebpackPluginConfig
    ]
 };