'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _factory = require('react-plotly.js/factory');

var _factory2 = _interopRequireDefault(_factory);

var _EditorControls = require('./EditorControls');

var _EditorControls2 = _interopRequireDefault(_EditorControls);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _constants = require('./lib/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PlotlyEditor = function (_Component) {
  _inherits(PlotlyEditor, _Component);

  function PlotlyEditor(props) {
    _classCallCheck(this, PlotlyEditor);

    var _this = _possibleConstructorReturn(this, (PlotlyEditor.__proto__ || Object.getPrototypeOf(PlotlyEditor)).call(this));

    _this.state = { graphDiv: {} };
    _this.PlotComponent = (0, _factory2.default)(props.plotly);
    _this.handleRender = _this.handleRender.bind(_this);
    return _this;
  }

  _createClass(PlotlyEditor, [{
    key: 'handleRender',
    value: function handleRender(fig, graphDiv) {
      this.setState({ graphDiv: graphDiv });
      if (this.props.onRender) {
        this.props.onRender(graphDiv.data, graphDiv.layout, graphDiv._transitionData._frames);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'plotly_editor' },
        !this.props.hideControls && _react2.default.createElement(
          _EditorControls2.default,
          {
            graphDiv: this.state.graphDiv,
            dataSources: this.props.dataSources,
            dataSourceOptions: this.props.dataSourceOptions,
            plotly: this.props.plotly,
            onUpdate: this.props.onUpdate,
            advancedTraceTypeSelector: this.props.advancedTraceTypeSelector,
            locale: this.props.locale,
            traceTypesConfig: this.props.traceTypesConfig,
            dictionaries: this.props.dictionaries,
            showFieldTooltips: this.props.showFieldTooltips,
            srcConverters: this.props.srcConverters,
            makeDefaultTrace: this.props.makeDefaultTrace,
            glByDefault: this.props.glByDefault,
            mapBoxAccess: Boolean(this.props.config && this.props.config.mapboxAccessToken),
            fontOptions: this.props.fontOptions,
            chartHelp: this.props.chartHelp
          },
          this.props.children
        ),
        _react2.default.createElement(
          'div',
          { className: 'plotly_editor_plot', style: { width: '100%', height: '100%' } },
          _react2.default.createElement(this.PlotComponent, {
            data: this.props.data,
            layout: this.props.layout,
            frames: this.props.frames,
            config: this.props.config,
            useResizeHandler: this.props.useResizeHandler,
            debug: this.props.debug,
            onInitialized: this.handleRender,
            onUpdate: this.handleRender,
            style: { width: '100%', height: '100%' },
            divId: this.props.divId
          })
        )
      );
    }
  }]);

  return PlotlyEditor;
}(_react.Component);

PlotlyEditor.propTypes = {
  children: _propTypes2.default.any,
  layout: _propTypes2.default.object,
  data: _propTypes2.default.array,
  config: _propTypes2.default.object,
  dataSourceOptions: _propTypes2.default.array,
  dataSources: _propTypes2.default.object,
  frames: _propTypes2.default.array,
  onUpdate: _propTypes2.default.func,
  onRender: _propTypes2.default.func,
  plotly: _propTypes2.default.object,
  useResizeHandler: _propTypes2.default.bool,
  debug: _propTypes2.default.bool,
  advancedTraceTypeSelector: _propTypes2.default.bool,
  locale: _propTypes2.default.string,
  traceTypesConfig: _propTypes2.default.object,
  dictionaries: _propTypes2.default.object,
  divId: _propTypes2.default.string,
  hideControls: _propTypes2.default.bool,
  showFieldTooltips: _propTypes2.default.bool,
  srcConverters: _propTypes2.default.shape({
    toSrc: _propTypes2.default.func.isRequired,
    fromSrc: _propTypes2.default.func.isRequired
  }),
  makeDefaultTrace: _propTypes2.default.func,
  glByDefault: _propTypes2.default.bool,
  fontOptions: _propTypes2.default.array,
  chartHelp: _propTypes2.default.object
};

PlotlyEditor.defaultProps = {
  hideControls: false,
  showFieldTooltips: false,
  fontOptions: _constants.DEFAULT_FONTS
};

exports.default = PlotlyEditor;
//# sourceMappingURL=PlotlyEditor.js.map