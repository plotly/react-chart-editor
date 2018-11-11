'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _PlotlyFold = require('./PlotlyFold');

var _PlotlyFold2 = _interopRequireDefault(_PlotlyFold);

var _TraceRequiredPanel = require('./TraceRequiredPanel');

var _TraceRequiredPanel2 = _interopRequireDefault(_TraceRequiredPanel);

var _PlotlyPanel = require('./PlotlyPanel');

var _PlotlyPanel2 = _interopRequireDefault(_PlotlyPanel);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _constants = require('../../lib/constants');

var _lib = require('../../lib');

var _reactTabs = require('react-tabs');

var _traceTypes = require('../../lib/traceTypes');

var _PanelEmpty = require('./PanelEmpty');

var _context = require('../../context');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TraceFold = (0, _lib.connectTraceToPlot)(_PlotlyFold2.default);

var TraceAccordion = function (_Component) {
  _inherits(TraceAccordion, _Component);

  function TraceAccordion(props, context) {
    _classCallCheck(this, TraceAccordion);

    var _this = _possibleConstructorReturn(this, (TraceAccordion.__proto__ || Object.getPrototypeOf(TraceAccordion)).call(this, props, context));

    _this.setLocals(props, context);
    return _this;
  }

  _createClass(TraceAccordion, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps, nextContext) {
      this.setLocals(nextProps, nextContext);
    }
  }, {
    key: 'setLocals',
    value: function setLocals(props, context) {
      var _this2 = this;

      var base = props.canGroup ? context.fullData : context.data;
      var traceFilterCondition = this.props.traceFilterCondition || function () {
        return true;
      };

      this.filteredTracesDataIndexes = [];
      this.filteredTraces = [];

      if (base && base.length && context.fullData.length) {
        this.filteredTraces = base.filter(function (t, i) {
          var fullTrace = props.canGroup ? t : context.fullData.filter(function (tr) {
            return tr.index === i;
          })[0];

          if (fullTrace) {
            var trace = context.data[fullTrace.index];
            if (traceFilterCondition(trace, fullTrace)) {
              _this2.filteredTracesDataIndexes.push(fullTrace.index);
              return true;
            }
          }

          return false;
        });
      }
    }
  }, {
    key: 'renderGroupedTraceFolds',
    value: function renderGroupedTraceFolds() {
      var _this3 = this;

      if (!this.filteredTraces.length || this.filteredTraces.length <= 1) {
        return null;
      }

      var _ = this.context.localize;

      var dataArrayPositionsByTraceType = {};
      var fullDataArrayPositionsByTraceType = {};

      this.filteredTraces.forEach(function (trace) {
        var traceType = (0, _lib.plotlyTraceToCustomTrace)(trace);
        if (!dataArrayPositionsByTraceType[traceType]) {
          dataArrayPositionsByTraceType[traceType] = [];
        }

        if (!fullDataArrayPositionsByTraceType[traceType]) {
          fullDataArrayPositionsByTraceType[traceType] = [];
        }

        dataArrayPositionsByTraceType[traceType].push(trace.index);
        // _expandedIndex is the trace's index in the fullData array
        fullDataArrayPositionsByTraceType[traceType].push(trace._expandedIndex);
      });

      return Object.keys(fullDataArrayPositionsByTraceType).map(function (type, index) {
        return _react2.default.createElement(
          TraceFold,
          {
            key: index,
            traceIndexes: dataArrayPositionsByTraceType[type],
            name: (0, _traceTypes.traceTypes)(_).find(function (t) {
              return t.value === type;
            }).label,
            fullDataArrayPosition: fullDataArrayPositionsByTraceType[type]
          },
          _this3.props.children
        );
      });
    }
  }, {
    key: 'renderUngroupedTraceFolds',
    value: function renderUngroupedTraceFolds() {
      var _this4 = this;

      if (this.filteredTraces.length) {
        return this.filteredTraces.map(function (d, i) {
          return _react2.default.createElement(
            TraceFold,
            {
              key: i,
              traceIndexes: [d.index],
              canDelete: _this4.props.canAdd,
              fullDataArrayPosition: [d._expandedIndex]
            },
            _this4.props.children
          );
        });
      }
      return null;
    }
  }, {
    key: 'renderTraceFolds',
    value: function renderTraceFolds() {
      var _this5 = this;

      if (this.filteredTraces.length) {
        return this.filteredTraces.map(function (d, i) {
          return _react2.default.createElement(
            TraceFold,
            {
              key: i,
              traceIndexes: [_this5.filteredTracesDataIndexes[i]],
              canDelete: _this5.props.canAdd
            },
            _this5.props.children
          );
        });
      }
      return null;
    }
  }, {
    key: 'renderTracePanelHelp',
    value: function renderTracePanelHelp() {
      var _ = this.context.localize;
      return _react2.default.createElement(
        _PanelEmpty.PanelMessage,
        { heading: _('Trace your data.') },
        _react2.default.createElement(
          'p',
          null,
          _('Traces of various types like bar and line are the building blocks of your figure.')
        ),
        _react2.default.createElement(
          'p',
          null,
          _('You can add as many as you like, mixing and matching types and arranging them into subplots.')
        ),
        _react2.default.createElement(
          'p',
          null,
          _('Click on the + button above to add a trace.')
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          canAdd = _props.canAdd,
          canGroup = _props.canGroup;

      var _ = this.context.localize;

      if (canAdd) {
        var addAction = {
          label: _('Trace'),
          handler: function handler(_ref) {
            var onUpdate = _ref.onUpdate;

            if (onUpdate) {
              onUpdate({
                type: _constants.EDITOR_ACTIONS.ADD_TRACE
              });
            }
          }
        };
        var traceFolds = this.renderTraceFolds();
        return _react2.default.createElement(
          _PlotlyPanel2.default,
          { addAction: addAction },
          traceFolds ? traceFolds : this.renderTracePanelHelp()
        );
      }

      if (canGroup) {
        if (this.filteredTraces.length === 1) {
          return _react2.default.createElement(
            _TraceRequiredPanel2.default,
            null,
            this.renderUngroupedTraceFolds()
          );
        }

        if (this.filteredTraces.length > 1) {
          return _react2.default.createElement(
            _TraceRequiredPanel2.default,
            { noPadding: true },
            _react2.default.createElement(
              _reactTabs.Tabs,
              null,
              _react2.default.createElement(
                _reactTabs.TabList,
                null,
                _react2.default.createElement(
                  _reactTabs.Tab,
                  null,
                  _('Individually')
                ),
                _react2.default.createElement(
                  _reactTabs.Tab,
                  null,
                  _('By Type')
                )
              ),
              _react2.default.createElement(
                _reactTabs.TabPanel,
                null,
                _react2.default.createElement(
                  _PlotlyPanel2.default,
                  null,
                  this.renderUngroupedTraceFolds()
                )
              ),
              _react2.default.createElement(
                _reactTabs.TabPanel,
                null,
                _react2.default.createElement(
                  _PlotlyPanel2.default,
                  null,
                  this.renderGroupedTraceFolds()
                )
              )
            )
          );
        }
      }

      return _react2.default.createElement(
        _TraceRequiredPanel2.default,
        null,
        this.renderTraceFolds()
      );
    }
  }]);

  return TraceAccordion;
}(_react.Component);

TraceAccordion.contextType = _context.EditorControlsContext;

TraceAccordion.propTypes = {
  canAdd: _propTypes2.default.bool,
  canGroup: _propTypes2.default.bool,
  children: _propTypes2.default.node,
  traceFilterCondition: _propTypes2.default.func
};

exports.default = TraceAccordion;
//# sourceMappingURL=TraceAccordion.js.map