const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  entry: __dirname + '/src/index.js',
  output: {
    path: __dirname + '/dist/',
    filename: 'build.js',
  },
  module: {
    rules: [ {
      test: /\.vue$/,
      exclude: /node_modules/,
      loader: 'vue-loader',
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    }, {
      test: /\.(css|scss)$/,
      use: [
        process.env.NODE_ENV !== 'production'
            ? 'vue-style-loader'
            : MiniCssExtractPlugin.loader,
        'css-loader',
        'sass-loader',
      ],
    } ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin ({
      template: 'src/index.html',
      filename: '../index.html',
    }),
    new HtmlWebpackPlugin ({
      template: 'src/index.html',
    }),
    new MiniCssExtractPlugin({
    }),
    new OptimizeCssAssetsPlugin(),
  ],
};
