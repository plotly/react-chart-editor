'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _NumericInputStatefulWrapper = require('@workspace/components/widgets/NumericInputStatefulWrapper');

var _NumericInputStatefulWrapper2 = _interopRequireDefault(_NumericInputStatefulWrapper);

var _number = require('@workspace/utils/number');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Range Input Component

var RangeInput = function (_Component) {
    _inherits(RangeInput, _Component);

    function RangeInput(props) {
        _classCallCheck(this, RangeInput);

        var _this = _possibleConstructorReturn(this, (RangeInput.__proto__ || Object.getPrototypeOf(RangeInput)).call(this, props));

        _this.state = {
            valueMin: _this.props.value[0],
            valueMax: _this.props.value[1]
        };
        return _this;
    }

    _createClass(RangeInput, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (nextProps.value !== this.state.value) {
                this.setState({
                    valueMin: nextProps.value[0],
                    valueMax: nextProps.value[1]
                });
            }
        }
    }, {
        key: 'onUpdate',
        value: function onUpdate(valueType, newValue) {
            var _props = this.props,
                onChange = _props.onChange,
                min = _props.min,
                max = _props.max,
                value = _props.value;

            var valueOrder = ['valueMin', 'valueMax'];
            var modifiedValue = (0, _number.keepWithinMaxMin)(newValue, min, max);

            this.setState(_defineProperty({}, valueType, modifiedValue));

            var newValueArray = valueOrder.map(function (each, index) {
                if (each === valueType) {
                    return modifiedValue;
                } else {
                    return value[index];
                }
            });

            onChange(newValueArray);
        }
    }, {
        key: 'render',
        value: function render() {

            var controlBlockClassName = (0, _classnames2.default)('block-group', '+soft-half-top', '+soft-half-bottom', '+inline-block');

            return _react2.default.createElement(
                'span',
                { className: controlBlockClassName },
                _react2.default.createElement(
                    'span',
                    { className: 'block grid-50' },
                    _react2.default.createElement(_NumericInputStatefulWrapper2.default, {
                        ref: 'inputMin',
                        value: this.state.valueMin,
                        type: 'text',
                        onUpdate: this.onUpdate.bind(this, 'valueMin'),
                        min: this.props.min,
                        max: this.props.max
                    })
                ),
                _react2.default.createElement(
                    'span',
                    { className: 'block grid-50' },
                    _react2.default.createElement(_NumericInputStatefulWrapper2.default, {
                        ref: 'inputMax',
                        value: this.state.valueMax,
                        type: 'text',
                        onUpdate: this.onUpdate.bind(this, 'valueMax'),
                        min: this.props.min,
                        max: this.props.max
                    })
                )
            );
        }
    }]);

    return RangeInput;
}(_react.Component);

RangeInput.propTypes = {
    // value = ['valueMin', 'valueMax']
    value: _react2.default.PropTypes.array.isRequired,
    onChange: _react.PropTypes.func.isRequired,
    min: _react.PropTypes.number,
    max: _react.PropTypes.number
};

module.exports = RangeInput;
//# sourceMappingURL=RangeInput.js.map