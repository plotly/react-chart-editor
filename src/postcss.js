// this file needs to be run to convert css-custom-props to work in IE11
const fs = require('fs');
const postcss = require('postcss');
const customProperties = require('postcss-custom-properties');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const combineSelectors = require('postcss-combine-duplicated-selectors');
const removeRoot = require('postcss-remove-root');

/* eslint-disable no-process-env */
const ie = process.env.NODE_ENV === 'ie';

if (ie) {
  fs.readFile('dist/react-plotly.js-editor.css', (err, css) => {
    postcss([
      combineSelectors,
      customProperties,
      removeRoot,
      autoprefixer({browsers: ['last 5 versions', 'ie 11']}),
      cssnano,
    ])
      .process(css, {
        from: 'dist/react-plotly.js-editor.css',
        to: 'dist/react-plotly.js-editor-ie11.min.css',
      })
      .then(result => {
        fs.writeFile('dist/react-plotly.js-editor-ie11.min.css', result.css);
      });
  });
} else {
  fs.readFile('dist/react-plotly.js-editor.css', (err, css) => {
    postcss([combineSelectors, autoprefixer, cssnano])
      .process(css, {
        from: 'dist/react-plotly.js-editor.css',
        to: 'dist/react-plotly.js-editor.css',
      })
      .then(result => {
        fs.writeFile('dist/react-plotly.js-editor.min.css', result.css);
      });
  });
}
