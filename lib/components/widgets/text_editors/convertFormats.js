'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var getTextBlockRegExp = function getTextBlockRegExp() {
  return (/\\text\{([^}]*)}/g
  );
};

/**
 * To match any character including newline whitespace, use `[\s\S]*`
 * instead of `.*`. http://stackoverflow.com/a/1068308
 *
 * @returns {RegExp} the regular expression
 */
var getLaTeXWrappedRegExp = function getLaTeXWrappedRegExp() {
  return (/^\$[\s\S]*\$$/
  );
};

var stripHTMLTags = function stripHTMLTags(html) {
  return html.replace(/<[^>]*>/g, '').trim();
};

var extractTextBlocks = function extractTextBlocks(laTeX) {
  var matchObj = void 0;
  var matchStr = void 0;
  var matches = [];

  // Need to stringify to match literally on `\t`.
  var stringifiedLaTeX = JSON.stringify(laTeX);
  var regExp = getTextBlockRegExp();

  /**
   * Find multiple matches with the ``//g` flag.
   * The `RegExp.prototype.exec` API mutates the RegExp object.
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec#Finding_successive_matches
   */
  while ((matchObj = regExp.exec(stringifiedLaTeX)) !== null) {
    matchStr = matchObj[1].trim().replace('\\n', '');
    matches.push(matchStr);
  }

  return matches.join('<br>');
};

var wrapLaTeX = function wrapLaTeX(value) {
  return value ? '$' + value + '$' : '$$';
};

var wrapText = function wrapText(value) {
  return value ? '\\text{' + value + '}' : '\\text{}';
};

// Exports
// -------

var isLaTeXExpr = exports.isLaTeXExpr = function isLaTeXExpr(value) {
  return getLaTeXWrappedRegExp().test(value);
};

var hasTextExpression = exports.hasTextExpression = function hasTextExpression(laTeX) {
  var regExp = getTextBlockRegExp();
  var stringifiedLaTeX = JSON.stringify(laTeX);

  return regExp.test(stringifiedLaTeX);
};

var htmlToLaTeX = exports.htmlToLaTeX = function htmlToLaTeX(html) {
  var breakTag = '<br>';
  var trimmedHTML = html.trim();

  // Handle empty input
  if (trimmedHTML === '') {
    return wrapLaTeX(wrapText());
  }

  // Handle input with only linebreaks
  if (trimmedHTML.replace(breakTag, '') === '') {
    return wrapLaTeX(wrapText());
  }

  return wrapLaTeX(trimmedHTML.split(breakTag)

  // Ignore empty linebreaks
  .map(function (para) {
    return para.length ? wrapText(stripHTMLTags(para)) : '';
  }).join('\n'));
};

var laTeXToHTML = exports.laTeXToHTML = function laTeXToHTML(laTeX) {
  var trimmedLaTeX = laTeX.trim();

  return extractTextBlocks(trimmedLaTeX);
};
//# sourceMappingURL=convertFormats.js.map