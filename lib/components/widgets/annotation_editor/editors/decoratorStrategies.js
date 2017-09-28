"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findLinkEntities = undefined;

var _draftJs = require("draft-js");

var characterIsLinkEntity = function characterIsLinkEntity(character) {
  var entityKey = character.getEntity();

  if (entityKey === null) {
    return false;
  }

  var entity = _draftJs.Entity.get(entityKey);

  return entity.getType() === "LINK";
}; /*
    * A decoratorStrategy is used by `draft-js` to determine how to render
    * content beyond inline styles. We use them to render LINK entities.
    *
    * See https://facebook.github.io/draft-js/docs/advanced-topics-decorators.html#content
    * and
    * https://facebook.github.io/draft-js/docs/advanced-topics-entities.html#content
    */
var findLinkEntities = exports.findLinkEntities = function findLinkEntities(contentBlock, callback) {
  contentBlock.findEntityRanges(characterIsLinkEntity, callback);
};
//# sourceMappingURL=decoratorStrategies.js.map