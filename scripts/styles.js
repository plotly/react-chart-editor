const fs = require('fs');
const path = require('path');
const sass = require('node-sass');

/* eslint-disable no-process-env */
const SASS_ENV = process.env.SASS_ENV || 'default';
const BUILD_ENV = process.env.BUILD_ENV || 'lib';

const src = 'src/styles/main.scss';
const fileName = `react-plotly.js-editor`;
const dist =
  SASS_ENV === 'ie'
    ? `${BUILD_ENV}/${fileName}.ie.css`
    : `${BUILD_ENV}/${fileName}.css`;

/**
 * Compile our scss to css!
 * --
 * the `data:...` line will inject our SASS_ENV value into our scss,
 * so we are able to do conditionals in scss for our env (default|ie)
 */
fs.readFile(src, function(err, data) {
  sass.render(
    {
      data: '$ENV: "' + SASS_ENV + '";\n' + data,
      includePaths: [path.dirname(src)],
      outFile: dist,
    },
    (error, result) => {
      if (error) {
        /* eslint-disable no-console */
        console.log(error.status);
        console.log(error.column);
        console.log(error.message);
        console.log(error.line);
      } else {
        fs.writeFile(dist, result.css);
      }
    }
  );
});
