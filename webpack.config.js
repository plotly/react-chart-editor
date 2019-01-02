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
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['react', 'es2015'],
            plugins: [
              'react-hot-loader/babel',
              'transform-object-rest-spread',
              [
                'module-resolver',
                {
                  root: ['./'],
                  alias: {
                    components: './src/components',
                    lib: './src/lib',
                    styles: './src/styles',
                  },
                },
              ],
            ],
          },
        },
        exclude: [/node_modules/],
      },
      {
        test: /\.(css|scss)?$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },

  plugins: [new webpack.IgnorePlugin(/vertx/)],
  devServer: {
    open: true,
    contentBase: './dev',
  },
  devtool: 'eval-source-map',
};
