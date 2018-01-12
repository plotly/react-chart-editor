import path from 'path';
import fs from 'fs';

// generalize so we can use this script in other es6 repos
// so you can call:
//   combineTranslationKeys <inputPath> <inputPath> <inputPath> ... <outputPath>

const pathToCombinedTranslationKeys = path.join(
  __dirname,
  './translationKeys/combined-translation-keys.txt'
);

const plotlyJS = path.join(
  __dirname,
  '../node_modules/plotly.js/dist/translation-keys.txt'
);

const editor = path.join(__dirname, './translationKeys/translation-keys.txt');

const argvLen = process.argv.length;
const minHasPaths = 4;

const hasPaths = argvLen >= minHasPaths;

const inputPaths = hasPaths
  ? process.argv.slice(2, argvLen - 1)
  : [plotlyJS, editor];

const outputPath = hasPaths
  ? process.argv[argvLen - 1]
  : pathToCombinedTranslationKeys;

combineTranslationKeys();

function combineTranslationKeys() {
  const dict = {};
  let maxLen = 0;

  inputPaths.forEach(inputPath => {
    const lines = fs.readFileSync(inputPath, 'utf-8').split(/\r?\n/);

    const repository = getRepository(inputPath);

    lines.forEach(line => {
      const splitString = line.split(/\/\//);
      const stringToTranslate = splitString[0].trim();
      const source = splitString[1].trim();
      maxLen = Math.max(maxLen, stringToTranslate.length);

      if (!dict[stringToTranslate]) {
        dict[stringToTranslate] = ' // ' + repository + ': ' + source;
      } else {
        dict[stringToTranslate] += ` && ${repository}: ${source}`;
      }
    });
  });

  const strings = Object.keys(dict)
    .sort()
    .map(k => k + spaces(maxLen - k.length) + dict[k])
    .join('\n');

  fs.writeFile(outputPath, strings);
  console.log(`combined translation keys were written to: ${outputPath}`);
}

function getRepository(inputPath) {
  var dir = path.dirname(inputPath);
  if (fs.existsSync(path.join(dir, 'package.json'))) {
    return path.basename(dir);
  }
  return getRepository(dir);
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
