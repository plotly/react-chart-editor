'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ToolMenuItemSubmenu = function (_Component) {
    _inherits(ToolMenuItemSubmenu, _Component);

    function ToolMenuItemSubmenu(props) {
        _classCallCheck(this, ToolMenuItemSubmenu);

        var _this = _possibleConstructorReturn(this, (ToolMenuItemSubmenu.__proto__ || Object.getPrototypeOf(ToolMenuItemSubmenu)).call(this, props));

        _this.state = {
            isOpen: false
        };

        _this.toggleInfo = _this.toggleInfo.bind(_this);
        return _this;
    }

    _createClass(ToolMenuItemSubmenu, [{
        key: 'toggleInfo',
        value: function toggleInfo() {
            this.setState({ isOpen: !this.state.isOpen });
        }
    }, {
        key: 'renderInfoBox',
        value: function renderInfoBox() {
            return _react2.default.createElement(
                'div',
                null,
                this.props.title ? _react2.default.createElement(
                    'div',
                    { className: 'menu-item__submenu__title' },
                    this.props.title
                ) : null,
                this.props.mainText ? _react2.default.createElement(
                    'div',
                    { className: 'menu-item__submenu__text' },
                    this.props.mainText
                ) : null,
                this.props.subText ? _react2.default.createElement(
                    'div',
                    { className: 'menu-item__submenu__sub-text' },
                    this.props.subText
                ) : null,
                _react2.default.createElement(
                    'div',
                    null,
                    this.props.children
                )
            );
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'span',
                null,
                _react2.default.createElement(
                    'span',
                    { onClick: this.toggleInfo },
                    _react2.default.createElement('i', { className: this.props.iconClass })
                ),
                this.state.isOpen ? _react2.default.createElement(
                    'div',
                    { className: 'menu-item__submenu' },
                    _react2.default.createElement('div', {
                        className: 'menu-item__submenu__cover',
                        onClick: this.toggleInfo
                    }),
                    _react2.default.createElement(
                        'div',
                        null,
                        this.renderInfoBox()
                    )
                ) : null
            );
        }
    }]);

    return ToolMenuItemSubmenu;
}(_react.Component);

exports.default = ToolMenuItemSubmenu;


ToolMenuItemSubmenu.propTypes = {
    title: _react.PropTypes.string,
    mainText: _react.PropTypes.string,
    subText: _react.PropTypes.string,
    iconClass: _react.PropTypes.string.isRequired,
    children: _react.PropTypes.node
};
module.exports = exports['default'];
//# sourceMappingURL=ToolMenuItemSubmenu.js.map