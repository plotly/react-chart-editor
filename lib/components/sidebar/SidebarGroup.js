'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lib = require('../../lib');

var _plotlyIcons = require('plotly-icons');

var _SidebarItem = require('./SidebarItem');

var _SidebarItem2 = _interopRequireDefault(_SidebarItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SidebarGroup = function (_Component) {
  _inherits(SidebarGroup, _Component);

  function SidebarGroup(props) {
    _classCallCheck(this, SidebarGroup);

    var _this = _possibleConstructorReturn(this, (SidebarGroup.__proto__ || Object.getPrototypeOf(SidebarGroup)).call(this, props));

    _this.state = {
      expanded: _this.props.group === _this.props.selectedGroup
    };

    _this.toggleExpanded = _this.toggleExpanded.bind(_this);
    _this.onChangeGroup = _this.onChangeGroup.bind(_this);
    _this.renderSubItem = _this.renderSubItem.bind(_this);
    return _this;
  }

  _createClass(SidebarGroup, [{
    key: 'toggleExpanded',
    value: function toggleExpanded() {
      this.setState({ expanded: !this.state.expanded });
    }
  }, {
    key: 'onChangeGroup',
    value: function onChangeGroup(panel) {
      this.props.onChangeGroup(this.props.group, panel);
    }
  }, {
    key: 'renderSubItem',
    value: function renderSubItem(panel, i) {
      var _this2 = this;

      var isActive = this.props.selectedPanel === panel && this.props.group === this.props.selectedGroup;

      return _react2.default.createElement(_SidebarItem2.default, {
        key: 'subitem-' + i,
        active: isActive,
        onClick: function onClick() {
          return _this2.onChangeGroup(panel);
        },
        label: panel
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          group = _props.group,
          panels = _props.panels,
          selectedGroup = _props.selectedGroup;
      var expanded = this.state.expanded;

      return _react2.default.createElement(
        'div',
        {
          className: (0, _lib.bem)('sidebar__group', [expanded ? 'is-expanded' : '', selectedGroup === group ? 'is-active' : ''])
        },
        _react2.default.createElement(
          'div',
          { onClick: this.toggleExpanded, className: (0, _lib.bem)('sidebar__group', 'title') },
          _react2.default.createElement(
            'div',
            { className: (0, _lib.bem)('sidebar__group', 'title__icon') },
            _react2.default.createElement(_plotlyIcons.AngleRightIcon, null)
          ),
          _react2.default.createElement(
            'div',
            { className: (0, _lib.bem)('sidebar__group', 'title__label') },
            group
          )
        ),
        expanded && panels.map(this.renderSubItem)
      );
    }
  }]);

  return SidebarGroup;
}(_react.Component);

exports.default = SidebarGroup;


SidebarGroup.propTypes = {
  group: _propTypes2.default.string,
  onChangeGroup: _propTypes2.default.func,
  panels: _propTypes2.default.array,
  selectedGroup: _propTypes2.default.string,
  selectedPanel: _propTypes2.default.string
};
//# sourceMappingURL=SidebarGroup.js.map