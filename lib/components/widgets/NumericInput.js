"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TEST_SELECTOR_CLASS = exports.DOWN_ARROW = exports.UP_ARROW = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _EditableText = require("./EditableText");

var _EditableText2 = _interopRequireDefault(_EditableText);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _fastIsnumeric = require("fast-isnumeric");

var _fastIsnumeric2 = _interopRequireDefault(_fastIsnumeric);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UP_ARROW = exports.UP_ARROW = 38;
var DOWN_ARROW = exports.DOWN_ARROW = 40;
var TEST_SELECTOR_CLASS = exports.TEST_SELECTOR_CLASS = "js-NumericInput";

var NumericInput = function (_Component) {
  _inherits(NumericInput, _Component);

  function NumericInput(props) {
    _classCallCheck(this, NumericInput);

    var _this = _possibleConstructorReturn(this, (NumericInput.__proto__ || Object.getPrototypeOf(NumericInput)).call(this, props));

    _this.onKeyDown = _this.onKeyDown.bind(_this);
    _this.incrementValue = _this.incrementValue.bind(_this);
    return _this;
  }

  _createClass(NumericInput, [{
    key: "onKeyDown",
    value: function onKeyDown(e) {
      console.log('keydown');
      switch (e.keyCode) {
        case UP_ARROW:
          return this.incrementValue("increase");
        case DOWN_ARROW:
          return this.incrementValue("decrease");
        default:
          break;
      }
    }
  }, {
    key: "incrementValue",
    value: function incrementValue(direction) {
      var step = this.props.step || 1;
      var currentValue = this.props.value;

      if ((0, _fastIsnumeric2.default)(this.props.value)) {
        if (direction === "increase") {
          currentValue = currentValue + step;
        } else {
          currentValue = currentValue - step;
        }
      }

      // incrementers blur the line between blur and onChange.
      if (this.props.onUpdate) {
        this.props.onUpdate(currentValue);
      } else {
        this.props.onChange(currentValue);
      }
    }
  }, {
    key: "renderArrows",
    value: function renderArrows() {
      if (!this.props.showArrows) {
        return;
      }

      return _react2.default.createElement(
        "div",
        { className: "numeric-input__caret-box" },
        _react2.default.createElement(
          "div",
          {
            className: "numeric-input__caret js-numeric-increase",
            onClick: this.incrementValue.bind(this, "increase")
          },
          _react2.default.createElement("i", { className: "icon-caret-up numeric-top-caret-modifier" })
        ),
        _react2.default.createElement(
          "div",
          {
            className: "numeric-input__caret js-numeric-decrease",
            onClick: this.incrementValue.bind(this, "decrease")
          },
          _react2.default.createElement("i", { className: "icon-caret-down numeric-bottom-caret-modifier" })
        )
      );
    }
  }, {
    key: "render",
    value: function render() {
      var wrapperClassName = (0, _classnames2.default)("numeric-input__wrapper");

      var editableClass = (0, _classnames2.default)("numeric-input__number", this.props.editableClassName, TEST_SELECTOR_CLASS);

      return _react2.default.createElement(
        "div",
        { className: wrapperClassName },
        _react2.default.createElement(_EditableText2.default, {
          className: editableClass,
          text: String(this.props.value),
          type: "text",
          onChange: this.props.onChange,
          onUpdate: this.props.onUpdate,
          onKeyDown: this.onKeyDown
        }),
        this.renderArrows()
      );
    }
  }]);

  return NumericInput;
}(_react.Component);

/*NumericInput.propTypes = {
  value: customPropTypes.customOneOfType([
    PropTypes.string,
    customPropTypes.isNumeric,
    customPropTypes.isNull,
  ]).isDefined,
  onChange: PropTypes.func.isRequired,
  onUpdate: PropTypes.func,
  step: PropTypes.number,
  showArrows: PropTypes.bool,
  editableClassName: PropTypes.string,
};*/

exports.default = NumericInput;
NumericInput.defaultProps = {
  showError: false,
  showArrows: true
};
//# sourceMappingURL=NumericInput.js.map