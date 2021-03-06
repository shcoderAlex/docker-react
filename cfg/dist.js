var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var _ = require('lodash')

var baseConfig = require('./base')

var config = _.merge({
  cache: false,
  devtool: 'sourcemap',
  entry: [
    'babel-polyfill',
  ].concat(baseConfig.entry),
  mode: 'production',
  output: {
    filename: 'app.[hash].js',
    path: path.join(__dirname, '/../dist/assets'),
    publicPath: '/assets/',
  },
}, _.omit(baseConfig, 'entry'))

Array.prototype.push.apply(config.plugins, [
  // Define free variables -> global constants.
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': '"production"',
  }),
  // Only keep the fr locale from the moment library.
  new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /fr/),
  // Embed the JavaScript in the index.html page.
  new HtmlWebpackPlugin({
    filename: '../index.html',
    minify: {
      collapseWhitespace: true,
      decodeEntities: true,
      minifyCSS: true,
      removeAttributeQuotes: true,
      removeComments: true,
      removeOptionalTags: true,
      removeRedundantAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
    },
  }),
])

config.module.rules.push({
  include: [
    path.join(__dirname, '/../src'),
  ],
  test: /\.(js|jsx)$/,
  use: 'babel-loader',
})

module.exports = config
