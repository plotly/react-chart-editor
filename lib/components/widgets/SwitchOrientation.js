'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.switchOrientationCommands = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ramda = require('ramda');

var _RadioItems = require('@workspace/components/widgets/RadioItems');

var _RadioItems2 = _interopRequireDefault(_RadioItems);

var _connectWorkspacePlot = require('@workspace/utils/connectWorkspacePlot');

var _connectWorkspacePlot2 = _interopRequireDefault(_connectWorkspacePlot);

var _Plot = require('@workspace/utils/Plot');

var _workspace = require('@workspace/actions/workspace');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Style Control for switching the vertical or horizontal orientation
 * of traces in subplots.
 *
 * The Plotly 2 interpretation of orientation is a lil
 * more involved than just the plotly.js per-trace
 * `orientation` key.
 * - We switch the orientation of *all* of the traces that
 *   are in the same subplot rather than just the single
 *   trace.
 * - We switch the types of the axes that the trace belongs
 *   to.
 *
 * Another confusing case happens when there are multiple sets of
 * shared axes like in this example: https://plot.ly/~chris/17707/
 * This is pretty rare and so for now we'll rely on
 * plotly.js's sensible behaviour (plots the numerical and
 * categorical data together on one axis) and let the user
 * add new axes if they wish to.
 *
 */

var OPTIONS = [{ label: 'Vertical', value: 'v' }, { label: 'Horizontal', value: 'h' }];

/*
 * Compute the restyle and relayout commands necessary to switch
 * the orientation of a trace
 */
function switchOrientationCommands(traceIndex, orientation) {
    var targetTracePath = ['_fullData', traceIndex];
    var targetXaxisIdPath = [].concat(targetTracePath, ['xaxis']);
    var targetYaxisIdPath = [].concat(targetTracePath, ['yaxis']);
    var targetXaxisId = _Plot.WorkspacePlot.path(targetXaxisIdPath);
    var targetYaxisId = _Plot.WorkspacePlot.path(targetYaxisIdPath);

    var finder = function finder(trace) {
        return (trace.xaxis === targetXaxisId || trace.yaxis === targetYaxisId) && (0, _ramda.contains)(trace.type, ['bar', 'histogram', 'box']);
    };
    var traceIndicesWithSharedAxes = _Plot.WorkspacePlot.findIndicesAtPath(finder, ['_fullData']);

    // Swap the orientation of all of the traces in that subplot
    var restyleArray = traceIndicesWithSharedAxes.map(function (i) {
        return {
            data: { orientation: orientation },
            target: i
        };
    });

    // Swap axis types
    var relayoutObject = traceIndicesWithSharedAxes.reduce(function (r, thisTraceIndex) {
        var tracePath = ['_fullData', thisTraceIndex];

        // e.g. x, x2 AND e.g. y, y2
        var xaxisId = _Plot.WorkspacePlot.path([].concat(tracePath, ['xaxis']));
        var yaxisId = _Plot.WorkspacePlot.path([].concat(tracePath, ['yaxis']));

        var xaxisKey = 'xaxis' + xaxisId.slice(1);
        var yaxisKey = 'yaxis' + yaxisId.slice(1);
        var xaxisTypePath = ['_fullLayout', xaxisKey, 'type'];
        var yaxisTypePath = ['_fullLayout', yaxisKey, 'type'];

        // Note that we switch x/y here.
        r[xaxisKey + '.type'] = _Plot.WorkspacePlot.path(yaxisTypePath);
        r[yaxisKey + '.type'] = _Plot.WorkspacePlot.path(xaxisTypePath);

        return r;
    }, {});

    return { restyleArray: restyleArray, relayoutObject: relayoutObject };
}

var SwitchOrientation = function SwitchOrientation(_ref) {
    var activeOption = _ref.activeOption,
        className = _ref.className,
        dispatch = _ref.dispatch,
        traceIndex = _ref.traceIndex;


    var onOptionChange = function onOptionChange(orientation) {
        var commands = switchOrientationCommands(traceIndex, orientation);
        var restyleArray = commands.restyleArray,
            relayoutObject = commands.relayoutObject;

        dispatch((0, _workspace.restyle)(restyleArray));
        dispatch((0, _workspace.relayout)(relayoutObject));
    };

    return _react2.default.createElement(_RadioItems2.default, {
        onOptionChange: onOptionChange,
        options: OPTIONS,
        activeOption: activeOption,
        stylingClass: className
    });
};

SwitchOrientation.propTypes = {
    dispatch: _react.PropTypes.func.isRequired,
    activeOption: _react.PropTypes.string.isRequired,
    traceIndex: _react.PropTypes.number.isRequired,
    className: _react.PropTypes.string
};

exports.switchOrientationCommands = switchOrientationCommands;
exports.default = (0, _connectWorkspacePlot2.default)(null, true)(SwitchOrientation);
//# sourceMappingURL=SwitchOrientation.js.map