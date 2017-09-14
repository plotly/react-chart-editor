const _entityKey = "someKey";

module.exports = {
  // Return the same editorState as was passed in (fake behavior)
  collapseSelectionAtOffset: editorState => editorState,

  // `selection` is a trojan horse that determines return value
  cursorHasLink: (editorState, selection) => selection,

  getEntityKeyAt: () => _entityKey,

  getSelectedEntityEndOffset: () => {},

  _entityKey,
};
