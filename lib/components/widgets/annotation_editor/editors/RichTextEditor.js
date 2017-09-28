"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _draftJs = require("draft-js");

var _draftJsExportHtml = require("draft-js-export-html");

var _draftJsImportHtml = require("draft-js-import-html");

var _RichTextEditorConfiguration = require("./RichTextEditorConfiguration");

var _LinkDecorator = require("./LinkDecorator");

var _LinkDecorator2 = _interopRequireDefault(_LinkDecorator);

var _LinkEditor = require("./LinkEditor");

var _LinkEditor2 = _interopRequireDefault(_LinkEditor);

var _StyleButtonGroup = require("./StyleButtonGroup");

var _StyleButtonGroup2 = _interopRequireDefault(_StyleButtonGroup);

var _debounce = require("./debounce");

var _debounce2 = _interopRequireDefault(_debounce);

var _DraftCommands = require("./DraftCommands");

var _decoratorStrategies = require("./decoratorStrategies");

var _getSelectionCoordinates = require("./getSelectionCoordinates");

var _getSelectionCoordinates2 = _interopRequireDefault(_getSelectionCoordinates);

var _suppressContentEditableWarning = require("@workspace/components/widgets/annotation_editor/suppressContentEditableWarning");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Components


/*
 * TODO Use rollupipfy with tree-shaking. Without it, the entire draft-js
 * library is imported, which adds 58kb to the minified bundle.
 * https://github.com/plotly/streambed/issues/6385
 *
 */
var RichTextEditor = _react2.default.createClass({
  displayName: "RichTextEditor",

  propTypes: {
    onChange: _react.PropTypes.func.isRequired,
    placeholder: _react.PropTypes.string,
    value: _react.PropTypes.string
  },

  getDefaultProps: function getDefaultProps() {
    return {
      placeholder: "",
      value: ""
    };
  },
  getInitialState: function getInitialState() {
    /*
         * Initially set state based on the plotly.js annotation content.
         * After this, as long as this component is mounted, it owns the source
         * of truth for the annotation value via `this.state.editorState`.
         * This state may be updated externally via a prop update.
         * See `componentWillReceiveProps`.
         */
    if (this.props.value.trim().length) {
      return {
        editorState: this.createEditorStateFromHTML(this.props.value)
      };
    }

    return {
      editorState: _draftJs.EditorState.createEmpty(this.getDecorator())
    };
  },
  componentWillMount: function componentWillMount() {
    // TODO: Remove https://github.com/plotly/streambed/issues/6121
    (0, _suppressContentEditableWarning.suppressContentEditableWarning)();
  },
  componentWillUnmount: function componentWillUnmount() {
    // TODO: Remove https://github.com/plotly/streambed/issues/6121
    (0, _suppressContentEditableWarning.restoreContentEditableWarning)();
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    var _state = this.state,
        linkEditorFocus = _state.linkEditorFocus,
        editorFocus = _state.editorFocus;

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
    var editorState = this.createEditorStateFromHTML(nextProps.value);

    this.setState({ editorState: editorState });
  },
  shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
    var _props = this.props,
        placeholder = _props.placeholder,
        value = _props.value;
    var _state2 = this.state,
        editorState = _state2.editorState,
        linkEditorFocus = _state2.linkEditorFocus;

    // If relevant props or state changed, return true.

    if (
    // Always update when user is editing link
    linkEditorFocus || placeholder !== nextProps.placeholder || value !== nextProps.value || editorState !== nextState.editorState) {
      return true;
    }

    // Compare incoming value with HTML representation of state.
    return nextProps.value !== this.getEditorStateAsHTML(editorState);
  },
  getDecorator: function getDecorator() {
    return new _draftJs.CompositeDecorator([{
      strategy: _decoratorStrategies.findLinkEntities,
      component: _LinkDecorator2.default,
      // Props for the LinkDecorator component
      props: {
        style: _RichTextEditorConfiguration.STYLE_MAP[_RichTextEditorConfiguration.LINK]
      }
    }]);
  },
  createEditorStateFromHTML: function createEditorStateFromHTML(html) {
    var contentState = (0, _draftJsImportHtml.stateFromHTML)(html, {
      elementStyles: {
        sup: _RichTextEditorConfiguration.SUPERSCRIPT,
        sub: _RichTextEditorConfiguration.SUBSCRIPT
      }
    });

    var decorator = this.getDecorator();

    /*
         * Work around issue described here:
         * https://github.com/facebook/draft-js/issues/185
         * #issuecomment-217207612
         */

    // Parse once to generate entity instances
    _draftJs.EditorState.createWithContent(contentState);
    // Now we can add our decorator
    return _draftJs.EditorState.createWithContent(contentState, decorator);
  },
  getEditorStateAsHTML: function getEditorStateAsHTML(editorState) {
    var contentState = editorState.getCurrentContent();

    return (0, _draftJsExportHtml.stateToHTML)(contentState, {
      blockTags: false,
      inlineTags: _RichTextEditorConfiguration.STYLES_TO_HTML_TAGS
    });
  },
  focus: function focus() {
    this.refs.editor.focus();
  },


  // Used to properly calculate user selection coordinates.
  getParentContainerVerticalOffset: function getParentContainerVerticalOffset() {
    return document.querySelector(".js-edit-mode-panel").scrollTop;
  },
  onChange: function onChange(editorState) {
    var selectedLinkID = this.state.selectedLinkID;

    var selection = editorState.getSelection();
    var entityKey = (0, _DraftCommands.getEntityKeyAt)(editorState, selection);

    var newState = { editorState: editorState };

    // Update selected link ID
    if (!(0, _DraftCommands.cursorHasLink)(editorState, selection)) {
      // If a link is no longer selected, clear selected link ID state
      Object.assign(newState, {
        selectedLinkID: null
      });
    } else if (selectedLinkID !== entityKey) {
      // If link selection is new / different link selected, update it
      Object.assign(newState, {
        selectedLinkID: entityKey
      });
    }

    // Update internal state
    this.setState(newState);

    // Dispatch changes to plotly.js
    // TODO consider moving to render (plotly.js is a render target)
    var htmlContent = this.getEditorStateAsHTML(editorState);
    if (this.props.value !== htmlContent) {
      (0, _debounce2.default)(this.props.onChange, [htmlContent]);
    }
  },
  onBlur: function onBlur() {
    this.setState({
      editorFocus: false
    });
  },
  onFocus: function onFocus() {
    this.setState({
      editorFocus: true
    });
  },
  onLinkEditorBlur: function onLinkEditorBlur() {
    this.setState({
      linkEditorFocus: false
    });
  },
  onLinkEditorFocus: function onLinkEditorFocus() {
    this.setState({
      linkEditorFocus: true
    });
  },
  onLinkEditorChange: function onLinkEditorChange(linkID, urlValue) {
    var editorState = this.state.editorState;

    var selectionState = editorState.getSelection();

    // Update link URL
    _draftJs.Entity.replaceData(linkID, { url: urlValue });

    // Trigger an editor state update
    var updatedEditorState = _draftJs.RichUtils.toggleLink(editorState, selectionState, linkID);

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
  onLinkEditorClose: function onLinkEditorClose() {
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
      selectedLinkID: null
    });
  },
  onKeyCommand: function onKeyCommand(command) {
    var newEditorState = (0, _DraftCommands.handleKeyCommand)(this.state.editorState, command);

    if (newEditorState) {
      this.onChange(newEditorState);

      // Let draft-js know that keyboard command is handled.
      return true;
    }

    // Default draft-js implementation
    return false;
  },
  onReturnPressed: function onReturnPressed() {
    var newEditorState = (0, _DraftCommands.insertSoftNewline)(this.state.editorState);

    // Update internal and external state
    this.onChange(newEditorState);

    // Cancel draft-js implementation
    return true;
  },
  onStyleButtonToggle: function onStyleButtonToggle(inlineStyle) {
    var newEditorState = (0, _DraftCommands.toggleInlineStyle)(this.state.editorState, inlineStyle);

    if (newEditorState) {
      this.onChange(newEditorState);
    }
  },
  renderLinkEditor: function renderLinkEditor(selectedLinkID) {
    if (!selectedLinkID) {
      return null;
    }

    // All entities are link entities.
    var linkEntity = (0, _DraftCommands.getEntityByKey)(selectedLinkID);
    var linkURL = linkEntity.getData().url;

    // Locate user selection in document
    var parentOffset = this.getParentContainerVerticalOffset();
    var selection = window.getSelection();
    var selectionCoordinates = (0, _getSelectionCoordinates2.default)(selection, parentOffset);
    var coordinates = {
      x: _RichTextEditorConfiguration.LINK_EDITOR_HORIZONTAL_OFFSET,
      y: selectionCoordinates.y + _RichTextEditorConfiguration.LINK_EDITOR_VERTICAL_OFFSET
    };

    return _react2.default.createElement(_LinkEditor2.default, {
      onFocus: this.onLinkEditorFocus,
      onURLChange: this.onLinkEditorChange,
      onBlur: this.onLinkEditorBlur,
      onClose: this.onLinkEditorClose,
      coordinates: coordinates,
      linkID: selectedLinkID,
      linkURL: linkURL
    });
  },
  render: function render() {
    var _state3 = this.state,
        editorState = _state3.editorState,
        selectedLinkID = _state3.selectedLinkID;

    var linkIsSelected = Boolean(selectedLinkID);

    return _react2.default.createElement(
      "div",
      { className: "rich-text-editor__root" },
      _react2.default.createElement(_StyleButtonGroup2.default, {
        styles: _RichTextEditorConfiguration.INLINE_STYLES,
        currentStyle: editorState.getCurrentInlineStyle(),
        linkIsSelected: linkIsSelected,
        onToggle: this.onStyleButtonToggle
      }),
      _react2.default.createElement(
        "div",
        { className: "rich-text-editor__editor", onClick: this.focus },
        _react2.default.createElement(_draftJs.Editor, {
          customStyleMap: _RichTextEditorConfiguration.STYLE_MAP,
          editorState: editorState,
          handleReturn: this.onReturnPressed,
          handleKeyCommand: this.onKeyCommand,
          onChange: this.onChange,
          onBlur: this.onBlur,
          onFocus: this.onFocus,
          placeholder: this.props.placeholder,
          spellCheck: false,
          ref: "editor"
        })
      ),
      this.renderLinkEditor(selectedLinkID)
    );
  }
});

// Libraries


// Constants
exports.default = RichTextEditor;
module.exports = exports["default"];
//# sourceMappingURL=RichTextEditor.js.map