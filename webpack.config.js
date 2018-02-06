const webpack = require('webpack');

module.exports = {
  entry: ['babel-polyfill', 'react-hot-loader/patch', './dev/index.js'],
  output: {
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        use: {loader: 'babel-loader'},
        exclude: /node_modules/,
      },
      {
        test: /\.(css|scss)?$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  devServer: {
    open: true,
    contentBase: './dev',
  },
  devtool: 'eval-source-map',
};
