const path = require('path');

module.exports = {
  devtool: false,
  module: {
    rules: [
      {
        test: /\.(css|scss)?$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
        include: path.resolve(__dirname, '../'),
      },
    ],
  },
};
