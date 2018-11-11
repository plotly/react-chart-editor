'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/*eslint-disable */

/**
 * Capitalize string
 */
function capitalize(s) {
  return !s ? '' : s.charAt(0).toUpperCase() + s.substring(1);
}

/**
 * "Safer" String.toLowerCase()
 */
function lowerCase(str) {
  return str.toLowerCase();
}

/**
 * "Safer" String.toUpperCase()
 */
function upperCase(str) {
  return str.toUpperCase();
}

/**
 * Remove non-word chars.
 */
function removeNonWord(str) {
  return str.replace(/[^0-9a-zA-Z\xC0-\xFF \-]/g, '');
}

/**
 * Convert string to camelCase text.
 */
function camelCase(string) {
  return string.replace(/\-/g, ' ').replace(/(\d)(?=(\d{1})+$)/g, '$1 ').replace(/\s[a-z]/g, upperCase).replace(/\s+/g, '').replace(/^[A-Z]/g, lowerCase);
}

function pascalCase(str) {
  return camelCase(str).replace(/^[a-z]/, upperCase);
}

exports.capitalize = capitalize;
exports.lowerCase = lowerCase;
exports.upperCase = upperCase;
exports.removeNonWord = removeNonWord;
exports.camelCase = camelCase;
exports.pascalCase = pascalCase;

/* eslint-enable */
//# sourceMappingURL=strings.js.map