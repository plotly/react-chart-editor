'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnconnectedDropdownCustom = undefined;

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

var _Dropdown = require('../widgets/Dropdown');

var _Dropdown2 = _interopRequireDefault(_Dropdown);

var _Text = require('./Text');

var _Text2 = _interopRequireDefault(_Text);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UnconnectedDropdownCustom = exports.UnconnectedDropdownCustom = function (_Component) {
  _inherits(UnconnectedDropdownCustom, _Component);

  function UnconnectedDropdownCustom(props, context) {
    _classCallCheck(this, UnconnectedDropdownCustom);

    var _this = _possibleConstructorReturn(this, (UnconnectedDropdownCustom.__proto__ || Object.getPrototypeOf(UnconnectedDropdownCustom)).call(this, props, context));

    _this.setValue = _this.setValue.bind(_this);
    _this.setLocals = _this.setLocals.bind(_this);

    _this.setLocals(props);

    _this.state = {
      custom: _this.value === props.customOpt || !_this.props.options.map(function (o) {
        return o.value;
      }).includes(_this.value)
    };
    return _this;
  }

  _createClass(UnconnectedDropdownCustom, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      this.setLocals(props);
    }
  }, {
    key: 'setLocals',
    value: function setLocals(props) {
      this.value = props.fullValue === undefined || props.fullValue === _constants.MULTI_VALUED_PLACEHOLDER // eslint-disable-line no-undefined
      ? this.props.defaultOpt : props.fullValue;
    }
  }, {
    key: 'setValue',
    value: function setValue(value) {
      var custom = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      this.value = value;
      var customOpt = this.props.customOpt;
      this.setState({
        custom: (custom || value === customOpt) && value !== ''
      });
      this.props.updateContainer(_defineProperty({}, this.props.attr, value === customOpt && !custom ? customOpt : value));
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          options = _props.options,
          attr = _props.attr,
          customOpt = _props.customOpt;

      var value = (this.value === '' || !options.map(function (o) {
        return o.value;
      }).includes(this.value)) && this.state.custom ? customOpt : this.value;

      return _react2.default.createElement(
        _Field2.default,
        this.props,
        _react2.default.createElement(_Dropdown2.default, {
          backgroundDark: this.props.backgroundDark,
          options: options,
          value: value,
          onChange: this.setValue,
          clearable: this.props.clearable,
          optionRenderer: this.props.optionRenderer,
          valueRenderer: this.props.valueRenderer,
          placeholder: this.props.placeholder
        }),
        this.state.custom && _react2.default.createElement(_Text2.default, {
          attr: attr,
          updatePlot: function updatePlot(value) {
            return _this2.setValue(value, true);
          },
          onChange: function onChange(value) {
            if (value) {
              _this2.setValue(value, true);
            }
          }
        })
      );
    }
  }]);

  return UnconnectedDropdownCustom;
}(_react.Component);

UnconnectedDropdownCustom.propTypes = _extends({
  fullValue: _propTypes2.default.any,
  updatePlot: _propTypes2.default.func,
  clearable: _propTypes2.default.bool,
  defaultOpt: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.bool, _propTypes2.default.string]),
  customOpt: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.bool, _propTypes2.default.string]),
  label: _propTypes2.default.string,
  attr: _propTypes2.default.string
}, _Field2.default.propTypes);

UnconnectedDropdownCustom.contextTypes = {
  updateContainer: _propTypes2.default.func
};

exports.default = (0, _lib.connectToContainer)(UnconnectedDropdownCustom);
//# sourceMappingURL=DropdownCustom.js.map