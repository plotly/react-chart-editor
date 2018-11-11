'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Field = require('./Field');

var _Field2 = _interopRequireDefault(_Field);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Dropdown = require('../widgets/Dropdown');

var _Dropdown2 = _interopRequireDefault(_Dropdown);

var _RadioBlocks = require('../widgets/RadioBlocks');

var _RadioBlocks2 = _interopRequireDefault(_RadioBlocks);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AxesSelector = function (_Component) {
  _inherits(AxesSelector, _Component);

  function AxesSelector(props, context) {
    _classCallCheck(this, AxesSelector);

    var _this = _possibleConstructorReturn(this, (AxesSelector.__proto__ || Object.getPrototypeOf(AxesSelector)).call(this, props, context));

    var _ = context.localize;


    if (!context.axesTargetHandler) {
      throw new Error(_('AxesSelector must be nested within a connectAxesToPlot component'));
    }
    return _this;
  }

  _createClass(AxesSelector, [{
    key: 'render',
    value: function render() {
      var _context = this.context,
          axesTargetHandler = _context.axesTargetHandler,
          axesTarget = _context.axesTarget,
          fullLayout = _context.fullLayout,
          _ = _context.localize;
      var axesOptions = this.props.axesOptions;

      var maxCharsThatFitInRadio = 27;
      var maxOptions = axesOptions.length > 4; // eslint-disable-line

      var multipleSublots = fullLayout && fullLayout._subplots && Object.values(fullLayout._subplots).some(function (s) {
        return s.length > 1;
      });

      var options = multipleSublots ? axesOptions.map(function (option) {
        return option.value === 'allaxes' ? option : {
          label: option.title,
          value: option.value
        };
      }) : axesOptions;

      var totalCharsInOptions = options && options.map(function (o) {
        return o.label;
      }).reduce(function (acc, o) {
        return acc + o.length;
      }, 0) || 0;

      return maxOptions || totalCharsInOptions >= maxCharsThatFitInRadio ? _react2.default.createElement(
        _Field2.default,
        _extends({}, this.props, { label: _('Axis to Style') }),
        _react2.default.createElement(_Dropdown2.default, {
          options: options,
          value: axesTarget,
          onChange: axesTargetHandler,
          clearable: false
        })
      ) : _react2.default.createElement(
        _Field2.default,
        _extends({}, this.props, { center: true }),
        _react2.default.createElement(_RadioBlocks2.default, {
          options: options,
          activeOption: axesTarget,
          onOptionChange: axesTargetHandler
        })
      );
    }
  }]);

  return AxesSelector;
}(_react.Component);

AxesSelector.contextTypes = {
  axesTargetHandler: _propTypes2.default.func,
  axesTarget: _propTypes2.default.string,
  fullLayout: _propTypes2.default.object,
  localize: _propTypes2.default.func
};

AxesSelector.propTypes = {
  axesOptions: _propTypes2.default.array
};

exports.default = AxesSelector;
//# sourceMappingURL=AxesSelector.js.map