"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.suppressContentEditableWarning = suppressContentEditableWarning;
exports.restoreContentEditableWarning = restoreContentEditableWarning;
/*
* TODO: Get rid of this once we've upgraded to React 15 and latest draft-js:
* https://github.com/facebook/draft-js/pull/98
* https://github.com/plotly/streambed/issues/6121
*/

/* eslint-disable no-console */
var originalConsoleError = void 0;

var prodEnv = process.env.NODE_ENV === "production";
var testEnv = process.env.NODE_ENV === "test";

// Log a message in development; suppress in test
var log = function log(message) {
  if (testEnv) {
    return;
  }

  console.log(message);
};

var modifiedConsoleError = function modifiedConsoleError(exception) {
  var stringToSuppress = "Warning: A component is `contentEditable`";
  try {
    if (String(exception).indexOf(stringToSuppress) === 0) {
      return;
    }
  } catch (e) {
    originalConsoleError.apply(console, ["Error while searching for contentEditable warning"]);
    originalConsoleError.apply(console, e);
  }

  originalConsoleError.apply(console, arguments);
};

function suppressContentEditableWarning() {
  if (prodEnv || testEnv) {
    return;
  }

  log("Replacing `console.error` implementation to suppress " + "`contentEditable` warning");
  originalConsoleError = console.error;
  console.error = modifiedConsoleError;
}

function restoreContentEditableWarning() {
  if (prodEnv || testEnv) {
    return;
  }

  if (originalConsoleError) {
    log("Restoring `console.error` implementation");
    console.error = originalConsoleError;
  }
}

/* eslint-enable no-console */
//# sourceMappingURL=suppressContentEditableWarning.js.map