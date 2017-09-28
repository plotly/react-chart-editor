"use strict";

var _entityKey = "someKey";

module.exports = {
  // Return the same editorState as was passed in (fake behavior)
  collapseSelectionAtOffset: function collapseSelectionAtOffset(editorState) {
    return editorState;
  },

  // `selection` is a trojan horse that determines return value
  cursorHasLink: function cursorHasLink(editorState, selection) {
    return selection;
  },

  getEntityKeyAt: function getEntityKeyAt() {
    return _entityKey;
  },

  getSelectedEntityEndOffset: function getSelectedEntityEndOffset() {},

  _entityKey: _entityKey
};
//# sourceMappingURL=DraftCommands.js.map