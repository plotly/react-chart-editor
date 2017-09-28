"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _common = require("../common");

var _ModeMenuSection = require("./ModeMenuSection");

var _ModeMenuSection2 = _interopRequireDefault(_ModeMenuSection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ModeMenu = function (_Component) {
  _inherits(ModeMenu, _Component);

  function ModeMenu() {
    _classCallCheck(this, ModeMenu);

    return _possibleConstructorReturn(this, (ModeMenu.__proto__ || Object.getPrototypeOf(ModeMenu)).apply(this, arguments));
  }

  _createClass(ModeMenu, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "div",
        { className: (0, _common.bem)('mode-menu') },
        _react2.default.createElement(_ModeMenuSection2.default, {
          label: "Graph",
          section: "graph",
          expanded: true,
          onChangeSection: this.props.onChangeSection,
          currentSection: this.props.currentSection,
          sections: ["Create", "Filter", "Group"]
        }),
        _react2.default.createElement(_ModeMenuSection2.default, {
          label: "Style",
          section: "style",
          expanded: true,
          onChangeSection: this.props.onChangeSection,
          currentSection: this.props.currentSection,
          sections: ["Traces", "Layout", "Notes", "Axes", "Legend", "Shapes", "Images"]
        })
      );
    }
  }]);

  return ModeMenu;
}(_react.Component);

exports.default = ModeMenu;
module.exports = exports["default"];
//# sourceMappingURL=ModeMenu.js.map