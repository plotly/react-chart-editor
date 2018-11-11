'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StyleButton = function (_Component) {
  _inherits(StyleButton, _Component);

  function StyleButton(props) {
    _classCallCheck(this, StyleButton);

    var _this = _possibleConstructorReturn(this, (StyleButton.__proto__ || Object.getPrototypeOf(StyleButton)).call(this, props));

    _this.onToggle = _this.onToggle.bind(_this);
    return _this;
  }

  _createClass(StyleButton, [{
    key: 'onToggle',
    value: function onToggle(ev) {
      // Prevent focus moving from editor to button
      ev.preventDefault();
      this.props.onToggle(this.props.value);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          active = _props.active,
          label = _props.label,
          value = _props.value;


      var className = (0, _classnames2.default)('rich-text-editor__styleButton', 'rich-text-editor__styleButton__' + value, {
        'rich-text-editor__styleButton--active': active
      });

      return _react2.default.createElement(
        'span',
        { className: 'rich-text-editor__styleButton__wrapper' },
        _react2.default.createElement(
          'span',
          {
            className: className,
            onMouseDown: this.onToggle,
            'data-role': 'button',
            'data-pressed': active
          },
          label
        )
      );
    }
  }]);

  return StyleButton;
}(_react.Component);

StyleButton.propTypes = {
  active: _propTypes2.default.bool,

  // A (styled) React element to display as label
  label: _propTypes2.default.element.isRequired,

  // Callback for clicks
  onToggle: _propTypes2.default.func.isRequired,

  // The value passed to `onToggle` when clicked
  value: _propTypes2.default.string.isRequired
};

exports.default = StyleButton;
//# sourceMappingURL=StyleButton.js.map