const path = require('path');
const glob = require('glob-all');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const workboxPlugin = require('workbox-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist/'),
    publicPath: '/dist/',
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
    new workboxPlugin.GenerateSW({
      cacheId: 'brokentalents',
      swDest: '../service-worker.js',
      importWorkboxFrom: 'local',
      clientsClaim: true,
      skipWaiting: true,
      globDirectory: '.',
      globPatterns: ['dist/**/*.{jpg,png}'],
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
