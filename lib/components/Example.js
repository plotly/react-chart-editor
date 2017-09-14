'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.LoadExampleButton = exports.STATUS = exports.EXAMPLES = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _i18n = require('@common/utils/i18n');

var _workspace = require('@workspace/actions/workspace');

var WorkspaceActions = _interopRequireWildcard(_workspace);

var _graphTable = require('@workspace/constants/graphTable');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Some of these have hardcoded splinter tests. Change them with this in mind
var EXAMPLES = exports.EXAMPLES = {
    scatter: 'https://plot.ly/~chris/17604', // Splinter tested
    line: 'https://plot.ly/~chris/17606', // Splinter tested
    bar: 'https://plot.ly/~PlotBot/41',
    pie: 'https://plot.ly/~stacyannj/2145', // Splinter tested
    errorbars: 'https://plot.ly/~etpinard/267', // Splinter tested
    heatmap: 'https://plot.ly/~chris/17615', // Splinter tested
    contour: 'https://plot.ly/~chris/17618', // Splinter tested
    histogram: 'https://plot.ly/~chris/17610',
    box: 'https://plot.ly/~PlotBot/32',
    histogram2d: 'https://plot.ly/~chris/17612',
    histogram2dcontour: 'https://plot.ly/~chris/17600', // Splinter tested
    scattergeo: 'https://plot.ly/~chris/17602', // Splinter tested
    choropleth: 'https://plot.ly/~chris/17624',
    surface: 'https://plot.ly/~chris/17620', // Splinter tested
    scatter3d: 'https://plot.ly/~chelsea_lyn/8794'
    // mesh3d: 'https://plot.ly/~chris/17628' // TODO: add once validation passes
    // scattermapbox: 'https://plot.ly/~chris/17622' // TODO: add once validation passes
};

var STATUS = exports.STATUS = {
    LOADING: 'LOADING',
    ERROR: 'ERROR',
    SUCCESS: 'SUCCESS'
};

var LoadExampleButton = exports.LoadExampleButton = function (_Component) {
    _inherits(LoadExampleButton, _Component);

    function LoadExampleButton(props) {
        _classCallCheck(this, LoadExampleButton);

        var _this = _possibleConstructorReturn(this, (LoadExampleButton.__proto__ || Object.getPrototypeOf(LoadExampleButton)).call(this, props));

        _this.loadExample = _this.loadExample.bind(_this);
        _this.state = { status: STATUS.SUCCESS };
        return _this;
    }

    /*
     * Download the JSON of the figure and
     * 1 - Convert the data from the figure into our column state
     * 2 - Create a new table with that data
     * 3 - Re-create the graph by assigning these columns to graph attributes
     */


    _createClass(LoadExampleButton, [{
        key: 'loadExample',
        value: function loadExample() {
            var _this2 = this;

            var chartType = this.props.chartType;

            this.setState({ status: STATUS.LOADING });

            fetch(EXAMPLES[chartType] + '.json', {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json'
                })

            }).then(function (response) {
                if (response.ok) {
                    return response.json();
                }
                throw new Error(response.statusText);
            }).then(function (figure) {
                var _props = _this2.props,
                    dispatch = _props.dispatch,
                    chartType = _props.chartType;


                dispatch(WorkspaceActions.loadFigure(figure, chartType));
                _this2.setState({ status: STATUS.SUCCESS });
            }).catch(function (err) {
                window.Raven.captureException(err);
                console.error(err);

                _this2.setState({ status: STATUS.ERROR });
                return;
            });
        }
    }, {
        key: 'render',
        value: function render() {
            if (!_ramda2.default.has(this.props.chartType, EXAMPLES)) {
                return null;
            }

            return _react2.default.createElement(ExampleButton, { loadExample: this.loadExample, status: this.state.status });
        }
    }]);

    return LoadExampleButton;
}(_react.Component);

LoadExampleButton.propTypes = {
    chartType: _react.PropTypes.oneOf(Object.keys((0, _graphTable.GET_ENCODING_SCHEMA)())),
    dispatch: _react.PropTypes.func.isRequired
};

var ExampleButton = function ExampleButton(props) {
    var buttonClass = (0, _classnames2.default)('plot-example-button', 'js-example-button');

    var loadingButtonclass = (0, _classnames2.default)('plot-example-button', 'js-example-button', 'plot-example-loading');

    if (props.status === STATUS.LOADING) {
        return _react2.default.createElement(
            'div',
            { className: loadingButtonclass },
            (0, _i18n._)('Loading...')
        );
    }

    if (props.status === STATUS.ERROR) {
        return _react2.default.createElement(
            'div',
            { className: buttonClass,
                onClick: props.loadExample
            },
            (0, _i18n._)('Hm... error occurred. Click to try again.')
        );
    }

    return _react2.default.createElement(
        'div',
        { className: buttonClass,
            onClick: props.loadExample
        },
        _react2.default.createElement('i', { className: 'icon-arrow +soft-quarter-right' }),
        (0, _i18n._)('Try an example')
    );
};

ExampleButton.propTypes = {
    loadExample: _react.PropTypes.func.isRequired,
    status: _react.PropTypes.oneOf(Object.keys(STATUS))
};
//# sourceMappingURL=Example.js.map