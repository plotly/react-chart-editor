'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _index = require('../index');

var _RadioBlocks = require('../widgets/RadioBlocks');

var _RadioBlocks2 = _interopRequireDefault(_RadioBlocks);

var _Field = require('./Field');

var _Field2 = _interopRequireDefault(_Field);

var _lib = require('../../lib');

var _context = require('../../context');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ErrorBars = function (_Component) {
  _inherits(ErrorBars, _Component);

  function ErrorBars(props, context) {
    _classCallCheck(this, ErrorBars);

    var _this = _possibleConstructorReturn(this, (ErrorBars.__proto__ || Object.getPrototypeOf(ErrorBars)).call(this, props, context));

    _this.updatePlot = _this.updatePlot.bind(_this);
    return _this;
  }

  _createClass(ErrorBars, [{
    key: 'updatePlot',
    value: function updatePlot(value) {
      if (value === 'symmetric') {
        this.props.updatePlot(_extends({}, this.props.fullValue, {
          visible: true,
          symmetric: true
        }));
      }

      if (value === 'asymmetric') {
        this.props.updatePlot(_extends({}, this.props.fullValue, {
          visible: true,
          symmetric: false
        }));
      }

      if (value === 'hidden') {
        this.props.updatePlot(_extends({}, this.props.fullValue, {
          visible: false
        }));
      }
    }
  }, {
    key: 'getMode',
    value: function getMode() {
      var mode = void 0;

      if (!this.props.fullValue.visible) {
        mode = 'hidden';
      }

      if (this.props.fullValue.visible && (this.props.fullValue.symmetric || typeof this.props.fullValue.symmetric === 'undefined')) {
        // when this.props.fullValue.type === 'sqrt',
        // then this.props.fullValue.symmetric is undefined, but 'sqrt' is only
        // applicable when we want symmetric error bars
        // https://github.com/plotly/plotly.js/issues/2359
        mode = 'symmetric';
      }

      if (this.props.fullValue.visible && this.props.fullValue.symmetric === false) {
        // it has to be explicitly set to false, because we don't want it to catch
        // cases when it's undefined
        mode = 'asymmetric';
      }

      return mode;
    }
  }, {
    key: 'renderModeSelector',
    value: function renderModeSelector() {
      var _ = this.context.localize;


      return _react2.default.createElement(
        _Field2.default,
        null,
        _react2.default.createElement(_RadioBlocks2.default, {
          alignment: 'center',
          onOptionChange: this.updatePlot,
          activeOption: this.getMode(),
          options: [{ label: _('None'), value: 'hidden' }, { label: _('Symmetric'), value: 'symmetric' }, { label: _('Asymmetric'), value: 'asymmetric' }]
        })
      );
    }
  }, {
    key: 'renderErrorBarControls',
    value: function renderErrorBarControls() {
      var _ = this.context.localize;

      var mode = this.getMode();
      var showCustomDataControl = this.props.fullValue.type === 'data';

      var styleAttrs = _react2.default.createElement(
        _react.Fragment,
        null,
        _react2.default.createElement(_index.Radio, {
          label: _('Copy Y Style'),
          attr: this.props.attr + '.copy_ystyle',
          options: [{ label: _('Yes'), value: true }, { label: _('No'), value: false }]
        }),
        _react2.default.createElement(_index.Radio, {
          label: _('Copy Z Style'),
          attr: this.props.attr + '.copy_zstyle',
          options: [{ label: _('Yes'), value: true }, { label: _('No'), value: false }]
        }),
        _react2.default.createElement(_index.MultiColorPicker, { label: _('Color'), attr: this.props.attr + '.color' }),
        _react2.default.createElement(_index.Numeric, { label: _('Thickness'), attr: this.props.attr + '.thickness' }),
        _react2.default.createElement(_index.Numeric, { label: _('Crossbar Width'), attr: this.props.attr + '.width' })
      );

      if (mode === 'symmetric') {
        return _react2.default.createElement(
          _react.Fragment,
          null,
          _react2.default.createElement(_index.Radio, {
            label: _('Error Type'),
            attr: this.props.attr + '.type',
            options: [{ label: _('%'), value: 'percent' }, { label: _('Constant'), value: 'constant' }, { label: _('√'), value: 'sqrt' }, { label: _('Data'), value: 'data' }]
          }),
          _react2.default.createElement(_index.Numeric, { label: _('Value'), attr: this.props.attr + '.value' }),
          showCustomDataControl ? _react2.default.createElement(_index.DataSelector, { label: _('Custom Data'), attr: this.props.attr + '.array' }) : null,
          styleAttrs
        );
      }

      if (mode === 'asymmetric') {
        return _react2.default.createElement(
          _react.Fragment,
          null,
          _react2.default.createElement(_index.Radio, {
            label: _('Error Type'),
            attr: this.props.attr + '.type',
            options: [{ label: _('%'), value: 'percent' }, { label: _('Constant'), value: 'constant' }, { label: _('Data'), value: 'data' }]
          }),
          _react2.default.createElement(_index.Numeric, { label: _('Value'), attr: this.props.attr + '.value' }),
          _react2.default.createElement(_index.Numeric, { label: _('Value (-)'), attr: this.props.attr + '.valueminus' }),
          showCustomDataControl ? _react2.default.createElement(
            _react.Fragment,
            null,
            _react2.default.createElement(_index.DataSelector, { label: _('Error (+)'), attr: this.props.attr + '.array' }),
            _react2.default.createElement(_index.DataSelector, { label: _('Error (-)'), attr: this.props.attr + '.arrayminus' })
          ) : null,
          styleAttrs
        );
      }

      return null;
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _react.Fragment,
        null,
        'Field',
        this.renderModeSelector(),
        this.renderErrorBarControls()
      );
    }
  }]);

  return ErrorBars;
}(_react.Component);

ErrorBars.propTypes = {
  attr: _propTypes2.default.string,
  fullValue: _propTypes2.default.object,
  updatePlot: _propTypes2.default.func
};

ErrorBars.contextType = _context.EditorControlsContext;

exports.default = (0, _lib.connectToContainer)(ErrorBars);
//# sourceMappingURL=ErrorBars.js.map