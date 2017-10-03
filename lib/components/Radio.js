"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Field2 = require("./Field");

var _Field3 = _interopRequireDefault(_Field2);

var _RadioBlocks = require("./widgets/RadioBlocks");

var _RadioBlocks2 = _interopRequireDefault(_RadioBlocks);

var _common = require("../common");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Radio = function (_Field) {
  _inherits(Radio, _Field);

  function Radio() {
    _classCallCheck(this, Radio);

    return _possibleConstructorReturn(this, (Radio.__proto__ || Object.getPrototypeOf(Radio)).apply(this, arguments));
  }

  _createClass(Radio, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "div",
        { className: (0, _common.bem)("field") },
        _react2.default.createElement(
          "div",
          { className: (0, _common.bem)("field", "title") },
          _react2.default.createElement(
            "div",
            { className: (0, _common.bem)("field", "title-text") },
            this.props.label
          )
        ),
        _react2.default.createElement(
          "div",
          { className: (0, _common.bem)("field", "widget") },
          _react2.default.createElement(_RadioBlocks2.default, {
            options: [{ value: true, label: "Connect" }, { value: false, label: "Blank" }],
            activeOption: this.state.value,
            onOptionChange: this.updatePlot
          })
        )
      );
    }
  }]);

  return Radio;
}(_Field3.default);

exports.default = Radio;
module.exports = exports["default"];
//# sourceMappingURL=Radio.js.map