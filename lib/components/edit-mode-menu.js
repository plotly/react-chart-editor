"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _editModeMenuItem = require("./edit-mode-menu-item.js");

var _editModeMenuItem2 = _interopRequireDefault(_editModeMenuItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EditModeMenu = function (_Component) {
  _inherits(EditModeMenu, _Component);

  function EditModeMenu() {
    _classCallCheck(this, EditModeMenu);

    return _possibleConstructorReturn(this, (EditModeMenu.__proto__ || Object.getPrototypeOf(EditModeMenu)).apply(this, arguments));
  }

  _createClass(EditModeMenu, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "div",
        { className: "editModeMenu" },
        _react2.default.createElement(_editModeMenuItem2.default, {
          name: "Graph",
          expanded: true,
          onChangeSection: this.props.onChangeSection,
          currentSection: this.props.currentSection,
          sections: ["Create", "Filter", "Group"]
        }),
        _react2.default.createElement(_editModeMenuItem2.default, {
          name: "Style",
          onChangeSection: this.props.onChangeSection,
          currentSection: this.props.currentSection,
          sections: ["Traces", "Layout", "Notes", "Axes", "Legend", "Shapes", "Images"]
        })
      );
    }
  }]);

  return EditModeMenu;
}(_react.Component);

exports.default = EditModeMenu;
module.exports = exports["default"];
//# sourceMappingURL=edit-mode-menu.js.map