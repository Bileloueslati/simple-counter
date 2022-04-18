const path = require("path");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const mode = process.env.NODE_ENV;

let config = {
  entry: "./src/app.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "simple-counter.js",
  },
  module: {
    rules: [
      {
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-env"],
        },
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: [".ts", ".js"],
  },
  mode,
  plugins : []
};

if (mode === "production") {
  config.plugins.push(new UglifyJsPlugin());
}

module.exports = config;

