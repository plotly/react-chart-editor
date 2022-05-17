const webpack = require('webpack');

module.exports = {
  entry: ['@babel/polyfill', 'react-hot-loader/patch', './dev/index.js'],
  output: {
    filename: 'bundle.js',
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js?$/,
        use: 'babel-loader',
        exclude: [/node_modules/],
      },
      {
        test: /\.(css|scss)?$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
  plugins: [new webpack.IgnorePlugin({resourceRegExp: /vertx/})],
  devServer: {
    open: true,
    static: './dev',
  },
  devtool: 'eval-source-map',
  target: 'browserslist',
};
