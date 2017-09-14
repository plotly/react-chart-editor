'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _EditableText = require('@workspace/components/widgets/EditableText');

var _EditableText2 = _interopRequireDefault(_EditableText);

var _Slider = require('@workspace/components/widgets/Slider');

var _Slider2 = _interopRequireDefault(_Slider);

var _number = require('@workspace/utils/number');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Input slider
 */

var InputSlider = function (_Component) {
    _inherits(InputSlider, _Component);

    function InputSlider(props) {
        _classCallCheck(this, InputSlider);

        var _this = _possibleConstructorReturn(this, (InputSlider.__proto__ || Object.getPrototypeOf(InputSlider)).call(this, props));

        _this.state = { value: props.value };
        _this.onTextChange = _this.onTextChange.bind(_this);
        _this.onUpdate = _this.onUpdate.bind(_this);
        return _this;
    }

    _createClass(InputSlider, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            // Updates the value to the graph's actual value
            if (nextProps.value !== this.state.value) {
                this.setState({
                    value: nextProps.value
                });
            }
        }
    }, {
        key: 'onTextChange',
        value: function onTextChange(newValue) {
            var value = (0, _number.stringToInt)(newValue);
            this.setState({ value: value });
        }
    }, {
        key: 'onUpdate',
        value: function onUpdate(newValue) {
            var _props = this.props,
                step = _props.step,
                min = _props.min,
                max = _props.max,
                onChange = _props.onChange;


            var value = (0, _number.stringToInt)(newValue);
            value = (0, _number.getStep)(value, step);
            value = (0, _number.keepWithinMaxMin)(value, min, max);

            this.setState({ value: value });
            onChange(value);
        }
    }, {
        key: 'render',
        value: function render() {
            var textValue = (0, _number.numberToString)(this.state.value);
            var _props2 = this.props,
                onChange = _props2.onChange,
                min = _props2.min,
                max = _props2.max,
                step = _props2.step,
                value = _props2.value;


            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(_EditableText2.default, {
                    ref: 'sliderText',
                    className: 'slider__input',
                    text: textValue,
                    type: 'text',
                    onChange: this.onTextChange,
                    onUpdate: this.onUpdate
                }),
                _react2.default.createElement(
                    'div',
                    { className: 'slider__widget' },
                    _react2.default.createElement(_Slider2.default, {
                        value: value,
                        onChange: onChange,
                        min: min,
                        max: max,
                        step: step,
                        fill: true,
                        orientation: 'horizontal'
                    })
                )
            );
        }
    }]);

    return InputSlider;
}(_react.Component);

InputSlider.propTypes = {
    value: _react2.default.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]),
    onChange: _react.PropTypes.func.isRequired,
    min: _react.PropTypes.number,
    max: _react.PropTypes.number,
    step: _react.PropTypes.number
};

InputSlider.defaultProps = {
    value: 50,
    min: 0,
    max: 100,
    step: 1
};

module.exports = InputSlider;
//# sourceMappingURL=InputSlider.js.map