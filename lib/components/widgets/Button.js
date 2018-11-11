'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lib = require('../../lib');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Button = function (_Component) {
  _inherits(Button, _Component);

  function Button(props) {
    _classCallCheck(this, Button);

    return _possibleConstructorReturn(this, (Button.__proto__ || Object.getPrototypeOf(Button)).call(this, props));
  }

  _createClass(Button, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          children = _props.children,
          className = _props.className,
          icon = _props.icon,
          label = _props.label,
          variant = _props.variant,
          rest = _objectWithoutProperties(_props, ['children', 'className', 'icon', 'label', 'variant']);

      var classes = 'button';

      if (variant) {
        classes += ' button--' + variant;
      } else {
        classes += ' button--default';
      }

      if (className) {
        classes += ' ' + className;
      }

      var Icon = icon ? _react2.default.createElement(
        'div',
        { className: (0, _lib.bem)('button', 'icon') },
        icon
      ) : null;

      return _react2.default.createElement(
        'button',
        _extends({ className: classes }, rest),
        _react2.default.createElement(
          'div',
          { className: (0, _lib.bem)('button', 'wrapper') },
          Icon,
          _react2.default.createElement(
            'div',
            { className: 'button__label' },
            label ? label : children
          )
        )
      );
    }
  }]);

  return Button;
}(_react.Component);

Button.propTypes = {
  children: _propTypes2.default.node,
  className: _propTypes2.default.any,
  icon: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.func]),
  label: _propTypes2.default.any,
  variant: _propTypes2.default.string
};

exports.default = Button;
//# sourceMappingURL=Button.js.map