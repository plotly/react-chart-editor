'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lib = require('../../lib');

var _Field = require('./Field');

var _Field2 = _interopRequireDefault(_Field);

var _Dropdown = require('./Dropdown');

var _Dropdown2 = _interopRequireDefault(_Dropdown);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Button = require('../widgets/Button');

var _Button2 = _interopRequireDefault(_Button);

var _plotlyIcons = require('plotly-icons');

var _constants = require('../../lib/constants');

var _context = require('../../context');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UnconnectedGroupCreator = function (_Component) {
  _inherits(UnconnectedGroupCreator, _Component);

  function UnconnectedGroupCreator() {
    _classCallCheck(this, UnconnectedGroupCreator);

    return _possibleConstructorReturn(this, (UnconnectedGroupCreator.__proto__ || Object.getPrototypeOf(UnconnectedGroupCreator)).apply(this, arguments));
  }

  _createClass(UnconnectedGroupCreator, [{
    key: 'getAllGroups',
    value: function getAllGroups() {
      var _this2 = this;

      return [].concat(_toConsumableArray(new Set(this.context.data.map(function (t) {
        return t[_this2.props.attr];
      })))).filter(function (g) {
        return Boolean(g);
      });
    }
  }, {
    key: 'canAddGroup',
    value: function canAddGroup() {
      var _props = this.props,
          fullContainer = _props.fullContainer,
          attr = _props.attr;

      var currentGroup = fullContainer[attr];
      var currentTraceIndex = fullContainer.index;

      if (fullContainer.index === _constants.MULTI_VALUED) {
        return this.getAllGroups().length === 0;
      }

      return !currentGroup || this.context.fullData.some(function (d) {
        return d.index !== currentTraceIndex && d[attr] === currentGroup;
      });
    }
  }, {
    key: 'addAndUpdateGroup',
    value: function addAndUpdateGroup() {
      var _this3 = this;

      var allGroups = this.context.fullData.map(function (t) {
        return parseInt(t[_this3.props.attr], 10);
      }).filter(function (n) {
        return Number.isInteger(n);
      });
      // don't want to pass empty array to max
      allGroups.push(0);

      var lastGroupNumber = Math.max.apply(Math, allGroups);

      this.props.updatePlot(lastGroupNumber + 1);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var _ = this.context.localize;
      var _props2 = this.props,
          attr = _props2.attr,
          label = _props2.label,
          prefix = _props2.prefix,
          updatePlot = _props2.updatePlot;


      var options = [{ label: _('None'), value: '' }];
      var allGroups = this.getAllGroups();
      allGroups.forEach(function (g) {
        return options.push({ label: prefix + ' ' + g, value: g });
      });
      options.sort(function (a, b) {
        return a.value - b.value;
      });

      var icon = _react2.default.createElement(_plotlyIcons.PlusIcon, null);
      var addButton = this.canAddGroup() ? _react2.default.createElement(_Button2.default, { variant: 'no-text', icon: icon, onClick: function onClick() {
          return _this4.addAndUpdateGroup();
        } }) : _react2.default.createElement(_Button2.default, { variant: 'no-text--disabled', icon: icon, onClick: function onClick() {} });

      return _react2.default.createElement(_Dropdown2.default, {
        label: label,
        attr: attr,
        clearable: false,
        options: options,
        updatePlot: updatePlot,
        extraComponent: addButton
      });
    }
  }]);

  return UnconnectedGroupCreator;
}(_react.Component);

UnconnectedGroupCreator.propTypes = _extends({
  attr: _propTypes2.default.string,
  fullContainer: _propTypes2.default.object,
  prefix: _propTypes2.default.string
}, _Field2.default.propTypes);

UnconnectedGroupCreator.contextType = _context.EditorControlsContext;

exports.default = (0, _lib.connectToContainer)(UnconnectedGroupCreator);
//# sourceMappingURL=GroupCreator.js.map