// this file needs to be run to convert css-custom-props to work in IE11
const fs = require('fs');
const postcss = require('postcss');
const customProperties = require('postcss-custom-properties');
const autoprefixer = require('autoprefixer');

/* eslint-disable no-process-env */
const ie = process.env.NODE_ENV === 'ie';

if (ie) {
  fs.readFile('lib/react-plotly.js-editor.css', (err, css) => {
    postcss([
      customProperties,
      autoprefixer({browsers: ['last 5 versions', 'ie 11']}),
    ])
      .process(css, {
        from: 'lib/react-plotly.js-editor.css',
        to: 'lib/react-plotly.js-editor-ie11.css',
      })
      .then(result => {
        fs.writeFile('lib/react-plotly.js-editor-ie11.css', result.css);
      });
  });
} else {
  fs.readFile('lib/react-plotly.js-editor.css', (err, css) => {
    postcss([autoprefixer])
      .process(css, {
        from: 'lib/react-plotly.js-editor.css',
        to: 'lib/react-plotly.js-editor.css',
      })
      .then(result => {
        fs.writeFile('lib/react-plotly.js-editor.css', result.css);
      });
  });
}
