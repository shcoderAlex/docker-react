var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var _ = require('lodash')

var baseConfig = require('./base')

var config = _.merge({
  cache: true,
  devtool: 'eval-source-map',
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:0',
    'webpack/hot/only-dev-server',
  ].concat(baseConfig.entry),
  mode: 'development',
  output: {
    filename: 'app.js',
    path: __dirname,
    publicPath: baseConfig.devServer.publicPath,
  },
}, _.omit(baseConfig, 'entry'))

Array.prototype.push.apply(config.plugins, [
  new webpack.LoaderOptionsPlugin({
    debug: true,
  }),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NamedModulesPlugin(),
  // Embed the JavaScript in the index.html page.
  new HtmlWebpackPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
])

// Add needed rules.
config.module.rules.push({
  include: [
    path.join(__dirname, '/../src'),
  ],
  test: /\.(js|jsx)$/,
  use: {
    loader: 'babel-loader',
    options: {
      plugins: ['react-hot-loader/babel'],
      presets: [['es2015', {modules: false}], 'react', 'stage-0'],
    },
  },
})

module.exports = config
