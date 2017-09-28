"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var StyleButton = _react2.default.createClass({
  displayName: "StyleButton",

  propTypes: {
    active: _react.PropTypes.bool,
    // A (styled) React element to display as label
    label: _react.PropTypes.element.isRequired,
    // Callback for clicks
    onToggle: _react.PropTypes.func.isRequired,
    // The value passed to `onToggle` when clicked
    value: _react.PropTypes.string.isRequired
  },

  onToggle: function onToggle(ev) {
    // Prevent focus moving from editor to button
    ev.preventDefault();
    this.props.onToggle(this.props.value);
  },
  render: function render() {
    var _props = this.props,
        active = _props.active,
        label = _props.label,
        value = _props.value;


    var className = (0, _classnames2.default)("rich-text-editor__styleButton", "rich-text-editor__styleButton__" + value, {
      "rich-text-editor__styleButton--active": active
    });

    return _react2.default.createElement(
      "span",
      { className: "rich-text-editor__styleButton__wrapper" },
      _react2.default.createElement(
        "span",
        {
          className: className,
          onMouseDown: this.onToggle,
          "data-role": "button",
          "data-pressed": active
        },
        label
      )
    );
  }
});

exports.default = StyleButton;
module.exports = exports["default"];
//# sourceMappingURL=StyleButton.js.map