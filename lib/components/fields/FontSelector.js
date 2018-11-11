'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _Dropdown = require('./Dropdown');

var _Dropdown2 = _interopRequireDefault(_Dropdown);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable react/prop-types */
var styledRenderer = function styledRenderer(_ref) {
  var value = _ref.value,
      label = _ref.label;
  return _react2.default.createElement(
    'span',
    { style: { fontFamily: value } },
    label
  );
};
/* eslint-enable react/prop-types */

var FontSelector = function FontSelector(props, context) {
  return _react2.default.createElement(_Dropdown2.default, _extends({}, props, {
    options: context.fontOptions,
    valueRenderer: styledRenderer,
    optionRenderer: styledRenderer
  }));
};

FontSelector.propTypes = _extends({}, _Dropdown2.default.propTypes);

FontSelector.defaultProps = {
  clearable: false
};

FontSelector.contextTypes = {
  fontOptions: _propTypes2.default.array
};

exports.default = FontSelector;
//# sourceMappingURL=FontSelector.js.map