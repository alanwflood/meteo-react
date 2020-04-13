const HTMLWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const path = require("path");

module.exports = {
  entry: {
    app: [path.join(__dirname, "../src/index.js")],
  },
  module: {
    rules: [
      {
        test: /\.(jsx?)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: "file-loader",
      },
      {
        test: /\.svg$/,
        use: "@svgr/webpack",
      },
    ],
  },

  plugins: [
    new Dotenv({ systemvars: true }),
    new HTMLWebpackPlugin({
      template: path.join(__dirname, "../src/index.html"),
      favicon: path.join(__dirname, "../src/assets/favicon.ico"),
      googleApiKey: process.env.GOOGLE_API_KEY,
    }),
  ],
  resolve: {
    extensions: [".js", ".jsx"],
  },
};
