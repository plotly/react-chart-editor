import path from 'path';
import fs from 'fs';

const pathToCombinedTranslationKeys = path.join(
  __dirname,
  'combinedTranslationKeys.txt'
);

const plotlyJS = {
  repository: 'plotly.js',
  path: path.join(
    __dirname,
    '../node_modules/plotly.js/dist/translation-keys.txt'
  ),
};

const editor = {
  repository: 'react-plotly.js-editor',
  path: path.join(__dirname, './translationKeys.txt'),
};

combineTranslationKeys();

function combineTranslationKeys() {
  const dict = {};
  let maxLen = 0;

  [plotlyJS, editor].forEach(file => {
    const lines = fs.readFileSync(file.path, 'utf-8').split(/\r?\n/);

    lines.forEach(line => {
      const splitString = line.split(/\/\//);
      const stringToTranslate = splitString[0].trim();
      const source = splitString[1].trim();
      maxLen = Math.max(maxLen, stringToTranslate.length);

      if (!dict[stringToTranslate]) {
        dict[stringToTranslate] = ' // ' + file.repository + ': ' + source;
      } else {
        dict[stringToTranslate] += ` && ${file.repository}: ${source}`;
      }
    });
  });

  const strings = Object.keys(dict)
    .sort()
    .map(k => k + spaces(maxLen - k.length) + dict[k])
    .join('\n');

  fs.writeFile(pathToCombinedTranslationKeys, strings);
  console.log(
    `translation keys were written to: ${pathToCombinedTranslationKeys}`
  );
}

function spaces(len) {
  let out = '';
  for (let i = 0; i < len; i++) {
    out += ' ';
  }
  return out;
}

process.on('exit', function(code) {
  if (code === 1) {
    throw new Error('combineTranslationKeys failed.');
  }
});
