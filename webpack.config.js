const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const ROOT = path.resolve(__dirname, "src");
const DESTINATION = path.resolve(__dirname, "dist");

module.exports = {
  context: ROOT,
  entry: {
    main: "./template/main/main.ts",
    chart: "./template/chart/chart.ts",
    autocomplete: "./template/autocomplete/autocomplete.ts",
    youku: "./template/youku/youku.ts",
    cube: "./template/cube/cube.ts"
  },
  output: {
    filename: "[name].bundle.js",
    path: DESTINATION
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename : 'index.html',//输出的html路径
      chunks : ['main']
    }),
    new HtmlWebpackPlugin({
      filename : 'chart.html',//输出的html路径
      template: 'template/chart/chart.html',
      chunks : ['chart']
    }),
    new HtmlWebpackPlugin({
      filename : 'autocomplete.html',//输出的html路径
      template: 'template/autocomplete/autocomplete.html',
      chunks : ['autocomplete']
    }),
    new HtmlWebpackPlugin({
      filename : 'youku.html',//输出的html路径
      template: 'template/youku/youku.html',
      chunks : ['youku']
    }),
    new HtmlWebpackPlugin({
      filename : 'cube.html',//输出的html路径
      template: 'template/cube/cube.html',
      chunks : ['cube']
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
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },

  devtool: "cheap-module-source-map",
  devServer: {}
};
