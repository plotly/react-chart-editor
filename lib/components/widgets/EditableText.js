"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// A generic component to handle text that can be edited when the user
// clicks on it.
var EditableText = function (_Component) {
  _inherits(EditableText, _Component);

  function EditableText(props) {
    _classCallCheck(this, EditableText);

    var _this = _possibleConstructorReturn(this, (EditableText.__proto__ || Object.getPrototypeOf(EditableText)).call(this, props));

    _this.handleClick = _this.handleClick.bind(_this);
    _this.handleChange = _this.handleChange.bind(_this);
    _this.handleUpdate = _this.handleUpdate.bind(_this);
    _this.handleKeyPress = _this.handleKeyPress.bind(_this);
    _this.getRef = _this.getRef.bind(_this);
    return _this;
  }

  _createClass(EditableText, [{
    key: "getRef",
    value: function getRef(c) {
      this._ref = c;
    }

    // Selects/highlights all of the text in the filename input

  }, {
    key: "handleClick",
    value: function handleClick(event) {
      event.target.select();
    }
  }, {
    key: "handleChange",
    value: function handleChange(event) {
      var onChange = this.props.onChange;


      if (onChange) {
        onChange(event.target.value);
      }
    }
  }, {
    key: "handleUpdate",
    value: function handleUpdate(event) {
      var onUpdate = this.props.onUpdate;


      if (onUpdate) {
        onUpdate(event.target.value);
      }
    }
  }, {
    key: "handleKeyPress",
    value: function handleKeyPress(event) {
      // This will force handleUpdate to be called via the input's onBlur
      if ((event.keyCode || event.which) === 13) {
        this._ref.blur();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _props = this.props,
          type = _props.type,
          className = _props.className,
          text = _props.text,
          disable = _props.disable,
          autoFocus = _props.autoFocus,
          onKeyDown = _props.onKeyDown,
          placeholder = _props.placeholder,
          readOnly = _props.readOnly,
          size = _props.size;

      return _react2.default.createElement("input", {
        ref: this.getRef,
        type: type,
        className: className || "",
        value: text,
        onClick: this.handleClick,
        onChange: this.handleChange,
        onBlur: this.handleUpdate,
        disabled: disable,
        autoFocus: autoFocus,
        onKeyPress: this.handleKeyPress,
        onKeyDown: onKeyDown,
        placeholder: placeholder,
        readOnly: readOnly,
        size: size
      });
    }
  }]);

  return EditableText;
}(_react.Component);

EditableText.propTypes = {
  // Called with input value on changes (as the user types)
  onChange: _propTypes2.default.func,

  // Called with input value on blur (and enter if no onEnter is given)
  onUpdate: _propTypes2.default.func,

  // Called on input keyDown events
  onKeyDown: _propTypes2.default.func,

  // Input value property
  text: _propTypes2.default.string,

  // Input properties
  placeholder: _propTypes2.default.string,
  className: _propTypes2.default.string,
  disable: _propTypes2.default.bool,
  autoFocus: _propTypes2.default.bool,
  readOnly: _propTypes2.default.bool,
  type: _propTypes2.default.oneOf(["text", "password"]),
  size: _propTypes2.default.number
};

EditableText.defaultProps = {
  readOnly: false,
  type: "text"
};

module.exports = EditableText;
//# sourceMappingURL=EditableText.js.map