const fs = require('fs');
const postcss = require('postcss');
const customProperties = require('postcss-custom-properties');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const combineSelectors = require('postcss-combine-duplicated-selectors');
const removeRoot = require('postcss-remove-root');

/* eslint-disable no-process-env */
const SASS_ENV = process.env.SASS_ENV || 'default';
const BUILD_ENV = process.env.BUILD_ENV || 'lib';

const fileName = `react-chart-editor`;
const dist = `${BUILD_ENV}/${fileName}.css`;

const internetExplorerPostCSS = () => {
  /**
   * IE11 specific post-processing
   * This will:
   * - combine duplicate selectors into one,
   * - convert all css variables into their true value
   * - remove unneeded `:root{}` after converting vars into their value
   * - autoprefix for IE11
   * - minify the css with cssnano
   */
  const ie11_plugins = [
    combineSelectors,
    customProperties({preserve: false}),
    removeRoot,
    autoprefixer({grid: true}),
    cssnano,
  ];
  fs.readFile(`${BUILD_ENV}/${fileName}.ie.css`, (err, css) => {
    postcss([...ie11_plugins])
      .process(css, {
        from: dist,
        to: `${BUILD_ENV}/${fileName}.ie.min.css`,
      })
      .then(result => {
        fs.writeFile(`${BUILD_ENV}/${fileName}.ie.min.css`, result.css, error => {
          if (error) {
            /* eslint-disable no-console */
            console.log(error);
          }
        });
      });
  });
};

const defaultPostCSS = () => {
  /**
   * Default post-processing
   * This will:
   * - combine duplicate selectors into one,
   * - convert all css variables into their true value
   * - remove unneeded `:root{}` after converting vars into their value
   * - autoprefix for IE11
   * - minify the css with cssnano
   */
  const default_plugins = [combineSelectors, autoprefixer, cssnano];
  fs.readFile(`${BUILD_ENV}/${fileName}.css`, (err, css) => {
    postcss([...default_plugins])
      .process(css, {
        from: `${BUILD_ENV}/${fileName}.css`,
        to: `${BUILD_ENV}/${fileName}.min.css`,
      })
      .then(result => {
        fs.writeFile(`${BUILD_ENV}/${fileName}.min.css`, result.css, error => {
          if (error) {
            /* eslint-disable no-console */
            console.log(error);
          }
        });
      });
  });
};

/**
 * Run our PostCSS scripts based off of SASS_ENV passed through
 */
if (SASS_ENV === 'ie') {
  internetExplorerPostCSS();
} else {
  defaultPostCSS();
}
