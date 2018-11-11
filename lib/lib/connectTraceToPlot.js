'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = connectTraceToPlot;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _nested_property = require('plotly.js/src/lib/nested_property');

var _nested_property2 = _interopRequireDefault(_nested_property);

var _lib = require('../lib');

var _multiValues = require('./multiValues');

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function connectTraceToPlot(WrappedComponent) {
  var TraceConnectedComponent = function (_Component) {
    _inherits(TraceConnectedComponent, _Component);

    function TraceConnectedComponent(props, context) {
      _classCallCheck(this, TraceConnectedComponent);

      var _this = _possibleConstructorReturn(this, (TraceConnectedComponent.__proto__ || Object.getPrototypeOf(TraceConnectedComponent)).call(this, props, context));

      _this.deleteTrace = _this.deleteTrace.bind(_this);
      _this.updateTrace = _this.updateTrace.bind(_this);
      _this.setLocals(props, context);
      return _this;
    }

    _createClass(TraceConnectedComponent, [{
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps, nextContext) {
        this.setLocals(nextProps, nextContext);
      }
    }, {
      key: 'setLocals',
      value: function setLocals(props, context) {
        var traceIndexes = props.traceIndexes;
        var data = context.data,
            fullData = context.fullData,
            plotly = context.plotly;


        var trace = data[traceIndexes[0]];
        var fullTrace = (0, _lib.getFullTrace)(props, context);

        this.childContext = {
          getValObject: function getValObject(attr) {
            return !plotly ? null : plotly.PlotSchema.getTraceValObject(fullTrace, (0, _nested_property2.default)({}, attr).parts);
          },
          updateContainer: this.updateTrace,
          deleteContainer: this.deleteTrace,
          container: trace,
          fullContainer: fullTrace,
          traceIndexes: this.props.traceIndexes
        };

        if (traceIndexes.length > 1) {
          var multiValuedFullContainer = (0, _multiValues.deepCopyPublic)(fullTrace);
          fullData.forEach(function (t) {
            return Object.keys(t).forEach(function (key) {
              return (0, _multiValues.setMultiValuedContainer)(multiValuedFullContainer, (0, _multiValues.deepCopyPublic)(t), key, {
                searchArrays: true
              });
            });
          });
          var multiValuedContainer = (0, _multiValues.deepCopyPublic)(trace);
          data.forEach(function (t) {
            return Object.keys(t).forEach(function (key) {
              return (0, _multiValues.setMultiValuedContainer)(multiValuedContainer, (0, _multiValues.deepCopyPublic)(t), key, {
                searchArrays: true
              });
            });
          });
          this.childContext.fullContainer = multiValuedFullContainer;
          this.childContext.defaultContainer = fullTrace;
          this.childContext.container = multiValuedContainer;
        }

        if (trace && fullTrace) {
          this.icon = (0, _lib.renderTraceIcon)((0, _lib.plotlyTraceToCustomTrace)(trace));
          this.name = fullTrace.name;
        }
      }
    }, {
      key: 'getChildContext',
      value: function getChildContext() {
        return this.childContext;
      }
    }, {
      key: 'provideValue',
      value: function provideValue() {
        return this.childContext;
      }
    }, {
      key: 'updateTrace',
      value: function updateTrace(update) {
        var _this2 = this;

        if (this.context.onUpdate) {
          var splitTraceGroup = this.props.fullDataArrayPosition ? this.props.fullDataArrayPosition.map(function (p) {
            return _this2.context.fullData[p]._group;
          }) : null;

          var containsAnSrc = Object.keys(update).filter(function (a) {
            return a.endsWith('src');
          }).length > 0;

          if (Array.isArray(update)) {
            update.forEach(function (u, i) {
              _this2.context.onUpdate({
                type: _constants.EDITOR_ACTIONS.UPDATE_TRACES,
                payload: {
                  update: u,
                  traceIndexes: [_this2.props.traceIndexes[i]],
                  splitTraceGroup: splitTraceGroup ? splitTraceGroup[i] : null
                }
              });
            });
          } else if (splitTraceGroup && !containsAnSrc) {
            this.props.traceIndexes.forEach(function (t, i) {
              _this2.context.onUpdate({
                type: _constants.EDITOR_ACTIONS.UPDATE_TRACES,
                payload: {
                  update: update,
                  traceIndexes: [_this2.props.traceIndexes[i]],
                  splitTraceGroup: splitTraceGroup ? splitTraceGroup[i] : null
                }
              });
            });
          } else {
            this.context.onUpdate({
              type: _constants.EDITOR_ACTIONS.UPDATE_TRACES,
              payload: {
                update: update,
                traceIndexes: this.props.traceIndexes
              }
            });
          }
        }
      }
    }, {
      key: 'deleteTrace',
      value: function deleteTrace() {
        var _this3 = this;

        var currentTrace = this.context.fullData[this.props.traceIndexes[0]];
        if (!currentTrace && this.context.onUpdate) {
          this.context.onUpdate({
            type: _constants.EDITOR_ACTIONS.DELETE_TRACE,
            payload: {
              traceIndexes: this.props.traceIndexes
            }
          });
          return;
        }
        var axesToBeGarbageCollected = [];
        var subplotToBeGarbageCollected = null;
        var subplotType = (0, _lib.traceTypeToAxisType)(currentTrace.type);

        if (subplotType) {
          var subplotNames = subplotType === 'cartesian' ? [currentTrace.xaxis || 'xaxis', currentTrace.yaxis || 'yaxis'] : currentTrace[_constants.SUBPLOT_TO_ATTR[subplotType].data] || _constants.SUBPLOT_TO_ATTR[subplotType].data;

          var isSubplotUsedAnywhereElse = function isSubplotUsedAnywhereElse(subplotType, subplotName) {
            return _this3.context.fullData.some(function (trace) {
              return (trace[_constants.SUBPLOT_TO_ATTR[subplotType].data] === subplotName || ((subplotType === 'xaxis' || subplotType === 'yaxis') && subplotName.charAt(1)) === '' || subplotName.split(subplotType)[1] === '' && trace[_constants.SUBPLOT_TO_ATTR[subplotType].data] === null) && trace.index !== _this3.props.traceIndexes[0];
            });
          };

          // When we delete a subplot, make sure no unused axes/subplots are left
          if (subplotType === 'cartesian') {
            if (!isSubplotUsedAnywhereElse('xaxis', subplotNames[0])) {
              axesToBeGarbageCollected.push(subplotNames[0]);
            }
            if (!isSubplotUsedAnywhereElse('yaxis', subplotNames[1])) {
              axesToBeGarbageCollected.push(subplotNames[1]);
            }
          } else {
            if (!isSubplotUsedAnywhereElse(subplotType, subplotNames)) {
              subplotToBeGarbageCollected = subplotNames;
            }
          }
        }

        if (this.context.onUpdate) {
          this.context.onUpdate({
            type: _constants.EDITOR_ACTIONS.DELETE_TRACE,
            payload: {
              axesToBeGarbageCollected: axesToBeGarbageCollected,
              subplotToBeGarbageCollected: subplotToBeGarbageCollected,
              traceIndexes: this.props.traceIndexes
            }
          });
        }
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2.default.createElement(WrappedComponent, _extends({ name: this.name, icon: this.icon }, this.props));
      }
    }]);

    return TraceConnectedComponent;
  }(_react.Component);

  TraceConnectedComponent.displayName = 'TraceConnected' + (0, _lib.getDisplayName)(WrappedComponent);

  TraceConnectedComponent.propTypes = {
    traceIndexes: _propTypes2.default.arrayOf(_propTypes2.default.number).isRequired,
    fullDataArrayPosition: _propTypes2.default.arrayOf(_propTypes2.default.number)
  };

  TraceConnectedComponent.contextTypes = {
    fullData: _propTypes2.default.array,
    data: _propTypes2.default.array,
    plotly: _propTypes2.default.object,
    onUpdate: _propTypes2.default.func
  };

  TraceConnectedComponent.childContextTypes = {
    getValObject: _propTypes2.default.func,
    updateContainer: _propTypes2.default.func,
    deleteContainer: _propTypes2.default.func,
    defaultContainer: _propTypes2.default.object,
    container: _propTypes2.default.object,
    fullContainer: _propTypes2.default.object,
    traceIndexes: _propTypes2.default.array
  };

  var plotly_editor_traits = WrappedComponent.plotly_editor_traits;

  TraceConnectedComponent.plotly_editor_traits = plotly_editor_traits;

  return TraceConnectedComponent;
}
//# sourceMappingURL=connectTraceToPlot.js.map