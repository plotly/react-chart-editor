"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _common = require("../common");

var _ModeMenuItem = require("./ModeMenuItem");

var _ModeMenuItem2 = _interopRequireDefault(_ModeMenuItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ModeMenuSection = function (_Component) {
  _inherits(ModeMenuSection, _Component);

  function ModeMenuSection(props) {
    _classCallCheck(this, ModeMenuSection);

    var _this = _possibleConstructorReturn(this, (ModeMenuSection.__proto__ || Object.getPrototypeOf(ModeMenuSection)).call(this, props));

    _this.state = {
      expanded: props.expanded
    };

    _this.toggleExpanded = _this.toggleExpanded.bind(_this);
    _this.onChangeSection = _this.onChangeSection.bind(_this);
    _this.renderSubItem = _this.renderSubItem.bind(_this);
    return _this;
  }

  _createClass(ModeMenuSection, [{
    key: "toggleExpanded",
    value: function toggleExpanded() {
      this.setState({ expanded: !this.state.expanded });
    }
  }, {
    key: "onChangeSection",
    value: function onChangeSection(item) {
      this.props.onChangeSection(this.props.label + "-" + item);
    }
  }, {
    key: "renderSubItem",
    value: function renderSubItem(item, i) {
      var _this2 = this;

      var isActive = this.props.currentSection === this.props.label + "-" + item;

      return _react2.default.createElement(_ModeMenuItem2.default, {
        key: "subitem-" + i,
        active: isActive,
        onClick: function onClick() {
          return _this2.onChangeSection(item);
        },
        label: item
      });
    }
  }, {
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "div",
        {
          className: (0, _common.bem)("mode-menu-section", [this.state.expanded ? "is-expanded" : ""])
        },
        _react2.default.createElement(
          "div",
          {
            onClick: this.toggleExpanded,
            className: (0, _common.bem)("mode-menu-section", "title")
          },
          this.props.label
        ),
        this.state.expanded && this.props.sections.map(this.renderSubItem)
      );
    }
  }]);

  return ModeMenuSection;
}(_react.Component);

exports.default = ModeMenuSection;


ModeMenuSection.defaultProps = {
  expanded: false
};
module.exports = exports["default"];
//# sourceMappingURL=ModeMenuSection.js.map