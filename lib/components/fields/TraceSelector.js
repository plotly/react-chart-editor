'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Dropdown = require('./Dropdown');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lib = require('../../lib');

var _constants = require('../../lib/constants');

var _widgets = require('../widgets');

var _Field = require('./Field');

var _Field2 = _interopRequireDefault(_Field);

var _plotlyIcons = require('plotly-icons');

var _context2 = require('../../context');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TraceSelector = function (_Component) {
  _inherits(TraceSelector, _Component);

  function TraceSelector(props, context) {
    _classCallCheck(this, TraceSelector);

    var _this = _possibleConstructorReturn(this, (TraceSelector.__proto__ || Object.getPrototypeOf(TraceSelector)).call(this, props, context));

    _this.updatePlot = _this.updatePlot.bind(_this);
    _this.setGl = _this.setGl.bind(_this);
    _this.glEnabled = _this.glEnabled.bind(_this);
    _this.setTraceDefaults = _this.setTraceDefaults.bind(_this);
    _this.toggleGlControls = _this.toggleGlControls.bind(_this);

    _this.setTraceDefaults(props.container, props.fullContainer, props.updateContainer);
    _this.setLocals(props, context);

    _this.state = { showGlControls: false };
    return _this;
  }

  _createClass(TraceSelector, [{
    key: 'glEnabled',
    value: function glEnabled() {
      return this.props.container.type && this.props.container.type.endsWith('gl') ? 'gl' : '';
    }
  }, {
    key: 'toggleGlControls',
    value: function toggleGlControls() {
      this.setState({ showGlControls: !this.state.showGlControls });
    }
  }, {
    key: 'setLocals',
    value: function setLocals(props, context) {
      var _ = context.localize;
      if (props.traceOptions) {
        this.traceOptions = props.traceOptions;
      } else if (context.traceTypesConfig) {
        this.traceOptions = context.traceTypesConfig.traces(_);
      } else if (context.plotSchema) {
        this.traceOptions = (0, _lib.computeTraceOptionsFromSchema)(context.plotSchema, _, this.context);
      } else {
        this.traceOptions = [{ label: _('Scatter'), value: 'scatter' }];
      }
      if (props.container) {
        this.fullValue = (0, _lib.plotlyTraceToCustomTrace)(props.container);
      }
    }
  }, {
    key: 'setTraceDefaults',
    value: function setTraceDefaults(container, fullContainer, updateContainer, gl) {
      if (container && !container.mode && fullContainer.type === 'scatter') {
        updateContainer({
          type: 'scatter' + (gl || this.context.glByDefault ? gl : this.glEnabled()),
          mode: fullContainer.mode || 'markers'
        });
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps, nextContext) {
      var container = nextProps.container,
          fullContainer = nextProps.fullContainer,
          updateContainer = nextProps.updateContainer;

      this.setTraceDefaults(container, fullContainer, updateContainer);
      this.setLocals(nextProps, nextContext);
    }
  }, {
    key: 'updatePlot',
    value: function updatePlot(value) {
      var updateContainer = this.props.updateContainer;
      var glByDefault = this.context.glByDefault;

      if (updateContainer) {
        updateContainer((0, _lib.traceTypeToPlotlyInitFigure)(value, this.glEnabled() || glByDefault));
      }
    }
  }, {
    key: 'setGl',
    value: function setGl(value) {
      var _props = this.props,
          container = _props.container,
          fullContainer = _props.fullContainer,
          updateContainer = _props.updateContainer;

      var gl = 'gl';

      this.setTraceDefaults(container, fullContainer, updateContainer, value);

      var traceType = this.fullValue.endsWith(gl) && value === '' ? this.fullValue.slice(0, -gl.length) : this.fullValue;

      updateContainer((0, _lib.traceTypeToPlotlyInitFigure)(traceType, value));
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var props = Object.assign({}, this.props, {
        fullValue: this.fullValue,
        updatePlot: this.updatePlot,
        options: this.traceOptions,
        clearable: false
      });
      var _context = this.context,
          _ = _context.localize,
          advancedTraceTypeSelector = _context.advancedTraceTypeSelector;


      var options = [{ label: _('SVG'), value: '' }, { label: _('WebGL'), value: 'gl' }];

      // Check and see if the advanced selector prop is true
      if (advancedTraceTypeSelector) {
        return _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            _Field2.default,
            props,
            _react2.default.createElement(
              'div',
              {
                style: {
                  display: 'flex',
                  width: '100%',
                  alignItems: 'center'
                }
              },
              _react2.default.createElement(
                _context2.ModalProviderContext.Consumer,
                null,
                function (_ref) {
                  var openModal = _ref.openModal;
                  return _react2.default.createElement(_widgets.TraceTypeSelectorButton, _extends({}, props, {
                    traceTypesConfig: _this2.context.traceTypesConfig,
                    handleClick: function handleClick() {
                      return openModal(_widgets.TraceTypeSelector, _extends({}, props, {
                        traceTypesConfig: _this2.context.traceTypesConfig,
                        glByDefault: _this2.context.glByDefault
                      }));
                    }
                  }));
                }
              ),
              !_constants.TRACES_WITH_GL.includes(this.props.container.type) ? '' : _react2.default.createElement(_plotlyIcons.CogIcon, { className: 'menupanel__icon', onClick: this.toggleGlControls })
            )
          ),
          !(_constants.TRACES_WITH_GL.includes(this.props.container.type) && this.state.showGlControls) ? '' : _react2.default.createElement(
            _Field2.default,
            { label: _('Rendering') },
            _react2.default.createElement(_widgets.RadioBlocks, {
              options: options,
              activeOption: this.glEnabled(),
              onOptionChange: this.setGl
            })
          )
        );
      }

      return _react2.default.createElement(_Dropdown.UnconnectedDropdown, props);
    }
  }]);

  return TraceSelector;
}(_react.Component);

TraceSelector.contextType = _context2.EditorControlsContext;

TraceSelector.propTypes = {
  container: _propTypes2.default.object.isRequired,
  fullContainer: _propTypes2.default.object.isRequired,
  fullValue: _propTypes2.default.any,
  updateContainer: _propTypes2.default.func
};

exports.default = (0, _lib.connectToContainer)(TraceSelector);
//# sourceMappingURL=TraceSelector.js.map