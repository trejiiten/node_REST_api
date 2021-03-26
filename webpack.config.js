require("dotenv").config();
const path = require('path');
const { node } = require('webpack');
const fs = require('fs');
const nodeExternals = require('webpack-node-externals');


var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = {
  entry: './server.js',
  mode: process.env.NODE_ENV,
  target: 'node',
  devtool: 'inline-source-map',
  externals: [nodeExternals()],
  optimization: {
    minimize: false
  },
  watchOptions: {
      poll: false,
      ignored: ['node_modules/**']      
  },
  resolve: {
    extensions: [ '.js' ],
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'api_server.js'
  },
}
