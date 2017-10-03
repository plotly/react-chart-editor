"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _immutable = require("immutable");

var _immutable2 = _interopRequireDefault(_immutable);

var _reactImmutableProptypes = require("react-immutable-proptypes");

var _reactImmutableProptypes2 = _interopRequireDefault(_reactImmutableProptypes);

var _StyleButton = require("./StyleButton");

var _StyleButton2 = _interopRequireDefault(_StyleButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var StyleButtonGroup = _react2.default.createClass({
  displayName: "StyleButtonGroup",

  propTypes: {
    onToggle: _react.PropTypes.func.isRequired,
    styles: _react.PropTypes.arrayOf(_react.PropTypes.shape({
      label: _react.PropTypes.element.isRequired,
      value: _react.PropTypes.string.isRequired
    })).isRequired,

    // A draft-js DraftInlineStyle instance
    // https://facebook.github.io/draft-js/docs/api-reference-editor-state.html#getcurrentinlinestyle
    currentStyle: _reactImmutableProptypes2.default.orderedSet
  },

  getDefaultProps: function getDefaultProps() {
    return {
      currentStyle: _immutable2.default.OrderedSet()
    };
  },
  render: function render() {
    var _props = this.props,
        currentStyle = _props.currentStyle,
        linkIsSelected = _props.linkIsSelected,
        styles = _props.styles,
        onToggle = _props.onToggle;


    var isActive = function isActive(currentStyle, value) {
      if (value === "LINK") {
        return linkIsSelected;
      }

      return currentStyle.has(value);
    };

    return _react2.default.createElement(
      "div",
      { className: "rich-text-editor__controls" },
      styles.map(function (_ref) {
        var label = _ref.label,
            value = _ref.value;
        return _react2.default.createElement(_StyleButton2.default, {
          key: value,
          active: isActive(currentStyle, value),
          label: label,
          onToggle: onToggle,
          value: value
        });
      })
    );
  }
});

exports.default = StyleButtonGroup;
module.exports = exports["default"];
//# sourceMappingURL=StyleButtonGroup.js.map