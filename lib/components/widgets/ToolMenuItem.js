"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _ToolMenuItemSubmenu = require("./ToolMenuItemSubmenu");

var _ToolMenuItemSubmenu2 = _interopRequireDefault(_ToolMenuItemSubmenu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ToolMenuItem = function (_Component) {
  _inherits(ToolMenuItem, _Component);

  function ToolMenuItem(props) {
    _classCallCheck(this, ToolMenuItem);

    var _this = _possibleConstructorReturn(this, (ToolMenuItem.__proto__ || Object.getPrototypeOf(ToolMenuItem)).call(this, props));

    _this.state = {
      isOpen: false
    };

    _this.toggleInfo = _this.toggleInfo.bind(_this);
    _this.renderErrorMessage = _this.renderErrorMessage.bind(_this);
    return _this;
  }

  _createClass(ToolMenuItem, [{
    key: "toggleInfo",
    value: function toggleInfo() {
      this.setState({ isOpen: !this.state.isOpen });
    }
  }, {
    key: "renderErrorMessage",
    value: function renderErrorMessage() {
      var errorMessage = this.props.errorMessage;

      if (errorMessage) {
        return _react2.default.createElement(
          "div",
          { className: "menu-item__widget__layer menu-item__multiple" },
          _react2.default.createElement(
            "span",
            null,
            errorMessage
          ),
          _react2.default.createElement(_ToolMenuItemSubmenu2.default, {
            title: "Multiple Values",
            mainText: "This input has multiple values associated with it. Changing this setting will override these custom inputs.",
            subText: "Common Case: An 'All' tab might display this message because the X and Y tabs contain different settings.",
            iconClass: "icon-question menu-item__multiple__icon"
          })
        );
      }

      return null;
    }
  }, {
    key: "render",
    value: function render() {
      var childElement = this.props.children;

      var infoBox = (0, _classnames2.default)(["menu-item__multiple__info"], {
        "+visible": this.state.isOpen,
        "+hidden": !this.state.isOpen
      });

      if (this.props.units) {
        childElement = _react2.default.createElement(
          "span",
          { className: "menu-item-unit__block" },
          _react2.default.createElement(
            "span",
            null,
            this.props.children
          ),
          _react2.default.createElement(
            "span",
            { className: "menu-item-units" },
            this.props.units
          )
        );
      }

      return _react2.default.createElement(
        "div",
        { className: this.props.className },
        _react2.default.createElement(
          "div",
          { className: "menu-item" },
          _react2.default.createElement(
            "div",
            { className: "menu-item__title" },
            _react2.default.createElement(
              "div",
              { className: "menu-item__title__text" },
              this.props.title
            )
          ),
          _react2.default.createElement(
            "div",
            { className: "menu-item__widget" },
            _react2.default.createElement(
              "div",
              { className: "menu-item__widget__layer" },
              childElement
            ),
            this.renderErrorMessage()
          )
        )
      );
    }
  }]);

  return ToolMenuItem;
}(_react.Component);

exports.default = ToolMenuItem;


ToolMenuItem.propTypes = {
  title: _propTypes2.default.string.isRequired,
  children: _propTypes2.default.element.isRequired,
  units: _propTypes2.default.string,
  errorMessage: _propTypes2.default.string,
  className: _propTypes2.default.string
};
module.exports = exports["default"];
//# sourceMappingURL=ToolMenuItem.js.map