'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ProBadge = require('./ProBadge');

var _ProBadge2 = _interopRequireDefault(_ProBadge);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _TieredColorPicker = require('@workspace/components/widgets/TieredColorPicker');

var _TieredColorPicker2 = _interopRequireDefault(_TieredColorPicker);

var _features = require('@common/utils/features');

var _features2 = _interopRequireDefault(_features);

var _tieredDecorator = require('@workspace/utils/tieredDecorator');

var _tieredDecorator2 = _interopRequireDefault(_tieredDecorator);

var _tinycolor = require('tinycolor2');

var _tinycolor2 = _interopRequireDefault(_tinycolor);

var _customPropTypes = require('@workspace/utils/customPropTypes');

var _checkFigureFeatureAccess = require('@workspace/utils/checkFigureFeatureAccess');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ColorPicker = function (_Component) {
    _inherits(ColorPicker, _Component);

    function ColorPicker(props) {
        _classCallCheck(this, ColorPicker);

        var _this = _possibleConstructorReturn(this, (ColorPicker.__proto__ || Object.getPrototypeOf(ColorPicker)).call(this, props));

        _this.state = {
            selectedColor: (0, _tinycolor2.default)(props.selectedColor),
            isVisible: false
        };

        _this.isAccessible = _this.isAccessible.bind(_this);
        _this.onSelectedColorChange = _this.onSelectedColorChange.bind(_this);
        _this.toColorBuffer = _this.toColorBuffer.bind(_this);
        _this.toggleVisible = _this.toggleVisible.bind(_this);
        return _this;
    }

    _createClass(ColorPicker, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var newColor = (0, _tinycolor2.default)(nextProps.selectedColor);
            var selectedColor = this.state.selectedColor;


            if (newColor.toRgbString() !== selectedColor.toRgbString()) {
                this.setState({ selectedColor: newColor });
            }
        }

        /**
         * Determine if the color is accessible
         * @param {obj} color object from tiny color
         *
         * @returns {bool} true if color is accessible, false otherwise
         *
         */

    }, {
        key: 'isAccessible',
        value: function isAccessible(color) {
            var user = this.context.currentUser;
            var feature_set = user ? user.feature_set_id : null;
            var featureName = _checkFigureFeatureAccess.tierColors.featureName,
                validations = _checkFigureFeatureAccess.tierColors.validations;


            var allowedColors = (0, _features2.default)(feature_set, featureName);

            return !(0, _checkFigureFeatureAccess.hasInaccessibleFeature)(color, allowedColors, validations);
        }
    }, {
        key: 'toColorBuffer',
        value: function toColorBuffer(color) {
            /**
             * @param {obj} c, an object that contains rgba field. Either it
             * has a field called 'rgb' that contains a rgba object or it is a rgba
             * object
             *
             * @returns {obj} returns c.rgb if it exits if it doesn't exist, it
             * measn that the object itself is a rgba object
             */
            var extractRGB = function extractRGB(c) {
                return c.rgb || c;
            };

            /*
             * If it contains rgb info, we extract its rgb object, else we return
             * its hex
             */
            var getColorSource = function getColorSource(c) {
                return c.source === 'rgb' ? extractRGB(c) : c.hex;
            };

            return (0, _tinycolor2.default)(getColorSource(color));
        }

        /**
         * Note: this handler cannot be used alone without being decorated by tiered
         * decorator
         *
         * @param {obj} color, object from tinycolor
         *
         * @returns {void} calls restyle
         */

    }, {
        key: 'onSelectedColorChange',
        value: function onSelectedColorChange(color) {
            this.setState({ selectedColor: color });

            var newColor = color.toRgbString();

            /*
             * Call whatever onColorChange was passed in with the same value!
             * relayout call only wants a RGB String
             */
            this.props.onColorChange(newColor);
        }
    }, {
        key: 'toggleVisible',
        value: function toggleVisible() {
            this.setState({ isVisible: !this.state.isVisible });
        }
    }, {
        key: 'render',
        value: function render() {
            var featureName = _checkFigureFeatureAccess.tierColors.featureName;


            var tieredOnSelectedColorChange = (0, _tieredDecorator2.default)(this.onSelectedColorChange, this.isAccessible, featureName, this.props.dispatch, this.toColorBuffer);

            var selectedColor = this.state.selectedColor;


            var colorText = selectedColor.toHexString();

            /*
             * We need inline style here to assign the background color
             * dynamically.
             */
            var swatchStyle = {
                backgroundColor: selectedColor.toRgbString()
            };

            return _react2.default.createElement(
                'div',
                { className: 'colorpicker-container js-colorpicker-container' },
                _react2.default.createElement(
                    'div',
                    { className: 'colorpicker' },
                    _react2.default.createElement('div', { ref: 'swatch',
                        className: 'colorpicker-swatch +cursor-clickable js-colorpicker-swatch',
                        style: swatchStyle,
                        onClick: this.toggleVisible
                    })
                ),
                _react2.default.createElement(
                    'div',
                    {
                        ref: 'selectedColorText',
                        className: 'colorpicker-selected-color +hover-grey',
                        onClick: this.toggleVisible
                    },
                    colorText
                ),
                _react2.default.createElement(_ProBadge2.default, {
                    hide: this.isAccessible(selectedColor),
                    className: '--inline-margin'
                }),
                this.state.isVisible ? _react2.default.createElement(
                    'div',
                    { className: 'color-picker__popover js-color-picker-popover' },
                    _react2.default.createElement('div', {
                        className: 'color-picker__cover',
                        onClick: this.toggleVisible
                    }),
                    _react2.default.createElement(_TieredColorPicker2.default, {
                        ref: 'react-color',
                        color: selectedColor.toRgbString(),
                        onChangeComplete: tieredOnSelectedColorChange
                    })
                ) : null
            );
        }
    }]);

    return ColorPicker;
}(_react.Component);

ColorPicker.propTypes = {
    onColorChange: _react.PropTypes.func.isRequired,
    selectedColor: _react.PropTypes.string,
    dispatch: _react.PropTypes.func.isRequired
};

ColorPicker.contextTypes = {
    currentUser: _customPropTypes.currentUserOrNull.isDefined
};

module.exports = ColorPicker;
//# sourceMappingURL=ColorPicker.js.map