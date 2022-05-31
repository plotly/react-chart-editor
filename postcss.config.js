module.exports = {
  plugins: [
    require('postcss-import'),
    require('postcss-preset-env')({
      features: {'nesting-rules': false},
    }),
    require('postcss-combine-duplicated-selectors'),
    require('autoprefixer'),
    require('cssnano')({
      preset: 'default',
    }),
    // ...(process.env.NODE_ENV === 'production' ? {cssnano: {preset: 'default'}} : {}),
  ],
};
