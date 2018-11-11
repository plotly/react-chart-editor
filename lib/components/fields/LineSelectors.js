'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LineDashSelector = exports.LineShapeSelector = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _Dropdown = require('./Dropdown');

var _Dropdown2 = _interopRequireDefault(_Dropdown);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _nested_property = require('plotly.js/src/lib/nested_property');

var _nested_property2 = _interopRequireDefault(_nested_property);

var _lib = require('../../lib');

var _constants = require('../../lib/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint-disable react/prop-types */
var styledRenderer = function styledRenderer(_ref) {
  var label = _ref.label;

  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      'svg',
      { width: '100', height: '16' },
      _react2.default.createElement(
        'g',
        null,
        label
      )
    )
  );
};
/* eslint-enable react/prop-types */

var strokeDashes = [{ value: 'solid', strokeDasharray: '' }, { value: 'dot', strokeDasharray: '3px, 3px' }, { value: 'dash', strokeDasharray: '9px, 9px' }, { value: 'longdash', strokeDasharray: '15px, 15px' }, { value: 'dashdot', strokeDasharray: '9px, 3px, 3px, 3px' }, { value: 'longdashdot', strokeDasharray: '15px, 6px, 3px, 6px' }];

var strokeShapes = [{ d: 'M2,14L14,2', value: 'linear' }, { d: 'M2,14C4,4 16,16 18,2', value: 'spline' }, { d: 'M2,14H14V2', value: 'hv' }, { d: 'M2,14V2H14', value: 'vh' }, { d: 'M2,14H8V2H14', value: 'hvh' }, { d: 'M2,14V8H14V2', value: 'vhv' }];

var strokeStyle = { fill: 'none', strokeWidth: '4px' };

var _computeOptions = function _computeOptions(strokeData, stroke) {
  return strokeData.map(function (_ref2) {
    var value = _ref2.value,
        strokeDasharray = _ref2.strokeDasharray,
        _ref2$d = _ref2.d,
        d = _ref2$d === undefined ? 'M0,8h100' : _ref2$d;
    return {
      label: _react2.default.createElement('path', {
        d: d,
        style: _extends({}, strokeStyle, {
          stroke: !stroke || stroke === _constants.MULTI_VALUED ? _constants.COLORS.mutedBlue : stroke,
          strokeDasharray: strokeDasharray
        })
      }),
      value: value
    };
  });
};

var LineShapeSelector = exports.LineShapeSelector = function LineShapeSelector(props) {
  return _react2.default.createElement(LineSelector, _extends({}, props, { computeOptions: _computeOptions.bind(null, strokeShapes) }));
};

var LineDashSelector = exports.LineDashSelector = function LineDashSelector(props) {
  return _react2.default.createElement(LineSelector, _extends({}, props, {
    computeOptions: function computeOptions(lineColor) {
      return _computeOptions(strokeDashes, lineColor).concat([{
        label: '',
        value: null
      }]);
    }
  }));
};

var LineSelector = function (_Component) {
  _inherits(LineSelector, _Component);

  function LineSelector(props, context) {
    _classCallCheck(this, LineSelector);

    var _this = _possibleConstructorReturn(this, (LineSelector.__proto__ || Object.getPrototypeOf(LineSelector)).call(this, props, context));

    _this.setLocals(props, context);
    return _this;
  }

  _createClass(LineSelector, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps, nextContext) {
      this.setLocals(nextProps, nextContext);
    }
  }, {
    key: 'setLocals',
    value: function setLocals(nextProps, nextContext) {
      var fullContainer = nextContext.fullContainer;

      var lineColor = (0, _nested_property2.default)(fullContainer, 'line.color').get();
      if (!this.options || this.lineColor !== lineColor) {
        this.options = this.props.computeOptions(lineColor);
        this.lineColor = lineColor;
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_Dropdown2.default, _extends({}, this.props, {
        options: this.options,
        valueRenderer: styledRenderer,
        optionRenderer: styledRenderer,
        backgroundDark: (0, _lib.tooLight)(this.lineColor)
      }));
    }
  }]);

  return LineSelector;
}(_react.Component);

LineSelector.propTypes = _extends({
  computeOptions: _propTypes2.default.func
}, _Dropdown2.default.propTypes);

LineSelector.defaultProps = {
  clearable: false
};

LineSelector.contextTypes = {
  fullContainer: _propTypes2.default.object
};
//# sourceMappingURL=LineSelectors.js.map