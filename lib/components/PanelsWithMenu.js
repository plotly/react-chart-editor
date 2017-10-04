"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _base = require("./base");

var _base2 = _interopRequireDefault(_base);

var _common = require("../common");

var _ModeMenuSection = require("./ModeMenuSection");

var _ModeMenuSection2 = _interopRequireDefault(_ModeMenuSection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PanelsWithModeMenu = function (_Base) {
  _inherits(PanelsWithModeMenu, _Base);

  function PanelsWithModeMenu(props) {
    _classCallCheck(this, PanelsWithModeMenu);

    var _this = _possibleConstructorReturn(this, (PanelsWithModeMenu.__proto__ || Object.getPrototypeOf(PanelsWithModeMenu)).call(this, props));

    _this.state = {
      section: ''
    };

    _this.setSection = _this.setSection.bind(_this);
    _this.renderSection = _this.renderSection.bind(_this);
    return _this;
  }

  _createClass(PanelsWithModeMenu, [{
    key: "setSection",
    value: function setSection(section) {
      this.setState({ section: section });
    }
  }, {
    key: "renderSection",
    value: function renderSection(section, i) {
      return _react2.default.createElement(_ModeMenuSection2.default, {
        key: i,
        label: section.name,
        panels: section.panels,
        currentSection: this.state.section,
        onChangeSection: this.setSection
      });
    }
  }, {
    key: "computeMenuOptions",
    value: function computeMenuOptions() {
      var obj, child, section, name;
      var children = this.props.children;
      var sectionLookup = {};
      var sectionIndex;
      var sections = [];
      for (var i = 0; i < children.length; i++) {
        child = children[i];
        section = child.props.section;
        name = child.props.name;

        if (sectionLookup.hasOwnProperty(section)) {
          sectionIndex = sectionLookup[section];
          obj = sections[sectionIndex];
        } else {
          sectionLookup[section] = sections.length;
          obj = { name: section, panels: [] };
          sections.push(obj);
        }

        obj.panels.push(name);
      }

      return sections;
    }
  }, {
    key: "render",
    value: function render() {
      var menuOpts = this.computeMenuOptions();

      return _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(
          "div",
          { className: (0, _common.bem)("mode-menu") },
          menuOpts.map(this.renderSection)
        ),
        _react2.default.createElement(
          "div",
          null,
          this.props.children
        )
      );
    }
  }]);

  return PanelsWithModeMenu;
}(_base2.default);

exports.default = PanelsWithModeMenu;
module.exports = exports["default"];
//# sourceMappingURL=PanelsWithMenu.js.map