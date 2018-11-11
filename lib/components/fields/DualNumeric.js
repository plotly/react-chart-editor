'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnconnectedDualNumericFraction = undefined;

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

var _nested_property = require('plotly.js/src/lib/nested_property');

var _nested_property2 = _interopRequireDefault(_nested_property);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UnconnectedDualNumericFraction = exports.UnconnectedDualNumericFraction = function (_Component) {
  _inherits(UnconnectedDualNumericFraction, _Component);

  function UnconnectedDualNumericFraction(props, context) {
    _classCallCheck(this, UnconnectedDualNumericFraction);

    var _this = _possibleConstructorReturn(this, (UnconnectedDualNumericFraction.__proto__ || Object.getPrototypeOf(UnconnectedDualNumericFraction)).call(this, props, context));

    _this.updatePlot = _this.updatePlot.bind(_this);
    _this.updatePlot2 = _this.updatePlot2.bind(_this);
    return _this;
  }

  _createClass(UnconnectedDualNumericFraction, [{
    key: 'updatePlot',
    value: function updatePlot(value) {
      this.props.updatePlot(this.props.percentage ? value / 100 : value);
    }
  }, {
    key: 'updatePlot2',
    value: function updatePlot2(value) {
      this.props.updateContainer(_defineProperty({}, this.props.attr2, this.props.percentage ? value / 100 : value));
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          percentage = _props.percentage,
          multiValued = _props.multiValued,
          attr2 = _props.attr2,
          step = _props.step,
          min = _props.min,
          max = _props.max;

      var fullValue = percentage ? Math.round(100 * this.props.fullValue) : this.props.fullValue;
      var fullValue2 = (0, _nested_property2.default)(this.context.fullContainer, attr2).get();
      if (percentage) {
        fullValue2 = Math.round(100 * fullValue2);
      }
      var placeholder = void 0;
      var placeholder2 = void 0;
      if (multiValued) {
        placeholder = fullValue;
        placeholder2 = fullValue2;
        fullValue = '';
        fullValue2 = '';
      }

      return _react2.default.createElement(
        _Field2.default,
        this.props,
        _react2.default.createElement(
          'div',
          { className: 'numeric-input__wrapper' },
          _react2.default.createElement(_NumericInput2.default, {
            value: fullValue,
            defaultValue: this.props.defaultValue,
            placeholder: placeholder,
            step: step,
            min: min,
            max: max,
            onChange: this.updatePlot,
            onUpdate: this.updatePlot,
            showArrows: !this.props.hideArrows,
            showSlider: false
          }),
          _react2.default.createElement(_NumericInput2.default, {
            value: fullValue2,
            defaultValue: this.props.defaultValue,
            placeholder: placeholder2,
            step: step,
            min: min,
            max: max,
            onChange: this.updatePlot2,
            onUpdate: this.updatePlot2,
            showArrows: !this.props.hideArrows,
            showSlider: false
          })
        )
      );
    }
  }]);

  return UnconnectedDualNumericFraction;
}(_react.Component);

UnconnectedDualNumericFraction.propTypes = _extends({
  defaultValue: _propTypes2.default.any,
  fullValue: _propTypes2.default.any,
  min: _propTypes2.default.number,
  max: _propTypes2.default.number,
  multiValued: _propTypes2.default.bool,
  hideArrows: _propTypes2.default.bool,
  showSlider: _propTypes2.default.bool,
  step: _propTypes2.default.number,
  updatePlot: _propTypes2.default.func,
  attr2: _propTypes2.default.any,
  percentage: _propTypes2.default.bool
}, _Field2.default.propTypes);

UnconnectedDualNumericFraction.contextTypes = {
  fullContainer: _propTypes2.default.object
};

exports.default = (0, _lib.connectToContainer)(UnconnectedDualNumericFraction);
//# sourceMappingURL=DualNumeric.js.map