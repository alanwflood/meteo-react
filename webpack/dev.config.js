const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./base.config.js');

module.exports = merge(baseConfig, {
  devtool: 'eval-source-map',

  devServer: {
    port: '8001',
    inline: true,
    historyApiFallback: true,
    open: true,
    overlay: {
      errors: true
    },
    contentBase: path.join(__dirname, '../src')
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ]
      },
      {
        test: /\.styl$/,
        use: [
          'style-loader',
          'css-loader',
          'stylus-loader'
        ]
      }
    ]
  }
});
