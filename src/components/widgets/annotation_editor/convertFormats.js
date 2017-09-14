const getTextBlockRegExp = () => /\\text\{([^\}]*)\}/g;

/**
 * To match any character including newline whitespace, use `[\s\S]*`
 * instead of `.*`. http://stackoverflow.com/a/1068308
 */
const getLaTeXWrappedRegExp = () => /^\$[\s\S]*\$$/;

const stripHTMLTags = html => html.replace(/<[^>]*>/g, "").trim();

const extractTextBlocks = laTeX => {
  let matchObj;
  let matchStr;
  const breakTag = "<br>";
  const matches = [];
  // Need to stringify to match literally on `\t`.
  const stringifiedLaTeX = JSON.stringify(laTeX);
  const regExp = getTextBlockRegExp();

  /**
     * Find multiple matches with the ``//g` flag.
     * The `RegExp.prototype.exec` API mutates the RegExp object.
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec#Finding_successive_matches
     */
  while ((matchObj = regExp.exec(stringifiedLaTeX)) !== null) {
    matchStr = matchObj[1].trim().replace("\\n", "");
    matches.push(matchStr);
  }

  return matches.join("<br>");
};

const wrapLaTeX = value => (value ? `$${value}$` : "$$");

const wrapText = value => (value ? `\\text{${value}}` : "\\text{}");

// Exports
// -------

export const isLaTeXExpr = value => getLaTeXWrappedRegExp().test(value);

export const hasTextExpression = laTeX => {
  const regExp = getTextBlockRegExp();
  const stringifiedLaTeX = JSON.stringify(laTeX);

  return regExp.test(stringifiedLaTeX);
};

export const htmlToLaTeX = html => {
  const breakTag = "<br>";
  const trimmedHTML = html.trim();

  // Handle empty input
  if (trimmedHTML === "") return wrapLaTeX(wrapText());

  // Handle input with only linebreaks
  if (trimmedHTML.replace(breakTag, "") === "") return wrapLaTeX(wrapText());

  return wrapLaTeX(
    trimmedHTML
      .split(breakTag)
      // Ignore empty linebreaks
      .map(para => (para.length ? wrapText(stripHTMLTags(para)) : ""))
      .join("\n")
  );
};

export const laTeXToHTML = laTeX => {
  const trimmedLaTeX = laTeX.trim();

  return extractTextBlocks(trimmedLaTeX);
};
