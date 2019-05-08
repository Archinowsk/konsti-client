import CleanWebpackPlugin from 'clean-webpack-plugin'
import CompressionPlugin from 'compression-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import ExtractTextWebpackPlugin from 'extract-text-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import TemplateWebpackPlugin from 'html-webpack-template'
import MomentLocalesPlugin from 'moment-locales-webpack-plugin'
import TerserPlugin from 'terser-webpack-plugin'
import BrotliPlugin from 'brotli-webpack-plugin'
// import PrepackWebpackPlugin from 'prepack-webpack-plugin'
import Dotenv from 'dotenv-webpack'
import path from 'path'
import webpack from 'webpack'
import webpackMerge from 'webpack-merge'
import appConfig from './src/config'

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
    filename: '[name].[contenthash].bundle.js',
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
    new webpack.HashedModuleIdsPlugin(), // so that file hashes don't change unexpectedly
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

  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
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
    new CleanWebpackPlugin(),
    // new PrepackWebpackPlugin(),
    new CopyWebpackPlugin([{ from: 'assets' }]),
    // “en” is built into Moment and can’t be removed
    new MomentLocalesPlugin({
      localesToKeep: ['fi'],
    }),
    new ExtractTextWebpackPlugin('[name].[hash].bundle.css'),
    new CompressionPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$/,
    }),
    new BrotliPlugin({
      asset: '[path].br[query]',
      test: /\.js$/,
    }),
    new Dotenv({
      path: './.prod.env',
    }),
  ],

  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true,
          },
        },
      }),
    ],
    // https://hackernoon.com/the-100-correct-way-to-split-your-chunks-with-webpack-f8a9df5b7758
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            const packageName = module.context.match(
              /[\\/]node_modules[\\/](.*?)([\\/]|$)/
            )[1]

            return `npm.${packageName.replace('@', '')}`
          },
        },
      },
    },
  },
}

const stagingConfig = {
  mode: 'production',

  stats,

  devtool: 'source-map',

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
    new CleanWebpackPlugin(),
    // new PrepackWebpackPlugin(),
    new CopyWebpackPlugin([{ from: 'assets' }]),
    // “en” is built into Moment and can’t be removed
    new MomentLocalesPlugin({
      localesToKeep: ['fi'],
    }),
    new ExtractTextWebpackPlugin('[name].[hash].bundle.css'),
    new CompressionPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$/,
    }),
    new BrotliPlugin({
      asset: '[path].br[query]',
      test: /\.js$/,
    }),
    new Dotenv({
      path: './.staging.env',
    }),
  ],

  optimization: {
    minimize: false,
    namedModules: true,
    namedChunks: true,
    moduleIds: 'named',
    chunkIds: 'named',
    // https://hackernoon.com/the-100-correct-way-to-split-your-chunks-with-webpack-f8a9df5b7758
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            const packageName = module.context.match(
              /[\\/]node_modules[\\/](.*?)([\\/]|$)/
            )[1]

            return `npm.${packageName.replace('@', '')}`
          },
        },
      },
    },
  },
}

const getConfig = () => {
  if (TARGET === 'build' || TARGET === 'analyze') {
    return webpackMerge(commonConfig, prodConfig)
  } else if (TARGET === 'build-staging') {
    return webpackMerge(commonConfig, stagingConfig)
  } else if (
    TARGET === 'start' ||
    TARGET === 'watch' ||
    TARGET === 'build-dev'
  ) {
    return webpackMerge(commonConfig, devConfig)
  }
}

const config = getConfig()

export default config
