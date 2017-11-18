const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: {
    app: [path.join(__dirname, '../src/index.js')]
  },

  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader']
      },
    ]
  },

  plugins: [
    new webpack.EnvironmentPlugin([
      'NODE_ENV',
    ]),
    new HTMLWebpackPlugin({
      template: path.join(__dirname, '../src/index.html')
    }),
  ],

  resolve: {
    extensions: ['.js', '.jsx']
  }
};
