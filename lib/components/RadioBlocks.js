'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RadioBlocks = function (_Component) {
    _inherits(RadioBlocks, _Component);

    function RadioBlocks(props) {
        _classCallCheck(this, RadioBlocks);

        var _this = _possibleConstructorReturn(this, (RadioBlocks.__proto__ || Object.getPrototypeOf(RadioBlocks)).call(this, props));

        _this.state = { activeOption: _this.props.activeOption };
        _this.handleChange = _this.handleChange.bind(_this);
        _this.renderOption = _this.renderOption.bind(_this);
        return _this;
    }

    _createClass(RadioBlocks, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            // Reset the value to the graph's actual value
            if (nextProps.activeOption !== this.state.activeOption) {
                this.setState({
                    activeOption: nextProps.activeOption
                });
            }
        }
    }, {
        key: 'handleChange',
        value: function handleChange(newValue) {
            this.setState({ activeOption: newValue });
            this.props.onOptionChange(newValue);
        }
    }, {
        key: 'renderOption',
        value: function renderOption(optionName) {
            var _this2 = this;

            var label = optionName.label,
                value = optionName.value,
                icon = optionName.icon;

            var defaultActive = this.state.activeOption === value;

            var optionClass = (0, _classnames2.default)('radio-block__option', {
                'radio-block__option--active': defaultActive
            });

            return _react2.default.createElement(
                'div',
                {
                    className: optionClass,
                    key: value,
                    ref: label,
                    checked: defaultActive,
                    onClick: function onClick() {
                        return _this2.handleChange(value);
                    }
                },
                icon ? _react2.default.createElement(
                    'span',
                    { className: 'radio-block__icon' },
                    _react2.default.createElement('i', { className: icon })
                ) : null,
                label ? _react2.default.createElement(
                    'span',
                    null,
                    label
                ) : null
            );
        }
    }, {
        key: 'render',
        value: function render() {

            var optionList = this.props.options.map(this.renderOption);

            var groupClass = (0, _classnames2.default)('radio-block__group', {
                'radio-block__group--center': this.props.alignment === 'center'
            });

            return _react2.default.createElement(
                'div',
                { className: groupClass },
                optionList
            );
        }
    }]);

    return RadioBlocks;
}(_react.Component);

RadioBlocks.propTypes = {
    options: _react.PropTypes.arrayOf(_react.PropTypes.shape({
        value: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.bool, _react.PropTypes.number]).isRequired,
        label: _react.PropTypes.string,
        icon: _react.PropTypes.string,
        disabled: _react.PropTypes.bool
    })),
    onOptionChange: _react.PropTypes.func.isRequired,
    activeOption: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.bool, _react.PropTypes.number]),
    radioClassName: _react.PropTypes.string,

    // One of right, left, center
    alignment: _react.PropTypes.string
};

module.exports = RadioBlocks;
//# sourceMappingURL=RadioBlocks.js.map