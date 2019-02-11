import CleanWebpackPlugin from 'clean-webpack-plugin'
import CompressionPlugin from 'compression-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import ExtractTextWebpackPlugin from 'extract-text-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import TemplateWebpackPlugin from 'html-webpack-template'
import MomentLocalesPlugin from 'moment-locales-webpack-plugin'
import UglifyJSPlugin from 'uglifyjs-webpack-plugin'
import BrotliPlugin from 'brotli-webpack-plugin'
// import PrepackWebpackPlugin from 'prepack-webpack-plugin'
import Dotenv from 'dotenv-webpack'
import path from 'path'
import webpack from 'webpack'
import webpackMerge from 'webpack-merge'
import appConfig from './src/config'

let config = null
const TARGET = process.env.npm_lifecycle_event

const stats = {
  // assets: false,
  // children: false,
  // chunks: false,
  // hash: false,
  modules: false,
  // publicPath: false,
  // timings: false,
  // version: false,
  // warnings: true,
}

const commonConfig = {
  target: 'web',

  // Array of entry files
  entry: {
    oldbrowser: [path.join(__dirname, 'src', 'utils', 'oldbrowser')],
    client: [path.join(__dirname, 'src', 'index')],
  },

  // Output for compiled file
  output: {
    path: path.join(__dirname, 'build'),
    publicPath: '/',
    filename: '[name].bundle.js',
  },

  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    extensions: ['.js', '.scss'],
  },

  plugins: [
    new HtmlWebpackPlugin({
      // html-webpack-plugin configs
      title: appConfig.appName,
      filename: 'index.html',
      template: TemplateWebpackPlugin,
      inject: false,
      favicon: path.resolve(__dirname, 'assets', 'favicon.png'),
      minify: {
        collapseWhitespace: true,
        preserveLineBreaks: true,
      },
      // html-webpack-template configs
      appMountIds: ['outdated', 'main'],
      meta: {
        'application-name': appConfig.appName,
      },
      mobile: true,
    }),
  ],

  module: {
    // Loaders to transform sources
    rules: [
      {
        // JS loaders
        test: /\.js$/,
        include: [path.resolve(__dirname, 'src')],
        loader: 'babel-loader',
      },
    ],
  },
}

const devConfig = {
  mode: 'development',

  devtool: 'eval', // Use eval for best hot-loading perf

  // webpack-dev-server config
  devServer: {
    host: 'localhost',
    port: 8080,
    hot: true, // enable HMR on the server
    contentBase: path.join(__dirname, 'build'),
    historyApiFallback: true, // respond to 404s with index.html
    stats,
  },

  module: {
    // Loaders to transform sources
    rules: [
      {
        // SCSS loaders
        test: /\.scss$/,
        use: [
          { loader: 'style-loader', options: { sourceMap: true } },
          {
            loader: 'css-loader',
            options: { importLoaders: 2, sourceMap: true },
          },
          {
            loader: 'postcss-loader',
            options: { sourceMap: true },
          },
          { loader: 'sass-loader', options: { sourceMap: true } },
        ],
      },
    ],
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(), // Enable HMR globally
  ],
}

const prodConfig = {
  mode: 'production',

  stats,

  module: {
    // Loaders to transform sources
    rules: [
      {
        // SCSS loaders
        test: /\.scss$/,
        use: ExtractTextWebpackPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: { importLoaders: 2 },
            },
            { loader: 'postcss-loader' },
            { loader: 'sass-loader' },
          ],
          publicPath: '/',
        }),
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(['build']),
    // new PrepackWebpackPlugin(),
    new CopyWebpackPlugin([{ from: 'assets' }]),
    // “en” is built into Moment and can’t be removed
    new MomentLocalesPlugin({
      localesToKeep: ['fi'],
    }),
    new ExtractTextWebpackPlugin('[name].bundle.css'),
    new CompressionPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$/,
    }),
    new BrotliPlugin({
      asset: '[path].br[query]',
      test: /\.js$/,
    }),
  ],

  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
}

const prodEnv = {
  plugins: [
    new Dotenv({
      path: './.prod.env', // Path to .env file (this is the default)
    }),
  ],

  optimization: {
    minimizer: [
      new UglifyJSPlugin({
        uglifyOptions: {
          compress: {
            drop_console: !appConfig.staging,
          },
          output: {
            comments: false,
          },
        },
      }),
    ],
  },
}

const stagingEnv = {
  plugins: [
    new Dotenv({
      path: './.staging.env', // Path to .env file (this is the default)
    }),
  ],
}

if (TARGET === 'build' || TARGET === 'analyze') {
  config = webpackMerge(commonConfig, prodConfig, prodEnv)
} else if (TARGET === 'build-staging') {
  config = webpackMerge(commonConfig, prodConfig, stagingEnv)
} else if (TARGET === 'start' || TARGET === 'watch') {
  config = webpackMerge(commonConfig, devConfig)
}

export default config
