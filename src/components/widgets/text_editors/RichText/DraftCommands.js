/*
 * This module exports functions that act on a DraftJS EditorState to
 * effect commands.
 */

import {
  EditorState,
  Entity,
  RichUtils,

  // Note: disable eslint cause SelectionState is mentioned quite often in JSDoc
  // eslint-disable-next-line no-unused-vars
  SelectionState,
} from 'draft-js';
import {removeRange} from 'draft-js/lib/DraftModifier';

import {BOLD, ITALIC, SUPERSCRIPT, SUBSCRIPT, LINK} from './configuration';

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
export function cursorHasLink(editorState, selection) {
  const entity = getEntityByKey(getEntityKeyAt(editorState, selection));

  return Boolean(entity && entity.get('type') === LINK);
}

/**
 * Get an entity by its key
 * Links are represented as DraftJS entities.
 * https://facebook.github.io/draft-js/docs/api-reference-entity.html#content
 *
 * @param   {String} entityKey    The entity key
 * @returns {DraftEntityInstance} The entity for the key, or `null` if not found
 */
export function getEntityByKey(entityKey) {
  if (!entityKey) {
    return null;
  }

  return Entity.get(entityKey);
}

/**
 * For a given SelectionState, get the underlying entity key.
 *
 * @param   {EditorState} editorState  The DraftJS editor state
 * @param   {SelectionState} selection The DraftJS selection state
 * @returns {String}                   The entity key, or `null` if not found
 */
export function getEntityKeyAt(editorState, selection) {
  if (!selection) {
    return null;
  }

  const blockStartKey = selection.getStartKey();
  const selectionOffset = selection.getStartOffset();

  const contentState = editorState.getCurrentContent();
  const block = contentState.getBlockForKey(blockStartKey);

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
export function handleKeyCommand(editorState, command) {
  switch (command) {
    case 'split-block':
      // Never split editor content into `<p>` blocks.
      return insertSoftNewline(editorState);
    case 'bold':
      return toggleInlineStyle(editorState, BOLD);
    case 'italic':
      return toggleInlineStyle(editorState, ITALIC);
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
export function insertSoftNewline(editorState) {
  let newEditorState = editorState;

  // Terminate all current inline styles
  const currentStyleSet = newEditorState.getCurrentInlineStyle();
  newEditorState = currentStyleSet.reduce(
    (reducedEditorState, style) => RichUtils.toggleInlineStyle(reducedEditorState, style),
    newEditorState
  );

  // If text is selected, delete text first.
  const selectionState = newEditorState.getSelection();
  const selectionStart = selectionState.getStartOffset();
  const selectionEnd = selectionState.getEndOffset();

  if (selectionEnd - selectionStart !== 0) {
    const contentState = removeRange(newEditorState.getCurrentContent(), selectionState, 'back');

    newEditorState = EditorState.push(newEditorState, contentState, 'backspace-character');
  }

  // Insert a newline
  return RichUtils.insertSoftNewline(newEditorState);
}

/**
 * Toggle an inline style on/off
 *
 * @param   {EditorState} editorState The DraftJS editor state
 * @param   {String} inlineStyle      The inline style string representation
 * @returns {EditorState}             The new editor state
 */
export function toggleInlineStyle(editorState, inlineStyle) {
  /*
     * TODO tech-debt. Link toggles should not go via toggleInlineStyle.
     * https://github.com/plotly/streambed/issues/6354
     */

  if (inlineStyle === LINK) {
    return toggleLink(editorState);
  }

  // <sub> and <sup> should be mutually exclusive.
  const updatedEditorState = toggleMutuallyExclusiveStyles(editorState, inlineStyle);

  // Add the new style.
  return RichUtils.toggleInlineStyle(updatedEditorState, inlineStyle);
}

/**
 * Toggle a link on/off
 *
 * @param   {EditorState} editorState The DraftJS editor state
 * @returns {EditorState}             The new editor state
 */
export function toggleLink(editorState) {
  const selection = editorState.getSelection();

  if (selectionHasLink(editorState, selection)) {
    // Remove link
    return RichUtils.toggleLink(editorState, selection, null);
  }

  // Create a link with an empty URL
  const entityKey = Entity.create(LINK, 'MUTABLE', {url: ''});

  return RichUtils.toggleLink(editorState, selection, entityKey);
}

/**
 * For the current selection, if a SUPERSCRIPT or SUBSCRIPT style is
 * to be applied, un-apply the other style.
 *
 * @param {EditorState} editorState The DraftJS editor state
 * @param {String} inlineStyle      Style about to be applied
 * @returns {EditorState}           The new editor state
 */
export function toggleMutuallyExclusiveStyles(editorState, inlineStyle) {
  const currentStyleSet = editorState.getCurrentInlineStyle();

  if (inlineStyle === SUBSCRIPT && currentStyleSet.includes(SUPERSCRIPT)) {
    return RichUtils.toggleInlineStyle(editorState, SUPERSCRIPT);
  }

  if (inlineStyle === SUPERSCRIPT && currentStyleSet.includes(SUBSCRIPT)) {
    return RichUtils.toggleInlineStyle(editorState, SUBSCRIPT);
  }

  return editorState;
}
