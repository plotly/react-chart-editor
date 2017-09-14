'use strict';

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Spinny = _react2.default.createClass({
    displayName: 'Spinny',


    /*
     * Basic Spinner. Has a few size options: 'large spinny', 'small spinny', 'tiny spinny', 'tiniest spinny', 'spinny'
     * Defaults to 'spinny' -> 12 px
     * Can also pass in text to display
     */

    propTypes: {
        size: _react2.default.PropTypes.string,
        text: _react2.default.PropTypes.string
    },

    renderText: function renderText() {
        if (!this.props.text) return null;else return _react2.default.createElement(
            'span',
            { ref: 'textIndicator' },
            this.props.text
        );
    },
    render: function render() {

        var spinnyClass = (0, _classnames2.default)('spinny', this.props.size);

        return _react2.default.createElement(
            'span',
            null,
            _react2.default.createElement('div', { ref: 'loadingIndicator', className: spinnyClass }),
            this.renderText()
        );
    }
});

module.exports = Spinny;
//# sourceMappingURL=Spinny.js.map