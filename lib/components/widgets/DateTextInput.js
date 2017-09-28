"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TEST_SELECTOR_CLASS = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _DelayedTextInput = require("@workspace/components/widgets/DelayedTextInput");

var _DelayedTextInput2 = _interopRequireDefault(_DelayedTextInput);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _workspace = require("@workspace/constants/workspace");

var _globalUtils = require("_utils/globalUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TEST_SELECTOR_CLASS = exports.TEST_SELECTOR_CLASS = "js-DateTextInput";

/*
 * Widget for entering datetimes.
 *
 * TODO: I'm assuming at some point we will make a dateTime picker and
 * put that in here.
 * https://github.com/plotly/streambed/issues/8441
 */

var DateTextInput = function (_Component) {
  _inherits(DateTextInput, _Component);

  function DateTextInput(props) {
    _classCallCheck(this, DateTextInput);

    var _this = _possibleConstructorReturn(this, (DateTextInput.__proto__ || Object.getPrototypeOf(DateTextInput)).call(this, props));

    _this.onUpdate = _this.onUpdate.bind(_this);
    return _this;
  }

  _createClass(DateTextInput, [{
    key: "onUpdate",
    value: function onUpdate(newValue) {
      var _props = this.props,
          onUpdate = _props.onUpdate,
          calendar = _props.calendar;


      if ((0, _globalUtils.getWindow)().Plotly.Lib.isDateTime(newValue.trim(), calendar)) {
        onUpdate(newValue.trim());
      } else {
        // put back the previous value
        this.forceUpdate();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _props2 = this.props,
          editableClassName = _props2.editableClassName,
          value = _props2.value,
          calendar = _props2.calendar;

      var displayValue = value === _workspace.MIXED_VALUES ? _workspace.MIXED_MODE_VALUE : value;

      var wrapperClassName = (0, _classnames2.default)("date-input__wrapper");

      var editableClass = (0, _classnames2.default)("date-input__date", editableClassName, TEST_SELECTOR_CLASS);

      return _react2.default.createElement(
        "div",
        { className: wrapperClassName },
        _react2.default.createElement(_DelayedTextInput2.default, {
          className: editableClass,
          onUpdate: this.onUpdate,
          value: displayValue,
          disabled: calendar === _workspace.MIXED_VALUES
        })
      );
    }
  }]);

  return DateTextInput;
}(_react.Component);

exports.default = DateTextInput;


DateTextInput.propTypes = {
  value: _propTypes2.default.string.isRequired,
  onUpdate: _propTypes2.default.func.isRequired,
  calendar: _propTypes2.default.string.isRequired,
  editableClassName: _propTypes2.default.string
};
//# sourceMappingURL=DateTextInput.js.map