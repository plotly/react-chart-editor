'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _hat = require('hat');

var _hat2 = _interopRequireDefault(_hat);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
 * Anchor Positioning.
 * Positions: top left, top center, top right, middle left, middle center,
 * middle right, bottom left, bottom center, bottom right
 */

var AnchorPositioning = function (_Component) {
    _inherits(AnchorPositioning, _Component);

    function AnchorPositioning(props) {
        _classCallCheck(this, AnchorPositioning);

        var _this = _possibleConstructorReturn(this, (AnchorPositioning.__proto__ || Object.getPrototypeOf(AnchorPositioning)).call(this, props));

        _this.state = {
            uid: (0, _hat2.default)()
        };

        _this.renderRadio = _this.renderRadio.bind(_this);
        _this.handleChange = _this.handleChange.bind(_this);
        return _this;
    }

    _createClass(AnchorPositioning, [{
        key: 'handleChange',
        value: function handleChange(e) {
            var newActiveOption = e.target.value;
            this.props.onOptionChange(newActiveOption);
        }
    }, {
        key: 'renderRadio',
        value: function renderRadio(value) {
            var label = value;
            var activeRadio = this.props.activeOption ? this.props.activeOption : 'middle center';
            var defaultActive = activeRadio === value;

            return _react2.default.createElement(
                'span',
                { className: 'anchor-item' },
                _react2.default.createElement(
                    'span',
                    { key: label },
                    _react2.default.createElement(
                        'label',
                        { className: '+inline-block radio-item' },
                        _react2.default.createElement('input', { className: '+inline-block radio-item__input',
                            type: 'radio',
                            checked: defaultActive,
                            onChange: this.handleChange,
                            ref: label,
                            name: this.state.uid,
                            value: value
                        }),
                        _react2.default.createElement('div', { className: 'radio-item__content' })
                    )
                )
            );
        }
    }, {
        key: 'render',
        value: function render() {

            return _react2.default.createElement(
                'div',
                { className: 'anchor' },
                _react2.default.createElement(
                    'div',
                    { className: 'anchor-background' },
                    _react2.default.createElement(
                        'div',
                        { className: 'anchor-background-section' },
                        _react2.default.createElement('div', { className: 'anchor-background-subsection' })
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'anchor-background-section +border-none' },
                        _react2.default.createElement('div', { className: 'anchor-background-subsection' })
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'anchor-text-background' },
                    this.props.backgroundText
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'anchor-container' },
                    _react2.default.createElement(
                        'div',
                        { className: 'anchor-line' },
                        this.renderRadio('top left'),
                        this.renderRadio('top center'),
                        this.renderRadio('top right')
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'anchor-line' },
                        this.renderRadio('middle left'),
                        this.renderRadio('middle center'),
                        this.renderRadio('middle right')
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'anchor-line' },
                        this.renderRadio('bottom left'),
                        this.renderRadio('bottom center'),
                        this.renderRadio('bottom right')
                    )
                )
            );
        }
    }]);

    return AnchorPositioning;
}(_react.Component);

exports.default = AnchorPositioning;


AnchorPositioning.propTypes = {
    onOptionChange: _react.PropTypes.func.isRequired,
    activeOption: _react.PropTypes.string,
    backgroundText: _react.PropTypes.string
};

AnchorPositioning.defaultProps = {
    backgroundText: 'Text...'
};
module.exports = exports['default'];
//# sourceMappingURL=AnchorPositioning.js.map