const path = require("path");
const merge = require("webpack-merge");
const baseConfig = require("./base.config.js");

module.exports = merge(baseConfig, {
  devtool: "eval-source-map",
  devServer: {
    port: "7777",
    inline: true,
    historyApiFallback: true,
    overlay: {
      warnings: false,
      errors: true,
    },
    contentBase: path.join(__dirname, "../dist"),
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.styl$/,
        use: ["style-loader", "css-loader", "stylus-loader"],
      },
    ],
  },
});
