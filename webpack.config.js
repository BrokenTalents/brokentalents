const path = require('path');
const glob = require('glob-all');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist/'),
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
  ].concat(process.env.NODE_ENV == 'production' ?  [
    new SWPrecacheWebpackPlugin({
      cacheId: 'brokentalents-1',
      filepath: './service-worker.js',
      staticFileGlobs: ['index.html', 'dist/**/*'],
      minify: true,
    }),
    new PurgecssPlugin({
      paths: glob.sync([
        './src/*.html',
        './src/*.js',
        './src/*.vue',
        './src/**/*.vue',
        './node_modules/buefy/src/components/table/*',
        './node_modules/buefy/src/components/pagination/*',
      ])
    }),
  ] : []),
};
