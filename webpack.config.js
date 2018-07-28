const path = require("path");
const webpack = require("webpack");
const htmlWebpackPlugin = require("html-webpack-plugin");

const ROOT = path.resolve(__dirname, "src");
const DESTINATION = path.resolve(__dirname, "dist");

module.exports = {
  context: ROOT,
  entry: {
    main: "./main/main.ts",
    chart: "./chart/chart.ts"
  },
  output: {
    filename: "[name].bundle.js",
    path: DESTINATION
  },
  plugins: [
    new htmlWebpackPlugin({
      filename : 'index.html',//输出的html路径
      //template: 'index.html',
      chunks : ['main']
    }),
    new htmlWebpackPlugin({
      filename : 'chart.html',//输出的html路径
      template: 'template/chart.html',
      chunks : ['chart']
    })
  ],
  resolve: {
    extensions: [".ts", ".js"],
    modules: [ROOT, "node_modules"]
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.js$/,
        use: "source-map-loader"
      },
      {
        enforce: "pre",
        test: /\.ts$/,
        exclude: /node_modules/,
        use: "tslint-loader"
      },
      {
        test: /\.ts$/,
        exclude: [/node_modules/],
        use: "awesome-typescript-loader"
      }
    ]
  },

  devtool: "cheap-module-source-map",
  devServer: {}
};
