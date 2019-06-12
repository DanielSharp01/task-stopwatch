const nodeExternals = require("webpack-node-externals");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const commonConfig = {
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
      {
        test: /\.s[c|a]ss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", "sass-loader"]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "style.css"
    })
  ]
};

const serverConfig = {
  ...commonConfig,
  target: "node",
  entry: "./src/server/",
  output: {
    path: `${__dirname}/dist`
  },
  externals: [nodeExternals()]
};

const clientConfig = {
  ...commonConfig,
  entry: "./src/client/",
  output: {
    path: `${__dirname}/public`
  }
};

module.exports = [serverConfig, clientConfig];
