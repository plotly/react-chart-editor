'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DEFAULT_ANNOTATION_VALUES = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _AccordionMenuItem = require('./AccordionMenuItem');

var _AccordionMenuItem2 = _interopRequireDefault(_AccordionMenuItem);

var _AnnotationEditor = require('./annotation_editor/AnnotationEditor');

var _AnnotationEditor2 = _interopRequireDefault(_AnnotationEditor);

var _ColorPicker = require('./ColorPicker');

var _ColorPicker2 = _interopRequireDefault(_ColorPicker);

var _FontSelector = require('./FontSelector');

var _FontSelector2 = _interopRequireDefault(_FontSelector);

var _NumericInputStatefulWrapper = require('./NumericInputStatefulWrapper');

var _NumericInputStatefulWrapper2 = _interopRequireDefault(_NumericInputStatefulWrapper);

var _RadioBlocks = require('./RadioBlocks');

var _RadioBlocks2 = _interopRequireDefault(_RadioBlocks);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _ToolMenuItem = require('./ToolMenuItem');

var _ToolMenuItem2 = _interopRequireDefault(_ToolMenuItem);

var _i18n = require('@common/utils/i18n');

var _ramda = require('ramda');

var _workspace = require('@workspace/actions/workspace');

var _notification = require('@common/actions/notification');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DEFAULT_ANNOTATION_VALUES = exports.DEFAULT_ANNOTATION_VALUES = {
    ax: 0,
    ay: -20,
    annotationTemplate: '{x}, {y}',

    align: 'left',
    fontcolor: 'rgb(60, 60, 60)',
    fontsize: 12,
    fontfamily: '"Open Sans", verdana, arial, sans-serif',

    showarrow: true,
    arrowcolor: 'rgb(60, 60, 60)',
    arrowwidth: 1
};

var AutomaticAnnotationWidget = function (_Component) {
    _inherits(AutomaticAnnotationWidget, _Component);

    function AutomaticAnnotationWidget() {
        _classCallCheck(this, AutomaticAnnotationWidget);

        var _this = _possibleConstructorReturn(this, (AutomaticAnnotationWidget.__proto__ || Object.getPrototypeOf(AutomaticAnnotationWidget)).call(this));

        _this.state = (0, _ramda.merge)(DEFAULT_ANNOTATION_VALUES, { showControls: false });
        _this.plotlyClickHandler = _this.plotlyClickHandler.bind(_this);
        _this.renderControls = _this.renderControls.bind(_this);
        return _this;
    }

    _createClass(AutomaticAnnotationWidget, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var gd = document.querySelector('.js-plot-panel');
            gd.on('plotly_click', this.plotlyClickHandler);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            var gd = document.querySelector('.js-plot-panel');
            // TODO: removeListener seems to be the right API, but I've
            // seen removeEventListener elsewhere in the code
            gd.removeListener('plotly_click', this.plotlyClickHandler);
        }
    }, {
        key: 'plotlyClickHandler',
        value: function plotlyClickHandler(clickObject) {
            var _props = this.props,
                annotationsLength = _props.annotationsLength,
                dispatch = _props.dispatch;
            var _state = this.state,
                ax = _state.ax,
                ay = _state.ay,
                annotationTemplate = _state.annotationTemplate,
                align = _state.align,
                fontcolor = _state.fontcolor,
                fontsize = _state.fontsize,
                fontfamily = _state.fontfamily,
                showarrow = _state.showarrow,
                arrowcolor = _state.arrowcolor,
                arrowwidth = _state.arrowwidth;


            var relayoutObject = {};

            for (var i = 0; i < clickObject.points.length; i++) {
                var point = clickObject.points[i];

                /*
                * Annotations can only be bound to x and y axes
                * 'z', 'lat', 'lon', etc axes aren't supported.
                * Validate the the point has an 'xaxis' and 'yaxis'
                * and no 'z' axis.
                */
                if (!((0, _ramda.has)('xaxis', point) && (0, _ramda.has)('yaxis', point))) {

                    (0, _notification.showNotification)('\n                    Clicking on data points to add annotations isn\'t supported\n                    for this chart type. It is only supported for 2D plots.');
                    continue;
                } else if ((0, _ramda.has)('xaxis', point) && (0, _ramda.has)('yaxis', point) && (0, _ramda.has)('zaxis', point)) {

                    (0, _notification.showNotification)('\n                    Adding annotations by clicking on points\n                    isn\'t supported for 3D charts yet.\n                    ');
                    continue;
                }

                // fullData is confusingly named. this is really the full trace.
                var trace = point.fullData;
                var pointNumber = point.pointNumber;
                var templateVariables = ['x', 'y', 'text', 'z'];
                var text = annotationTemplate;
                var annotationIndex = Number.isNaN(annotationsLength) ? 0 : annotationsLength;
                for (var j = 0; j < templateVariables.length; j++) {
                    var t = templateVariables[j];

                    /*
                    * the point object contains data about the hover point
                    * that was clicked on. this might actually be different
                    * than the trace data itself. For example, in box plots,
                    * the point.x and point.y contains positional data of
                    * the 5 hover flags on the box plot
                    * (median, quartials, tails) not the underlying data.
                    *
                    * the 'text' data is found in the actual trace.
                    */

                    // 'x', 'y', 'z' data
                    if ((0, _ramda.has)(t, point)) {
                        text = text.replace('{' + t + '}', point[t]);
                    }

                    // 'text' data
                    else if ((0, _ramda.has)(t, trace) && Array.isArray(trace[t]) && point.pointNumber < trace[t].length) {

                            text = text.replace('{' + t + '}', trace[t][pointNumber]);
                        }
                }

                var annotation = {
                    text: text,
                    // position the annotation with an arrow (which may be transparent)
                    showarrow: DEFAULT_ANNOTATION_VALUES.showarrow,
                    x: point.x,
                    y: point.y,
                    xref: point.xaxis._id,
                    yref: point.yaxis._id,
                    ax: ax,
                    ay: ay,
                    arrowcolor: showarrow ? arrowcolor : 'rgba(0, 0, 0, 0)',

                    align: align,
                    font: {
                        color: fontcolor,
                        family: fontfamily,
                        size: fontsize
                    },
                    arrowwidth: arrowwidth,
                    arrowhead: 0
                };

                relayoutObject['annotations[' + annotationIndex + ']'] = annotation;
                annotationIndex += 1;
            }

            if ((0, _ramda.empty)(relayoutObject)) {
                dispatch((0, _workspace.relayout)(relayoutObject));
            }
        }
    }, {
        key: 'renderControls',
        value: function renderControls() {
            var _this2 = this;

            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'div',
                    { className: 'automatic-annotation-widget__container' },
                    _react2.default.createElement(
                        'div',
                        null,
                        (0, _i18n._)('Text Template')
                    ),
                    _react2.default.createElement(_AnnotationEditor2.default, {
                        onChange: function onChange(value) {
                            return _this2.setState({ annotationTemplate: value });
                        },
                        placeholder: 'y = {y}',
                        value: this.state.annotationTemplate
                    }),
                    _react2.default.createElement(
                        'div',
                        { className: 'automatic-annotation-widget__description' },
                        (0, _i18n._)('Note'),
                        ': ',
                        _react2.default.createElement(
                            'code',
                            null,
                            ' {y} '
                        ),
                        (0, _i18n._)('and'),
                        _react2.default.createElement(
                            'code',
                            null,
                            ' {x} '
                        ),
                        (0, _i18n._)('are special tokens that will get\n                        filled in with the x and y values\n                        of the data point that you click on.\n                        {text} and {z} are also supported if\n                        your data points contains those attributes.\n                        Stuck? '),
                        _react2.default.createElement(
                            'a',
                            { href: 'http://help.plot.ly/how-to-add-annotations/#step-6-add-an-automatically-positioned-label',
                                target: '_blank'
                            },
                            (0, _i18n._)('Check out our tutorial')
                        ),
                        '.'
                    )
                ),
                (0, _ramda.contains)('<br>', this.state.annotationTemplate) ? _react2.default.createElement(
                    _ToolMenuItem2.default,
                    { className: 'js-alignment', title: (0, _i18n._)('Alignment') },
                    _react2.default.createElement(_RadioBlocks2.default, {
                        options: [{ label: '', value: 'left', icon: 'icon-align-left' }, { label: '', value: 'center', icon: 'icon-align-center' }, { label: '', value: 'right', icon: 'icon-align-right' }],
                        activeOption: this.state.align,
                        onOptionChange: function onOptionChange(align) {
                            _this2.setState({ align: align });
                        }
                    })
                ) : null,
                _react2.default.createElement(
                    _ToolMenuItem2.default,
                    {
                        className: 'js-ay',
                        title: (0, _i18n._)('Vertical Position Relative to Data Point'),
                        units: 'px'
                    },
                    _react2.default.createElement(_NumericInputStatefulWrapper2.default, {
                        value: this.state.ay,
                        onUpdate: function onUpdate(ay) {
                            return _this2.setState({ ay: ay });
                        },
                        step: 10
                    })
                ),
                _react2.default.createElement(
                    _ToolMenuItem2.default,
                    {
                        className: 'js-ax',
                        title: (0, _i18n._)('Horizontal Position Relative to Data Point'),
                        units: 'px'
                    },
                    _react2.default.createElement(_NumericInputStatefulWrapper2.default, {
                        value: this.state.ax,
                        onUpdate: function onUpdate(ax) {
                            return _this2.setState({ ax: ax });
                        },
                        step: 10
                    })
                ),
                _react2.default.createElement(
                    _ToolMenuItem2.default,
                    {
                        className: 'js-fontcolor',
                        title: (0, _i18n._)('Text Color')
                    },
                    _react2.default.createElement(_ColorPicker2.default, {
                        onColorChange: function onColorChange(fontcolor) {
                            _this2.setState({ fontcolor: fontcolor });
                        },
                        dispatch: this.props.dispatch,
                        selectedColor: this.state.fontcolor
                    })
                ),
                _react2.default.createElement(
                    _ToolMenuItem2.default,
                    { title: (0, _i18n._)('Size') },
                    _react2.default.createElement(_NumericInputStatefulWrapper2.default, {
                        value: this.state.fontsize,
                        onUpdate: function onUpdate(fontsize) {
                            return _this2.setState({ fontsize: fontsize });
                        },
                        step: 10
                    })
                ),
                _react2.default.createElement(
                    _ToolMenuItem2.default,
                    { title: (0, _i18n._)('Typeface') },
                    _react2.default.createElement(_FontSelector2.default, {
                        onChange: function onChange(fontfamily) {
                            _this2.setState({ fontfamily: fontfamily });
                        },
                        dispatch: this.props.dispatch,
                        activeOption: this.state.fontfamily
                    })
                ),
                _react2.default.createElement(
                    _ToolMenuItem2.default,
                    { title: (0, _i18n._)('Arrow') },
                    _react2.default.createElement(_RadioBlocks2.default, {
                        options: [{ value: true, label: 'Show' }, { value: false, label: 'Hide' }],
                        activeOption: this.state.showarrow,
                        onOptionChange: function onOptionChange(showarrow) {
                            _this2.setState({ showarrow: showarrow });
                        }
                    })
                ),
                this.state.showarrow ? _react2.default.createElement(
                    _ToolMenuItem2.default,
                    { title: (0, _i18n._)('Arrow Color') },
                    _react2.default.createElement(_ColorPicker2.default, {
                        onColorChange: function onColorChange(arrowcolor) {
                            _this2.setState({ arrowcolor: arrowcolor });
                        },
                        dispatch: this.props.dispatch,
                        selectedColor: this.state.color
                    })
                ) : null,
                this.state.showarrow ? _react2.default.createElement(
                    _ToolMenuItem2.default,
                    {
                        title: (0, _i18n._)('Line Width'),
                        units: 'px'
                    },
                    _react2.default.createElement(_NumericInputStatefulWrapper2.default, {
                        value: this.state.arrowwidth,
                        onUpdate: function onUpdate(arrowwidth) {
                            return _this2.setState({ arrowwidth: arrowwidth });
                        },
                        step: 1
                    })
                ) : null
            );
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'div',
                    { className: 'automatic-annotation-widget__header' },
                    (0, _i18n._)('Add annotations by clicking on data points in the graph. ')
                ),
                _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(
                        _AccordionMenuItem2.default,
                        {
                            id: 'automatic-annotation-controls',
                            isOpen: this.state.showControls,
                            onToggle: function onToggle() {
                                return _this3.setState({
                                    showControls: !_this3.state.showControls
                                });
                            },
                            title: 'Annotation Template'
                        },
                        this.renderControls()
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'automatic-annotation-widget__button_container' },
                        _react2.default.createElement(
                            'div',
                            {
                                className: 'btnbase btn--default',
                                onClick: this.props.onClose
                            },
                            (0, _i18n._)('Done')
                        )
                    )
                )
            );
        }
    }]);

    return AutomaticAnnotationWidget;
}(_react.Component);

exports.default = AutomaticAnnotationWidget;


AutomaticAnnotationWidget.propTypes = {
    dispatch: _propTypes2.default.func.isRequired,
    annotationsLength: _propTypes2.default.number.isRequired,
    onClose: _propTypes2.default.func.isRequired
};
//# sourceMappingURL=AutomaticAnnotation.js.map