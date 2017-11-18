const webpack = require('webpack');
const path= require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const baseConfig = require('./base.config.js');

module.exports = merge(baseConfig, {
  output: {
    path: path.join(__dirname, '../dist'),
    publicPath: '/',
    filename: '[name].bundle.[chunkhash].js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: [
            'css-loader',
          ]
        })
      },
      {
        test: /\.styl$/,
        use: ExtractTextPlugin.extract({
          use: [
            'css-loader',
            'stylus-loader'
          ]
        })
      }
    ]
  },

  plugins: [
    // Extract imported CSS into own file
    new ExtractTextPlugin('[name].bundle.[chunkhash].css'),
    // Minify JS
    new UglifyJsPlugin({
      sourceMap: false,
      compress: true
    }),
    // Minify CSS
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
  ],
});
