"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Base2 = require("./Base");

var _Base3 = _interopRequireDefault(_Base2);

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

    var opts = _this.computeMenuOptions(props);

    _this.state = {
      section: opts[0].name,
      panel: opts[0].panels[0]
    };

    _this.setPanel = _this.setPanel.bind(_this);
    _this.renderSection = _this.renderSection.bind(_this);
    return _this;
  }

  _createClass(PanelsWithModeMenu, [{
    key: "setPanel",
    value: function setPanel(section, panel) {
      this.setState({ section: section, panel: panel });
    }
  }, {
    key: "renderSection",
    value: function renderSection(section, i) {
      return _react2.default.createElement(_ModeMenuSection2.default, {
        key: i,
        selectedSection: this.state.section,
        selectedPanel: this.state.panel,
        section: section.name,
        panels: section.panels,
        onChangeSection: this.setPanel
      });
    }
  }, {
    key: "computeMenuOptions",
    value: function computeMenuOptions(props) {
      var obj, child, section, name;
      var children = props.children;
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
      var _this2 = this;

      var menuOpts = this.computeMenuOptions(this.props);

      return _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(
          "div",
          { className: (0, _common.bem)("mode-menu") },
          menuOpts.map(this.renderSection)
        ),
        this.props.children.map(function (child, i) {
          return (0, _react.cloneElement)(child, {
            key: i,
            visible: _this2.state.section === child.props.section && _this2.state.panel === child.props.name
          });
        })
      );
    }
  }]);

  return PanelsWithModeMenu;
}(_Base3.default);

exports.default = PanelsWithModeMenu;
module.exports = exports["default"];
//# sourceMappingURL=PanelsWithModeMenu.js.map