'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ESC_KEYCODE = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _workspace = require('@workspace/constants/workspace');

var _i18n = require('@common/utils/i18n');

var _graphTable = require('@workspace/constants/graphTable');

var _customPropTypes = require('@workspace/utils/customPropTypes');

var _selectPlot = require('@workspace/constants/selectPlot');

var _workspace2 = require('@workspace/actions/workspace');

var WorkspaceActions = _interopRequireWildcard(_workspace2);

var _classnames3 = require('classnames');

var _classnames4 = _interopRequireDefault(_classnames3);

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ESC_KEYCODE = exports.ESC_KEYCODE = 27;

/*
 * Scrolling over the menu overlay must be 'faked' via hard-updating the
 * scroll-top property of EditModePanel.
 */
function smoothScroll(element, increment) {
    if (element.scrollAmount) {
        element.scrollAmount += increment;
    } else {
        element.scrollAmount = increment;
    }

    window.requestAnimationFrame(function () {
        var delta = Math.ceil(element.scrollAmount / 7);
        element.scrollTop += delta;
        element.scrollAmount -= delta;
        if (Math.abs(element.scrollAmount - 0) > Number.MIN_VALUE * 100) {
            smoothScroll(element, 0);
        } else {
            element.scrollAmount = 0;
        }
    });
}

/*
 * This component provides a table style dropdown with chart types
 * for each category of plots. It generates a map of lists as a skeleton
 * for the table of choices where the chart categories are sequenced as
 * described by CATEGORY_LAYOUT in workspace/constants/workspace.js
 */

var CategorizedSelectTrace = function (_Component) {
    _inherits(CategorizedSelectTrace, _Component);

    function CategorizedSelectTrace(props) {
        _classCallCheck(this, CategorizedSelectTrace);

        var _this = _possibleConstructorReturn(this, (CategorizedSelectTrace.__proto__ || Object.getPrototypeOf(CategorizedSelectTrace)).call(this, props));

        _this.handleSelectOption = _this.handleSelectOption.bind(_this);
        _this.handleClose = _this.handleClose.bind(_this);
        _this.handleToggle = _this.handleToggle.bind(_this);
        _this.closeWithEsc = _this.closeWithEsc.bind(_this);
        _this.handleScroll = _this.handleScroll.bind(_this);
        _this.handleScrollOnOverlay = _this.handleScrollOnOverlay.bind(_this);
        _this.renderIconContainer = _this.renderIconContainer.bind(_this);
        return _this;
    }

    _createClass(CategorizedSelectTrace, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            window.addEventListener('click', this.handleClose);
            window.addEventListener('keydown', this.closeWithEsc);

            // Handle scroll in capture mode not bubble mode.
            window.addEventListener('scroll', this.handleScroll, true);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            window.removeEventListener('click', this.handleClose);
            window.removeEventListener('keydown', this.closeWithEsc);
            window.removeEventListener('scroll', this.handleScroll);

            if (this.scrollDelayHandle) {
                clearTimeout(this.scrollDelayHandle);
            }
        }
    }, {
        key: 'getIconClassName',
        value: function getIconClassName(chartType) {
            var _classnames;

            var padding = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

            var iconClass = _workspace.CHART_TYPE_ICON[chartType];

            return (0, _classnames4.default)((_classnames = {}, _defineProperty(_classnames, iconClass, Boolean(iconClass)), _defineProperty(_classnames, '+soft-half-right', padding && Boolean(iconClass)), _classnames));
        }
    }, {
        key: 'getImgThumbnailSrc',
        value: function getImgThumbnailSrc(chartType) {
            var IMG_DIR = '/static/webapp/images/plot-thumbs/';

            var imgSrc = IMG_DIR + _selectPlot.SELECT_PLOT_META[chartType].imgThumb;

            return imgSrc;
        }
    }, {
        key: 'categorizedTraceOptions',
        value: function categorizedTraceOptions() {
            /*
             * Generates a map of lists which represents the chart types seperated
             * into each chart category.
             */
            var categorize = function categorize(categorizedOptions, option) {
                var category = (0, _graphTable.GET_ENCODING_SCHEMA)()[option.get('type')].meta.category;
                var categoryOptions = categorizedOptions[category] || [];

                categoryOptions.push(option.toJS());

                return _ramda2.default.assoc(category, categoryOptions, categorizedOptions);
            };

            return this.props.traceOptions.reduce(categorize, {});
        }
    }, {
        key: 'selectedOption',
        value: function selectedOption() {
            var _props = this.props,
                selectedTraceValue = _props.selectedTraceValue,
                traceOptions = _props.traceOptions;

            var selectedOptionPredicate = function selectedOptionPredicate(option) {
                return option.get('value') === selectedTraceValue;
            };

            return traceOptions.find(selectedOptionPredicate).toJS();
        }
    }, {
        key: 'handleSelectOption',
        value: function handleSelectOption(selectOptionCallback) {
            selectOptionCallback();
            this.props.onMenuToggle(false);
        }
    }, {
        key: 'handleClose',
        value: function handleClose() {
            this.props.onMenuToggle(false);
        }
    }, {
        key: 'handleToggle',
        value: function handleToggle(event) {
            event.stopPropagation();
            this.props.onMenuToggle();
        }
    }, {
        key: 'closeWithEsc',
        value: function closeWithEsc(event) {
            if (event.keyCode === ESC_KEYCODE) {
                this.handleClose();
            }
        }

        // Must reposition chart select menu when the user scrolls.

    }, {
        key: 'handleScroll',
        value: function handleScroll() {
            var _this2 = this;

            if (this.scrollDelayHandle) {
                clearTimeout(this.scrollDelayHandle);
            }

            if (this.props.isOpen) {
                this.scrollDelayHandle = setTimeout(function () {
                    _this2.scrollDelayHandle = null;
                    _this2.handleRepositionOverlay();
                }, 10);
            }
        }

        /*
         * Since scrolling over the overlay does scoll the element, no scroll event
         * is fired and propgated. To allow the editModePanel to scroll,
         * mousewheel events are used to simulate smooth scrolling.
         */

    }, {
        key: 'handleScrollOnOverlay',
        value: function handleScrollOnOverlay(event) {
            var editModePanel = document.querySelector('#js-edit-mode-panel');
            smoothScroll(editModePanel, event.deltaY);
        }
    }, {
        key: 'computeOverlayPosition',
        value: function computeOverlayPosition() {
            var styles = {};
            if (this.refs.input) {
                var position = this.refs.input.getBoundingClientRect();
                styles.top = position.bottom;
                styles.left = position.left;
            }
            return styles;
        }
    }, {
        key: 'handleRepositionOverlay',
        value: function handleRepositionOverlay() {
            var overlayStyles = this.computeOverlayPosition();
            var overlay = document.querySelector('#js-chart-select-overlay');

            /*
             * In order to quickly update the position of the overlay
             * the style property of the overlay is hard-updated (not via setState).
             * This avoids the problems of the overlay only moving to the correct
             * position after scrolling.
             */
            overlay.style.left = overlayStyles.left + 'px';
            overlay.style.top = overlayStyles.top + 'px';
        }
    }, {
        key: 'renderSelectInput',
        value: function renderSelectInput() {
            var _selectedOption = this.selectedOption(),
                label = _selectedOption.label,
                type = _selectedOption.type;

            var inputClassName = (0, _classnames4.default)('categorized-select-trace__input', 'dropdown-container', 'arrowless-categorized-select-trace__input', 'js-categorized-select-trace__input');

            /*
             * React select classes and DOM structure are reused to force
             * the dropdown overlay to behave like other dropdown menus
             * in the workspace.
             * data-chart-type is used by Splinter to match against types
             * as labels are purely a front-end construction.
             */
            return _react2.default.createElement(
                'div',
                {
                    ref: 'input',
                    onClick: this.handleToggle,
                    className: inputClassName
                },
                _react2.default.createElement(
                    'div',
                    { className: 'Select has-value' },
                    _react2.default.createElement(
                        'div',
                        { className: 'Select-control' },
                        _react2.default.createElement(
                            'div',
                            { className: 'Select-value' },
                            _react2.default.createElement(
                                'span',
                                { className: 'Select-value-label' },
                                _react2.default.createElement('i', { className: this.getIconClassName(type) }),
                                label
                            )
                        ),
                        _react2.default.createElement(
                            'span',
                            { className: 'Select-arrow-zone' },
                            _react2.default.createElement('span', { className: 'Select-arrow' })
                        )
                    )
                )
            );
        }
    }, {
        key: 'renderFooterMessage',
        value: function renderFooterMessage() {
            if (!this.props.footerMessage) {
                return null;
            }

            var footerClassName = (0, _classnames4.default)('categorized-select-trace__overlay__footer', '+weight-light');

            return _react2.default.createElement(
                'div',
                { className: footerClassName },
                _react2.default.createElement(
                    'span',
                    null,
                    (0, _i18n._)(this.props.footerMessage)
                )
            );
        }
    }, {
        key: 'renderIconContainer',
        value: function renderIconContainer(chartType) {
            var dispatch = this.props.dispatch;

            var plotMeta = _selectPlot.SELECT_PLOT_META[chartType] || {};
            var tipDirection = 'right';
            var feedLink = null,
                helpLink = null,
                exampleLink = null;


            if (['scattermapbox', 'choropleth', 'scattergeo'].includes(chartType)) {
                tipDirection = 'left';
            }

            if (plotMeta.feedQuery) {
                feedLink = _react2.default.createElement(
                    'a',
                    {
                        href: "https://plot.ly/feed/?q=" + plotMeta.feedQuery,
                        target: '_blank',
                        className: "hint--" + tipDirection,
                        'aria-label': 'Charts like this by Plotly users'
                    },
                    _react2.default.createElement('i', { className: 'icon-search', 'aria-hidden': 'true' })
                );
            }

            if (plotMeta.helpDoc) {
                helpLink = _react2.default.createElement(
                    'a',
                    {
                        href: plotMeta.helpDoc,
                        target: '_blank',
                        className: 'hint--' + tipDirection,
                        'aria-label': 'View a tutorial on this chart type'
                    },
                    _react2.default.createElement('i', { className: 'icon-book-2', 'aria-hidden': 'true' })
                );
            }

            if (plotMeta.examplePlot) {
                /* eslint-disable no-script-url */
                exampleLink = _react2.default.createElement(
                    'a',
                    {
                        href: 'javascript:;',
                        onClick: function onClick() {
                            return setTimeout(function () {
                                dispatch(WorkspaceActions.loadFigure(plotMeta.examplePlot, chartType));
                            }, 0);
                        },
                        className: 'hint--' + tipDirection,
                        'aria-label': 'See a basic example'
                    },
                    _react2.default.createElement('i', { className: 'icon-plot', 'aria-hidden': 'true' })
                );
                /* eslint-enable no-script-url */
            }

            return _react2.default.createElement(
                'div',
                { className: 'categorized-select-trace__icon__container js-icon-container' },
                feedLink,
                helpLink,
                exampleLink
            );
        }
    }, {
        key: 'renderOptions',
        value: function renderOptions(columnDefinition) {
            var _this3 = this;

            var categorizedOptions = this.categorizedTraceOptions();

            var _props2 = this.props,
                traceSelectHandler = _props2.traceSelectHandler,
                selectedTraceValue = _props2.selectedTraceValue;

            var options = categorizedOptions[columnDefinition.category];

            return _ramda2.default.map(function (option) {
                var _classnames2;

                var type = option.type,
                    label = option.label,
                    disabled = option.disabled,
                    isAccessible = option.isAccessible;

                var isSelected = selectedTraceValue === type;

                var baseClass = 'categorized-select-trace__overlay__option';
                var testSelector = 'js-categorized-select-trace-option';
                var optionClassName = (0, _classnames4.default)(baseClass, testSelector, (_classnames2 = {}, _defineProperty(_classnames2, baseClass + '--disabled', disabled), _defineProperty(_classnames2, baseClass + '--selected', isSelected), _classnames2));

                var handleSelect = function handleSelect() {};

                if (!disabled) {
                    handleSelect = function handleSelect(evt) {
                        var select = traceSelectHandler.bind(null, type);
                        return _this3.handleSelectOption(select);
                    };
                }

                return _react2.default.createElement(
                    'div',
                    {
                        onClick: handleSelect,
                        className: optionClassName,
                        key: type,
                        'data-chart-type': type
                    },
                    _react2.default.createElement(
                        'div',
                        { className: 'categorized-select-trace__image__container' },
                        _react2.default.createElement('img', { src: _this3.getImgThumbnailSrc(type) })
                    ),
                    _this3.renderIconContainer(type),
                    label
                );
            }, options);
        }
    }, {
        key: 'renderColumns',
        value: function renderColumns() {
            var _this4 = this;

            return _ramda2.default.map(function (columnDefinition) {

                var optionElements = _this4.renderOptions(columnDefinition);

                return _react2.default.createElement(
                    'div',
                    {
                        ref: columnDefinition.category,
                        key: columnDefinition.category,
                        className: 'categorized-select-trace__overlay__column'
                    },
                    _react2.default.createElement(
                        'div',
                        { className: 'categorized-select-trace__overlay__title' },
                        (0, _i18n._)(columnDefinition.label)
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'categorized-select-trace__overlay__options' },
                        optionElements
                    )
                );
            }, _workspace.CATEGORY_LAYOUT);
        }
    }, {
        key: 'renderSelectOverlay',
        value: function renderSelectOverlay() {
            if (!this.props.isOpen) {
                return null;
            }

            function handleStopPropagation(event) {
                event.stopPropagation();
            }

            /*
             * Using categorization of options, turn each list for each
             * category to render columns for each category.
             */
            var columns = this.renderColumns();

            return _react2.default.createElement(
                'div',
                {
                    id: 'js-chart-select-overlay',
                    className: 'categorized-select-trace__overlay',
                    onClick: handleStopPropagation,
                    onWheel: this.handleScrollOnOverlay,
                    style: this.computeOverlayPosition()
                },
                _react2.default.createElement(
                    'div',
                    { className: 'categorized-select-trace__overlay__option__container' },
                    columns
                ),
                this.renderFooterMessage()
            );
        }
    }, {
        key: 'render',
        value: function render() {
            var dispatch = this.props.dispatch;


            var controlClassName = (0, _classnames4.default)('categorized-select-trace', 'js-categorized-select-trace');

            return _react2.default.createElement(
                'div',
                { className: controlClassName },
                this.renderSelectInput(),
                this.renderSelectOverlay()
            );
        }
    }]);

    return CategorizedSelectTrace;
}(_react.Component);

CategorizedSelectTrace.propTypes = {
    traceSelectHandler: _react.PropTypes.func.isRequired,
    selectedTraceValue: _react.PropTypes.string.isRequired,
    traceOptions: _customPropTypes.immutableTraceSelectOptionsShape.isRequired,
    isOpen: _react.PropTypes.bool.isRequired,
    onMenuToggle: _react.PropTypes.func.isRequired,
    footerMessage: _react.PropTypes.string
};

exports.default = CategorizedSelectTrace;
//# sourceMappingURL=CategorizedSelectTrace.js.map