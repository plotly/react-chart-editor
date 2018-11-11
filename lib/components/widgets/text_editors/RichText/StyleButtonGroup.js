'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _StyleButton = require('./StyleButton');

var _StyleButton2 = _interopRequireDefault(_StyleButton);

var _configuration = require('./configuration');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StyleButtonGroup = function (_Component) {
  _inherits(StyleButtonGroup, _Component);

  function StyleButtonGroup() {
    _classCallCheck(this, StyleButtonGroup);

    return _possibleConstructorReturn(this, (StyleButtonGroup.__proto__ || Object.getPrototypeOf(StyleButtonGroup)).apply(this, arguments));
  }

  _createClass(StyleButtonGroup, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          currentStyle = _props.currentStyle,
          linkIsSelected = _props.linkIsSelected,
          styles = _props.styles,
          onToggle = _props.onToggle;


      var isActive = function isActive(currentStyle, value) {
        if (value === _configuration.LINK) {
          return linkIsSelected;
        }

        if (typeof currentStyle.has === 'function') {
          return currentStyle.has(value);
        }

        return Boolean(currentStyle.value);
      };

      return _react2.default.createElement(
        'div',
        { className: 'rich-text-editor__controls' },
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
  }]);

  return StyleButtonGroup;
}(_react.Component);

StyleButtonGroup.propTypes = {
  onToggle: _propTypes2.default.func.isRequired,
  styles: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    label: _propTypes2.default.element.isRequired,
    value: _propTypes2.default.string.isRequired
  })).isRequired,

  // A draft-js DraftInlineStyle instance
  // https://facebook.github.io/draft-js/docs/api-reference-editor-state.html#getcurrentinlinestyle
  currentStyle: _propTypes2.default.object,
  linkIsSelected: _propTypes2.default.bool
};

exports.default = StyleButtonGroup;
//# sourceMappingURL=StyleButtonGroup.js.map