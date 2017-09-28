"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _common = require("../common");

var _common2 = _interopRequireDefault(_common);

var _EditModeMenuItem = require("./EditModeMenuItem");

var _EditModeMenuItem2 = _interopRequireDefault(_EditModeMenuItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Menu = function (_Component) {
  _inherits(Menu, _Component);

  function Menu() {
    _classCallCheck(this, Menu);

    return _possibleConstructorReturn(this, (Menu.__proto__ || Object.getPrototypeOf(Menu)).apply(this, arguments));
  }

  _createClass(Menu, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "div",
        { className: "editModeMenu" },
        _react2.default.createElement(_EditModeMenuItem2.default, {
          label: "Graph",
          section: "graph",
          expanded: true,
          onChangeSection: this.props.onChangeSection,
          currentSection: this.props.currentSection,
          sections: ["Create", "Filter", "Group"]
        }),
        _react2.default.createElement(_EditModeMenuItem2.default, {
          label: "Style",
          section: "style",
          onChangeSection: this.props.onChangeSection,
          currentSection: this.props.currentSection,
          sections: ["Traces", "Layout", "Notes", "Axes", "Legend", "Shapes", "Images"]
        })
      );
    }
  }]);

  return Menu;
}(_react.Component);

exports.default = Menu;
module.exports = exports["default"];
//# sourceMappingURL=EditModeMenu.js.map