const path = require('path');

module.exports = async ({config, mode}) => {
  config.module.rules.push({
    test: /\.scss$/,
    use: ['style-loader', 'css-loader', 'sass-loader'],
    include: path.resolve(__dirname, '../'),
  });
  config.module.rules.push({
    test: /\.js?$/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: [
          [
            '@babel/preset-react',
            {
              runtime: 'automatic',
            },
          ],
          '@babel/env',
        ],
      },
    },
    exclude: [/node_modules/],
  });
  return config;
};
