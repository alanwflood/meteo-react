const path = require("path");
const merge = require("webpack-merge");
const WorkboxPlugin = require("workbox-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const baseConfig = require("./base.config.js");

module.exports = merge(baseConfig, {
  mode: "production",
  output: {
    path: path.join(__dirname, "../dist"),
    publicPath: "/",
    filename: "[name].bundle.[chunkhash].js",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.styl$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "stylus-loader"],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[hash].css",
      chunkFilename: "[id].[hash].css",
      ignoreOrder: false, // Enable to remove warnings about conflicting order
    }),
    // Clean previous build files
    new CleanWebpackPlugin(),
    // Create a service worker
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
    }),
  ],
  optimization: {
    minimize: true,
    // Minify JS
    minimizer: [
      new TerserPlugin({
        test: /\.m?jsx?(\?.*)?$/i,
      }),
    ],
  },
});
