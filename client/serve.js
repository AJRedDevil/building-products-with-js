/* eslint no-console: 0 */
// start webpack
const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackMiddlware = require('webpack-dev-middleware');
const webpackHotMiddlware = require('webpack-hot-middleware');
const config = require('./webpack.config');

// create express
const app = express();

// define plugin for nod env
config.plugins.push(new webpack.DefinePlugin({
  'process.env': {NODE_ENV: JSON.stringify(process.env.NODE_ENV)},
}));
// setup hot reload
config.plugins.push(new webpack.HotModuleReplacementPlugin());
// setup no errors plugin
config.plugins.push(new webpack.NoEmitOnErrorsPlugin());
// override entry for hotload
config.entry = [
  'webpack-hot-middleware/client',
  config.entry,
];
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
app.use(webpackHotMiddlware(compiler));

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
