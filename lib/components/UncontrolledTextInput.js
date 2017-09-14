'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TEST_SELECTOR_CLASS = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _DelayedTextInput = require('@workspace/components/widgets/DelayedTextInput');

var _DelayedTextInput2 = _interopRequireDefault(_DelayedTextInput);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _workspace = require('@workspace/constants/workspace');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TEST_SELECTOR_CLASS = exports.TEST_SELECTOR_CLASS = 'js-TextInput';

/*
 * Input control for text fields without validation
 *
 * Exposes only one event (onUpdate) that fires either
 * on every keystroke (immediate=true) or only on blur/enter
 * (immediate=false)
 */

var UncontrolledTextInput = function (_Component) {
    _inherits(UncontrolledTextInput, _Component);

    function UncontrolledTextInput(props) {
        _classCallCheck(this, UncontrolledTextInput);

        var _this = _possibleConstructorReturn(this, (UncontrolledTextInput.__proto__ || Object.getPrototypeOf(UncontrolledTextInput)).call(this, props));

        _this.handleFocus = _this.handleFocus.bind(_this);
        _this.handleUpdate = _this.handleUpdate.bind(_this);
        return _this;
    }

    _createClass(UncontrolledTextInput, [{
        key: 'handleUpdate',
        value: function handleUpdate(event) {
            this.props.onUpdate(event.target.value);
        }

        // recreate the autoSelect behavior of DelayedTextInput for the
        // immediate, bare <input> case

    }, {
        key: 'handleFocus',
        value: function handleFocus(event) {
            if (this.props.autoSelect) {
                event.target.select();
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                onUpdate = _props.onUpdate,
                immediate = _props.immediate,
                value = _props.value,
                editableClassName = _props.editableClassName,
                disabled = _props.disabled,
                readOnly = _props.readOnly,
                autoSelect = _props.autoSelect;


            var displayValue = value === _workspace.MIXED_VALUES ? _workspace.MIXED_MODE_VALUE : value;

            // TODO: this isn't *really* numeric but that gives decent style
            var wrapperClassName = (0, _classnames2.default)('numeric-input__wrapper');

            var editableClass = (0, _classnames2.default)('numeric-input__number', editableClassName, TEST_SELECTOR_CLASS);

            var commonProps = {
                type: 'text',
                value: displayValue,
                className: editableClass,
                disabled: disabled,
                readOnly: readOnly
            };

            if (immediate) {
                return _react2.default.createElement(
                    'div',
                    { className: wrapperClassName },
                    _react2.default.createElement('input', _extends({
                        onChange: this.handleUpdate,
                        onFocus: this.handleFocus
                    }, commonProps))
                );
            }

            return _react2.default.createElement(
                'div',
                { className: wrapperClassName },
                _react2.default.createElement(_DelayedTextInput2.default, _extends({
                    onUpdate: onUpdate,
                    autoSelect: autoSelect
                }, commonProps))
            );
        }
    }]);

    return UncontrolledTextInput;
}(_react.Component);

exports.default = UncontrolledTextInput;


UncontrolledTextInput.propTypes = {
    onUpdate: _react.PropTypes.func.isRequired,
    immediate: _react.PropTypes.bool.isRequired,
    value: _react.PropTypes.string.isRequired,
    editableClassName: _react.PropTypes.string,
    disabled: _react.PropTypes.bool,
    readOnly: _react.PropTypes.bool,
    autoSelect: _react.PropTypes.bool
};

UncontrolledTextInput.defaultProps = {
    readOnly: false,
    autoSelect: true
};
//# sourceMappingURL=UncontrolledTextInput.js.map