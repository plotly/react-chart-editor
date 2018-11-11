'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _plotlyIcons = require('plotly-icons');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SymbolSelector = function (_Component) {
  _inherits(SymbolSelector, _Component);

  function SymbolSelector(props) {
    _classCallCheck(this, SymbolSelector);

    var _this = _possibleConstructorReturn(this, (SymbolSelector.__proto__ || Object.getPrototypeOf(SymbolSelector)).call(this, props));

    _this.state = {
      isOpen: false
    };
    _this.togglePanel = _this.togglePanel.bind(_this);
    return _this;
  }

  _createClass(SymbolSelector, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      var _props = this.props,
          markerColor = _props.markerColor,
          borderColor = _props.borderColor;
      var nextMarkerColor = nextProps.markerColor,
          nextBorderColor = nextProps.borderColor;


      return this.props.value !== nextProps.value || this.state.isOpen !== nextState.isOpen || markerColor !== nextMarkerColor || borderColor !== nextBorderColor;
    }
  }, {
    key: 'togglePanel',
    value: function togglePanel() {
      this.setState({ isOpen: !this.state.isOpen });
    }
  }, {
    key: 'renderActiveOption',
    value: function renderActiveOption() {
      var _props2 = this.props,
          markerColor = _props2.markerColor,
          borderColor = _props2.borderColor,
          symbolOptions = _props2.symbolOptions,
          value = _props2.value;

      var currentSymbol = symbolOptions.find(function (symbol) {
        return symbol.value === value;
      });
      if (!currentSymbol) {
        return _react2.default.createElement(
          'span',
          {
            style: {
              paddingTop: '5px',
              paddingLeft: '15px'
            }
          },
          '-'
        );
      }

      var symbolStyle = {
        stroke: currentSymbol.fill === 'none' ? markerColor : borderColor,
        strokeOpacity: '1',
        strokeWidth: '2px',
        fill: currentSymbol.fill === 'none' ? 'none' : markerColor
      };

      return _react2.default.createElement(
        'span',
        null,
        _react2.default.createElement(
          'svg',
          { width: '18', height: '18' },
          _react2.default.createElement(
            'g',
            { transform: 'translate(8,8)' },
            _react2.default.createElement('path', { d: currentSymbol.label, style: symbolStyle })
          )
        )
      );
    }
  }, {
    key: 'renderOptions',
    value: function renderOptions() {
      var _this2 = this;

      var _props3 = this.props,
          markerColor = _props3.markerColor,
          borderColor = _props3.borderColor,
          symbolOptions = _props3.symbolOptions;

      return symbolOptions.map(function (option) {
        var fill = option.fill,
            value = option.value,
            label = option.label;


        var symbolStyle = {
          stroke: fill === 'none' ? markerColor : borderColor,
          strokeOpacity: '1',
          strokeWidth: '2px',
          fill: fill === 'none' ? 'none' : markerColor
        };
        return _react2.default.createElement(
          'div',
          {
            className: 'symbol-selector__item',
            key: value,
            onClick: function onClick() {
              return _this2.props.onChange(value);
            }
          },
          _react2.default.createElement(
            'svg',
            { width: '28', height: '28', className: 'symbol-selector__symbol', 'data-value': value },
            _react2.default.createElement(
              'g',
              { transform: 'translate(14,14)' },
              _react2.default.createElement('path', { d: label, style: symbolStyle })
            )
          )
        );
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var isOpen = this.state.isOpen;

      var toggleClass = (0, _classnames2.default)('symbol-selector__toggle', {
        'symbol-selector__toggle--dark': this.props.backgroundDark
      });

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { className: toggleClass, onClick: this.togglePanel },
          _react2.default.createElement(
            'span',
            { className: 'symbol-selector__toggle_option' },
            this.renderActiveOption()
          ),
          _react2.default.createElement(
            'span',
            null,
            _react2.default.createElement(_plotlyIcons.CarretDownIcon, { className: 'symbol-selector__toggle__caret' })
          )
        ),
        isOpen && this.renderOptions()
      );
    }
  }]);

  return SymbolSelector;
}(_react.Component);

exports.default = SymbolSelector;


SymbolSelector.propTypes = {
  backgroundDark: _propTypes2.default.bool,
  markerColor: _propTypes2.default.string,
  borderColor: _propTypes2.default.string,
  value: _propTypes2.default.string,
  onChange: _propTypes2.default.func,
  symbolOptions: _propTypes2.default.array
};
//# sourceMappingURL=SymbolSelector.js.map