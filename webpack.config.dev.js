const webpack = require('webpack');
const path = require('path');
const TemplateWebpackPlugin = require('html-webpack-template');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const appConfig = require('./config');

process.env.BABEL_ENV = 'development';

const config = {
  target: 'web',

  devtool: 'eval', // Use eval for best hot-loading perf

  // Array of files run at startup
  entry: {
    client: [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:8080',
      // 'webpack/hot/only-dev-server',
      path.join(__dirname, 'src', 'App'), // App entry point
    ],
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

  // webpack-dev-server config
  devServer: {
    host: 'localhost',
    port: 8080,
    hot: true, // enable HMR on the server
    contentBase: path.join(__dirname, 'build'),
    historyApiFallback: true, // respond to 404s with index.html
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
        use: [
          { loader: 'style-loader', options: { sourceMap: true } },
          { loader: 'css-loader', options: { sourceMap: true } },
          {
            loader: 'postcss-loader',
            options: { sourceMap: true, parser: 'postcss-scss' },
          },
          { loader: 'sass-loader', options: { sourceMap: true } },
        ],
        exclude: /node_modules/,
      },
      // JSON loader
      {
        test: /\.json$/,
        include: [path.resolve(__dirname, 'src')],
        use: 'json-loader',
        exclude: /node_modules/,
      },
    ],
  },

  plugins: [
    new webpack.NamedModulesPlugin(), // Use module names as ids
    new webpack.LoaderOptionsPlugin({
      debug: true,
      options: { context: __dirname },
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    new webpack.HotModuleReplacementPlugin(), // Enable HMR globally
    new HtmlWebpackPlugin({
      // html-webpack-plugin configs
      title: appConfig.appName,
      filename: 'index.html',
      template: TemplateWebpackPlugin,
      inject: false,
      favicon: path.resolve(__dirname, 'static', 'favicon.ico'),
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
  ],
};

module.exports = config;
