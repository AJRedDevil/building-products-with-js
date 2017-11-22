const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: 'cheap-module-source-map',
  plugins: [
    new webpack.LoaderOptionsPlugin({
      debug: true,
    }),
  ],
  context: path.resolve(__dirname, 'src'),
  entry: path.resolve(__dirname, 'src', 'index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: 'app.min.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader?modules',
        ],
        exclude: /node_modules/,
      }, {
        test: /node_modules\/.+\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      }, {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            query: {
              cacheDirectory: true,
              presets: ['env', 'react', 'stage-0'],
              plugins: ['transform-runtime'],
              env: {
                development: {
                  presets: ['react-hmre'],
                },
                production: {
                  presets: ['react-optimize'],
                },
              },
            },
          },
        ],
      }, {
        test: /\.json$/,
        loader: 'json',
      }, {
        test: /\.woff\d?(\?.+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff',
      }, {
        test: /\.ttf(\?.+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/octet-stream',
      }, {
        test: /\.eot(\?.+)?$/,
        loader: 'url-loader?limit=10000',
      }, {
        test: /\.svg(\?.+)?$/,
        loader: 'url-loader?limit=10000&mimetype=image/svg+xml',
      }, {
        test: /\.png$/,
        loader: 'url-loader?limit=10000&mimetype=image/png',
      }, {
        test: /\.gif$/,
        loader: 'url-loader?limit=10000&mimetype=image/gif',
      },
    ],
  },
};
