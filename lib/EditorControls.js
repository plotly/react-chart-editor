'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _DefaultEditor = require('./DefaultEditor');

var _DefaultEditor2 = _interopRequireDefault(_DefaultEditor);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lib = require('./lib');

var _shame = require('./shame');

var _constants = require('./lib/constants');

var _fastIsnumeric = require('fast-isnumeric');

var _fastIsnumeric2 = _interopRequireDefault(_fastIsnumeric);

var _nested_property = require('plotly.js/src/lib/nested_property');

var _nested_property2 = _interopRequireDefault(_nested_property);

var _traceTypes = require('./lib/traceTypes');

var _containers = require('./components/containers');

var _context = require('./context');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EditorControls = function (_Component) {
  _inherits(EditorControls, _Component);

  function EditorControls(props, context) {
    _classCallCheck(this, EditorControls);

    var _this = _possibleConstructorReturn(this, (EditorControls.__proto__ || Object.getPrototypeOf(EditorControls)).call(this, props, context));

    _this.localize = function (key) {
      return (0, _lib.localizeString)(_this.props.dictionaries || {}, _this.props.locale, key);
    };

    // we only need to compute this once.
    if (_this.props.plotly) {
      _this.plotSchema = _this.props.plotly.PlotSchema.get();
    }
    return _this;
  }

  _createClass(EditorControls, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var updatePayload = nextProps.updatePayload;

      if (updatePayload && updatePayload.length > 0) {
        this.handleDataSourceChange(updatePayload);
      }
    }
  }, {
    key: 'getChildContext',
    value: function getChildContext() {
      var gd = this.props.graphDiv || {};
      return {
        advancedTraceTypeSelector: this.props.advancedTraceTypeSelector,
        config: gd._context,
        srcConverters: this.props.srcConverters,
        data: gd.data,
        dataSources: this.props.dataSources,
        dataSourceOptions: this.props.dataSourceOptions,
        dataSourceValueRenderer: this.props.dataSourceValueRenderer,
        dataSourceOptionRenderer: this.props.dataSourceOptionRenderer,
        dictionaries: this.props.dictionaries || {},
        localize: this.localize,
        frames: gd._transitionData ? gd._transitionData._frames : [],
        fullData: gd._fullData,
        fullLayout: gd._fullLayout,
        graphDiv: gd,
        layout: gd.layout,
        locale: this.props.locale,
        onUpdate: this.handleUpdate.bind(this),
        plotSchema: this.plotSchema,
        plotly: this.props.plotly,
        traceTypesConfig: this.props.traceTypesConfig,
        showFieldTooltips: this.props.showFieldTooltips,
        glByDefault: this.props.glByDefault,
        mapBoxAccess: this.props.mapBoxAccess,
        fontOptions: this.props.fontOptions,
        chartHelp: this.props.chartHelp
      };
    }
  }, {
    key: 'provideValue',
    value: function provideValue() {
      var gd = this.props.graphDiv || {};
      return {
        advancedTraceTypeSelector: this.props.advancedTraceTypeSelector,
        config: gd._context,
        srcConverters: this.props.srcConverters,
        data: gd.data,
        dataSources: this.props.dataSources,
        dataSourceOptions: this.props.dataSourceOptions,
        dataSourceValueRenderer: this.props.dataSourceValueRenderer,
        dataSourceOptionRenderer: this.props.dataSourceOptionRenderer,
        dictionaries: this.props.dictionaries || {},
        localize: this.localize,
        frames: gd._transitionData ? gd._transitionData._frames : [],
        fullData: gd._fullData,
        fullLayout: gd._fullLayout,
        graphDiv: gd,
        layout: gd.layout,
        locale: this.props.locale,
        onUpdate: this.handleUpdate.bind(this),
        plotSchema: this.plotSchema,
        plotly: this.props.plotly,
        traceTypesConfig: this.props.traceTypesConfig,
        showFieldTooltips: this.props.showFieldTooltips,
        glByDefault: this.props.glByDefault,
        mapBoxAccess: this.props.mapBoxAccess,
        fontOptions: this.props.fontOptions,
        chartHelp: this.props.chartHelp
      };
    }
  }, {
    key: 'handleDataSourceChange',
    value: function handleDataSourceChange(updatePayload) {
      var _this2 = this;

      if (updatePayload && updatePayload.length !== 0) {
        updatePayload.forEach(function (payload) {
          _this2.handleUpdate({
            type: _constants.EDITOR_ACTIONS.UPDATE_TRACES,
            payload: payload
          });
        });
      }
    }
  }, {
    key: 'handleUpdate',
    value: function handleUpdate(_ref) {
      var type = _ref.type,
          payload = _ref.payload;
      var graphDiv = this.props.graphDiv;


      switch (type) {
        case _constants.EDITOR_ACTIONS.UPDATE_TRACES:
          if (this.props.beforeUpdateTraces) {
            this.props.beforeUpdateTraces(payload);
          }

          (0, _shame.shamefullyAdjustSizeref)(graphDiv, payload);
          (0, _shame.shamefullyClearAxisTypes)(graphDiv, payload);
          (0, _shame.shamefullyAdjustAxisRef)(graphDiv, payload);
          (0, _shame.shamefullyAddTableColumns)(graphDiv, payload);
          (0, _shame.shamefullyAdjustSplitStyleTargetContainers)(graphDiv, payload);

          for (var i = 0; i < payload.traceIndexes.length; i++) {
            var _loop = function _loop(attr) {
              var traceIndex = payload.traceIndexes[i];
              var splitTraceGroup = payload.splitTraceGroup ? payload.splitTraceGroup.toString() : null;

              var props = [(0, _nested_property2.default)(graphDiv.data[traceIndex], attr)];
              var value = payload.update[attr];

              if (splitTraceGroup) {
                props = (0, _shame.shamefullyCreateSplitStyleProps)(graphDiv, attr, traceIndex, splitTraceGroup);
              }

              props.forEach(function (p) {
                if (value !== void 0) {
                  p.set(value);
                }
              });
            };

            for (var attr in payload.update) {
              _loop(attr);
            }
          }

          if (this.props.afterUpdateTraces) {
            this.props.afterUpdateTraces(payload);
          }
          if (this.props.onUpdate) {
            this.props.onUpdate(graphDiv.data.slice(), graphDiv.layout, graphDiv._transitionData._frames);
          }
          break;

        case _constants.EDITOR_ACTIONS.UPDATE_LAYOUT:
          (0, _shame.shamefullyAdjustGeo)(graphDiv, payload);

          if (this.props.beforeUpdateLayout) {
            this.props.beforeUpdateLayout(payload);
          }
          for (var attr in payload.update) {
            var prop = (0, _nested_property2.default)(graphDiv.layout, attr);
            var _value = payload.update[attr];
            if (_value !== void 0) {
              prop.set(_value);
            }
          }
          if (this.props.afterUpdateLayout) {
            this.props.afterUpdateLayout(payload);
          }
          if (this.props.onUpdate) {
            this.props.onUpdate(graphDiv.data, Object.assign({}, graphDiv.layout), graphDiv._transitionData._frames);
          }
          break;

        case _constants.EDITOR_ACTIONS.ADD_TRACE:
          if (this.props.beforeAddTrace) {
            this.props.beforeAddTrace(payload);
          }

          // can't use default prop because plotly.js mutates it:
          // https://github.com/plotly/react-chart-editor/issues/509
          if (graphDiv.data.length === 0) {
            graphDiv.data.push(this.props.makeDefaultTrace ? this.props.makeDefaultTrace() : {
              type: 'scatter' + (this.props.glByDefault ? 'gl' : ''),
              mode: 'markers'
            });
          } else {
            var prevTrace = graphDiv.data[graphDiv.data.length - 1];
            var prevTraceType = (0, _lib.plotlyTraceToCustomTrace)(prevTrace);
            graphDiv.data.push((0, _lib.traceTypeToPlotlyInitFigure)(prevTraceType, prevTrace.type && prevTrace.type.endsWith('gl') ? 'gl' : ''));
          }

          if (this.props.afterAddTrace) {
            this.props.afterAddTrace(payload);
          }
          if (this.props.onUpdate) {
            this.props.onUpdate(graphDiv.data.slice(), graphDiv.layout, graphDiv._transitionData._frames);
          }
          break;

        case _constants.EDITOR_ACTIONS.DELETE_TRACE:
          if (payload.traceIndexes && payload.traceIndexes.length) {
            if (this.props.beforeDeleteTrace) {
              this.props.beforeDeleteTrace(payload);
            }

            (0, _shame.shamefullyAdjustAxisRef)(graphDiv, payload);
            (0, _shame.shamefullyDeleteRelatedAnalysisTransforms)(graphDiv, payload);

            graphDiv.data.splice(payload.traceIndexes[0], 1);
            if (this.props.afterDeleteTrace) {
              this.props.afterDeleteTrace(payload);
            }
            if (this.props.onUpdate) {
              this.props.onUpdate(graphDiv.data.slice(), graphDiv.layout, graphDiv._transitionData._frames);
            }
          }
          break;

        case _constants.EDITOR_ACTIONS.DELETE_ANNOTATION:
          if ((0, _fastIsnumeric2.default)(payload.annotationIndex)) {
            if (this.props.beforeDeleteAnnotation) {
              this.props.beforeDeleteAnnotation(payload);
            }
            graphDiv.layout.annotations.splice(payload.annotationIndex, 1);
            if (this.props.afterDeleteAnnotation) {
              this.props.afterDeleteAnnotation(payload);
            }
            if (this.props.onUpdate) {
              this.props.onUpdate(graphDiv.data, Object.assign({}, graphDiv.layout), graphDiv._transitionData._frames);
            }
          }
          break;

        case _constants.EDITOR_ACTIONS.DELETE_SHAPE:
          if ((0, _fastIsnumeric2.default)(payload.shapeIndex)) {
            if (this.props.beforeDeleteShape) {
              this.props.beforeDeleteShape(payload);
            }
            graphDiv.layout.shapes.splice(payload.shapeIndex, 1);
            if (this.props.afterDeleteShape) {
              this.props.afterDeleteShape(payload);
            }
            if (this.props.onUpdate) {
              this.props.onUpdate(graphDiv.data, Object.assign({}, graphDiv.layout), graphDiv._transitionData._frames);
            }
          }
          break;

        case _constants.EDITOR_ACTIONS.DELETE_IMAGE:
          if ((0, _fastIsnumeric2.default)(payload.imageIndex)) {
            if (this.props.beforeDeleteImage) {
              this.props.beforeDeleteImage(payload);
            }
            graphDiv.layout.images.splice(payload.imageIndex, 1);
            if (this.props.afterDeleteImage) {
              this.props.afterDeleteImage(payload);
            }
            if (this.props.onUpdate) {
              this.props.onUpdate(graphDiv.data, Object.assign({}, graphDiv.layout), graphDiv._transitionData._frames);
            }
          }
          break;

        case _constants.EDITOR_ACTIONS.DELETE_RANGESELECTOR:
          if ((0, _fastIsnumeric2.default)(payload.rangeselectorIndex)) {
            graphDiv.layout[payload.axisId].rangeselector.buttons.splice(payload.rangeselectorIndex, 1);
            if (this.props.onUpdate) {
              this.props.onUpdate(graphDiv.data, Object.assign({}, graphDiv.layout), graphDiv._transitionData._frames);
            }
          }
          break;

        case _constants.EDITOR_ACTIONS.DELETE_TRANSFORM:
          if ((0, _fastIsnumeric2.default)(payload.transformIndex) && payload.traceIndex < graphDiv.data.length) {
            if (graphDiv.data[payload.traceIndex].transforms.length === 1) {
              delete graphDiv.data[payload.traceIndex].transforms;
            } else {
              graphDiv.data[payload.traceIndex].transforms.splice(payload.transformIndex, 1);
            }
            if (this.props.onUpdate) {
              this.props.onUpdate(graphDiv.data.slice(), graphDiv.layout, graphDiv._transitionData._frames);
            }
          }
          break;

        default:
          throw new Error(this.localize('must specify an action type to handleEditorUpdate'));
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _context.EditorControlsContext.Provider,
        { value: this.provideValue() },
        _react2.default.createElement(
          'div',
          {
            className: (0, _lib.bem)('editor_controls') + ' plotly-editor--theme-provider' + ('' + (this.props.className ? ' ' + this.props.className : ''))
          },
          _react2.default.createElement(
            _containers.ModalProvider,
            null,
            this.props.graphDiv && this.props.graphDiv._fullLayout && (this.props.children ? this.props.children : this.props.optionalPanel ? _react2.default.createElement(
              _DefaultEditor2.default,
              { menuPanelOrder: this.props.menuPanelOrder },
              this.props.optionalPanel
            ) : _react2.default.createElement(_DefaultEditor2.default, null))
          )
        )
      );
    }
  }]);

  return EditorControls;
}(_react.Component);

EditorControls.propTypes = {
  advancedTraceTypeSelector: _propTypes2.default.bool,
  afterAddTrace: _propTypes2.default.func,
  afterDeleteAnnotation: _propTypes2.default.func,
  afterDeleteShape: _propTypes2.default.func,
  afterDeleteImage: _propTypes2.default.func,
  afterDeleteTrace: _propTypes2.default.func,
  afterUpdateLayout: _propTypes2.default.func,
  afterUpdateTraces: _propTypes2.default.func,
  beforeAddTrace: _propTypes2.default.func,
  beforeDeleteAnnotation: _propTypes2.default.func,
  beforeDeleteShape: _propTypes2.default.func,
  beforeDeleteImage: _propTypes2.default.func,
  beforeDeleteTrace: _propTypes2.default.func,
  beforeUpdateLayout: _propTypes2.default.func,
  beforeUpdateTraces: _propTypes2.default.func,
  children: _propTypes2.default.node,
  className: _propTypes2.default.string,
  srcConverters: _propTypes2.default.shape({
    toSrc: _propTypes2.default.func.isRequired,
    fromSrc: _propTypes2.default.func.isRequired
  }),
  dataSourceOptionRenderer: _propTypes2.default.func,
  dataSourceOptions: _propTypes2.default.array,
  dataSources: _propTypes2.default.object,
  dataSourceValueRenderer: _propTypes2.default.func,
  dictionaries: _propTypes2.default.object,
  graphDiv: _propTypes2.default.object,
  locale: _propTypes2.default.string,
  onUpdate: _propTypes2.default.func,
  plotly: _propTypes2.default.object,
  showFieldTooltips: _propTypes2.default.bool,
  traceTypesConfig: _propTypes2.default.object,
  makeDefaultTrace: _propTypes2.default.func,
  glByDefault: _propTypes2.default.bool,
  mapBoxAccess: _propTypes2.default.bool,
  fontOptions: _propTypes2.default.array,
  chartHelp: _propTypes2.default.object,
  optionalPanel: _propTypes2.default.node,
  menuPanelOrder: _propTypes2.default.array,
  updatePayload: _propTypes2.default.array
};

EditorControls.defaultProps = {
  showFieldTooltips: false,
  locale: 'en',
  traceTypesConfig: {
    categories: function categories(_) {
      return (0, _traceTypes.categoryLayout)(_);
    },
    traces: function traces(_) {
      return (0, _traceTypes.traceTypes)(_);
    },
    complex: true
  },
  fontOptions: _constants.DEFAULT_FONTS
};

EditorControls.childContextTypes = {
  advancedTraceTypeSelector: _propTypes2.default.bool,
  config: _propTypes2.default.object,
  srcConverters: _propTypes2.default.shape({
    toSrc: _propTypes2.default.func.isRequired,
    fromSrc: _propTypes2.default.func.isRequired
  }),
  data: _propTypes2.default.array,
  dataSourceOptionRenderer: _propTypes2.default.func,
  dataSourceOptions: _propTypes2.default.array,
  dataSources: _propTypes2.default.object,
  dataSourceValueRenderer: _propTypes2.default.func,
  dictionaries: _propTypes2.default.object,
  frames: _propTypes2.default.array,
  fullData: _propTypes2.default.array,
  fullLayout: _propTypes2.default.object,
  graphDiv: _propTypes2.default.any,
  layout: _propTypes2.default.object,
  locale: _propTypes2.default.string,
  localize: _propTypes2.default.func,
  onUpdate: _propTypes2.default.func,
  plotly: _propTypes2.default.object,
  plotSchema: _propTypes2.default.object,
  traceTypesConfig: _propTypes2.default.object,
  showFieldTooltips: _propTypes2.default.bool,
  glByDefault: _propTypes2.default.bool,
  mapBoxAccess: _propTypes2.default.bool,
  fontOptions: _propTypes2.default.array,
  chartHelp: _propTypes2.default.object
};

exports.default = EditorControls;
//# sourceMappingURL=EditorControls.js.map