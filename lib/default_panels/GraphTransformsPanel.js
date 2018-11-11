'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Aggregations = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _components = require('../components');

var _lib = require('../lib');

var _constants = require('../lib/constants');

var _context = require('../context');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AggregationSection = (0, _lib.connectAggregationToTransform)(_components.PlotlySection);

var Aggregations = exports.Aggregations = function (_Component) {
  _inherits(Aggregations, _Component);

  function Aggregations() {
    _classCallCheck(this, Aggregations);

    return _possibleConstructorReturn(this, (Aggregations.__proto__ || Object.getPrototypeOf(Aggregations)).apply(this, arguments));
  }

  _createClass(Aggregations, [{
    key: 'render',
    value: function render() {
      var _context$fullContaine = this.context.fullContainer.aggregations,
          aggregations = _context$fullContaine === undefined ? [] : _context$fullContaine;
      var _ = this.context.localize;

      if (aggregations.length === 0) {
        return null;
      }

      return _react2.default.createElement(
        _components.PlotlySection,
        { name: _('Aggregations'), attr: 'aggregations' },
        aggregations.filter(function (aggr) {
          return aggr.target && aggr.target.match(/transforms\[\d*\]\./gi) === null;
        }).map(function (_ref, i) {
          var target = _ref.target;
          return _react2.default.createElement(
            AggregationSection,
            { show: true, key: i, aggregationIndex: i },
            _react2.default.createElement(_components.Dropdown, {
              attr: 'func',
              label: target,
              options: [{ label: _('Count'), value: 'count' }, { label: _('Sum'), value: 'sum' }, { label: _('Average'), value: 'avg' }, { label: _('Median'), value: 'median' }, { label: _('Mode'), value: 'mode' }, { label: _('RMS'), value: 'rms' }, { label: _('Standard Deviation'), value: 'stddev' }, { label: _('Min'), value: 'min' }, { label: _('Max'), value: 'max' }, { label: _('First'), value: 'first' }, { label: _('Last'), value: 'last' }, { label: _('Change'), value: 'change' }, { label: _('Range'), value: 'range' }],
              clearable: false
            })
          );
        })
      );
    }
  }]);

  return Aggregations;
}(_react.Component);

Aggregations.plotly_editor_traits = { no_visibility_forcing: true };
Aggregations.contextTypes = {
  fullContainer: _propTypes2.default.object,
  localize: _propTypes2.default.func
};

var GraphTransformsPanel = function GraphTransformsPanel() {
  return _react2.default.createElement(
    _context.EditorControlsContext.Consumer,
    null,
    function (_ref2) {
      var _ = _ref2.localize;
      return _react2.default.createElement(
        _components.TraceAccordion,
        { traceFilterCondition: function traceFilterCondition(t) {
            return _constants.TRANSFORMABLE_TRACES.includes(t.type);
          } },
        _react2.default.createElement(
          _components.TransformAccordion,
          null,
          _react2.default.createElement(_components.Radio, {
            attr: 'enabled',
            options: [{ label: _('Enabled'), value: true }, { label: _('Disabled'), value: false }]
          }),
          _react2.default.createElement(_components.DataSelector, { label: _('By'), attr: 'groups' }),
          _react2.default.createElement(_components.DataSelector, { label: _('Target'), attr: 'target' }),
          _react2.default.createElement(_components.FilterOperation, { label: _('Operator'), attr: 'operation' }),
          _react2.default.createElement(_components.FilterValue, { label: _('Value'), attr: 'value' }),
          _react2.default.createElement(_components.Radio, {
            attr: 'order',
            options: [{ label: _('Ascending'), value: 'ascending' }, { label: _('Descending'), value: 'descending' }]
          }),
          _react2.default.createElement(Aggregations, null)
        )
      );
    }
  );
};

// GraphTransformsPanel.contextTypes = {
//   localize: PropTypes.func,
// };

exports.default = GraphTransformsPanel;
//# sourceMappingURL=GraphTransformsPanel.js.map