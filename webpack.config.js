const path = require("path");

module.exports = {
  watch: true,
  mode: "development",
  entry: "./dist/ts/main.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "bundle.js",
  },
  experiments: {
    outputModule: true,
  },
  plugins: [],
  module: {
    // https://webpack.js.org/loaders/babel-loader/#root
    rules: [
      {
        test: /\.m?js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
    ],
  },
  devtool: "source-map",
};
