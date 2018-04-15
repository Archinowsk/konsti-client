const webpack = require('webpack')
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const TemplateWebpackPlugin = require('html-webpack-template')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const appConfig = require('./config')

process.env.BABEL_ENV = 'production'

const config = {
  mode: 'production',

  target: 'web',

  // Array of entry files
  entry: {
    client: [path.join(__dirname, 'src', 'App')],
  },

  // Output for compiled file
  output: {
    path: path.join(__dirname, 'build'),
    publicPath: '/',
    filename: '[name].bundle.js',
  },

  resolve: {
    extensions: ['.js', '.jsx'],
  },

  module: {
    // Loaders to transform sources
    rules: [
      {
        // JSX / JS loaders
        test: /\.jsx?$/,
        include: [path.resolve(__dirname, 'src')],
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        // CSS / SCSS loaders
        test: /\.s?css$/,
        use: ExtractTextWebpackPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader' },
            { loader: 'postcss-loader', options: { parser: 'postcss-scss' } },
            { loader: 'sass-loader' },
          ],
          publicPath: '/',
        }),
      },
    ],
  },

  plugins: [
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/), // Ignore all optional deps of moment.js
    new CleanWebpackPlugin(['build'], {
      root: path.resolve(__dirname),
      verbose: false,
      exclude: ['.keep'],
    }),
    new CopyWebpackPlugin([{ from: 'static' }]),
    new HtmlWebpackPlugin({
      // html-webpack-plugin configs
      title: appConfig.appName,
      filename: 'index.html',
      template: TemplateWebpackPlugin,
      inject: false,
      favicon: path.resolve(__dirname, 'static', 'favicon.png'),
      minify: {
        collapseWhitespace: true,
        preserveLineBreaks: true,
      },
      // html-webpack-template configs
      appMountId: 'main',
      meta: {
        'application-name': appConfig.appName,
      },
      mobile: true,
    }),
    new ExtractTextWebpackPlugin('[name].bundle.css'),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify('production') },
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(), // Scope Hoisting
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
      options: { context: __dirname },
    }),

    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$/,
      // test: /\.js$|\.css$|\.html$/,
      // threshold: 10240,
      // minRatio: 0.8
    }),
  ],
}

module.exports = config
