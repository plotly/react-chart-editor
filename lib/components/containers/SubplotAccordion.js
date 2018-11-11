'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _PlotlyFold = require('./PlotlyFold');

var _PlotlyFold2 = _interopRequireDefault(_PlotlyFold);

var _TraceRequiredPanel = require('./TraceRequiredPanel');

var _TraceRequiredPanel2 = _interopRequireDefault(_TraceRequiredPanel);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lib = require('../../lib');

var _constants = require('../../lib/constants');

var _context2 = require('../../context');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TraceFold = (0, _lib.connectTraceToPlot)(_PlotlyFold2.default);
var NonCartesianSubplotFold = (0, _lib.connectNonCartesianSubplotToLayout)(_PlotlyFold2.default);
var CartesianSubplotFold = (0, _lib.connectCartesianSubplotToLayout)(_PlotlyFold2.default);

var SubplotAccordion = function (_Component) {
  _inherits(SubplotAccordion, _Component);

  function SubplotAccordion() {
    _classCallCheck(this, SubplotAccordion);

    return _possibleConstructorReturn(this, (SubplotAccordion.__proto__ || Object.getPrototypeOf(SubplotAccordion)).apply(this, arguments));
  }

  _createClass(SubplotAccordion, [{
    key: 'render',
    value: function render() {
      var _context = this.context,
          _context$data = _context.data,
          data = _context$data === undefined ? [] : _context$data,
          _context$layout = _context.layout,
          layout = _context$layout === undefined ? {} : _context$layout,
          _ = _context.localize;
      var children = this.props.children;

      var subplotFolds = [];

      var allCartesianAxisCombinations = data.reduce(function (acc, curVal, inx) {
        if (_constants.TRACE_TO_AXIS.cartesian.some(function (c) {
          return c === curVal.type;
        })) {
          var xaxis = 'xaxis' + (curVal.xaxis ? curVal.xaxis.substring(1) : '');
          var yaxis = 'yaxis' + (curVal.yaxis ? curVal.yaxis.substring(1) : '');

          var existingComboIndex = acc.findIndex(function (t) {
            return t.xaxis === xaxis && t.yaxis === yaxis;
          });
          if (existingComboIndex === -1) {
            acc.push({
              xaxis: xaxis,
              yaxis: yaxis,
              xaxisName: curVal.xaxis ? (0, _lib.getSubplotTitle)(curVal.xaxis, 'x', _) : 'X 1',
              yaxisName: curVal.yaxis ? (0, _lib.getSubplotTitle)(curVal.yaxis, 'y', _) : 'Y 1',
              index: [inx]
            });
          } else {
            acc[existingComboIndex].index.push(inx);
          }
        }
        return acc;
      }, []);

      allCartesianAxisCombinations.forEach(function (d) {
        return subplotFolds[d.index[0]] = _react2.default.createElement(
          CartesianSubplotFold,
          {
            key: d.index[0],
            traceIndexes: d.index,
            canDelete: false,
            xaxis: d.xaxis,
            yaxis: d.yaxis,
            name: d.xaxisName + ' | ' + d.yaxisName
          },
          children
        );
      });

      // For each key in layout, find all traces that belong to this subplot.
      // E.g. if layout attr is 'ternary', find all traces that are of type
      // that has subplot ternary, if layout attr is 'ternary2', find traces
      // of right type that have attr 'subplot': 'ternary' in their data.

      /**
      Example: 
      {
        "data": [
          {
            "type": "scatterternary",
            "mode": "markers",
          },
          {
            "type": "scatterternary",
            "mode": "markers",
            "subplot": "ternary2"
          }
        ],
        "layout": {
          "ternary": {},
          "ternary2": {},
        },
      }
       */

      Object.keys(layout).forEach(function (layoutKey) {
        var traceIndexes = [];
        var subplotName = void 0;
        if (['geo', 'mapbox', 'polar', 'gl3d', 'ternary'].some(function (subplotType) {
          subplotName = (0, _lib.getSubplotTitle)(layoutKey, subplotType, _);
          var trIndex = _constants.SUBPLOT_TO_ATTR[subplotType].layout === layoutKey ? data.findIndex(function (trace) {
            return _constants.TRACE_TO_AXIS[subplotType].some(function (tt) {
              return tt === trace.type;
            });
          }) : data.findIndex(function (trace) {
            return trace[_constants.SUBPLOT_TO_ATTR[subplotType].data] === layoutKey;
          });
          if (trIndex !== -1) {
            traceIndexes.push(trIndex);
          }
          return layoutKey.startsWith(_constants.SUBPLOT_TO_ATTR[subplotType].layout);
        })) {
          subplotFolds[traceIndexes[0]] = _react2.default.createElement(
            NonCartesianSubplotFold,
            {
              key: layoutKey,
              traceIndexes: traceIndexes,
              canDelete: false,
              subplot: layoutKey,
              name: subplotName
            },
            children
          );
        }
      });

      var pieCounter = 0;
      var tableCounter = 0;
      data.forEach(function (d, i) {
        if (d.type === 'pie' && d.values || d.type === 'table') {
          if (d.type === 'pie') {
            pieCounter++;
          } else if (d.type === 'table') {
            tableCounter++;
          }
          subplotFolds[i] = _react2.default.createElement(
            TraceFold,
            {
              key: i,
              traceIndexes: [i],
              canDelete: false,
              name: d.type === 'pie' ? _('Pie') + ' ' + (pieCounter > 1 ? pieCounter : '') : _('Table') + ' ' + (tableCounter > 1 ? tableCounter : '')
            },
            children
          );
        }
      });

      return _react2.default.createElement(
        _TraceRequiredPanel2.default,
        null,
        subplotFolds
      );
    }
  }]);

  return SubplotAccordion;
}(_react.Component);

SubplotAccordion.contextType = _context2.EditorControlsContext;

SubplotAccordion.propTypes = {
  children: _propTypes2.default.node
};

exports.default = SubplotAccordion;
//# sourceMappingURL=SubplotAccordion.js.map