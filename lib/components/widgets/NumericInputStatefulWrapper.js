"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _NumericInput = require("./NumericInput");

var _NumericInput2 = _interopRequireDefault(_NumericInput);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _fastIsnumeric = require("fast-isnumeric");

var _fastIsnumeric2 = _interopRequireDefault(_fastIsnumeric);

var _workspaceConstants = require("../workspace-constants");

var _common = require("../../common");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// mapPropsToState, What is this absurdity?!? NumericInputStatefulWrapper
// maintains state so that users can muck around in the inner NumericInput
// input box. We don't want to fire updates() each time a user enters a
// character. Only when the user blurs do we want the update method to be fired.
// So why map props onto state? The internal state is mapped to the inputbox
// and with MIXED_VALUE mode we need a way to forcibly change the characters in
// the inputbox. So incoming props update state but the user is then permitted
// to make textual changes to the inputbox outside of the knowledge of the
// Store. Then onBlur we fire onUpdate and the Store can decide whether to keep
// the value the user inputed or change it to something else. There is also
// an edge case where we are in mixedMode and showing some special character in
// the inputbox "-" and the user tries to manually edit the input box with
// garbage and move on. To make it clear that we are still in mixedMode and that
// no other inputs have been changed we revert their garbage back to "-".
// This requires a setState inside the onUpdate method.
function mapPropsToState(_ref) {
  var propValue = _ref.value,
      _ref$defaultValue = _ref.defaultValue,
      defaultValue = _ref$defaultValue === undefined ? 0 : _ref$defaultValue;

  var value = void 0;
  var mixedMode = propValue === _workspaceConstants.MIXED_VALUES;

  if (mixedMode) {
    // MixedMode is useful when indicating to the user that there
    // is another source of value coming from somewhere else in the
    // app which renders this control optional. For example a user
    // may have selected a value for xaxis range and is now exploring
    // the UI for applying ranges to "all axes". In this case a
    // mixedValue is shown so the user has some visual information that
    // applying a value to "all axes" will somehow supercede some related
    // value elsewhere. WS2 also provides a more helpful message in these
    // cases than just the MIXED_MODE_VALUE
    value = _workspaceConstants.MIXED_MODE_VALUE;
  } else if (propValue === null) {
    // Null is used throughout the App to represent "no value."
    // This may be an unfortunate decision but NumericInput supports
    // null by showing the user that the value is actually
    // "defaultValue" or 0.
    // Actually it would be nice to take this chunk of code out.
    value = defaultValue;
  } else {
    value = propValue;
  }

  return { value: value, mixedMode: mixedMode };
}

var NumericInputStatefulWrapper = function (_Component) {
  _inherits(NumericInputStatefulWrapper, _Component);

  function NumericInputStatefulWrapper(props) {
    _classCallCheck(this, NumericInputStatefulWrapper);

    var _this = _possibleConstructorReturn(this, (NumericInputStatefulWrapper.__proto__ || Object.getPrototypeOf(NumericInputStatefulWrapper)).call(this, props));

    _this.state = mapPropsToState(props);

    _this.onChange = _this.onChange.bind(_this);
    _this.onUpdate = _this.onUpdate.bind(_this);
    return _this;
  }

  _createClass(NumericInputStatefulWrapper, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.value !== this.state.value) {
        this.setState(mapPropsToState(nextProps));
      }
    }
  }, {
    key: "onChange",
    value: function onChange(value) {
      /*
           * Mixed Mode is preserved until new props are sent down from
           * upstream components
           */
      this.setState({ value: value });
    }
  }, {
    key: "onUpdate",
    value: function onUpdate(value) {
      var _props = this.props,
          defaultValue = _props.defaultValue,
          integerOnly = _props.integerOnly,
          max = _props.max,
          min = _props.min;

      // defaultValue is truthy or numeric (account for falsey 0)

      var hasDefaultValue = defaultValue || (0, _fastIsnumeric2.default)(defaultValue);
      var updatedValue = value;

      // If we are in mixed mode and receive the placeholder value then
      // the user is attempting to increment or decrement. If we are in
      // mixed mode and receive some other value then the user has entered
      // this value explicitly in the inputbox and is bluring away.
      // In the case of incrementing and decrementing we set the updatedValue
      // to the default value or min or 0. If the value is set explicitly and
      // is numeric we do the same --- call onUpdate. This allows upstream
      // components to send in new props that toggle this component out of
      // mixedValue state. If it is set explicitly in the input box but is not
      // numeric onUpdate is not called and mixedMode is maintained.
      // In this case we also force MIXED_MODE_VALUE so the user is aware that
      // no settings have actually been changed.
      if (this.state.mixedMode && updatedValue === _workspaceConstants.MIXED_MODE_VALUE) {
        var fallbackValue = min || 0;
        updatedValue = hasDefaultValue ? defaultValue : fallbackValue;
      } else if (this.state.mixedMode && !(0, _fastIsnumeric2.default)(updatedValue)) {
        // mixed mode takes precedence over showing default values when
        // empty strings are input. We return early to bypass that logic.
        this.setState({ value: _workspaceConstants.MIXED_MODE_VALUE });
        return;
      }
      // If supplied a default value use it when the user blurs on an
      // empty string or string made up of spaces.
      if (typeof updatedValue === "string" && hasDefaultValue) {
        updatedValue = updatedValue.replace(/^\s+/g, "");

        if (updatedValue.length === 0) {
          updatedValue = defaultValue;
        }
      }

      // When correct input is supplied by the user constrain it to be within
      // [max, min] if max and min are supplied. Ditto for forcing an
      // integer value. We take the floor instead of rounding
      // as that is/(may be) less confusing to the user visually.
      var numericBounds = (0, _fastIsnumeric2.default)(min) && (0, _fastIsnumeric2.default)(max);
      if ((0, _fastIsnumeric2.default)(updatedValue)) {
        updatedValue = Number(updatedValue);

        if (integerOnly) {
          updatedValue = Math.floor(updatedValue);
        }

        if (numericBounds) {
          updatedValue = (0, _common.clamp)(updatedValue, min, max);
        } else if ((0, _fastIsnumeric2.default)(min)) {
          updatedValue = Math.max(min, updatedValue);
        } else if ((0, _fastIsnumeric2.default)(max)) {
          updatedValue = Math.min(max, updatedValue);
        }

        this.props.onUpdate(updatedValue);
      }
    }
  }, {
    key: "render",
    value: function render() {
      return _react2.default.createElement(_NumericInput2.default, {
        value: this.state.value,
        onUpdate: this.onUpdate,
        onChange: this.onChange,
        step: this.props.step,
        showArrows: this.props.showArrows,
        editableClassName: this.props.editableClassName
      });
    }
  }]);

  return NumericInputStatefulWrapper;
}(_react.Component);

exports.default = NumericInputStatefulWrapper;


NumericInputStatefulWrapper.propTypes = {
  // defaultValue is default value used when
  // A) a user leaves the input empty or filled with spaces.
  // B) a user is moving out of mixed mode.
  // C) a `null` value is supplied to this component.
  defaultValue: _propTypes2.default.number,
  editableClassName: _propTypes2.default.string,

  // When integerOnly flag is set any numeric input supplied by
  // the user is constrained to be a whole integer number.
  // Math.floor is used for this operation.
  integerOnly: _propTypes2.default.bool,

  // If min is supplied and defaultValue is *not* supplied the min
  // value will be used when the user moves out of mixed mode.
  // If both min and max are supplied they are used to constrain
  // numeric input from the user to be within this range.
  max: _propTypes2.default.number,
  min: _propTypes2.default.number,

  // Handler run onBlur and called with the updated value.
  onUpdate: _propTypes2.default.func.isRequired,

  // showArrows is a flag that will show or hide the increment and
  // decrement buttons on the side of the inputbox. Defaults to true.
  showArrows: _propTypes2.default.bool,

  // If incrementors are present step size controls the numeric step taken
  // when incrementing and decrementing.
  step: _propTypes2.default.number,

  value: _propTypes2.default.any
  /*value: customPropTypes.customOneOfType([
    PropTypes.string,
    customPropTypes.isNumeric,
    customPropTypes.isNull,
  ]).isDefined,*/
};

NumericInputStatefulWrapper.defaultProps = {
  showArrows: true
};
module.exports = exports["default"];
//# sourceMappingURL=NumericInputStatefulWrapper.js.map