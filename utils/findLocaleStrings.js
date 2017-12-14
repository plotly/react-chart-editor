import {transform} from 'babel-core';
import traverse from 'babel-traverse';
import fs from 'fs';
import glob from 'glob';
import path from 'path';

const pathToSrc = path.join(__dirname, '../src');
const srcGlob = path.join(pathToSrc, '**/*.js');

let EXIT_CODE = 0;
const localizeRE = /(^|[\.])(_|localize)$/;

findLocaleStrings();

function findLocaleStrings() {
  glob(srcGlob, (err, files) => {
    if (err) {
      EXIT_CODE = 1;
      console.log(err);
      return;
    }

    const dict = {};
    let hasTranslation = false;
    let maxLen = 0;

    files.forEach(file => {
      const code = fs.readFileSync(file, 'utf-8');
      const filePartialPath = file.substr(pathToSrc.length);
      const ast = transform(code, {
        presets: ['react', 'es2015', 'stage-2'],
      }).ast;

      traverse(ast, {
        enter(path) {
          if (
            path.node.type === 'CallExpression' &&
            path.node.callee.name === '_'
          ) {
            const strNode = path.node.arguments[0];
            let strNodeValue = strNode.value;

            if (path.node.arguments.length !== 1) {
              logError(file, path.node, 'Localize takes 1 args');
            }

            if (
              ['StringLiteral', 'BinaryExpression'].indexOf(strNode.type) < 0
            ) {
              logError(
                file,
                path.node,
                `The localization function takes a string as argument, instead it received a ${
                  strNode.type
                }`
              );
            }

            if (strNode.type === 'BinaryExpression') {
              strNodeValue = path.get('arguments')[0].evaluate().value;
              if (typeof strNodeValue !== 'string') {
                logError(
                  file,
                  path.node,
                  `The localization function takes a string as argument, instead it received a ${typeof strNodeValue}`
                );
              }
            }

            if (!dict[strNodeValue]) {
              dict[strNodeValue] =
                filePartialPath + ':' + strNode.loc.start.line;
              maxLen = Math.max(maxLen, strNodeValue.length);
              hasTranslation = true;
            }
          }
        },
      });
    });

    if (!hasTranslation) {
      console.error('Found no translations.');
      EXIT_CODE = 1;
    }

    if (!EXIT_CODE) {
      const strings = Object.keys(dict)
        .sort()
        .map(k => k + spaces(maxLen - k.length) + '  // ' + dict[k])
        .join('\n');
      const pathToTranslationKeys = path.join(__dirname, 'translationKeys.txt');
      fs.writeFile(pathToTranslationKeys, strings);
      console.log('ok find_locale_strings');
    }
  });
}

function logError(file, node, msg) {
  console.error(file + ' [line ' + node.loc.start.line + '] ' + msg + '\n   ');
  EXIT_CODE = 1;
}

function spaces(len) {
  let out = '';
  for (let i = 0; i < len; i++) {
    out += ' ';
  }
  return out;
}

process.on('exit', function() {
  if (EXIT_CODE) {
    throw new Error('find_locale_strings failed.');
  }
});
