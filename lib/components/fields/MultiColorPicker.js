'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ColorPicker = require('./ColorPicker');

var _ColorPicker2 = _interopRequireDefault(_ColorPicker);

var _ColorscalePicker = require('./ColorscalePicker');

var _Field = require('./Field');

var _Field2 = _interopRequireDefault(_Field);

var _Info = require('./Info');

var _Info2 = _interopRequireDefault(_Info);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _RadioBlocks = require('../widgets/RadioBlocks');

var _RadioBlocks2 = _interopRequireDefault(_RadioBlocks);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _nested_property = require('plotly.js/src/lib/nested_property');

var _nested_property2 = _interopRequireDefault(_nested_property);

var _lib = require('../../lib');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CustomColorscalePicker = (0, _lib.connectToContainer)(_ColorscalePicker.UnconnectedColorscalePicker, {
  modifyPlotProps: function modifyPlotProps(props, context, plotProps) {
    if (props.attr === 'marker.color' && context.fullData.filter(function (t) {
      return context.traceIndexes.includes(t.index);
    }).every(function (t) {
      return t.marker && t.marker.color;
    }) && plotProps.fullValue && typeof plotProps.fullValue === 'string') {
      plotProps.fullValue = context.fullData && context.fullData.filter(function (t) {
        return context.traceIndexes.includes(t.index);
      }).map(function (t) {
        return [0, t.marker.color];
      });
    }
  }
});

var UnconnectedMultiColorPicker = function (_Component) {
  _inherits(UnconnectedMultiColorPicker, _Component);

  function UnconnectedMultiColorPicker(props, context) {
    _classCallCheck(this, UnconnectedMultiColorPicker);

    var _this = _possibleConstructorReturn(this, (UnconnectedMultiColorPicker.__proto__ || Object.getPrototypeOf(UnconnectedMultiColorPicker)).call(this, props, context));

    _this.state = {
      selectedConstantColorOption: context.traceIndexes.length > 1 && props.fullValue && props.fullValue.every(function (v) {
        return v[1] === props.fullValue[0][1];
      }) ? 'single' : 'multiple'
    };
    _this.setColor = _this.setColor.bind(_this);
    _this.setColors = _this.setColors.bind(_this);
    return _this;
  }

  _createClass(UnconnectedMultiColorPicker, [{
    key: 'setColor',
    value: function setColor(color) {
      if (this.props.setColor) {
        this.props.setColor(color);
      } else {
        this.props.updatePlot(color);
      }
    }
  }, {
    key: 'setColors',
    value: function setColors(colorscale, colorscaleType) {
      var _this2 = this;

      var numberOfTraces = this.props.tracesToColor.length;
      var colors = colorscale.map(function (c) {
        return c[1];
      });

      var adjustedColors = colors;

      if (colorscaleType !== 'categorical') {
        adjustedColors = (0, _lib.adjustColorscale)(colors, numberOfTraces, colorscaleType);
      }

      if (adjustedColors.every(function (c) {
        return c === adjustedColors[0];
      }) || colorscaleType === 'categorical') {
        adjustedColors = (0, _lib.adjustColorscale)(colors, numberOfTraces, colorscaleType, { repeat: true });
      }

      var updates = adjustedColors.map(function (color) {
        return _defineProperty({}, _this2.props.attr, color);
      });

      this.context.updateContainer(updates);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _ = this.context.localize;
      var constantOptions = [{ label: _('Single'), value: 'single' }, { label: _('Multiple'), value: 'multiple' }];
      var selectedConstantColorOption = this.props.parentSelectedConstantColorOption ? this.props.parentSelectedConstantColorOption : this.state.selectedConstantColorOption;

      var multiMessage = this.props.multiColorMessage ? this.props.multiColorMessage : _('Each will be colored according to the selected colors.');

      var singleMessage = this.props.singleColorMessage ? this.props.singleColorMessage : _('All will be colored in the same color.');

      if (this.context.traceIndexes.length > 1) {
        return _react2.default.createElement(
          _Field2.default,
          _extends({}, this.props, { suppressMultiValuedMessage: true }),
          _react2.default.createElement(_RadioBlocks2.default, {
            options: constantOptions,
            activeOption: selectedConstantColorOption,
            onOptionChange: this.props.onConstantColorOptionChange ? this.props.onConstantColorOptionChange : function (value) {
              return _this3.setState({ selectedConstantColorOption: value });
            }
          }),
          _react2.default.createElement(
            _Info2.default,
            null,
            selectedConstantColorOption === 'single' ? singleMessage : multiMessage
          ),
          selectedConstantColorOption === 'single' ? _react2.default.createElement(_ColorPicker2.default, { attr: this.props.attr, updatePlot: this.setColor }) : _react2.default.createElement(CustomColorscalePicker, {
            suppressMultiValuedMessage: true,
            attr: this.props.attr,
            updatePlot: this.setColors,
            fullValue: this.props.fullValue,
            initialCategory: 'categorical'
          })
        );
      }

      return _react2.default.createElement(_ColorPicker2.default, { attr: this.props.attr, updatePlot: this.setColor, label: this.props.label });
    }
  }]);

  return UnconnectedMultiColorPicker;
}(_react.Component);

UnconnectedMultiColorPicker.propTypes = _extends({
  multiColorMessage: _propTypes2.default.string,
  singleColorMessage: _propTypes2.default.string,
  updatePlot: _propTypes2.default.func,
  attr: _propTypes2.default.string,
  parentSelectedConstantColorOption: _propTypes2.default.string,
  onConstantColorOptionChange: _propTypes2.default.func,
  messageKeyWordSingle: _propTypes2.default.string,
  messageKeyWordPlural: _propTypes2.default.string,
  tracesToColor: _propTypes2.default.array
}, _Field2.default.propTypes);

UnconnectedMultiColorPicker.contextTypes = {
  localize: _propTypes2.default.func,
  updateContainer: _propTypes2.default.func,
  traceIndexes: _propTypes2.default.array,
  fullData: _propTypes2.default.array
};

exports.default = (0, _lib.connectToContainer)(UnconnectedMultiColorPicker, {
  modifyPlotProps: function modifyPlotProps(props, context, plotProps) {
    if (plotProps.isVisible) {
      var colors = [];
      var tracesToColor = [];
      var dedupedTraceIndexes = [];

      context.traceIndexes.forEach(function (i) {
        if (!dedupedTraceIndexes.includes(i)) {
          dedupedTraceIndexes.push(i);
        }
      });

      dedupedTraceIndexes.forEach(function (traceIndex) {
        var traces = context.fullData.filter(function (trace) {
          return trace.index === traceIndex;
        });
        tracesToColor = tracesToColor.concat(traces);

        traces.forEach(function (t) {
          var value = (0, _nested_property2.default)(t, props.attr).get();
          if (value) {
            colors.push(value);
          }
        });
      });

      plotProps.tracesToColor = tracesToColor;
      plotProps.fullValue = colors.map(function (c) {
        return [0, c];
      });
    }
  }
});
//# sourceMappingURL=MultiColorPicker.js.map