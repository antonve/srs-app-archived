const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const DefinePlugin = webpack.DefinePlugin

const APP_DIR = path.resolve(__dirname, 'app')
const BUILD_DIR = path.resolve(__dirname, 'web')

const config = {
  devtool: 'source-map',
  // Multiple entry is allowed in webpack.
  // What I think it does is, each entry wll go through the config.
  // So in the case of react-hot-loader, it helps tell react-hot-loader that something has changed
  // Outputs everything to the single output, or, if specified, to multiple outputs.
  entry: [
    // Enables HMR for React. Webpack would tell this entry what has changed.
    'react-hot-loader/patch',

    // This is the equivalent of webpack --inline. Without it, no HMR nor auto-reload
    // Ignored if webpack-dev-server is not used, apparently
    'webpack-dev-server/client?http://localhost:8080',

    // Tells webpack to enable HMR only when utilizing webpack-dev-server
    // If 'only-' is omitted, HMR is enabled even on the backend site.
    // TODO: Maybe optimize & control this through index.jsx and environment variables?
    'webpack/hot/only-dev-server',

    // The file entry point
    `${APP_DIR}/index.jsx`,
  ],
  output: {
    path: BUILD_DIR,
    filename: 'js/bundle.js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
    modules: ['node_modules'],
    alias: {
      store: path.resolve(__dirname, 'app/common/store'),
      '~': path.resolve(__dirname, 'app'),
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: APP_DIR,
        loader: 'babel-loader',
      },
      {
        test: /\.(scss|css)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
            },
            {
              loader: 'sass-loader',
              options: {
                includePaths: [path.resolve(__dirname, 'node_modules')],
              },
            },
          ],
        }),
      },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype: 'application/font-woff',
          name: '/fonts/[name].[ext]',
        },
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype: 'application/font-woff',
          name: '/fonts/[name].[ext]',
        },
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype: 'application/octet-stream',
          name: '/fonts/[name].[ext]',
        },
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype: 'application/vnd.ms-fontobject',
          name: '/fonts/[name].[ext]',
        },
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype: 'image/svg+xml',
          name: '/fonts/[name].[ext]',
        },
      },
    ],
  },
  plugins: [
    new DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    }),

    new ExtractTextPlugin({
      filename: 'css/bundle.css',
    }),

     // Enable HMR globally
    new webpack.HotModuleReplacementPlugin(),

    // Prints more readable module names in the browser console on HMR updates
    // Seems to be mandatory for react-hot-loader 3.
    new webpack.NamedModulesPlugin(),

    // do not emit compiled assets that include errors
    // Fail on compile is always good to have.
    new webpack.NoEmitOnErrorsPlugin(),
  ],
  devServer: {
    host: 'localhost',
    port: 8080,
    contentBase: BUILD_DIR,
    historyApiFallback: true,
    hot: true,
  },
}

module.exports = config
