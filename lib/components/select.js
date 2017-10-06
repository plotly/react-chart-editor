"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _FieldBase2 = require("./FieldBase");

var _FieldBase3 = _interopRequireDefault(_FieldBase2);

var _lib = require("../lib");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Select = function (_FieldBase) {
  _inherits(Select, _FieldBase);

  function Select() {
    _classCallCheck(this, Select);

    return _possibleConstructorReturn(this, (Select.__proto__ || Object.getPrototypeOf(Select)).apply(this, arguments));
  }

  _createClass(Select, [{
    key: "renderOption",
    value: function renderOption(attrs, i) {
      return _react2.default.createElement(
        "option",
        { key: "option-" + i, value: attrs.value },
        attrs.label
      );
    }
  }, {
    key: "renderField",
    value: function renderField() {
      var _this2 = this;

      var options = this.props.options;

      for (var i = 0; i < options.length; i++) {
        var opt = options[i];
        if ((typeof opt === "undefined" ? "undefined" : _typeof(opt)) !== "object") {
          options[i] = {
            label: opt,
            value: opt
          };
        }
      }

      return _react2.default.createElement(
        "label",
        { className: (0, _lib.bem)("field") },
        _react2.default.createElement(
          "span",
          { className: (0, _lib.bem)("field", "title") },
          this.props.label
        ),
        _react2.default.createElement(
          "select",
          {
            value: this.state.value,
            className: (0, _lib.bem)("field", "control"),
            onChange: function onChange(e) {
              return _this2.updatePlot(e.target.value);
            }
          },
          options.map(this.renderOption)
        )
      );
    }
  }]);

  return Select;
}(_FieldBase3.default);

exports.default = Select;
module.exports = exports["default"];
//# sourceMappingURL=Select.js.map