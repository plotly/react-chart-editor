'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _draftJs = require('draft-js');

var _draftJsExportHtml = require('@plotly/draft-js-export-html');

var _draftJsImportHtml = require('draft-js-import-html');

var _configuration = require('./configuration');

var _LinkDecorator = require('./LinkDecorator');

var _LinkDecorator2 = _interopRequireDefault(_LinkDecorator);

var _LinkEditor = require('./LinkEditor');

var _LinkEditor2 = _interopRequireDefault(_LinkEditor);

var _StyleButtonGroup = require('./StyleButtonGroup');

var _StyleButtonGroup2 = _interopRequireDefault(_StyleButtonGroup);

var _debounce = require('./debounce');

var _debounce2 = _interopRequireDefault(_debounce);

var _DraftCommands = require('./DraftCommands');

var _decoratorStrategies = require('./decoratorStrategies');

var _getSelectionCoordinates = require('./getSelectionCoordinates');

var _getSelectionCoordinates2 = _interopRequireDefault(_getSelectionCoordinates);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Constants


// Components


// Libraries


var RichText = function (_Component) {
  _inherits(RichText, _Component);

  function RichText(props, context) {
    _classCallCheck(this, RichText);

    /*
         * Initially set state based on the plotly.js annotation content.
         * After this, as long as this component is mounted, it owns the source
         * of truth for the annotation value via `this.state.editorState`.
         * This state may be updated externally via a prop update.
         * See `componentWillReceiveProps`.
         */
    var _this = _possibleConstructorReturn(this, (RichText.__proto__ || Object.getPrototypeOf(RichText)).call(this, props, context));

    _this.state = {
      editorState: props.value.toString().trim().length ? _this.createEditorStateFromHTML(props.value) : _draftJs.EditorState.createEmpty(_this.getDecorator())
    };

    _this.getDecorator = _this.getDecorator.bind(_this);
    _this.createEditorStateFromHTML = _this.createEditorStateFromHTML.bind(_this);
    _this.getEditorStateAsHTML = _this.getEditorStateAsHTML.bind(_this);
    _this.focus = _this.focus.bind(_this);
    _this.getParentContainerVerticalOffset = _this.getParentContainerVerticalOffset.bind(_this);
    _this.onChange = _this.onChange.bind(_this);
    _this.onBlur = _this.onBlur.bind(_this);
    _this.onFocus = _this.onFocus.bind(_this);
    _this.onLinkEditorBlur = _this.onLinkEditorBlur.bind(_this);
    _this.onLinkEditorFocus = _this.onLinkEditorFocus.bind(_this);
    _this.onLinkEditorChange = _this.onLinkEditorChange.bind(_this);
    _this.onLinkEditorClose = _this.onLinkEditorClose.bind(_this);
    _this.onKeyCommand = _this.onKeyCommand.bind(_this);
    _this.onReturnPressed = _this.onReturnPressed.bind(_this);
    _this.onStyleButtonToggle = _this.onStyleButtonToggle.bind(_this);
    _this.renderLinkEditor = _this.renderLinkEditor.bind(_this);
    return _this;
  }

  _createClass(RichText, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
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
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
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
    }
  }, {
    key: 'getDecorator',
    value: function getDecorator() {
      return new _draftJs.CompositeDecorator([{
        strategy: _decoratorStrategies.findLinkEntities,
        component: _LinkDecorator2.default,

        // Props for the LinkDecorator component
        props: {
          style: _configuration.STYLE_MAP[_configuration.LINK]
        }
      }]);
    }
  }, {
    key: 'createEditorStateFromHTML',
    value: function createEditorStateFromHTML(html) {
      var _inlineStyles;

      var contentState = (0, _draftJsImportHtml.stateFromHTML)(html, {
        inlineStyles: (_inlineStyles = {}, _defineProperty(_inlineStyles, _configuration.SUPERSCRIPT, { element: 'sup' }), _defineProperty(_inlineStyles, _configuration.SUBSCRIPT, { element: 'sub' }), _inlineStyles),
        defaultBlockTag: null
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
    }
  }, {
    key: 'getEditorStateAsHTML',
    value: function getEditorStateAsHTML(editorState) {
      var contentState = editorState.getCurrentContent();

      return (0, _draftJsExportHtml.stateToHTML)(contentState, {
        defaultBlockTag: null,
        inlineStyles: _configuration.STYLES_TO_HTML_TAGS
      });
    }
  }, {
    key: 'focus',
    value: function focus() {
      this.editorInput.focus();
    }

    // Used to properly calculate user selection coordinates.

  }, {
    key: 'getParentContainerVerticalOffset',
    value: function getParentContainerVerticalOffset() {
      return document.querySelector('.panel').scrollTop;
    }
  }, {
    key: 'onChange',
    value: function onChange(editorState) {
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
    }
  }, {
    key: 'onBlur',
    value: function onBlur() {
      this.setState({
        editorFocus: false
      });
    }
  }, {
    key: 'onFocus',
    value: function onFocus() {
      this.setState({
        editorFocus: true
      });
    }
  }, {
    key: 'onLinkEditorBlur',
    value: function onLinkEditorBlur() {
      this.setState({
        linkEditorFocus: false
      });
    }
  }, {
    key: 'onLinkEditorFocus',
    value: function onLinkEditorFocus() {
      this.setState({
        linkEditorFocus: true
      });
    }
  }, {
    key: 'onLinkEditorChange',
    value: function onLinkEditorChange(linkID, urlValue) {
      var editorState = this.state.editorState;

      var selectionState = editorState.getSelection();

      // Update link URL
      _draftJs.Entity.replaceData(linkID, { url: urlValue });

      // Trigger an editor state update
      var updatedEditorState = _draftJs.RichUtils.toggleLink(editorState, selectionState, linkID);

      this.onChange(updatedEditorState);
    }

    /**
     * Will be called by LinkEditor when the user confirms or cancels new URL.
     * Will not be called if LinkEditor is closed by moving the cursor off of
     * the selected LINK entity.
     *
     * @param   {String} linkID The link entity key related to this LinkEditor
     * @returns {undefined}
     */

  }, {
    key: 'onLinkEditorClose',
    value: function onLinkEditorClose() {
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
    }
  }, {
    key: 'onKeyCommand',
    value: function onKeyCommand(command) {
      var newEditorState = (0, _DraftCommands.handleKeyCommand)(this.state.editorState, command);

      if (newEditorState) {
        this.onChange(newEditorState);

        // Let draft-js know that keyboard command is handled.
        return true;
      }

      // Default draft-js implementation
      return false;
    }
  }, {
    key: 'onReturnPressed',
    value: function onReturnPressed() {
      var newEditorState = (0, _DraftCommands.insertSoftNewline)(this.state.editorState);

      // Update internal and external state
      this.onChange(newEditorState);

      // Cancel draft-js implementation
      return true;
    }
  }, {
    key: 'onStyleButtonToggle',
    value: function onStyleButtonToggle(inlineStyle) {
      var newEditorState = (0, _DraftCommands.toggleInlineStyle)(this.state.editorState, inlineStyle);

      if (newEditorState) {
        this.onChange(newEditorState);
      }
    }
  }, {
    key: 'renderLinkEditor',
    value: function renderLinkEditor(selectedLinkID) {
      if (!selectedLinkID) {
        return null;
      }

      // All entities are link entities.
      var linkEntity = (0, _DraftCommands.getEntityByKey)(selectedLinkID);
      var linkURL = linkEntity.getData().url;

      var coordinates = (0, _getSelectionCoordinates2.default)();

      return _react2.default.createElement(_LinkEditor2.default, {
        onFocus: this.onLinkEditorFocus,
        onURLChange: this.onLinkEditorChange,
        onBlur: this.onLinkEditorBlur,
        onClose: this.onLinkEditorClose,
        coordinates: coordinates,
        linkID: selectedLinkID,
        linkURL: linkURL
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _state3 = this.state,
          editorState = _state3.editorState,
          selectedLinkID = _state3.selectedLinkID;

      var linkIsSelected = Boolean(selectedLinkID);

      return _react2.default.createElement(
        'div',
        { className: 'rich-text-editor__root' },
        _react2.default.createElement(_StyleButtonGroup2.default, {
          styles: _configuration.INLINE_STYLES,
          currentStyle: editorState.getCurrentInlineStyle(),
          linkIsSelected: linkIsSelected,
          onToggle: this.onStyleButtonToggle
        }),
        _react2.default.createElement(
          'div',
          { className: 'rich-text-editor__editor', onClick: this.focus },
          _react2.default.createElement(_draftJs.Editor, {
            customStyleMap: _configuration.STYLE_MAP,
            editorState: editorState,
            handleReturn: this.onReturnPressed,
            handleKeyCommand: this.onKeyCommand,
            onChange: this.onChange,
            onBlur: this.onBlur,
            onFocus: this.onFocus,
            placeholder: this.props.placeholder,
            spellCheck: false,
            ref: function ref(input) {
              return _this2.editorInput = input;
            }
          })
        ),
        this.renderLinkEditor(selectedLinkID)
      );
    }
  }]);

  return RichText;
}(_react.Component);

RichText.propTypes = {
  onChange: _propTypes2.default.func.isRequired,
  placeholder: _propTypes2.default.string,
  value: _propTypes2.default.any
};

RichText.defaultProps = {
  placeholder: '',
  value: ''
};

exports.default = RichText;
//# sourceMappingURL=index.js.map