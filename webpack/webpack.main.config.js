/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const webpack = require('webpack');
require('dotenv').config();

module.exports = {
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
  entry: {
    index: './src/main/index.ts',
    preload: './src/preload/index.ts',
  },
  // Put your normal webpack config below here
  module: {
    rules: require('./webpack.rules.js'),
  },
  output: {
    filename: '[name].js',
    libraryTarget: 'commonjs2',
    path: path.resolve(__dirname, '../.webpack', 'main'),
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      __GITHUB_AUTH_TOKEN__: process.env.GH_API_TOKEN,
    }),
  ],
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json'],
  },
}; 
