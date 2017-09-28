"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cursorHasLink = cursorHasLink;
exports.getEntityByKey = getEntityByKey;
exports.getEntityKeyAt = getEntityKeyAt;
exports.handleKeyCommand = handleKeyCommand;
exports.insertSoftNewline = insertSoftNewline;
exports.toggleInlineStyle = toggleInlineStyle;
exports.toggleLink = toggleLink;
exports.toggleMutuallyExclusiveStyles = toggleMutuallyExclusiveStyles;

var _draftJs = require("draft-js");

var _DraftModifier = require("draft-js/lib/DraftModifier");

var _RichTextEditorConfiguration = require("./RichTextEditorConfiguration");

/**
* Check whether the current selection is over a link
*
* @param   {EditorState} editorState   The DraftJS editor state
* @param   {SelectionState} selection  A DraftJS selection state
* @returns {Boolean}                   `true` if selection is over a link
*/
function selectionHasLink(editorState, selection) {
  // If nothing is selected, bail early.
  if (selection.isCollapsed()) {
    return false;
  }

  return cursorHasLink(editorState, selection);
}

/**
* Check whether the cursor position is over a link
*
* @param   {EditorState} editorState   The DraftJS editor state
* @param   {SelectionState} selection  A DraftJS selection state
* @returns {Boolean}                   `true` if cursor is over a link
*/
/*
 * This module exports functions that act on a DraftJS EditorState to
 * effect commands.
 */

function cursorHasLink(editorState, selection) {
  var entity = getEntityByKey(getEntityKeyAt(editorState, selection));

  return Boolean(entity && entity.get("type") === "LINK");
}

/**
 * Get an entity by its key
 * Links are represented as DraftJS entities.
 * https://facebook.github.io/draft-js/docs/api-reference-entity.html#content
 *
 * @param   {String} entityKey    The entity key
 * @returns {DraftEntityInstance} The entity for the key, or `null` if not found
 */
function getEntityByKey(entityKey) {
  if (!entityKey) {
    return null;
  }

  return _draftJs.Entity.get(entityKey);
}

/**
 * For a given SelectionState, get the underlying entity key.
 *
 * @param   {EditorState} editorState  The DraftJS editor state
 * @param   {SelectionState} selection The DraftJS selection state
 * @returns {String}                   The entity key, or `null` if not found
 */
function getEntityKeyAt(editorState, selection) {
  if (!selection) {
    return null;
  }

  var blockStartKey = selection.getStartKey();
  var selectionOffset = selection.getStartOffset();

  var contentState = editorState.getCurrentContent();
  var block = contentState.getBlockForKey(blockStartKey);

  return block.getEntityAt(selectionOffset);
}

/**
 * Handle a keyboard command.
 * TODO: add custom CMD-k command for link button.
 * https://github.com/plotly/streambed/issues/6384
 *
 * @param   {EditorState} editorState The DraftJS editor state
 * @param   {String} command          The command string representation
 * @returns {EditorState}             The new editor state
 */
function handleKeyCommand(editorState, command) {
  switch (command) {
    case "split-block":
      // Never split editor content into `<p>` blocks.
      return insertSoftNewline(editorState);
    case "bold":
      return toggleInlineStyle(editorState, _RichTextEditorConfiguration.BOLD);
    case "italic":
      return toggleInlineStyle(editorState, _RichTextEditorConfiguration.ITALIC);
    default:
      return false;
  }
}

/**
 * Insert a soft newline `\n` that converts to `<br>` in HTML.
 *
 * @param   {EditorState} editorState The DraftJS editor state
 * @returns {EditorState}             The new editor state
 */
function insertSoftNewline(editorState) {
  var newEditorState = editorState;

  // Terminate all current inline styles
  var currentStyleSet = newEditorState.getCurrentInlineStyle();
  newEditorState = currentStyleSet.reduce(function (reducedEditorState, style) {
    return _draftJs.RichUtils.toggleInlineStyle(reducedEditorState, style);
  }, newEditorState);

  // If text is selected, delete text first.
  var selectionState = newEditorState.getSelection();
  var selectionStart = selectionState.getStartOffset();
  var selectionEnd = selectionState.getEndOffset();

  if (selectionEnd - selectionStart !== 0) {
    var contentState = (0, _DraftModifier.removeRange)(newEditorState.getCurrentContent(), selectionState, "back");

    newEditorState = _draftJs.EditorState.push(newEditorState, contentState, "backspace-character");
  }

  // Insert a newline
  return _draftJs.RichUtils.insertSoftNewline(newEditorState);
}

/**
 * Toggle an inline style on/off
 *
 * @param   {EditorState} editorState The DraftJS editor state
 * @param   {String} inlineStyle      The inline style string representation
 * @returns {EditorState}             The new editor state
 */
function toggleInlineStyle(editorState, inlineStyle) {
  /*
     * TODO tech-debt. Link toggles should not go via toggleInlineStyle.
     * https://github.com/plotly/streambed/issues/6354
     */

  if (inlineStyle === "LINK") {
    return toggleLink(editorState);
  }

  // <sub> and <sup> should be mutually exclusive.
  var updatedEditorState = toggleMutuallyExclusiveStyles(editorState, inlineStyle);

  // Add the new style.
  return _draftJs.RichUtils.toggleInlineStyle(updatedEditorState, inlineStyle);
}

/**
 * Toggle a link on/off
 *
 * @param   {EditorState} editorState The DraftJS editor state
 * @returns {EditorState}             The new editor state
 */
function toggleLink(editorState) {
  var selection = editorState.getSelection();

  if (selectionHasLink(editorState, selection)) {
    // Remove link
    return _draftJs.RichUtils.toggleLink(editorState, selection, null);
  }

  // Create a link with an empty URL
  var entityKey = _draftJs.Entity.create("LINK", "MUTABLE", { url: "" });

  return _draftJs.RichUtils.toggleLink(editorState, selection, entityKey);
}

/**
 * For the current selection, if a SUPERSCRIPT or SUBSCRIPT style is
 * to be applied, un-apply the other style.
 *
 * @param {EditorState} editorState The DraftJS editor state
 * @param {String} inlineStyle      Style about to be applied
 * @returns {EditorState}           The new editor state
 */
function toggleMutuallyExclusiveStyles(editorState, inlineStyle) {
  var currentStyleSet = editorState.getCurrentInlineStyle();

  if (inlineStyle === _RichTextEditorConfiguration.SUBSCRIPT && currentStyleSet.includes(_RichTextEditorConfiguration.SUPERSCRIPT)) {
    return _draftJs.RichUtils.toggleInlineStyle(editorState, _RichTextEditorConfiguration.SUPERSCRIPT);
  }

  if (inlineStyle === _RichTextEditorConfiguration.SUPERSCRIPT && currentStyleSet.includes(_RichTextEditorConfiguration.SUBSCRIPT)) {
    return _draftJs.RichUtils.toggleInlineStyle(editorState, _RichTextEditorConfiguration.SUBSCRIPT);
  }

  return editorState;
}
//# sourceMappingURL=DraftCommands.js.map