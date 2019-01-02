export default {
  webpack: {
    module: {
      rules: [
        {
          test: /\.(css|scss)?$/,
          use: ['style-loader', 'css-loader', 'sass-loader'],
        },
        {
          test: /\.json$/,
          loader: 'json-loader',
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
  },
};
