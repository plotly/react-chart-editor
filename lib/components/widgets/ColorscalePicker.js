'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactColorscales = require('react-colorscales');

var _reactColorscales2 = _interopRequireDefault(_reactColorscales);

var _Dropdown = require('./Dropdown');

var _Dropdown2 = _interopRequireDefault(_Dropdown);

var _Info = require('../fields/Info');

var _Info2 = _interopRequireDefault(_Info);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _context = require('../../context');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Scale = function (_Component) {
  _inherits(Scale, _Component);

  function Scale(props) {
    _classCallCheck(this, Scale);

    var _this = _possibleConstructorReturn(this, (Scale.__proto__ || Object.getPrototypeOf(Scale)).call(this, props));

    _this.state = {
      selectedColorscaleType: props.initialCategory || 'sequential',
      showColorscalePicker: false
    };

    _this.onChange = _this.onChange.bind(_this);
    _this.onClick = _this.onClick.bind(_this);
    return _this;
  }

  _createClass(Scale, [{
    key: 'onClick',
    value: function onClick() {
      this.setState({
        showColorscalePicker: !this.state.showColorscalePicker
      });
    }
  }, {
    key: 'onChange',
    value: function onChange(selectedColorscaleType) {
      this.setState({ selectedColorscaleType: selectedColorscaleType });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          onColorscaleChange = _props.onColorscaleChange,
          selected = _props.selected;
      var _state = this.state,
          selectedColorscaleType = _state.selectedColorscaleType,
          showColorscalePicker = _state.showColorscalePicker;

      var description = _reactColorscales.COLOR_PICKER_CONSTANTS.COLORSCALE_DESCRIPTIONS[selectedColorscaleType];
      var colorscaleOptions = _reactColorscales.COLOR_PICKER_CONSTANTS.COLORSCALE_TYPES.filter(function (type) {
        return type !== 'custom';
      }).map(function (type) {
        return {
          label: type + ' scales',
          value: type
        };
      });
      var _ = this.context.localize;

      return _react2.default.createElement(
        'div',
        { className: 'customPickerContainer__outer' },
        _react2.default.createElement(_reactColorscales.Colorscale, { colorscale: selected, onClick: this.onClick }),
        showColorscalePicker ? _react2.default.createElement(
          'div',
          { className: 'customPickerContainer' },
          _react2.default.createElement(_Dropdown2.default, {
            options: colorscaleOptions,
            value: selectedColorscaleType,
            onChange: this.onChange,
            clearable: false,
            searchable: false,
            placeholder: _('Select a Colorscale Type')
          }),
          description ? _react2.default.createElement(
            _react.Fragment,
            null,
            _react2.default.createElement(_reactColorscales2.default, {
              onChange: onColorscaleChange,
              colorscale: selected,
              width: 215,
              colorscaleType: this.state.selectedColorscaleType,
              onColorscaleTypeChange: this.onColorscaleTypeChange,
              disableSwatchControls: true,
              scaleLength: 7
            }),
            _react2.default.createElement(
              _Info2.default,
              null,
              description
            )
          ) : null
        ) : null
      );
    }
  }]);

  return Scale;
}(_react.Component);

Scale.propTypes = {
  onColorscaleChange: _propTypes2.default.func,
  selected: _propTypes2.default.array,
  label: _propTypes2.default.string,
  initialCategory: _propTypes2.default.string
};

Scale.contextType = _context.EditorControlsContext;

exports.default = Scale;
//# sourceMappingURL=ColorscalePicker.js.map