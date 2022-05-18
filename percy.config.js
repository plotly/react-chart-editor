export default {
  snapshot: {
    widths: [500],
  },
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
      ],
    },
  },
};
