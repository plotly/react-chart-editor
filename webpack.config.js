module.exports = {
  entry: ['babel-polyfill', './dev/index.js'],
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
        test: /\(.css|.scss)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  devServer: {
    contentBase: './dev',
  },
  devtool: 'eval-source-map',
};
