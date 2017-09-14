import React, { PropTypes } from "react";

/*
 * TODO Use rollupipfy with tree-shaking. Without it, the entire draft-js
 * library is imported, which adds 58kb to the minified bundle.
 * https://github.com/plotly/streambed/issues/6385
 *
 */
import {
  CompositeDecorator,
  Editor,
  EditorState,
  Entity,
  RichUtils,
} from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import { stateFromHTML } from "draft-js-import-html";

// Constants
import {
  SUPERSCRIPT,
  SUBSCRIPT,
  LINK,
  STYLES_TO_HTML_TAGS,
  STYLE_MAP,
  INLINE_STYLES,
  LINK_EDITOR_VERTICAL_OFFSET,
  LINK_EDITOR_HORIZONTAL_OFFSET,
} from "./RichTextEditorConfiguration";

// Components
import LinkDecorator from "./LinkDecorator";
import LinkEditor from "./LinkEditor";
import StyleButtonGroup from "./StyleButtonGroup";

// Libraries
import debounce from "./debounce";
import {
  getEntityKeyAt,
  getEntityByKey,
  toggleInlineStyle,
  handleKeyCommand,
  insertSoftNewline,
  cursorHasLink,
} from "./DraftCommands";
import { findLinkEntities } from "./decoratorStrategies";
import getSelectionCoordinates from "./getSelectionCoordinates";
import {
  suppressContentEditableWarning,
  restoreContentEditableWarning,
} from "@workspace/components/widgets/annotation_editor/suppressContentEditableWarning";

const RichTextEditor = React.createClass({
  propTypes: {
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string,
  },

  getDefaultProps() {
    return {
      placeholder: "",
      value: "",
    };
  },

  getInitialState() {
    /*
         * Initially set state based on the plotly.js annotation content.
         * After this, as long as this component is mounted, it owns the source
         * of truth for the annotation value via `this.state.editorState`.
         * This state may be updated externally via a prop update.
         * See `componentWillReceiveProps`.
         */
    if (this.props.value.trim().length) {
      return {
        editorState: this.createEditorStateFromHTML(this.props.value),
      };
    }

    return {
      editorState: EditorState.createEmpty(this.getDecorator()),
    };
  },

  componentWillMount() {
    // TODO: Remove https://github.com/plotly/streambed/issues/6121
    suppressContentEditableWarning();
  },

  componentWillUnmount() {
    // TODO: Remove https://github.com/plotly/streambed/issues/6121
    restoreContentEditableWarning();
  },

  componentWillReceiveProps(nextProps) {
    const { linkEditorFocus, editorFocus } = this.state;

    /*
         * Don't worry about what plotly.js thinks the annotation value
         * should be while we're using our editor, for these reasons:
         *
         * 1. The editor should be considered the source of truth, unless the
         *    user is actually editing the annotation inline, in the chart.
         * 2. Sometimes we get updates with stale values.
         */
    if (linkEditorFocus || editorFocus) {
      return;
    }

    // Sync editor state with plotly annotation value.
    const editorState = this.createEditorStateFromHTML(nextProps.value);

    this.setState({ editorState });
  },

  shouldComponentUpdate(nextProps, nextState) {
    const { placeholder, value } = this.props;
    const { editorState, linkEditorFocus } = this.state;

    // If relevant props or state changed, return true.
    if (
      // Always update when user is editing link
      linkEditorFocus ||
      placeholder !== nextProps.placeholder ||
      value !== nextProps.value ||
      editorState !== nextState.editorState
    ) {
      return true;
    }

    // Compare incoming value with HTML representation of state.
    return nextProps.value !== this.getEditorStateAsHTML(editorState);
  },

  getDecorator() {
    return new CompositeDecorator([
      {
        strategy: findLinkEntities,
        component: LinkDecorator,
        // Props for the LinkDecorator component
        props: {
          style: STYLE_MAP[LINK],
        },
      },
    ]);
  },

  createEditorStateFromHTML(html) {
    const contentState = stateFromHTML(html, {
      elementStyles: {
        sup: SUPERSCRIPT,
        sub: SUBSCRIPT,
      },
    });

    const decorator = this.getDecorator();

    /*
         * Work around issue described here:
         * https://github.com/facebook/draft-js/issues/185
         * #issuecomment-217207612
         */

    // Parse once to generate entity instances
    EditorState.createWithContent(contentState);
    // Now we can add our decorator
    return EditorState.createWithContent(contentState, decorator);
  },

  getEditorStateAsHTML(editorState) {
    const contentState = editorState.getCurrentContent();

    return stateToHTML(contentState, {
      blockTags: false,
      inlineTags: STYLES_TO_HTML_TAGS,
    });
  },

  focus() {
    this.refs.editor.focus();
  },

  // Used to properly calculate user selection coordinates.
  getParentContainerVerticalOffset() {
    return document.querySelector(".js-edit-mode-panel").scrollTop;
  },

  onChange(editorState) {
    const { selectedLinkID } = this.state;
    const selection = editorState.getSelection();
    const entityKey = getEntityKeyAt(editorState, selection);

    const newState = { editorState };

    // Update selected link ID
    if (!cursorHasLink(editorState, selection)) {
      // If a link is no longer selected, clear selected link ID state
      Object.assign(newState, {
        selectedLinkID: null,
      });
    } else if (selectedLinkID !== entityKey) {
      // If link selection is new / different link selected, update it
      Object.assign(newState, {
        selectedLinkID: entityKey,
      });
    }

    // Update internal state
    this.setState(newState);

    // Dispatch changes to plotly.js
    // TODO consider moving to render (plotly.js is a render target)
    const htmlContent = this.getEditorStateAsHTML(editorState);
    if (this.props.value !== htmlContent) {
      debounce(this.props.onChange, [htmlContent]);
    }
  },

  onBlur() {
    this.setState({
      editorFocus: false,
    });
  },

  onFocus() {
    this.setState({
      editorFocus: true,
    });
  },

  onLinkEditorBlur() {
    this.setState({
      linkEditorFocus: false,
    });
  },

  onLinkEditorFocus() {
    this.setState({
      linkEditorFocus: true,
    });
  },

  onLinkEditorChange(linkID, urlValue) {
    const { editorState } = this.state;
    const selectionState = editorState.getSelection();

    // Update link URL
    Entity.replaceData(linkID, { url: urlValue });

    // Trigger an editor state update
    const updatedEditorState = RichUtils.toggleLink(
      editorState,
      selectionState,
      linkID
    );

    this.onChange(updatedEditorState);
  },

  /**
     * Will be called by LinkEditor when the user confirms or cancels new URL.
     * Will not be called if LinkEditor is closed by moving the cursor off of
     * the selected LINK entity.
     *
     * @param   {String} linkID The link entity key related to this LinkEditor
     * @returns {undefined}
     */
  onLinkEditorClose() {
    /*
         * Focus on editor immediately to avoid error that occurs when
         * `selection.extend` is called and another element has focus.
         * https://bugzilla.mozilla.org/show_bug.cgi?id=921444
         * https://github.com/facebook/draft-js/blob/342576bf7186d07c82a41d9ca8169130669747d6/src/component/selection/setDraftEditorSelection.js#L128-L134
         */
    this.focus();

    // Hide the editor.
    this.setState({
      linkEditorFocus: false,
      selectedLinkID: null,
    });
  },

  onKeyCommand(command) {
    const newEditorState = handleKeyCommand(this.state.editorState, command);

    if (newEditorState) {
      this.onChange(newEditorState);

      // Let draft-js know that keyboard command is handled.
      return true;
    }

    // Default draft-js implementation
    return false;
  },

  onReturnPressed() {
    const newEditorState = insertSoftNewline(this.state.editorState);

    // Update internal and external state
    this.onChange(newEditorState);

    // Cancel draft-js implementation
    return true;
  },

  onStyleButtonToggle(inlineStyle) {
    const newEditorState = toggleInlineStyle(
      this.state.editorState,
      inlineStyle
    );

    if (newEditorState) {
      this.onChange(newEditorState);
    }
  },

  renderLinkEditor(selectedLinkID) {
    if (!selectedLinkID) {
      return null;
    }

    // All entities are link entities.
    const linkEntity = getEntityByKey(selectedLinkID);
    const linkURL = linkEntity.getData().url;

    // Locate user selection in document
    const parentOffset = this.getParentContainerVerticalOffset();
    const selection = window.getSelection();
    const selectionCoordinates = getSelectionCoordinates(
      selection,
      parentOffset
    );
    const coordinates = {
      x: LINK_EDITOR_HORIZONTAL_OFFSET,
      y: selectionCoordinates.y + LINK_EDITOR_VERTICAL_OFFSET,
    };

    return (
      <LinkEditor
        onFocus={this.onLinkEditorFocus}
        onURLChange={this.onLinkEditorChange}
        onBlur={this.onLinkEditorBlur}
        onClose={this.onLinkEditorClose}
        coordinates={coordinates}
        linkID={selectedLinkID}
        linkURL={linkURL}
      />
    );
  },

  render() {
    const { editorState, selectedLinkID } = this.state;
    const linkIsSelected = Boolean(selectedLinkID);

    return (
      <div className="rich-text-editor__root">
        <StyleButtonGroup
          styles={INLINE_STYLES}
          currentStyle={editorState.getCurrentInlineStyle()}
          linkIsSelected={linkIsSelected}
          onToggle={this.onStyleButtonToggle}
        />
        <div className="rich-text-editor__editor" onClick={this.focus}>
          <Editor
            customStyleMap={STYLE_MAP}
            editorState={editorState}
            handleReturn={this.onReturnPressed}
            handleKeyCommand={this.onKeyCommand}
            onChange={this.onChange}
            onBlur={this.onBlur}
            onFocus={this.onFocus}
            placeholder={this.props.placeholder}
            spellCheck={false}
            ref="editor"
          />
        </div>
        {this.renderLinkEditor(selectedLinkID)}
      </div>
    );
  },
});

export default RichTextEditor;
