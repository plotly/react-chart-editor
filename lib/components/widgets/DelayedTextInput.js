"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A generic component to handle text input fields that should not
 * propagate their updates until the user blurs or presses enter.
 *
 * If you want to update on every change, use a bare <input> instead.
 *
 * Exposes three events:
 *     onUpdate: fired on blur, and on pressing enter if there is no onEnter
 *     onEnter (optional): fired only when pressing enter
 *     onKeyDown (optional): fired on any keydown. Intended for capturing
 *         special keys like arrow keys, rather than direct changes to the text
 *
 * TODO: use this in NumericInput as well
 * https://github.com/plotly/streambed/issues/8440
 */
var DelayedTextInput = function (_Component) {
  _inherits(DelayedTextInput, _Component);

  function DelayedTextInput(props) {
    _classCallCheck(this, DelayedTextInput);

    var _this = _possibleConstructorReturn(this, (DelayedTextInput.__proto__ || Object.getPrototypeOf(DelayedTextInput)).call(this, props));

    _this.state = { value: props.value };

    _this.handleFocus = _this.handleFocus.bind(_this);
    _this.handleChange = _this.handleChange.bind(_this);
    _this.handleUpdate = _this.handleUpdate.bind(_this);
    _this.handleKeyDown = _this.handleKeyDown.bind(_this);
    return _this;
  }

  _createClass(DelayedTextInput, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var value = nextProps.value;
      if (value !== this.state.value) {
        this.setState({ value: value });
      }
    }

    // Selects/highlights all of the text in the input on focus

  }, {
    key: "handleFocus",
    value: function handleFocus(event) {
      if (this.props.autoSelect) {
        event.target.select();
      }
    }
  }, {
    key: "handleChange",
    value: function handleChange(_ref) {
      var value = _ref.target.value;

      this.setState({ value: value });
    }
  }, {
    key: "handleUpdate",
    value: function handleUpdate(_ref2) {
      var value = _ref2.target.value;
      var onUpdate = this.props.onUpdate;


      this.setState({ value: value });

      if (onUpdate) {
        onUpdate(value);
      }
    }
  }, {
    key: "handleKeyDown",
    value: function handleKeyDown(event) {
      var _props = this.props,
          onEnter = _props.onEnter,
          onUpdate = _props.onUpdate,
          onKeyDown = _props.onKeyDown;


      var key = event.keyCode || event.which;

      // Allow the input to be saved when the enter key is pressed
      if (key === 13) {
        var value = this.refs.text.value;

        if (onEnter) {
          onEnter(value);
        } else {
          onUpdate(value);
        }
      } else if (key === 27) {
        // revert input with escape key
        this.setState({ value: this.props.value });
      } else if (onKeyDown) {
        // pass anything else on to onKeyDown from props
        onKeyDown(event);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _props2 = this.props,
          type = _props2.type,
          className = _props2.className,
          disabled = _props2.disabled,
          autoFocus = _props2.autoFocus,
          placeholder = _props2.placeholder,
          readOnly = _props2.readOnly,
          size = _props2.size;
      var value = this.state.value;

      return _react2.default.createElement("input", {
        ref: "text",
        type: type,
        className: className || "",
        value: value,
        onFocus: this.handleFocus,
        onChange: this.handleChange,
        onBlur: this.handleUpdate,
        disabled: disabled,
        autoFocus: autoFocus,
        onKeyDown: this.handleKeyDown,
        placeholder: placeholder,
        readOnly: readOnly,
        size: size
      });
    }
  }]);

  return DelayedTextInput;
}(_react.Component);

exports.default = DelayedTextInput;


DelayedTextInput.propTypes = {
  // Called with input value on blur (and enter if no onEnter is given)
  onUpdate: _propTypes2.default.func.isRequired,

  // Called with input value on enter
  onEnter: _propTypes2.default.func,

  // Called on any keydown
  onKeyDown: _propTypes2.default.func,

  // Input value property
  value: _propTypes2.default.string.isRequired,

  // do we select the whole input string on focus?
  autoSelect: _propTypes2.default.bool,

  // Other properties forwarded to <input>
  placeholder: _propTypes2.default.string,
  className: _propTypes2.default.string,
  disabled: _propTypes2.default.bool,
  autoFocus: _propTypes2.default.bool,
  readOnly: _propTypes2.default.bool,
  type: _propTypes2.default.oneOf(["text", "password"]),
  size: _propTypes2.default.number
};

DelayedTextInput.defaultProps = {
  readOnly: false,
  type: "text",
  autoSelect: true
};
module.exports = exports["default"];
//# sourceMappingURL=DelayedTextInput.js.map