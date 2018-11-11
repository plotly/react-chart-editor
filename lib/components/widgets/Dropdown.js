'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactSelect = require('react-select');

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _context = require('../../context');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Dropdown = function (_Component) {
  _inherits(Dropdown, _Component);

  function Dropdown(props) {
    _classCallCheck(this, Dropdown);

    var _this = _possibleConstructorReturn(this, (Dropdown.__proto__ || Object.getPrototypeOf(Dropdown)).call(this, props));

    _this.onChange = _this.onChange.bind(_this);
    return _this;
  }

  _createClass(Dropdown, [{
    key: 'onChange',
    value: function onChange(selection) {
      var _props = this.props,
          multi = _props.multi,
          onChange = _props.onChange,
          valueKey = _props.valueKey;


      if (!selection) {
        return onChange(null);
      } else if (multi) {
        return onChange(selection.map(function (s) {
          return s[valueKey];
        }));
      }

      return onChange(selection[valueKey]);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          backspaceToRemoveMessage = _props2.backspaceToRemoveMessage,
          minWidth = _props2.minWidth,
          placeholder = _props2.placeholder,
          clearable = _props2.clearable,
          value = _props2.value,
          options = _props2.options,
          searchable = _props2.searchable,
          multi = _props2.multi,
          optionRenderer = _props2.optionRenderer,
          valueRenderer = _props2.valueRenderer,
          noResultsText = _props2.noResultsText,
          valueKey = _props2.valueKey,
          disabled = _props2.disabled,
          className = _props2.className,
          width = _props2.width;
      var _ = this.context.localize;


      var dropdownStyle = { minWidth: minWidth };
      if (width) {
        dropdownStyle.width = width;
      }

      var opts = options.slice();
      for (var i = 0; i < opts.length; i++) {
        if (typeof opts[i] === 'string') {
          opts[i] = _defineProperty({ label: opts[i] }, valueKey, opts[i]);
        }
      }

      var dropdownContainerClass = (0, _classnames2.default)('dropdown-container', {
        'dropdown--dark': this.props.backgroundDark
      });

      return _react2.default.createElement(
        'div',
        { className: dropdownContainerClass, style: dropdownStyle },
        _react2.default.createElement(_reactSelect2.default, {
          backspaceToRemoveMessage: backspaceToRemoveMessage,
          placeholder: placeholder || _('Select an Option'),
          clearable: clearable,
          value: value,
          options: opts,
          searchable: searchable,
          onChange: this.onChange,
          multi: multi,
          optionRenderer: optionRenderer,
          valueRenderer: valueRenderer,
          noResultsText: noResultsText || _('No Results'),
          valueKey: valueKey,
          disabled: disabled,
          className: className
        })
      );
    }
  }]);

  return Dropdown;
}(_react.Component);

Dropdown.defaultProps = {
  clearable: true,
  multi: false,
  searchable: false,
  minWidth: '120px',
  valueKey: 'value',
  disabled: false
};

Dropdown.propTypes = {
  backspaceToRemoveMessage: _propTypes2.default.string,
  backgroundDark: _propTypes2.default.bool,
  clearable: _propTypes2.default.bool,
  onChange: _propTypes2.default.func.isRequired,
  options: _propTypes2.default.array.isRequired,
  placeholder: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object]),
  searchable: _propTypes2.default.bool,
  minWidth: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  valueKey: _propTypes2.default.string,
  value: _propTypes2.default.any,
  multi: _propTypes2.default.bool,
  optionRenderer: _propTypes2.default.func,
  valueRenderer: _propTypes2.default.func,
  noResultsText: _propTypes2.default.string,
  disabled: _propTypes2.default.bool,
  className: _propTypes2.default.string,
  width: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Dropdown.contextType = _context.EditorControlsContext;

exports.default = Dropdown;
//# sourceMappingURL=Dropdown.js.map