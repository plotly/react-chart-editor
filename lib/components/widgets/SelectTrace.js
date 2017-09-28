"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Dropdown = require("./Dropdown");

var _Dropdown2 = _interopRequireDefault(_Dropdown);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames2 = require("classnames");

var _classnames3 = _interopRequireDefault(_classnames2);

var _workspace = require("@workspace/constants/workspace");

var _i18n = require("@common/utils/i18n");

var _customPropTypes = require("@workspace/utils/customPropTypes");

var _shouldComponentUpdate = require("@workspace/utils/shouldComponentUpdate");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * This component provides a dropdown for selecting traces. Traces will
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * automatically be paired with a fancy icon label. This component is used
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * for selecting among all possible traces types where the value is also the
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * chart type but also used for selecting among data traces where the label
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * will be an UID or index. Therefore traceOptions are a superset of what
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * is passed to the Dropdown as they contain trace "type" key so the fancy
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * label can be constructed.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var SelectTrace = function (_Component) {
  _inherits(SelectTrace, _Component);

  function SelectTrace() {
    _classCallCheck(this, SelectTrace);

    return _possibleConstructorReturn(this, (SelectTrace.__proto__ || Object.getPrototypeOf(SelectTrace)).apply(this, arguments));
  }

  _createClass(SelectTrace, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps) {
      return (0, _shouldComponentUpdate.propsNotEqualNoFuncCheck)(this.props, nextProps);
    }
  }, {
    key: "getIconClassName",
    value: function getIconClassName(chartType) {
      var _classnames;

      var iconClass = _workspace.CHART_TYPE_ICON[chartType];
      return (0, _classnames3.default)((_classnames = {}, _defineProperty(_classnames, iconClass, Boolean(iconClass)), _defineProperty(_classnames, "+soft-half-right", Boolean(iconClass)), _classnames));
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var fancyTraceOptions = this.props.traceOptions.map(function (traceOption) {
        var label = traceOption.label,
            value = traceOption.value,
            type = traceOption.type,
            _traceOption$disabled = traceOption.disabled,
            disabled = _traceOption$disabled === undefined ? false : _traceOption$disabled;

        var iconClass = _this2.getIconClassName(type);

        return {
          value: value,
          disabled: disabled,
          label: _react2.default.createElement(
            "span",
            null,
            _react2.default.createElement("i", { className: iconClass }),
            label
          )
        };
      });

      return _react2.default.createElement(_Dropdown2.default, {
        placeholder: (0, _i18n._)("chart type"),
        value: this.props.selectedTraceValue,
        options: fancyTraceOptions,
        searchable: true,
        onChange: this.props.traceSelectHandler,
        clearable: false
      });
    }
  }]);

  return SelectTrace;
}(_react.Component);

exports.default = SelectTrace;


SelectTrace.propTypes = {
  traceSelectHandler: _propTypes2.default.func.isRequired,
  selectedTraceValue: _propTypes2.default.string.isRequired,
  traceOptions: _customPropTypes.traceSelectOptionsShape.isRequired
};
module.exports = exports["default"];
//# sourceMappingURL=SelectTrace.js.map