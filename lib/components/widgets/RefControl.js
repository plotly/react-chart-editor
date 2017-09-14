'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ramda = require('ramda');

var _Dropdown = require('@workspace/components/widgets/Dropdown');

var _Dropdown2 = _interopRequireDefault(_Dropdown);

var _connectWorkspacePlot = require('@workspace/utils/connectWorkspacePlot');

var _connectWorkspacePlot2 = _interopRequireDefault(_connectWorkspacePlot);

var _stylePanel = require('@workspace/utils/stylePanel');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RefControl = function RefControl(_ref) {
    var options = _ref.options,
        onChange = _ref.onChange,
        placeholder = _ref.placeholder;
    return _react2.default.createElement(_Dropdown2.default, {
        options: options,
        onChange: onChange,
        minWidth: '125px',
        placeholder: placeholder
    });
};

RefControl.propTypes = {
    Plotly: _react.PropTypes.object.isRequired,
    attr: _react.PropTypes.string.isRequired,
    onChange: _react.PropTypes.func.isRequired,
    options: _react.PropTypes.array.isRequired,
    placeholder: _react.PropTypes.string.isRequired,
    value: _react.PropTypes.string
};

function mapPlotToProps(plot, props) {
    /*
     * splitAttrString returns a list like: ['layout', 'shapes', 0, 'xref'],
     * using the first character, determine which axis to build dropdown for
     */
    var Plotly = props.Plotly,
        attr = props.attr,
        value = props.value;

    var axis = (0, _stylePanel.splitAttrString)(attr).slice(-1)[0].charAt(0);
    var axisBase = axis + 'axis';

    var axes = [];
    var options = [];

    // Extract and sort axes as they are not always ordered in layout
    // Axes will be an ordered array of axes names, i.e. xaxis, xaxis2, etc.
    var layoutKeys = plot.keysAtPath(['_fullLayout']);
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = layoutKeys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var layoutKey = _step.value;

            if (layoutKey.startsWith(axisBase)) {
                // Check if there are no digits in axisName, E.g., 'xaxis'.
                var axisIndex = /[\d]+/.test(layoutKey) ? parseInt(layoutKey.match(/[\d]+/)[0], 10) - 1 : 0;
                axes = (0, _ramda.insert)(axisIndex, layoutKey, axes);
            }
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    axes.forEach(function (currentAxis) {
        options.push({
            label: plot.getAxisTitle(currentAxis),
            value: Plotly.Axes.name2id(currentAxis)
        });
    });

    var placeholder = plot.getAxisTitle(Plotly.Axes.id2name(value));

    return { options: options, placeholder: placeholder };
}

exports.default = (0, _connectWorkspacePlot2.default)(mapPlotToProps)(RefControl);
module.exports = exports['default'];
//# sourceMappingURL=RefControl.js.map