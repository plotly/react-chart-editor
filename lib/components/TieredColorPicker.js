'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.defaultColors = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SketchFields = require('react-color/lib/components/sketched/SketchFields');

var _SketchFields2 = _interopRequireDefault(_SketchFields);

var _SketchPresetColors = require('react-color/lib/components/sketched/SketchPresetColors');

var _SketchPresetColors2 = _interopRequireDefault(_SketchPresetColors);

var _common = require('react-color/lib/components/common');

var _reactColor = require('react-color');

var _i18n = require('@common/utils/i18n');

var _environment = require('@common/utils/environment');

var _environment2 = _interopRequireDefault(_environment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Plotly JS default colors.
var defaultColors = exports.defaultColors = ['#444444', '#ffffff', '#1f77b4', // muted blue
'#ff7f0e', // safety orange
'#2ca02c', // cooked asparagus green
'#d62728', // brick red
'#9467bd', // muted purple
'#8c564b', // chestnut brown
'#e377c2', // raspberry yogurt pink
'#7f7f7f', // middle gray
'#bcbd22', // curry yellow-green
'#17becf' // blue-teal
];

function TieredColorPicker(props) {
    var rgb = props.rgb,
        onChangeComplete = props.onChangeComplete;
    var r = rgb.r,
        g = rgb.g,
        b = rgb.b,
        a = rgb.a;


    var activeColor = {
        backgroundColor: 'rgba(' + r + ', ' + g + ', ' + b + ', ' + a + ')'
    };

    var isOnPrem = _environment2.default.isOnPrem;

    return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
                'p',
                { className: 'color-picker-title' },
                !isOnPrem ? (0, _i18n._)('Custom colors (Pro users)') : (0, _i18n._)('Custom colors')
            ),
            _react2.default.createElement(
                'div',
                { className: 'color-picker-saturation' },
                _react2.default.createElement(_common.Saturation, props)
            ),
            _react2.default.createElement(
                'div',
                { className: 'color-picker-controls +flex' },
                _react2.default.createElement(
                    'div',
                    { className: 'color-picker-sliders' },
                    _react2.default.createElement(
                        'div',
                        { className: 'color-picker-slider' },
                        _react2.default.createElement(_common.Hue, props)
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'color-picker-slider' },
                        _react2.default.createElement(_common.Alpha, props)
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'color-picker-active' },
                    _react2.default.createElement(_common.Checkboard, null),
                    _react2.default.createElement('div', {
                        style: activeColor,
                        className: 'color-picker-active-swatch'
                    })
                )
            ),
            _react2.default.createElement(
                'div',
                { className: 'color-picker-custom-input' },
                _react2.default.createElement(_SketchFields2.default, _extends({}, props, {
                    onChange: onChangeComplete
                }))
            )
        ),
        _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
                'p',
                { className: 'color-picker-title' },
                !isOnPrem ? (0, _i18n._)('Default colors (Free users)') : (0, _i18n._)('Default colors')
            ),
            _react2.default.createElement(
                'div',
                { className: 'color-picker-preset-colors js-color-picker-preset-colors' },
                _react2.default.createElement(_SketchPresetColors2.default, {
                    colors: defaultColors,
                    onClick: onChangeComplete
                })
            )
        )
    );
}

TieredColorPicker.propTypes = {
    color: _react.PropTypes.string.isRequired,
    rgb: _react.PropTypes.shape({
        r: _react.PropTypes.number,
        g: _react.PropTypes.number,
        b: _react.PropTypes.number,
        a: _react.PropTypes.number
    }).isRequired,
    onChangeComplete: _react.PropTypes.func.isRequired
};

exports.default = (0, _reactColor.CustomPicker)(TieredColorPicker);
//# sourceMappingURL=TieredColorPicker.js.map