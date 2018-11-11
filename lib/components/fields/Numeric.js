'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnconnectedNumeric = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Field = require('./Field');

var _Field2 = _interopRequireDefault(_Field);

var _NumericInput = require('../widgets/NumericInput');

var _NumericInput2 = _interopRequireDefault(_NumericInput);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lib = require('../../lib');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UnconnectedNumeric = exports.UnconnectedNumeric = function (_Component) {
  _inherits(UnconnectedNumeric, _Component);

  function UnconnectedNumeric() {
    _classCallCheck(this, UnconnectedNumeric);

    return _possibleConstructorReturn(this, (UnconnectedNumeric.__proto__ || Object.getPrototypeOf(UnconnectedNumeric)).apply(this, arguments));
  }

  _createClass(UnconnectedNumeric, [{
    key: 'render',
    value: function render() {
      var fullValue = this.props.fullValue;
      var placeholder = void 0;
      if (this.props.multiValued) {
        placeholder = fullValue;
        fullValue = '';
      }

      return _react2.default.createElement(
        _Field2.default,
        this.props,
        _react2.default.createElement(_NumericInput2.default, {
          value: fullValue,
          defaultValue: this.props.defaultValue,
          placeholder: placeholder,
          step: this.props.step,
          stepmode: this.props.stepmode,
          min: this.props.min,
          max: this.props.max,
          onChange: this.props.updatePlot,
          onUpdate: this.props.updatePlot,
          showArrows: !this.props.hideArrows,
          showSlider: this.props.showSlider
        })
      );
    }
  }]);

  return UnconnectedNumeric;
}(_react.Component);

UnconnectedNumeric.propTypes = _extends({
  defaultValue: _propTypes2.default.any,
  fullValue: _propTypes2.default.any,
  min: _propTypes2.default.number,
  max: _propTypes2.default.number,
  multiValued: _propTypes2.default.bool,
  hideArrows: _propTypes2.default.bool,
  showSlider: _propTypes2.default.bool,
  step: _propTypes2.default.number,
  stepmode: _propTypes2.default.string,
  updatePlot: _propTypes2.default.func
}, _Field2.default.propTypes);

exports.default = (0, _lib.connectToContainer)(UnconnectedNumeric);
//# sourceMappingURL=Numeric.js.map