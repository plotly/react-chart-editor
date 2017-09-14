'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CheckboxGroup = _react2.default.createClass({
    displayName: 'CheckboxGroup',

    propTypes: {
        options: _react.PropTypes.arrayOf(_react.PropTypes.shape({
            label: _react.PropTypes.string.isRequired,
            value: _react.PropTypes.string.isRequired,
            checked: _react.PropTypes.bool.isRequired
        })).isRequired,
        onChange: _react.PropTypes.func,
        className: _react.PropTypes.string,
        orientation: _react.PropTypes.string
    },

    getDefaultProps: function getDefaultProps() {
        return {
            className: ''
        };
    },
    getInitialState: function getInitialState() {
        return {
            options: this.props.options
        };
    },


    /*
     * We've gotten new props from a parent. Sync local state so its
     * up to date with parent props.
     */
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        this.setState({
            options: nextProps.options
        });
    },


    /*
     * Called whenever a checkbox is changed, this updates the local
     * state to reflect the change and then called props.onChange with
     * the new options.
     */
    handleChange: function handleChange(evt) {

        // Which one was changed?
        var targetCheckbox = evt.target.getAttribute('data-value');

        // Grab all the checkboxes
        var checkboxes = this.getCheckboxes();
        var newOptions = [];

        // Loop through and update state to reflect changed UI
        for (var i = 0; i < checkboxes.length; i++) {

            var value = checkboxes[i].getAttribute('data-value');
            var checked = checkboxes[i].getAttribute('data-checked') === 'true';
            var label = checkboxes[i].getAttribute('data-label');

            // Is it the one that was changed? Toggle its 'checked' property.
            if (targetCheckbox === value) checked = !checked;

            newOptions.push({ label: label, value: value, checked: checked });
        }

        // Optimistically set local state to newOptions
        this.setState({
            options: newOptions
        });

        // Pipe off the newOptions to props.onChange so actions can hook in
        this.props.onChange(newOptions);
    },


    /**
     * @returns {nodeList} Array-list list of DOM nodes of type "checkbox"
     */
    getCheckboxes: function getCheckboxes() {
        return _reactDom2.default.findDOMNode(this).querySelectorAll('div.checkbox__box');
    },
    renderOptions: function renderOptions() {
        var _this = this;

        var orientation = this.props.orientation;

        /*
         * Loop through the options assigned to state
         * and create a checkbox element for each
         */

        return this.state.options.map(function (option, i) {

            var checkClass = (0, _classnames2.default)(['checkbox__check', 'icon'], {
                'icon-check-mark': option.checked
            });

            var itemClass = (0, _classnames2.default)('checkbox__item', {
                'checkbox__item--vertical': orientation === 'vertical',
                'checkbox__item--horizontal': orientation === 'horizontal'
            });

            return _react2.default.createElement(
                'div',
                { key: i, className: itemClass },
                _react2.default.createElement(
                    'div',
                    { className: 'checkbox__box',
                        ref: option.value,
                        onClick: _this.handleChange,
                        'data-value': option.value,
                        'data-checked': option.checked,
                        'data-label': option.label
                    },
                    option.checked ? _react2.default.createElement('i', { className: checkClass,
                        'data-value': option.value,
                        'data-checked': option.checked,
                        'data-label': option.label
                    }) : null
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'checkbox__label' },
                    option.label
                )
            );
        });
    },
    render: function render() {
        var _props = this.props,
            orientation = _props.orientation,
            className = _props.className;


        var boxClass = (0, _classnames2.default)('checkbox__group', className, {
            'checkbox__group_horizontal': orientation === 'horizontal'
        });
        return _react2.default.createElement(
            'div',
            { className: boxClass },
            this.renderOptions()
        );
    }
});

module.exports = CheckboxGroup;
//# sourceMappingURL=CheckboxGroup.js.map