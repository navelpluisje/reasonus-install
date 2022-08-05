/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require('webpack');
const rules = require('./webpack.rules');
const plugins = require('./webpack.plugins');

rules.push({
  test: /\.css$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
});

module.exports = {
  module: {
    rules,
  },
  plugins: [
    ...plugins,
    new webpack.EnvironmentPlugin({
      __VERSION__: process.env.VERSION,
    }),
  ],
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
  },
};
