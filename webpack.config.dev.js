const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  mode: 'development',
  entry: [
    // 'webpack-hot-middleware/client',
    './client/index.js'
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  resolve: {
  extensions: ['.js', '.jsx', '.css', '.scss']
},
  module: {
    rules: [
        {
             test: /\.(js|jsx?)$/,
             exclude: /node_modules/,
             loader: 'babel-loader',
             options: {
            cacheDirectory: true,
            plugins: 'react-hot-loader/babel',
            },

        },
        {
          test: /\.(sa|sc|c)ss$/,
          exclude: /node_modules/,
          use:[
            {
                loader: MiniCssExtractPlugin.loader
            },
            "css-loader",
            "sass-loader",
            'resolve-url-loader'
          ],
        },
        {
          test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
          use: "url-loader?limit=100000"
        }
    ]
  },
  plugins: [
    new htmlWebpackPlugin({
    template:  './public/index.html',
    filename: 'index.html',
    inject: 'body'
  }),
  new MiniCssExtractPlugin({
    filename: "[name].css",
    chunkFilename: "[id].css"
  }),
  new webpack.NoEmitOnErrorsPlugin(),
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.HotModuleReplacementPlugin()
],

  devServer: {
    historyApiFallback: true
}
}
