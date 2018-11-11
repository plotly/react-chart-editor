'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TraceTypeSection = exports.LayoutSection = exports.LayoutPanel = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _PlotlyPanel = require('./PlotlyPanel');

var _PlotlyPanel2 = _interopRequireDefault(_PlotlyPanel);

var _PlotlySection = require('./PlotlySection');

var _PlotlySection2 = _interopRequireDefault(_PlotlySection);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _lib = require('../../lib');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LayoutPanel = (0, _lib.connectLayoutToPlot)(_PlotlyPanel2.default);
var LayoutSection = (0, _lib.connectLayoutToPlot)(_PlotlySection2.default);

var TraceTypeSection = function TraceTypeSection(props, context) {
  var fullContainer = context.fullContainer,
      fullData = context.fullData;
  var mode = props.mode,
      traceTypes = props.traceTypes;


  var ifConnectedToTrace = mode === 'trace' && fullContainer && traceTypes.includes(fullContainer.type);

  var ifConnectedToLayout = mode === 'layout' && fullData && fullData.some(function (t) {
    return traceTypes.includes(t.type);
  });

  if (ifConnectedToTrace || ifConnectedToLayout) {
    return _react2.default.createElement(_PlotlySection2.default, props);
  }

  return null;
};

TraceTypeSection.contextTypes = _lib.containerConnectedContextTypes;
TraceTypeSection.propTypes = {
  children: _propTypes2.default.node,
  name: _propTypes2.default.string,
  traceTypes: _propTypes2.default.array,
  mode: _propTypes2.default.string
};

TraceTypeSection.defaultProps = {
  traceTypes: [],
  mode: 'layout'
};

exports.LayoutPanel = LayoutPanel;
exports.LayoutSection = LayoutSection;
exports.TraceTypeSection = TraceTypeSection;
//# sourceMappingURL=derived.js.map