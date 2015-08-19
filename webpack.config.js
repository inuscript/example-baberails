var glob = require("glob")
module.exports = {
  entry: glob.sync("./js/entries/**/*.js"),
  output: {
    path: "./public/webpack/",
    filename: "[name].bundle.js",
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components|vendor\/assets)/,
        loader: 'babel'
      }
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
}