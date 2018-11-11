'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _constants = require('../../../../lib/constants');

var _reactDom = require('react-dom');

var _context = require('../../../../context');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * The LinkEditor is a simple UI component that floats below a selected link
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * in the RichTextEditor, and lets the user enter a URL.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var LinkEditor = function (_Component) {
  _inherits(LinkEditor, _Component);

  function LinkEditor(props) {
    _classCallCheck(this, LinkEditor);

    var _this = _possibleConstructorReturn(this, (LinkEditor.__proto__ || Object.getPrototypeOf(LinkEditor)).call(this, props));

    _this.state = {
      // Use cached position to maintain position during times of focus.
      position: _this.getUpdatedPosition(props),
      originalLinkURL: props.linkURL
    };
    return _this;
  }

  _createClass(LinkEditor, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      // Focus the input field if the URL value is empty
      if (this.props.linkURL.trim() === '') {
        (0, _reactDom.findDOMNode)(this.input).focus();
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var props = this.props;

      // Update position if we are editing a new link

      if (nextProps.linkID !== props.linkID) {
        this.setState({
          position: this.getUpdatedPosition(props)
        });
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      // Cursor dissappears when component rerenders, to make sure it's present
      // we're using setSelection range to make it appear at the end of text:
      // https://github.com/plotly/streambed/issues/9964
      (0, _reactDom.findDOMNode)(this.input).setSelectionRange(this.props.linkURL.length, this.props.linkURL.length);
    }
  }, {
    key: 'getUpdatedPosition',
    value: function getUpdatedPosition(props) {
      var _props$coordinates = props.coordinates,
          x = _props$coordinates.x,
          y = _props$coordinates.y;


      return { x: x, y: y };
    }
  }, {
    key: 'onInputChange',
    value: function onInputChange(urlValue) {
      var _props = this.props,
          linkID = _props.linkID,
          onURLChange = _props.onURLChange;

      // Call back to parent

      onURLChange(linkID, urlValue);
    }
  }, {
    key: 'onInputKeyDown',
    value: function onInputKeyDown(ev) {
      /*
           * `KeyboardEvent.key` enjoys excellent cross-browser support.
           * https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key
           */
      var key = ev.key;


      if (key === _constants.RETURN_KEY) {
        // Save changes
        ev.preventDefault();

        this.props.onClose(this.props.linkID);
      }

      if (key === _constants.ESCAPE_KEY) {
        // Cancel changes
        ev.preventDefault();

        // Restore original URL
        this.onInputChange(this.state.originalLinkURL);

        this.props.onClose(this.props.linkID);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _ = this.context.localize;
      var position = this.state.position;
      var _props2 = this.props,
          onBlur = _props2.onBlur,
          onFocus = _props2.onFocus,
          linkURL = _props2.linkURL;

      var placeholderText = _('Enter Link URL');
      var urlText = _('URL');
      // TODO: add close button
      return _react2.default.createElement(
        'div',
        { className: 'rich-text-editor__link-editor', style: { left: position.x, top: position.y } },
        _react2.default.createElement(
          'span',
          { className: 'rich-text-editor__link-editor__label' },
          urlText
        ),
        _react2.default.createElement('input', {
          className: 'rich-text-editor__link-editor__input',
          onBlur: onBlur,
          onFocus: onFocus,
          onChange: function onChange(ev) {
            return _this2.onInputChange(ev.target.value);
          },
          onKeyDown: function onKeyDown(ev) {
            return _this2.onInputKeyDown(ev);
          },
          ref: function ref(input) {
            return _this2.input = input;
          },
          value: linkURL,
          placeholder: placeholderText
        })
      );
    }
  }]);

  return LinkEditor;
}(_react.Component);

LinkEditor.propTypes = {
  linkID: _propTypes2.default.string.isRequired,
  linkURL: _propTypes2.default.string.isRequired,
  onBlur: _propTypes2.default.func.isRequired,
  onFocus: _propTypes2.default.func.isRequired,
  onClose: _propTypes2.default.func.isRequired,
  onURLChange: _propTypes2.default.func.isRequired,

  coordinates: _propTypes2.default.shape({
    x: _propTypes2.default.number,
    y: _propTypes2.default.number
  })
};

LinkEditor.defaultProps = {
  coordinates: {
    x: 0,
    y: 0
  }
};

LinkEditor.contextType = _context.EditorControlsContext;

exports.default = LinkEditor;
//# sourceMappingURL=LinkEditor.js.map