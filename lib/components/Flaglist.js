"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Field2 = require("./Field");

var _Field3 = _interopRequireDefault(_Field2);

var _FlaglistCheckboxGroup = require("./widgets/FlaglistCheckboxGroup");

var _FlaglistCheckboxGroup2 = _interopRequireDefault(_FlaglistCheckboxGroup);

var _common = require("../common");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Flaglist = function (_Field) {
  _inherits(Flaglist, _Field);

  function Flaglist() {
    _classCallCheck(this, Flaglist);

    return _possibleConstructorReturn(this, (Flaglist.__proto__ || Object.getPrototypeOf(Flaglist)).apply(this, arguments));
  }

  _createClass(Flaglist, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "div",
        { className: (0, _common.bem)("field") },
        _react2.default.createElement(
          "div",
          { className: (0, _common.bem)("field", "no-title") },
          _react2.default.createElement(_FlaglistCheckboxGroup2.default, {
            options: this.props.options,
            activeOption: this.state.value,
            onChange: this.updatePlot
          })
        )
      );
    }
  }]);

  return Flaglist;
}(_Field3.default);

exports.default = Flaglist;
module.exports = exports["default"];
//# sourceMappingURL=Flaglist.js.map