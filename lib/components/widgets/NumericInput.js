'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DOWN_ARROW = exports.UP_ARROW = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _EditableText = require('./EditableText');

var _EditableText2 = _interopRequireDefault(_EditableText);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _fastIsnumeric = require('fast-isnumeric');

var _fastIsnumeric2 = _interopRequireDefault(_fastIsnumeric);

var _reactRangeslider = require('react-rangeslider');

var _reactRangeslider2 = _interopRequireDefault(_reactRangeslider);

var _plotlyIcons = require('plotly-icons');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UP_ARROW = exports.UP_ARROW = 38;
var DOWN_ARROW = exports.DOWN_ARROW = 40;

var NumericInput = function (_Component) {
  _inherits(NumericInput, _Component);

  function NumericInput(props) {
    _classCallCheck(this, NumericInput);

    var _this = _possibleConstructorReturn(this, (NumericInput.__proto__ || Object.getPrototypeOf(NumericInput)).call(this, props));

    _this.state = { value: props.value };
    _this.onChange = _this.onChange.bind(_this);
    _this.updateValue = _this.updateValue.bind(_this);
    _this.onKeyDown = _this.onKeyDown.bind(_this);
    _this.onWheel = _this.onWheel.bind(_this);
    return _this;
  }

  _createClass(NumericInput, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.value !== this.state.value) {
        this.setState({ value: nextProps.value });
      }
    }
  }, {
    key: 'onKeyDown',
    value: function onKeyDown(e) {
      switch (e.keyCode) {
        case UP_ARROW:
          this.incrementValue('increase');
          break;
        case DOWN_ARROW:
          this.incrementValue('decrease');
          break;
        default:
          break;
      }
    }
  }, {
    key: 'onWheel',
    value: function onWheel(e) {
      e.stopPropagation();
      e.preventDefault();
      if (e.deltaY > 0) {
        this.incrementValue('increase');
      } else {
        this.incrementValue('decrease');
      }
    }
  }, {
    key: 'onChange',
    value: function onChange(value) {
      this.setState({ value: value });
    }
  }, {
    key: 'updateValue',
    value: function updateValue(newValue) {
      var _props = this.props,
          max = _props.max,
          min = _props.min,
          integerOnly = _props.integerOnly,
          propsValue = _props.value;

      var updatedValue = newValue;

      // When the user blurs on non-numeric data reset the component
      // to the last known good value (this.props.value).
      if (!(0, _fastIsnumeric2.default)(updatedValue)) {
        this.setState({ value: propsValue });
        return;
      }

      updatedValue = Number(updatedValue);
      if (integerOnly) {
        updatedValue = Math.floor(updatedValue);
      }

      if ((0, _fastIsnumeric2.default)(min)) {
        updatedValue = Math.max(min, updatedValue);
      }

      if ((0, _fastIsnumeric2.default)(max)) {
        updatedValue = Math.min(max, updatedValue);
      }

      this.props.onUpdate(updatedValue);
    }
  }, {
    key: 'incrementValue',
    value: function incrementValue(direction) {
      var _props2 = this.props,
          defaultValue = _props2.defaultValue,
          min = _props2.min,
          _props2$step = _props2.step,
          step = _props2$step === undefined ? 1 : _props2$step,
          _props2$stepmode = _props2.stepmode,
          stepmode = _props2$stepmode === undefined ? 'absolute' : _props2$stepmode;
      var value = this.state.value;


      var valueUpdate = void 0;
      if ((0, _fastIsnumeric2.default)(value)) {
        var x = parseFloat(value);
        var absMode = stepmode === 'absolute';
        if (direction === 'increase') {
          valueUpdate = absMode ? x + step : x * (1 + step);
        } else {
          valueUpdate = absMode ? x - step : x / (1 + step);
        }
      } else {
        // if we are multi-valued and the user is incrementing or decrementing
        // update with some sane value so we can "break" out of multi-valued mode.
        if ((0, _fastIsnumeric2.default)(defaultValue)) {
          valueUpdate = defaultValue;
        } else {
          // TODO smarter handling depending if user decrements or increments?
          valueUpdate = min || 0;
        }
      }

      // incrementers blur the line between blur and onChange.
      this.updateValue(valueUpdate);
    }
  }, {
    key: 'renderArrows',
    value: function renderArrows() {
      if (!this.props.showArrows || this.props.showSlider) {
        return null;
      }

      return _react2.default.createElement(
        'div',
        { className: 'numeric-input__caret-box' },
        _react2.default.createElement(
          'div',
          {
            className: 'numeric-input__caret js-numeric-increase',
            onClick: this.incrementValue.bind(this, 'increase')
          },
          _react2.default.createElement(_plotlyIcons.CarretUpIcon, { className: 'numeric-top-caret-modifier' })
        ),
        _react2.default.createElement(
          'div',
          {
            className: 'numeric-input__caret js-numeric-decrease',
            onClick: this.incrementValue.bind(this, 'decrease')
          },
          _react2.default.createElement(_plotlyIcons.CarretDownIcon, { className: 'numeric-bottom-caret-modifier' })
        )
      );
    }
  }, {
    key: 'renderSlider',
    value: function renderSlider() {
      if (!this.props.showSlider) {
        return null;
      }

      return _react2.default.createElement(_reactRangeslider2.default, {
        min: this.props.min,
        max: this.props.max,
        step: this.props.step,
        value: parseFloat(this.state.value),
        onChange: this.updateValue,
        tooltip: false
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'numeric-input__wrapper' },
        _react2.default.createElement(_EditableText2.default, {
          className: 'numeric-input__number ' + this.props.editableClassName,
          placeholder: this.props.placeholder,
          text: this.state.value,
          type: 'text',
          onChange: this.onChange,
          onUpdate: this.updateValue,
          onKeyDown: this.onKeyDown,
          onWheel: this.onWheel
        }),
        this.renderArrows(),
        this.renderSlider()
      );
    }
  }]);

  return NumericInput;
}(_react.Component);

exports.default = NumericInput;


NumericInput.propTypes = {
  defaultValue: _propTypes2.default.any,
  editableClassName: _propTypes2.default.string,
  integerOnly: _propTypes2.default.bool,
  max: _propTypes2.default.number,
  min: _propTypes2.default.number,
  onUpdate: _propTypes2.default.func.isRequired,
  placeholder: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  showArrows: _propTypes2.default.bool,
  showSlider: _propTypes2.default.bool,
  step: _propTypes2.default.number,
  stepmode: _propTypes2.default.string,
  value: _propTypes2.default.any
};

NumericInput.defaultProps = {
  showArrows: true
};
//# sourceMappingURL=NumericInput.js.map