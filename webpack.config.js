const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
      test: /\.css$/,
      use: [
        'vue-style-loader',
        'css-loader',
        'sass-loader',
      ],
    }, {
      test: /\.scss$/,
      use: [
        'vue-style-loader',
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
  ],
};
