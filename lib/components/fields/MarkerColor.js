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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lib = require('../../lib');

var _RadioBlocks = require('../widgets/RadioBlocks');

var _RadioBlocks2 = _interopRequireDefault(_RadioBlocks);

var _MultiColorPicker = require('./MultiColorPicker');

var _MultiColorPicker2 = _interopRequireDefault(_MultiColorPicker);

var _ColorscalePicker = require('./ColorscalePicker');

var _ColorscalePicker2 = _interopRequireDefault(_ColorscalePicker);

var _Numeric = require('./Numeric');

var _Numeric2 = _interopRequireDefault(_Numeric);

var _Radio = require('./Radio');

var _Radio2 = _interopRequireDefault(_Radio);

var _Info = require('./Info');

var _Info2 = _interopRequireDefault(_Info);

var _DataSelector = require('./DataSelector');

var _DataSelector2 = _interopRequireDefault(_DataSelector);

var _VisibilitySelect = require('./VisibilitySelect');

var _VisibilitySelect2 = _interopRequireDefault(_VisibilitySelect);

var _constants = require('../../lib/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UnconnectedMarkerColor = function (_Component) {
  _inherits(UnconnectedMarkerColor, _Component);

  function UnconnectedMarkerColor(props, context) {
    _classCallCheck(this, UnconnectedMarkerColor);

    var _this = _possibleConstructorReturn(this, (UnconnectedMarkerColor.__proto__ || Object.getPrototypeOf(UnconnectedMarkerColor)).call(this, props, context));

    var type = null;
    if (!props.container.marker || props.container.marker && !props.container.marker.colorsrc) {
      type = 'constant';
    } else if (props.container.marker && Array.isArray(props.container.marker.color) && props.fullContainer.marker && Array.isArray(props.fullContainer.marker.color)) {
      type = 'variable';
    }

    _this.state = {
      type: type,
      value: {
        constant: type === 'constant' ? props.fullValue : _constants.COLORS.mutedBlue,
        variable: type === 'variable' ? props.fullValue : null
      },
      selectedConstantColorOption: type === 'constant' && props.multiValued ? 'multiple' : 'single'
    };

    _this.setType = _this.setType.bind(_this);
    _this.setColor = _this.setColor.bind(_this);
    _this.setColorScale = _this.setColorScale.bind(_this);
    _this.onConstantColorOptionChange = _this.onConstantColorOptionChange.bind(_this);
    return _this;
  }

  _createClass(UnconnectedMarkerColor, [{
    key: 'setType',
    value: function setType(type) {
      if (this.state.type !== type) {
        this.setState({ type: type });
        this.props.updatePlot(this.state.value[type]);
        if (type === 'constant') {
          var _context$updateContai;

          this.context.updateContainer((_context$updateContai = {}, _defineProperty(_context$updateContai, 'marker.colorsrc', null), _defineProperty(_context$updateContai, 'marker.colorscale', null), _defineProperty(_context$updateContai, 'marker.showscale', null), _context$updateContai));
          this.setState({ colorscale: null });
        } else {
          var _context$updateContai2;

          this.context.updateContainer((_context$updateContai2 = {}, _defineProperty(_context$updateContai2, 'marker.color', null), _defineProperty(_context$updateContai2, 'marker.colorsrc', null), _defineProperty(_context$updateContai2, 'marker.colorscale', []), _context$updateContai2));
        }
      }
    }
  }, {
    key: 'setColor',
    value: function setColor(inputValue) {
      var type = this.state.type;


      this.setState(type === 'constant' ? { value: { constant: inputValue } } : { value: { variable: inputValue } });
      this.props.updatePlot(inputValue);
    }
  }, {
    key: 'setColorScale',
    value: function setColorScale(inputValue) {
      this.setState({ colorscale: inputValue });
      this.context.updateContainer(_defineProperty({}, 'marker.colorscale', inputValue));
    }
  }, {
    key: 'isMultiValued',
    value: function isMultiValued() {
      return this.props.multiValued || Array.isArray(this.props.fullValue) && this.props.fullValue.includes(_constants.MULTI_VALUED) || this.props.container.marker && this.props.container.marker.colorscale && this.props.container.marker.colorscale === _constants.MULTI_VALUED || this.props.container.marker && this.props.container.marker.colorsrc && this.props.container.marker.colorsrc === _constants.MULTI_VALUED || this.props.container.marker && this.props.container.marker.color && Array.isArray(this.props.container.marker.color) && this.props.container.marker.color.includes(_constants.MULTI_VALUED);
    }
  }, {
    key: 'onConstantColorOptionChange',
    value: function onConstantColorOptionChange(value) {
      this.setState({
        selectedConstantColorOption: value
      });
    }
  }, {
    key: 'renderConstantControls',
    value: function renderConstantControls() {
      var _ = this.context.localize;
      return _react2.default.createElement(_MultiColorPicker2.default, {
        attr: 'marker.color',
        multiColorMessage: _('Each trace will be colored according to the selected colorscale.'),
        singleColorMessage: _('All traces will be colored in the the same color.'),
        setColor: this.setColor,
        setColorScale: this.setColorScale,
        onConstantColorOptionChange: this.onConstantColorOptionChange,
        parentSelectedConstantColorOption: this.state.selectedConstantColorOption
      });
    }
  }, {
    key: 'renderVariableControls',
    value: function renderVariableControls() {
      var multiValued = this.props.container && this.props.container.marker && (this.props.container.marker.colorscale && this.props.container.marker.colorscale === _constants.MULTI_VALUED || this.props.container.marker.colorsrc && this.props.container.marker.colorsrc === _constants.MULTI_VALUED);
      return _react2.default.createElement(
        _Field2.default,
        { multiValued: multiValued },
        _react2.default.createElement(_DataSelector2.default, { suppressMultiValuedMessage: true, attr: 'marker.color' }),
        this.props.container.marker && this.props.container.marker.colorscale === _constants.MULTI_VALUED ? null : _react2.default.createElement(_ColorscalePicker2.default, {
          suppressMultiValuedMessage: true,
          attr: 'marker.colorscale',
          updatePlot: this.setColorScale,
          colorscale: this.state.colorscale
        })
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var attr = this.props.attr;
      var _context = this.context,
          _ = _context.localize,
          container = _context.container;

      // TO DO: https://github.com/plotly/react-chart-editor/issues/654

      var noSplitsPresent = container && (!container.transforms || !container.transforms.filter(function (t) {
        return t.type === 'groupby';
      }).length);

      if (noSplitsPresent) {
        var type = this.state.type;

        var options = [{ label: _('Constant'), value: 'constant' }, { label: _('Variable'), value: 'variable' }];

        return _react2.default.createElement(
          _react.Fragment,
          null,
          _react2.default.createElement(
            _Field2.default,
            _extends({}, this.props, { attr: attr }),
            _react2.default.createElement(
              _Field2.default,
              { multiValued: this.isMultiValued() && !this.state.type },
              _react2.default.createElement(_RadioBlocks2.default, { options: options, activeOption: type, onOptionChange: this.setType }),
              !type ? null : _react2.default.createElement(
                _Info2.default,
                null,
                type === 'constant' ? _('All points in a trace are colored in the same color.') : _('Each point in a trace is colored according to data.')
              )
            ),
            !type ? null : type === 'constant' ? this.renderConstantControls() : this.renderVariableControls()
          ),
          type === 'constant' ? null : _react2.default.createElement(
            _react.Fragment,
            null,
            _react2.default.createElement(_Radio2.default, {
              label: _('Colorscale Direction'),
              attr: 'marker.reversescale',
              options: [{ label: _('Normal'), value: false }, { label: _('Reversed'), value: true }]
            }),
            _react2.default.createElement(_Radio2.default, {
              label: _('Color Bar'),
              attr: 'marker.showscale',
              options: [{ label: _('Show'), value: true }, { label: _('Hide'), value: false }]
            }),
            _react2.default.createElement(
              _VisibilitySelect2.default,
              {
                label: _('Colorscale Range'),
                attr: 'marker.cauto',
                options: [{ label: _('Auto'), value: true }, { label: _('Custom'), value: false }],
                showOn: false,
                defaultOpt: true
              },
              _react2.default.createElement(_Numeric2.default, { label: _('Min'), attr: 'marker.cmin' }),
              _react2.default.createElement(_Numeric2.default, { label: _('Max'), attr: 'marker.cmax' })
            )
          )
        );
      }

      return _react2.default.createElement(
        _Field2.default,
        _extends({}, this.props, { attr: attr }),
        this.renderConstantControls()
      );
    }
  }]);

  return UnconnectedMarkerColor;
}(_react.Component);

UnconnectedMarkerColor.propTypes = _extends({
  fullValue: _propTypes2.default.any,
  updatePlot: _propTypes2.default.func
}, _Field2.default.propTypes);

UnconnectedMarkerColor.contextTypes = {
  localize: _propTypes2.default.func,
  updateContainer: _propTypes2.default.func,
  traceIndexes: _propTypes2.default.array,
  container: _propTypes2.default.object
};

exports.default = (0, _lib.connectToContainer)(UnconnectedMarkerColor);
//# sourceMappingURL=MarkerColor.js.map