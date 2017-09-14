'use strict';

var _PropTypes$shape;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Dropdown = require('@workspace/components/widgets/Dropdown');

var _Dropdown2 = _interopRequireDefault(_Dropdown);

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _i18n = require('@common/utils/i18n');

var _UncontrolledTextarea = require('@workspace/components/widgets/UncontrolledTextarea');

var _UncontrolledTextarea2 = _interopRequireDefault(_UncontrolledTextarea);

var _mapbox = require('@workspace/utils/mapbox');

var _errorMessages = require('@workspace/constants/errorMessages');

var _environment = require('@common/utils/environment');

var _environment2 = _interopRequireDefault(_environment);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _workspace = require('@workspace/constants/workspace');

var _workspace2 = require('@workspace/actions/workspace');

var _MapboxTokenDropdown = require('@workspace/components/widgets/MapboxTokenDropdown');

var _MapboxTokenDropdown2 = _interopRequireDefault(_MapboxTokenDropdown);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PRESET_STYLES = [{ label: 'Basic', value: 'basic' }, { label: 'Outdoors', value: 'outdoors' }, { label: 'Light', value: 'light' }, { label: 'Dark', value: 'dark' }, { label: 'Satellite', value: 'satellite' }, { label: 'Satellite with Streets', value: 'satellite-streets' }];

var STYLE_OPTIONS = [{ label: 'Preset Styles', value: 'PRESET' }, { label: 'Mapbox Studio Style', value: 'MAPBOX_STUDIO' }, { label: 'Mapbox Atlas Style', value: 'MAPBOX_ATLAS' }, { label: 'Custom JSON', value: 'JSON' }];

var VALUE_TYPES = {
    PRESET: 'PRESET',
    MAPBOX_STUDIO: 'MAPBOX_STUDIO',
    MAPBOX_ATLAS: 'MAPBOX_ATLAS',
    JSON: 'JSON'
};

var STATUS = {
    LOADING: 'LOADING',
    BLANK: 'BLANK',
    WARNING: 'WARNING',
    DONE: 'DONE'
};

var menuItem = function menuItem(content) {
    return _react2.default.createElement(
        'div',
        { className: 'menu-item' },
        _react2.default.createElement(
            'div',
            { className: 'menu-item__no-title' },
            content
        )
    );
};

var menuItemWarning = function menuItemWarning(content) {
    return _react2.default.createElement(
        'div',
        { className: 'menu-item' },
        _react2.default.createElement(
            'div',
            { className: 'menu-item__no-title' },
            _react2.default.createElement(
                'span',
                { className: 'menu-item__multiple +red-imp' },
                content
            )
        )
    );
};

var MAPBOX_ATLAS_ERROR_MESSAGES = {
    INVALID_JSON: function INVALID_JSON(url) {
        return menuItemWarning(_react2.default.createElement(
            'span',
            null,
            _errorMessages.MAPBOX_ATLAS_MESSAGES.INVALID_JSON,
            _react2.default.createElement(
                'a',
                { href: url, target: '_blank' },
                url
            )
        ));
    },

    FAILED_REQUEST: function FAILED_REQUEST(url) {
        var errorMessage = void 0;
        if (_url2.default.parse(url).protocol === 'http:') {
            errorMessage = menuItemWarning(_react2.default.createElement(
                'span',
                null,
                _errorMessages.MAPBOX_ATLAS_MESSAGES.FAILED_REQUEST,
                _react2.default.createElement(
                    'a',
                    { href: 'http://help.plot.ly/mapbox-atlas', target: '_blank' },
                    'http://help.plot.ly/mapbox-atlas'
                ),
                '.'
            ));
        } else {
            errorMessage = menuItemWarning(_react2.default.createElement(
                'span',
                null,
                _errorMessages.MAPBOX_ATLAS_MESSAGES.DOWNLOAD,
                _react2.default.createElement(
                    'a',
                    { href: url, target: '_blank' },
                    url
                ),
                (0, _i18n._)(' in your browser to verify that the URL works?')
            ));
        }
        return errorMessage;
    },

    FAILED_PARSING: function FAILED_PARSING(url) {
        return menuItemWarning(_react2.default.createElement(
            'span',
            null,
            _errorMessages.MAPBOX_ATLAS_MESSAGES.FAILED_PARSING,
            _react2.default.createElement(
                'a',
                { href: url, target: '_blank' },
                url
            ),
            '.',
            _errorMessages.MAPBOX_ATLAS_MESSAGES.EXPECTED_URL,
            'http://my-atlas-server:2999/pages/light-v6/cilo6dghg0008a2kqgq9dnsug.json'
        ));
    },

    UNKNOWN: function UNKNOWN() {
        return menuItemWarning(_react2.default.createElement(
            'span',
            null,
            _errorMessages.MAPBOX_ATLAS_MESSAGES.UNKNOWN
        ));
    }
};

// TODO: Try replacing this with our new jsoneditor component

var JsonEditor = function (_Component) {
    _inherits(JsonEditor, _Component);

    function JsonEditor(props) {
        _classCallCheck(this, JsonEditor);

        var _this = _possibleConstructorReturn(this, (JsonEditor.__proto__ || Object.getPrototypeOf(JsonEditor)).call(this, props));

        _this.state = {
            value: null,
            invalidJSON: false
        };
        _this.setValidJSON = _this.setValidJSON.bind(_this);
        return _this;
    }

    _createClass(JsonEditor, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.setState({ value: this.props.value });
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            this.setState({ value: nextProps.value });
        }
    }, {
        key: 'setValidJSON',
        value: function setValidJSON(jsonString) {
            this.setState({ invalidJSON: false });
            try {
                var jsonObject = JSON.parse(jsonString);
                this.setState({ value: jsonObject });
            } catch (e) {
                console.error(e);
                this.setState({ invalidJSON: true });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                applyChanges = _props.applyChanges,
                textareaStyle = _props.textareaStyle,
                textareaClass = _props.textareaClass;
            var value = this.state.value;


            return _react2.default.createElement(
                'div',
                null,
                menuItem(_react2.default.createElement(_UncontrolledTextarea2.default, {
                    style: textareaStyle,
                    className: textareaClass,
                    value: JSON.stringify(value, null, 2),
                    onBlur: function onBlur(e) {
                        return _this2.setValidJSON(e.target.value);
                    }
                })),
                this.state.invalidJSON ? menuItem(_react2.default.createElement(
                    'span',
                    { className: 'menu-item__multiple +red-imp +text-center' },
                    (0, _i18n._)('Invalid JSON')
                )) : null,
                menuItem(_react2.default.createElement(
                    'div',
                    {
                        className: 'btn --small --secondary +text-center --full-width',
                        onClick: function onClick() {
                            return applyChanges(_this2.state.value);
                        }
                    },
                    (0, _i18n._)('Apply Changes')
                ))
            );
        }
    }]);

    return JsonEditor;
}(_react.Component);

var MapboxStyleUrlController = function (_Component2) {
    _inherits(MapboxStyleUrlController, _Component2);

    function MapboxStyleUrlController(props) {
        var _values;

        _classCallCheck(this, MapboxStyleUrlController);

        var _this3 = _possibleConstructorReturn(this, (MapboxStyleUrlController.__proto__ || Object.getPrototypeOf(MapboxStyleUrlController)).call(this, props));

        var defaultValueType = void 0;
        var defaultAtlasUrl = _environment2.default.get('PLOTLY_MAPBOX_ATLAS_DEFAULT_STYLE_URL');
        if (defaultAtlasUrl !== '') {
            defaultValueType = VALUE_TYPES.MAPBOX_ATLAS;
        } else {
            defaultValueType = VALUE_TYPES.PRESET;
        }

        _this3.state = {
            valueType: defaultValueType,

            /*
             * each of these values can get set to plotly.js's
             * layout.mapbox.source value
             */
            values: (_values = {}, _defineProperty(_values, VALUE_TYPES.PRESET, null), _defineProperty(_values, VALUE_TYPES.MAPBOX_STUDIO, null), _defineProperty(_values, VALUE_TYPES.MAPBOX_ATLAS, null), _defineProperty(_values, VALUE_TYPES.JSON, null), _values),
            status: STATUS.BLANK,
            error: null,
            atlasStyleURL: defaultAtlasUrl
        };

        _this3.changeValueType = _this3.changeValueType.bind(_this3);
        _this3.setValue = _this3.setValue.bind(_this3);
        _this3.updatePlot = _this3.updatePlot.bind(_this3);
        _this3.setAtlasURL = _this3.setAtlasURL.bind(_this3);
        _this3.downloadAtlasJSON = _this3.downloadAtlasJSON.bind(_this3);
        _this3.viewJson = _this3.viewJson.bind(_this3);
        return _this3;
    }

    _createClass(MapboxStyleUrlController, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.setValueFromProps(this.props);
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var _state = this.state,
                values = _state.values,
                valueType = _state.valueType;

            if (!values[valueType] && this.props.value.style !== nextProps.value.style) {
                this.setValueFromProps(nextProps);
            }
        }
    }, {
        key: 'setValueFromProps',
        value: function setValueFromProps(props) {
            var value = this.props.value.style;
            var values = this.state.values;

            var valueType = void 0;
            if (PRESET_STYLES.find(function (option) {
                return option.value === value;
            })) {
                values[VALUE_TYPES.PRESET] = value;
                valueType = VALUE_TYPES.PRESET;
            }

            /*
             * If it's a string, it's likely a mapbox style url like
             * mapbox://chriddyp/styles/my-style
             */
            else if (typeof value === 'string') {
                    values[VALUE_TYPES.MAPBOX_STUDIO] = value;
                    valueType = VALUE_TYPES.MAPBOX_STUDIO;
                }

                /*
                 * When folks have Atlas set up without mapbox studio,
                 * nothing will work until they load up their style JSON.
                 * mapbox in the plotly.js figure won't be defined and so the `value`
                 * will be null. Display the Mapbox Atlas style URL input to prompt them
                 * to download their style data.
                 */
                else if (_ramda2.default.isNil(value) && _environment2.default.get('PLOTLY_MAPBOX_ATLAS_DEFAULT_STYLE_URL')) {
                        valueType = VALUE_TYPES.MAPBOX_ATLAS;
                    }

                    /*
                     * Otherwise, it's probably a style JSON object.
                     */
                    else {
                            valueType = VALUE_TYPES.JSON;
                            values[VALUE_TYPES.JSON] = values[VALUE_TYPES.MAPBOX_ATLAS] = value;
                        }

            this.setState({ valueType: valueType, values: values });
        }
    }, {
        key: 'changeValueType',
        value: function changeValueType(newValueType) {
            var _state2 = this.state,
                values = _state2.values,
                valueType = _state2.valueType;

            this.setState({ valueType: newValueType });
            if (values[newValueType] && values[newValueType] !== values[valueType]) {
                this.props.updatePlot.style(values[newValueType]);
            }
        }
    }, {
        key: 'setValue',
        value: function setValue(value) {
            var _state3 = this.state,
                values = _state3.values,
                valueType = _state3.valueType;

            this.setState({
                values: Object.assign(values, _defineProperty({}, valueType, value)),
                error: null
            });
        }
    }, {
        key: 'updatePlot',
        value: function updatePlot() {
            var _state4 = this.state,
                values = _state4.values,
                valueType = _state4.valueType;

            this.props.updatePlot.style(values[valueType]);
        }
    }, {
        key: 'setAtlasURL',
        value: function setAtlasURL(atlasStyleURL) {
            this.setState({ atlasStyleURL: atlasStyleURL, error: null });
        }
    }, {
        key: 'downloadAtlasJSON',
        value: function downloadAtlasJSON() {
            var _this4 = this;

            var atlasStyleURL = this.state.atlasStyleURL;

            var updatePlot = this.props.updatePlot.style;
            this.setState({
                status: STATUS.LOADING,
                error: null
            });

            return (0, _mapbox.fetchAndParseStyleJSON)(atlasStyleURL).then(function (styleJSON) {
                var stateUpdate = _this4.state;
                stateUpdate.status = STATUS.DONE;
                stateUpdate.values[VALUE_TYPES.MAPBOX_ATLAS] = styleJSON;
                stateUpdate.values[VALUE_TYPES.JSON] = styleJSON;
                _this4.setState(stateUpdate);

                updatePlot(styleJSON);
            }).catch(function (error) {
                var stateUpdate = _this4.state;
                stateUpdate.status = STATUS.ERROR;
                if (!_ramda2.default.contains(error.message, Object.keys(_workspace.MAPBOX_ERROR_TYPES))) {
                    console.error(error);
                    stateUpdate.error = _workspace.MAPBOX_ERROR_TYPES.UNKNOWN;
                } else {
                    stateUpdate.error = error.message;

                    if (error.styleJSON) {
                        stateUpdate.values[VALUE_TYPES.MAPBOX_ATLAS] = error.styleJSON;
                        stateUpdate.values[VALUE_TYPES.JSON] = error.styleJSON;
                    }
                }
                _this4.setState(stateUpdate);
            });
        }
    }, {
        key: 'viewJson',
        value: function viewJson() {
            this.props.dispatch((0, _workspace2.selectEditMode)(_workspace.EDIT_MODE.JSON));
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(MapboxStyleUrl, {
                valueType: this.state.valueType,
                values: this.state.values,
                status: this.state.status,
                error: this.state.error,
                atlasStyleURL: this.state.atlasStyleURL,

                changeValueType: this.changeValueType,
                setValue: this.setValue,
                updatePlot: this.updatePlot,
                setAtlasURL: this.setAtlasURL,
                downloadAtlasJSON: this.downloadAtlasJSON,
                viewJson: this.viewJson,
                selectedToken: this.props.value.accesstoken,
                onTokenChange: this.props.updatePlot.accesstoken
            });
        }
    }]);

    return MapboxStyleUrlController;
}(_react.Component);

MapboxStyleUrlController.propTypes = {
    value: _react.PropTypes.object.isRequired,
    updatePlot: _react.PropTypes.object.isRequired,
    dispatch: _react.PropTypes.func
};

var MapboxStyleUrl = function MapboxStyleUrl(props) {
    var valueType = props.valueType,
        values = props.values,
        status = props.status,
        error = props.error,
        atlasStyleURL = props.atlasStyleURL,
        changeValueType = props.changeValueType,
        setValue = props.setValue,
        updatePlot = props.updatePlot,
        setAtlasURL = props.setAtlasURL,
        downloadAtlasJSON = props.downloadAtlasJSON,
        viewJson = props.viewJson,
        selectedToken = props.selectedToken,
        onTokenChange = props.onTokenChange;


    function renderOptions() {
        var value = values[valueType];

        var help = _react2.default.createElement(
            'div',
            { className: 'menu-item' },
            _react2.default.createElement(
                'div',
                { className: 'menu-item__no-title +text-center' },
                _react2.default.createElement(
                    'a',
                    { href: 'http://help.plot.ly/mapbox-atlas/', target: '_blank' },
                    (0, _i18n._)('Help Page')
                )
            )
        );

        function header(title, tooltip) {
            return _react2.default.createElement(
                'div',
                { className: 'style-block__header' },
                title,
                _react2.default.createElement(
                    'span',
                    { className: 'hint--left hint--small +float-right', 'data-hint': tooltip },
                    _react2.default.createElement('i', { className: 'icon-question' })
                )
            );
        }

        var viewJsonButton = null;
        if (_ramda2.default.contains(valueType, [VALUE_TYPES.MAPBOX_ATLAS, VALUE_TYPES.JSON]) && value) {
            var buttonText = void 0;
            if (valueType === VALUE_TYPES.MAPBOX_ATLAS) {
                buttonText = 'View Mapbox Style JSON';
            } else {
                buttonText = 'Rich JSON Editor';
            }

            viewJsonButton = menuItem(_react2.default.createElement(
                'div',
                { className: 'button-control', onClick: viewJson },
                buttonText
            ));
        }

        if (valueType === VALUE_TYPES.PRESET) {
            var onChange = function onChange(newValue) {
                setValue(newValue);
                updatePlot();
            };
            return menuItem(_react2.default.createElement(
                'span',
                { className: 'widget-dropdown' },
                _react2.default.createElement(_Dropdown2.default, {
                    options: PRESET_STYLES,
                    onChange: onChange,
                    value: value,
                    clearable: false
                })
            ));
        } else if (_ramda2.default.contains(valueType, [VALUE_TYPES.MAPBOX_STUDIO, VALUE_TYPES.MAPBOX_ATLAS])) {
            var tooltip = void 0,
                headerText = void 0,
                placeholder = void 0,
                onSubmit = void 0,
                _onChange = void 0,
                textAreaValue = void 0,
                errorMessage = void 0;

            if (valueType === VALUE_TYPES.MAPBOX_STUDIO) {
                tooltip = (0, _i18n._)('Import custom map styles from Mapbox Studio.');
                headerText = (0, _i18n._)('Mapbox Studio URL');
                placeholder = (0, _i18n._)('mapbox://styles/your-mapbox-username/your-mapbox-style-id');
                onSubmit = updatePlot;
                _onChange = setValue;
                textAreaValue = value === null ? placeholder : value;
                errorMessage = null;
            } else {
                tooltip = (0, _i18n._)('Download map styles from Mapbox Atlas enterprise map server.');
                headerText = (0, _i18n._)('Mapbox Atlas URL');
                placeholder = (0, _i18n._)('https://<your-atlas-server>:2999/pages/light-v6/<style-id>.json');
                onSubmit = downloadAtlasJSON;
                _onChange = setAtlasURL;
                textAreaValue = atlasStyleURL === null ? placeholder : atlasStyleURL;
                errorMessage = error ? MAPBOX_ATLAS_ERROR_MESSAGES[error](atlasStyleURL) : null;
            }

            var _buttonText = status === STATUS.LOADING ? (0, _i18n._)('Loading...') : (0, _i18n._)('Load Style');

            var buttonClass = (0, _classnames2.default)('btn', '--small', '--secondary', '+text-center', '--full-width', { '+cursor-wait-important': status === STATUS.LOADING });

            return _react2.default.createElement(
                'div',
                null,
                header(headerText, tooltip),
                menuItem(_react2.default.createElement('textarea', {
                    className: 'url-input',
                    placeholder: placeholder,
                    onChange: function onChange(e) {
                        return _onChange(e.target.value);
                    },
                    value: textAreaValue
                })),
                menuItem(_react2.default.createElement(
                    'div',
                    {
                        className: buttonClass,
                        onClick: onSubmit
                    },
                    _buttonText
                )),
                errorMessage,
                viewJsonButton,
                help
            );
        } else if (valueType === VALUE_TYPES.JSON) {
            var _tooltip = (0, _i18n._)('\n                A Mapbox style is a JSON object that defines the visual appearance of a map:\n                what data to draw, the order to draw it in, and how to style the data when\n                drawing it.\n            ');
            var _placeholder = ['{', '    "version": 8,', '    "name": "Mapbox Streets",', '    "sprite": "mapbox://sprites/mapbox/streets-v8",', '    "glyphs": "mapbox://fonts/mapbox/{fontstack}/{range}.pbf",', '    "sources": {...},', '    "layers": [...]'].join('\n');

            var applyChanges = function applyChanges(newValue) {
                setValue(newValue);
                updatePlot();
            };

            return _react2.default.createElement(
                'div',
                null,
                header((0, _i18n._)('Mapbox Style JSON'), _tooltip),
                _react2.default.createElement(JsonEditor, {
                    textareaClass: 'json-view',
                    value: value,
                    applyChanges: applyChanges
                }),
                viewJsonButton,
                help
            );
        }
    }

    var token = valueType === VALUE_TYPES.MAPBOX_STUDIO ? _react2.default.createElement(_MapboxTokenDropdown2.default, {
        selectedToken: selectedToken,
        onChange: onTokenChange
    }) : null;

    return _react2.default.createElement(
        'div',
        { className: 'mapbox-style-url' },
        _react2.default.createElement(
            'div',
            { className: 'menu-item' },
            _react2.default.createElement(
                'div',
                { className: 'menu-item__title' },
                (0, _i18n._)('Mapbox Style')
            ),
            _react2.default.createElement(
                'div',
                { className: 'menu-item__widget' },
                _react2.default.createElement(
                    'span',
                    { className: 'widget-dropdown' },
                    _react2.default.createElement(_Dropdown2.default, {
                        options: STYLE_OPTIONS,
                        onChange: changeValueType,
                        value: valueType,
                        clearable: false
                    })
                )
            )
        ),
        token,
        renderOptions()
    );
};

MapboxStyleUrl.propTypes = {
    valueType: _react.PropTypes.oneOf(Object.keys(VALUE_TYPES)).isRequired,
    values: _react.PropTypes.shape((_PropTypes$shape = {}, _defineProperty(_PropTypes$shape, VALUE_TYPES.PRESET, _react.PropTypes.oneOf(['basic', 'outdoors', 'light', 'dark', 'satellite', 'satellite-streets'])), _defineProperty(_PropTypes$shape, VALUE_TYPES.MAPBOX_STUDIO, _react.PropTypes.string), _defineProperty(_PropTypes$shape, VALUE_TYPES.MAPBOX_ATLAS, _react.PropTypes.object), _defineProperty(_PropTypes$shape, VALUE_TYPES.JSON, _react.PropTypes.object), _PropTypes$shape)).isRequired,
    status: _react.PropTypes.oneOf(Object.keys(STATUS)).isRequired,
    error: _react.PropTypes.object,
    atlasStyleURL: _react.PropTypes.string,

    changeValueType: _react.PropTypes.func,
    setValue: _react.PropTypes.func,
    updatePlot: _react.PropTypes.func,
    setAtlasURL: _react.PropTypes.func,
    downloadAtlasJSON: _react.PropTypes.func,
    viewJson: _react.PropTypes.func,
    selectedToken: _react.PropTypes.string,
    onTokenChange: _react.PropTypes.func
};

module.exports = MapboxStyleUrlController;
//# sourceMappingURL=MapboxStyleUrlController.js.map