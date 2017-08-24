"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EditModeMenuItem = function (_Component) {
  _inherits(EditModeMenuItem, _Component);

  function EditModeMenuItem(props) {
    _classCallCheck(this, EditModeMenuItem);

    var _this = _possibleConstructorReturn(this, (EditModeMenuItem.__proto__ || Object.getPrototypeOf(EditModeMenuItem)).call(this, props));

    _this.state = {
      expanded: props.expanded
    };

    _this.toggleExpanded = _this.toggleExpanded.bind(_this);
    _this.onChangeSection = _this.onChangeSection.bind(_this);
    _this.renderSubItem = _this.renderSubItem.bind(_this);
    return _this;
  }

  _createClass(EditModeMenuItem, [{
    key: "toggleExpanded",
    value: function toggleExpanded() {
      this.setState({ expanded: !this.state.expanded });
    }
  }, {
    key: "onChangeSection",
    value: function onChangeSection(item) {
      this.props.onChangeSection(this.props.name + "-" + item);
    }
  }, {
    key: "renderSubItem",
    value: function renderSubItem(item, i) {
      var _this2 = this;

      var isActive = this.props.currentSection === this.props.name + "-" + item;

      return _react2.default.createElement(
        "div",
        {
          key: "subitem-" + i,
          className: "editModeMenu-subItem " + (isActive ? "is-active" : ""),
          onClick: function onClick() {
            return _this2.onChangeSection(item);
          }
        },
        item
      );
    }
  }, {
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "div",
        {
          className: "editModeMenu-item " + (this.state.expanded ? "is-expanded" : "")
        },
        _react2.default.createElement(
          "div",
          { className: "editModeMenu-itemTitle", onClick: this.toggleExpanded },
          this.props.name
        ),
        this.state.expanded && this.props.sections.map(this.renderSubItem)
      );
    }
  }]);

  return EditModeMenuItem;
}(_react.Component);

exports.default = EditModeMenuItem;


EditModeMenuItem.defaultProps = {
  expanded: false
};
module.exports = exports["default"];
//# sourceMappingURL=edit-mode-menu-item.js.map