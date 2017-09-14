'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactSelect = require('react-select');

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var _ramda = require('ramda');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
        key: 'focus',
        value: function focus() {
            this.refs.dropdown.focus();
        }
    }, {
        key: 'onChange',
        value: function onChange(selection) {
            var _props = this.props,
                multi = _props.multi,
                onChange = _props.onChange,
                valueKey = _props.valueKey;


            if (!selection) {
                return onChange(null);
            } else if (multi) {
                return onChange((0, _ramda.map)((0, _ramda.prop)(valueKey), selection));
            }

            return onChange((0, _ramda.prop)(valueKey, selection));
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

            var dropdownStyle = { minWidth: minWidth };
            if (width) {
                dropdownStyle.width = width;
            }
            return _react2.default.createElement(
                'div',
                { className: 'dropdown-container', style: dropdownStyle },
                _react2.default.createElement(_reactSelect2.default, { ref: 'dropdown',
                    backspaceToRemoveMessage: backspaceToRemoveMessage,
                    placeholder: placeholder,
                    clearable: clearable,
                    value: value,
                    options: options,
                    searchable: searchable,
                    onChange: this.onChange,
                    multi: multi,
                    optionRenderer: optionRenderer,
                    valueRenderer: valueRenderer,
                    noResultsText: noResultsText,
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
    noResultsText: 'no results...',
    placeholder: 'select an option...',
    searchable: false,
    minWidth: '150px',
    valueKey: 'value',
    disabled: false
};

Dropdown.propTypes = {
    backspaceToRemoveMessage: _react2.default.PropTypes.string,
    clearable: _react2.default.PropTypes.bool,
    onChange: _react2.default.PropTypes.func.isRequired,
    options: _react2.default.PropTypes.array.isRequired,
    placeholder: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.object]),
    searchable: _react2.default.PropTypes.bool,
    minWidth: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number]),
    valueKey: _react2.default.PropTypes.string,
    value: _react2.default.PropTypes.any,
    multi: _react2.default.PropTypes.bool,
    optionRenderer: _react2.default.PropTypes.func,
    valueRenderer: _react2.default.PropTypes.func,
    noResultsText: _react2.default.PropTypes.string,
    disabled: _react2.default.PropTypes.bool,
    className: _react2.default.PropTypes.string,
    width: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number])
};

module.exports = Dropdown;
//# sourceMappingURL=Dropdown.js.map