var glob = require("glob")

module.exports = {
  entries: glob.sync("./js/entries/**/*.js"),
  output: {
    path: "./public/webpack/",
    filename: "[name].bundle.js",
  }
}