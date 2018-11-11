'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _Dropdown = require('./Dropdown');

var _Dropdown2 = _interopRequireDefault(_Dropdown);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _arrow_paths = require('plotly.js/src/components/annotations/arrow_paths');

var _arrow_paths2 = _interopRequireDefault(_arrow_paths);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ARROW_OPTIONS = _arrow_paths2.default.map(function (_ref, index) {
  var path = _ref.path;

  var label = _react2.default.createElement(
    'svg',
    { width: '40', height: '20', style: { position: 'relative', top: '5px' } },
    _react2.default.createElement('line', {
      stroke: 'rgb(68, 68, 68)',
      style: { fill: 'none' },
      x1: '5',
      y1: '10',
      x2: '23.8',
      y2: '10',
      strokeWidth: '2'
    }),
    _react2.default.createElement('path', {
      d: path,
      transform: 'translate(23.8,10)rotate(360)scale(2)',
      style: { fill: 'rgb(68, 68, 68)', opacity: 1, strokeWidth: 0 }
    })
  );

  return {
    label: label,
    value: index,
    key: 'arrow' + index
  };
});

var ArrowSelector = function ArrowSelector(props) {
  return _react2.default.createElement(_Dropdown2.default, _extends({}, props, { options: ARROW_OPTIONS }));
};

ArrowSelector.propTypes = _extends({}, _Dropdown2.default.propTypes);

ArrowSelector.defaultProps = {
  clearable: false
};

exports.default = ArrowSelector;
//# sourceMappingURL=ArrowSelector.js.map