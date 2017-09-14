'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Dropdown = require('@workspace/components/widgets/Dropdown');

var _Dropdown2 = _interopRequireDefault(_Dropdown);

var _connectWorkspacePlot = require('@workspace/utils/connectWorkspacePlot');

var _connectWorkspacePlot2 = _interopRequireDefault(_connectWorkspacePlot);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * The Anchor component is a control for specifing the `anchor` axis property
 * in plotly.js: https://plot.ly/javascript/reference/#layout-xaxis-anchor
 */

var Anchor = function Anchor(_ref) {
    var options = _ref.options,
        onChange = _ref.onChange,
        value = _ref.value;
    return _react2.default.createElement(_Dropdown2.default, {
        options: options,
        value: value,
        onChange: onChange,
        minWidth: '110px'
    });
};

Anchor.propTypes = {
    value: _react.PropTypes.string.isRequired,
    onChange: _react.PropTypes.func.isRequired,
    options: _react.PropTypes.array.isRequired,
    axisLetter: _react.PropTypes.oneOf(['x', 'y'])
};

function mapPlotToProps(plot, props) {
    var axisLetter = props.axisLetter;

    var options = plot.keysAtPath(['_fullLayout']).filter(function (key) {
        return key.startsWith(axisLetter + 'axis');
    }).map(function (axisName) {
        return {
            label: axisName,
            value: axisName.replace('axis', '')
        };
    });
    options.unshift({ label: 'Unanchored', value: 'free' });
    return { options: options };
}

module.exports = (0, _connectWorkspacePlot2.default)(mapPlotToProps)(Anchor);
//# sourceMappingURL=Anchor.js.map