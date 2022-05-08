/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

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
    // new CopyWebpackPlugin({patterns: [
    //   {
    //     from: path.resolve(__dirname, '../resources' ),
    //     to: path.resolve(
    //       __dirname, '../.webpack', 'main',  'resources',
    //     ),
    //   },
    // ]}),

  ],
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json'],
  },
};
