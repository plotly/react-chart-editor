'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _EditableText = require('@workspace/components/widgets/EditableText');

var _EditableText2 = _interopRequireDefault(_EditableText);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Dropdown = require('@workspace/components/widgets/Dropdown');

var _Dropdown2 = _interopRequireDefault(_Dropdown);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DropdownWithTextInput = function (_Component) {
    _inherits(DropdownWithTextInput, _Component);

    function DropdownWithTextInput(props) {
        _classCallCheck(this, DropdownWithTextInput);

        var _this = _possibleConstructorReturn(this, (DropdownWithTextInput.__proto__ || Object.getPrototypeOf(DropdownWithTextInput)).call(this, props));

        _this.onSelect = _this.onSelect.bind(_this);
        _this.onUpdate = _this.onUpdate.bind(_this);
        _this.addOptionIfNotAvailable = _this.addOptionIfNotAvailable.bind(_this);
        _this.newOptionList = _this.newOptionList.bind(_this);

        var _this$props = _this.props,
            options = _this$props.options,
            value = _this$props.value;


        _this.state = {
            value: value,
            list: _this.newOptionList(options, value),
            intermediateTextValue: ''
        };

        return _this;
    }

    _createClass(DropdownWithTextInput, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            this.addOptionIfNotAvailable(nextProps.value);
        }
    }, {
        key: 'onSelect',
        value: function onSelect(item) {
            var _props = this.props,
                onUpdate = _props.onUpdate,
                customValue = _props.customValue;

            this.setState({
                value: item
            });

            /*
             * Don't propagate the change when custom is selected.
             * The text input will update propagate the change onBlur
             */
            if (item !== customValue) {
                onUpdate(item);
            } else {
                /*
                 * Otherwise, we're in like a "edit" mode - user is
                 * prompted to fill in a custom value into a text box
                 */
                this.setState({ intermediateTextValue: item });
            }
        }
    }, {
        key: 'onUpdate',
        value: function onUpdate(newValue) {
            this.setState({
                value: newValue
            });
            this.addOptionIfNotAvailable(newValue);

            this.props.onUpdate(newValue);
        }

        // if the input doesn't exist already then add it to our list of options.

    }, {
        key: 'newOptionList',
        value: function newOptionList(originalList, value) {
            var list = originalList.slice();

            if (!list.find(function (o) {
                return o.value === value;
            })) {
                list.unshift({
                    label: value,
                    value: value
                });
            }

            return list;
        }
    }, {
        key: 'addOptionIfNotAvailable',
        value: function addOptionIfNotAvailable(value) {
            this.setState({
                list: this.newOptionList(this.state.list, value)
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props2 = this.props,
                clearable = _props2.clearable,
                customValue = _props2.customValue,
                minWidth = _props2.minWidth,
                placeholder = _props2.placeholder;
            var _state = this.state,
                intermediateTextValue = _state.intermediateTextValue,
                value = _state.value,
                list = _state.list;


            var editableClass = (0, _classnames2.default)('numeric-input-number', '+editable', '+float-left');

            if (value === customValue) {
                return _react2.default.createElement(
                    'span',
                    { className: 'font-dropdown' },
                    _react2.default.createElement(_EditableText2.default, {
                        className: editableClass,
                        text: String(intermediateTextValue),
                        type: 'text',
                        onChange: function onChange(textValue) {
                            return _this2.setState({ intermediateTextValue: textValue });
                        },
                        onUpdate: this.onUpdate,
                        placeholder: placeholder
                    })
                );
            }

            return _react2.default.createElement(
                'span',
                { className: 'font-dropdown' },
                _react2.default.createElement(_Dropdown2.default, {
                    ref: 'dropdown',
                    clearable: clearable,
                    value: value,
                    options: list,
                    onChange: this.onSelect,
                    minWidth: minWidth
                })
            );
        }
    }]);

    return DropdownWithTextInput;
}(_react.Component);

exports.default = DropdownWithTextInput;


DropdownWithTextInput.defaultProps = {
    customValue: 'custom',
    placeholder: ''
};

DropdownWithTextInput.propTypes = {
    options: _react2.default.PropTypes.array.isRequired,
    onUpdate: _react.PropTypes.func.isRequired,
    value: _react2.default.PropTypes.any,
    minWidth: _react2.default.PropTypes.string,
    clearable: _react2.default.PropTypes.bool,
    customValue: _react2.default.PropTypes.string,
    placeholder: _react2.default.PropTypes.string
};
module.exports = exports['default'];
//# sourceMappingURL=DropdownWithTextInput.js.map