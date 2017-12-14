/* eslint no-console: 0 */
// start webpack
const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackMiddlware = require('webpack-dev-middleware');
const webpackHotMiddlware = require('webpack-hot-middleware');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

const config = require('./webpack.config');

// create express
const app = express();

// get the environment
const isProduction = process.env.NODE_ENV === 'production';

// setup plugins hot reload
config.plugins = [
  // define plugin for node env
  new webpack.DefinePlugin({
    'process.env': {NODE_ENV: JSON.stringify(process.env.NODE_ENV)},
  }),
];

// if not in prod - setup hot reload
if (!isProduction) {
  // hot reload plugin
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
  // setup no errors plugin
  config.plugins.push(new webpack.NoEmitOnErrorsPlugin());
}

// define plugin for nod env
config.plugins.push(new webpack.DefinePlugin({
  'process.env': {NODE_ENV: JSON.stringify(process.env.NODE_ENV)},
}));
// setup hot reload
config.plugins.push(new webpack.HotModuleReplacementPlugin());
// setup no errors plugin
config.plugins.push(new webpack.NoEmitOnErrorsPlugin());

// override entry for hot reload
if (!isProduction) {
  config.entry = [
    'webpack-hot-middleware/client',
    config.entry,
  ];
}

// tweak conig for production
if (isProduction) {
  // set devtoo to cheap source map
  config.devtool = 'cheap-source-map';

  // extract styles into file
  const extractCSS = new ExtractTextPlugin('main.css');
  config.plugins.push(extractCSS);
  config.module.rules[0].use = ExtractTextPlugin.extract({ // eslint-disable-line
    fallback: 'style-loader',
    use: [{
      loader: 'css-loader',
      options: {
        modules: true,
        minimize: true,
      },
    }],
  });
  config.module.rules[1].use = ExtractTextPlugin.extract({ // eslint-disable-line
    fallback: 'style-loader',
    use: [{
      loader: 'css-loader',
      options: {
        minimize: true,
      },
    }],
  });

  // add js optimization plugins
  config.plugins.push(new webpack.LoaderOptionsPlugin({minimize: true}));
  config.plugins.push(new webpack.optimize.UglifyJsPlugin());
  config.plugins.push(new LodashModuleReplacementPlugin());
}

// returns a Compiler instance
const compiler = webpack(config);
// stats output config
const statsConf = {
  colors: true,
  hash: false,
  timings: true,
  chunks: false,
  chunkModules: false,
  modules: false,
};
app.use(webpackMiddlware(compiler, {
  publicPath: config.output.publicPath,
  contentBase: 'src',
  stats: statsConf,
}));

// add hot reload middleware if not in production
if (!isProduction) {
  app.use(webpackHotMiddlware(compiler));
}

// serve static
app.use(express.static(__dirname));

// server index
app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
// start server
app.listen(3000, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.info('==> Listening on port 3000');
  }
});
