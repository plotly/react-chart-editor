'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnconnectedColorPicker = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ColorPicker = require('../widgets/ColorPicker');

var _ColorPicker2 = _interopRequireDefault(_ColorPicker);

var _Field = require('./Field');

var _Field2 = _interopRequireDefault(_Field);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lib = require('../../lib');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UnconnectedColorPicker = exports.UnconnectedColorPicker = function (_Component) {
  _inherits(UnconnectedColorPicker, _Component);

  function UnconnectedColorPicker(props, context) {
    _classCallCheck(this, UnconnectedColorPicker);

    var _this = _possibleConstructorReturn(this, (UnconnectedColorPicker.__proto__ || Object.getPrototypeOf(UnconnectedColorPicker)).call(this, props, context));

    _this.state = {
      empty: !_this.props.fullValue && _this.props.handleEmpty
    };
    return _this;
  }

  _createClass(UnconnectedColorPicker, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      if (this.state.empty) {
        return _react2.default.createElement(
          _Field2.default,
          this.props,
          _react2.default.createElement(
            'div',
            { className: 'js-test-info' },
            'This color is computed from other parts of the figure but you can',
            ' ',
            _react2.default.createElement(
              'a',
              {
                onClick: function onClick() {
                  _this2.setState({ empty: false });
                  _this2.props.updatePlot(_this2.props.defaultColor);
                }
              },
              'override it'
            ),
            '.'
          )
        );
      }

      return _react2.default.createElement(
        _Field2.default,
        this.props,
        _react2.default.createElement(_ColorPicker2.default, {
          selectedColor: this.props.fullValue,
          onColorChange: this.props.updatePlot
        })
      );
    }
  }]);

  return UnconnectedColorPicker;
}(_react.Component);

UnconnectedColorPicker.propTypes = _extends({
  fullValue: _propTypes2.default.any,
  updatePlot: _propTypes2.default.func,
  handleEmpty: _propTypes2.default.bool,
  defaultColor: _propTypes2.default.string
}, _Field2.default.propTypes);

exports.default = (0, _lib.connectToContainer)(UnconnectedColorPicker);
//# sourceMappingURL=ColorPicker.js.map