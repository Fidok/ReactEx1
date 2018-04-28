let path = require("path");

module.exports = {
  entry: "./src/app/index.js",
  output: {
    filename: "bundle.js"
  },
    devServer: {
        contentBase : path.join(__dirname, "dist")
    },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react']
        }
      }
    ]
  }
}