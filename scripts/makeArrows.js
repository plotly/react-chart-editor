const path = require('path');
const fs = require('fs');

// generalize so we can use this script in other repos
// so you can call:
//   makeArrows <srcPath> <outputPath>

const pathToCombinedTranslationKeys = process.argv[2] || path.join(
  __dirname,
  './translationKeys/combined-translation-keys.txt'
);

const pathToArrowsOut = process.argv[3] || path.join(
  __dirname,
  '../src/locales/xx.js'
);

const wordRE = /^[A-Za-z]+$/;
const maxLineLen = 80;

function makeArrows() {
  const lines = fs
    .readFileSync(pathToCombinedTranslationKeys, 'utf-8')
    .split(/\r?\n/);
  const entries = lines
    .map(line => {
      const key = line.split(/\/\//)[0].trim();
      const quoteChar = key.indexOf("'") === -1 ? "'" : '"';

      if (key.indexOf('"') !== -1) {
        throw new Error('double quotes are not supported, key: ' + key);
      }

      const maybeQuoteKey = wordRE.test(key)
        ? key
        : quoteChar + key + quoteChar;
      const arrowStr = arrowPad(getArrowLen(key));

      const quotedVal = quoteChar + arrowStr + key + arrowStr + quoteChar + ',';
      const singleLine = '  ' + maybeQuoteKey + ': ' + quotedVal;

      if (singleLine.length <= maxLineLen) {
        return singleLine;
      }

      return '  ' + maybeQuoteKey + ':\n    ' + quotedVal;
    })
    .join('\n');

  const head = 'export default {';
  const tail = '};\n';

  fs.writeFileSync(pathToArrowsOut, [head, entries, tail].join('\n'));
  console.log('arrows mock translation written to: ' + pathToArrowsOut);
}

// inferred from the arrow file Greg provided
const arrowFactor = 5.7;
function getArrowLen(key) {
  return Math.max(1, Math.round(key.length / arrowFactor));
}

function arrowPad(n) {
  let out = '';
  for (let i = 0; i < n; i++) {
    out += '⇚';
  }
  return out;
}

makeArrows();

process.on('exit', function(code) {
  if (code === 1) {
    throw new Error('makeArrows failed.');
  }
});
