const fs = require('fs');
const postcss = require('postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const combineSelectors = require('postcss-combine-duplicated-selectors');

/* eslint-disable no-process-env */
const BUILD_ENV = process.env.BUILD_ENV || 'lib';

const fileName = `react-chart-editor`;

/**
 * This will:
 * - combine duplicate selectors into one,
 * - convert all css variables into their true value
 * - remove unneeded `:root{}` after converting vars into their value
 * - autoprefix for IE11
 * - minify the css with cssnano
 */
fs.readFile(`${BUILD_ENV}/${fileName}.css`, (err, css) => {
  postcss([combineSelectors, autoprefixer, cssnano])
    .process(css, {
      from: `${BUILD_ENV}/${fileName}.css`,
      to: `${BUILD_ENV}/${fileName}.min.css`,
    })
    .then((result) => {
      fs.writeFile(`${BUILD_ENV}/${fileName}.min.css`, result.css, (error) => {
        if (error) {
          /* eslint-disable no-console */
          console.log(error);
        }
      });
    });
});
