const fs = require('fs');
const path = require('path');
const sass = require('node-sass');

/* eslint-disable no-process-env */
const BUILD_ENV = process.env.BUILD_ENV || 'lib';

const src = 'src/styles/main.scss';
const fileName = `react-chart-editor`;
const dist = `${BUILD_ENV}/${fileName}.css`;

/**
 * Compile our scss to css!
 * --
 * the `data:...` line will inject our SASS_ENV value (hardcoded to "default") into our scss,
 * so we are able to do conditionals in scss for our env (default|ie)
 */
fs.readFile(src, function (err, data) {
  sass.render(
    {
      data: '$ENV: "default";\n' + data,
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
        fs.writeFile(dist, result.css, (error) => {
          if (error) {
            /* eslint-disable no-console */
            console.log(error);
          }
        });
      }
    }
  );
});
