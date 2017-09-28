"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/*
 * A small helper module for getting the coordinates of a DOM Selection object.
 */

var getSelectionRect = function getSelectionRect(selection) {
  // We need a range to get a rect.
  if (!selection.rangeCount) {
    return null;
  }

  // Introduction to the Range objects:
  // http://www.quirksmode.org/dom/range_intro.html
  var range = selection.getRangeAt(0);

  // Collapse selection to end for consistent positioning
  range.collapse(false);

  /*
     * Safari/WebKit has a bug where getBoundingClientRect has incorrect results
     * I've consistently seen all measurements be 0 for Safari;
     * use getClientRects as a workaround. -@coopy
     * https://bugs.webkit.org/show_bug.cgi?id=46203
     */
  var boundingClientRect = range.getBoundingClientRect();
  var clientRect = range.getClientRects()[0];

  return boundingClientRect.top > 0 ? boundingClientRect : clientRect;
};

var getscrollOffset = function getscrollOffset(containerOffset) {
  if (typeof window.pageXOffset === "number") {
    return {
      x: window.pageXOffset,
      y: containerOffset + window.pageYOffset
    };
  }

  if (typeof window.scrollX === "number") {
    return {
      x: window.scrollX,
      y: containerOffset + window.scrollY
    };
  }

  return { x: 0, y: containerOffset };
};

/**
 * Get the {x, y} coordinates of a DOM Selection object,
 * relative to the viewport.
 *
 * @param {Selection} selection a DOM Selection object
 *        (i.e. from `window.getSelection()`)
 * @returns {Object} An object with x and y in pixels
 */
var getSelectionCoordinates = function getSelectionCoordinates(selection, containerOffset) {
  var scrollOffset = getscrollOffset(containerOffset);
  var coordinates = { x: scrollOffset.x, y: scrollOffset.y };

  if (!selection || !selection.anchorNode) {
    return coordinates;
  }

  var rect = getSelectionRect(selection);

  if (rect) {
    // Add to the offset
    coordinates.x += rect.left;
    coordinates.y += rect.top;
  }

  return coordinates;
};

exports.default = getSelectionCoordinates;
module.exports = exports["default"];
//# sourceMappingURL=getSelectionCoordinates.js.map