'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var getCoordinates = function getCoordinates() {
  var coordinates = { x: 0, y: 0 };

  var rect = document.getElementsByClassName('text-editor')[0].getBoundingClientRect();

  var LINK_POP_UP_WIDTH = 158.5;

  if (rect) {
    // Add to the offset
    coordinates.x += rect.width * 0.5 - LINK_POP_UP_WIDTH / 2;
    coordinates.y += rect.height * 0.5;
  }

  return coordinates;
};

exports.default = getCoordinates;
//# sourceMappingURL=getSelectionCoordinates.js.map