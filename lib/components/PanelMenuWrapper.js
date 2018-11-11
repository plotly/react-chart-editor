'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SidebarGroup = require('./sidebar/SidebarGroup');

var _SidebarGroup2 = _interopRequireDefault(_SidebarGroup);

var _lib = require('../lib');

var _sortMenu = require('../lib/sortMenu');

var _sortMenu2 = _interopRequireDefault(_sortMenu);

var _context = require('../context');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PanelsWithSidebar = function (_Component) {
  _inherits(PanelsWithSidebar, _Component);

  function PanelsWithSidebar(props) {
    _classCallCheck(this, PanelsWithSidebar);

    var _this = _possibleConstructorReturn(this, (PanelsWithSidebar.__proto__ || Object.getPrototypeOf(PanelsWithSidebar)).call(this, props));

    var opts = _this.computeMenuOptions(props);
    var firstSidebarGroup = opts.filter(function (o) {
      return o.panels;
    })[0];

    _this.state = {
      group: firstSidebarGroup.name,
      panel: firstSidebarGroup.panels[0]
    };

    _this.setPanel = _this.setPanel.bind(_this);
    _this.renderSection = _this.renderSection.bind(_this);
    return _this;
  }

  _createClass(PanelsWithSidebar, [{
    key: 'setPanel',
    value: function setPanel(group, panel) {
      this.setState({ group: group, panel: panel });
    }
  }, {
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        setPanel: this.setPanel
      };
    }
  }, {
    key: 'provideValue',
    value: function provideValue() {
      return {
        setPanel: this.setPanel
      };
    }
  }, {
    key: 'renderSection',
    value: function renderSection(section, i) {
      if (section.type && (section.type.plotly_editor_traits || {}).sidebar_element) {
        return (0, _react.cloneElement)(section, { key: i });
      }
      return _react2.default.createElement(_SidebarGroup2.default, {
        key: i,
        selectedGroup: this.state.group,
        selectedPanel: this.state.panel,
        group: section.name,
        panels: section.panels,
        onChangeGroup: this.setPanel
      });
    }
  }, {
    key: 'computeMenuOptions',
    value: function computeMenuOptions(props) {
      var children = props.children,
          menuPanelOrder = props.menuPanelOrder;

      var sections = [];
      var groupLookup = {};
      var groupIndex = void 0;
      var panels = _react2.default.Children.toArray(children);

      if (menuPanelOrder) {
        (0, _sortMenu2.default)(panels, menuPanelOrder);
      }

      panels.forEach(function (child) {
        if (!child) {
          return;
        }
        var group = child.props.group;
        var name = child.props.name;

        if (group && name) {
          var obj = void 0;
          if (groupLookup.hasOwnProperty(group)) {
            groupIndex = groupLookup[group];
            obj = sections[groupIndex];
          } else {
            groupLookup[group] = sections.length;
            obj = { name: group, panels: [] };
            sections.push(obj);
          }
          obj.panels.push(name);
        }

        if ((child.type.plotly_editor_traits || {}).sidebar_element) {
          sections.push(child);
        }
      });

      return sections;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var menuOpts = this.computeMenuOptions(this.props);

      return _react2.default.createElement(
        _context.PanelMenuWrapperContext.Provider,
        { value: this.provideValue() },
        _react2.default.createElement(
          'div',
          { className: (0, _lib.bem)('editor_controls', 'wrapper') },
          _react2.default.createElement(
            'div',
            { className: (0, _lib.bem)('sidebar') },
            menuOpts.map(this.renderSection)
          ),
          _react2.default.Children.map(this.props.children, function (child, i) {
            return child === null || _this2.state.group !== child.props.group || _this2.state.panel !== child.props.name ? null : (0, _react.cloneElement)(child, { key: i });
          })
        )
      );
    }
  }]);

  return PanelsWithSidebar;
}(_react.Component);

PanelsWithSidebar.propTypes = {
  children: _propTypes2.default.node,
  menuPanelOrder: _propTypes2.default.array
};

PanelsWithSidebar.childContextTypes = {
  setPanel: _propTypes2.default.func
};

exports.default = PanelsWithSidebar;
//# sourceMappingURL=PanelMenuWrapper.js.map