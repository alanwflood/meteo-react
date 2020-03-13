const path = require("path");
const merge = require("webpack-merge");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const baseConfig = require("./base.config.js");

module.exports = merge(baseConfig, {
  output: {
    path: path.join(__dirname, "../dist"),
    publicPath: "/",
    filename: "[name].bundle.[chunkhash].js"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      },
      {
        test: /\.styl$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "stylus-loader"]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[hash].css",
      chunkFilename: "[id].[hash].css",
      ignoreOrder: false // Enable to remove warnings about conflicting order
    })
  ],
  optimization: {
    // Minify JS
    minimizer: [new UglifyJsPlugin()]
  }
});
