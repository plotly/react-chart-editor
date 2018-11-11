'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnconnectedVisibilitySelect = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _lib = require('../../lib');

var _constants = require('../../lib/constants');

var _Field = require('./Field');

var _Field2 = _interopRequireDefault(_Field);

var _Radio = require('./Radio');

var _Radio2 = _interopRequireDefault(_Radio);

var _Dropdown = require('./Dropdown');

var _Dropdown2 = _interopRequireDefault(_Dropdown);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UnconnectedVisibilitySelect = exports.UnconnectedVisibilitySelect = function (_Component) {
  _inherits(UnconnectedVisibilitySelect, _Component);

  function UnconnectedVisibilitySelect(props, context) {
    _classCallCheck(this, UnconnectedVisibilitySelect);

    var _this = _possibleConstructorReturn(this, (UnconnectedVisibilitySelect.__proto__ || Object.getPrototypeOf(UnconnectedVisibilitySelect)).call(this, props, context));

    _this.setMode = _this.setMode.bind(_this);
    _this.setLocals = _this.setLocals.bind(_this);

    _this.setLocals(props);
    return _this;
  }

  _createClass(UnconnectedVisibilitySelect, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      this.setLocals(props);
    }
  }, {
    key: 'setLocals',
    value: function setLocals(props) {
      this.mode = props.fullValue === undefined || props.fullValue === _constants.MULTI_VALUED_PLACEHOLDER // eslint-disable-line no-undefined
      ? this.props.defaultOpt : props.fullValue;
    }
  }, {
    key: 'setMode',
    value: function setMode(mode) {
      this.props.updateContainer(_defineProperty({}, this.props.attr, mode));
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          dropdown = _props.dropdown,
          clearable = _props.clearable,
          options = _props.options,
          showOn = _props.showOn,
          attr = _props.attr,
          label = _props.label;


      return _react2.default.createElement(
        _react.Fragment,
        null,
        dropdown ? _react2.default.createElement(_Dropdown2.default, {
          attr: attr,
          label: label,
          options: options,
          fullValue: this.mode,
          updatePlot: this.setMode,
          clearable: clearable
        }) : _react2.default.createElement(_Radio2.default, {
          attr: attr,
          label: label,
          options: options,
          fullValue: this.mode,
          updatePlot: this.setMode
        }),
        Array.isArray(showOn) && showOn.includes(this.mode) || this.mode === showOn ? this.props.children : null
      );
    }
  }]);

  return UnconnectedVisibilitySelect;
}(_react.Component);

UnconnectedVisibilitySelect.propTypes = _extends({
  fullValue: _propTypes2.default.any,
  updatePlot: _propTypes2.default.func,
  dropdown: _propTypes2.default.bool,
  clearable: _propTypes2.default.bool,
  showOn: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.bool, _propTypes2.default.string, _propTypes2.default.array]),
  defaultOpt: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.bool, _propTypes2.default.string]),
  label: _propTypes2.default.string,
  attr: _propTypes2.default.string
}, _Field2.default.propTypes);

UnconnectedVisibilitySelect.contextTypes = {
  updateContainer: _propTypes2.default.func
};

exports.default = (0, _lib.connectToContainer)(UnconnectedVisibilitySelect);
//# sourceMappingURL=VisibilitySelect.js.map