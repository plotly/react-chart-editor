'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AccordionMenuItem = function (_Component) {
    _inherits(AccordionMenuItem, _Component);

    function AccordionMenuItem(props) {
        _classCallCheck(this, AccordionMenuItem);

        var _this = _possibleConstructorReturn(this, (AccordionMenuItem.__proto__ || Object.getPrototypeOf(AccordionMenuItem)).call(this, props));

        _this.handleRemoveMenu = _this.handleRemoveMenu.bind(_this);
        _this.renderMenuContent = _this.renderMenuContent.bind(_this);
        return _this;
    }

    _createClass(AccordionMenuItem, [{
        key: 'handleRemoveMenu',
        value: function handleRemoveMenu(event) {
            var _props = this.props,
                removeMenuHandler = _props.removeMenuHandler,
                id = _props.id;


            event.stopPropagation();

            if (typeof removeMenuHandler === 'function') {
                removeMenuHandler(id);
            }
        }
    }, {
        key: 'renderMenuContent',
        value: function renderMenuContent() {
            var _props2 = this.props,
                isOpen = _props2.isOpen,
                children = _props2.children,
                id = _props2.id,
                accordionMenuModifier = _props2.accordionMenuModifier;


            var subMenuDisplay = (0, _classnames2.default)('accordion-item__content', 'js-accordion-menu-content-' + id, accordionMenuModifier);

            if (!isOpen) {
                return _react2.default.createElement(
                    'div',
                    { className: subMenuDisplay, style: { display: 'none' } },
                    children
                );
            }

            return _react2.default.createElement(
                'div',
                { className: subMenuDisplay },
                children
            );
        }
    }, {
        key: 'render',
        value: function render() {
            var _props3 = this.props,
                isOpen = _props3.isOpen,
                removeMenuHandler = _props3.removeMenuHandler,
                titleColor = _props3.titleColor,
                onToggle = _props3.onToggle,
                iconClass = _props3.iconClass,
                title = _props3.title,
                isRemovable = _props3.isRemovable;


            var subMenuOpen = (0, _classnames2.default)(['accordion-item__top', 'js-test-menu-item-click'], {
                'accordion-item__top--active': isOpen
            });

            var iconDirection = (0, _classnames2.default)('accordion-item__top__arrow', {
                '+rotate-90 ': !isOpen
            });

            var topIcon = (0, _classnames2.default)('accordion-item__top__icon', {
                'accordion-item__top__icon_active': isOpen
            });

            var titleClass = (0, _classnames2.default)('js-test-title', 'accordion-item__top__title', {
                'accordion-item__top__title_active': isOpen
            });

            var closeClass = (0, _classnames2.default)('icon-close-thin', 'accordion-item__top__close', 'js-accordion-menu-item-close');

            var closeIcon = null;
            if (isRemovable && typeof removeMenuHandler === 'function') {
                closeIcon = _react2.default.createElement('i', {
                    className: closeClass,
                    onClick: this.handleRemoveMenu
                });
            }

            var titleStyling = { color: titleColor || '' };

            return _react2.default.createElement(
                'div',
                { className: 'accordion-item js-accordion-layer' },
                _react2.default.createElement(
                    'div',
                    { ref: 'toggle',
                        className: subMenuOpen,
                        onClick: onToggle
                    },
                    _react2.default.createElement(
                        'span',
                        { className: '+float-left' },
                        _react2.default.createElement(
                            'div',
                            { className: iconDirection },
                            _react2.default.createElement('i', { className: 'icon-angle-down' })
                        ),
                        iconClass ? _react2.default.createElement(
                            'div',
                            { className: topIcon },
                            _react2.default.createElement('i', { className: iconClass,
                                style: titleStyling
                            })
                        ) : null,
                        _react2.default.createElement(
                            'div',
                            {
                                ref: 'title',
                                className: titleClass
                            },
                            title
                        )
                    ),
                    closeIcon
                ),
                this.renderMenuContent()
            );
        }
    }]);

    return AccordionMenuItem;
}(_react.Component);

AccordionMenuItem.propTypes = {
    children: _propTypes2.default.element.isRequired,
    iconClass: _propTypes2.default.string,
    id: _propTypes2.default.string.isRequired,
    isOpen: _propTypes2.default.bool,
    onToggle: _propTypes2.default.func,
    removeMenuHandler: _propTypes2.default.func,
    title: _propTypes2.default.string.isRequired,
    titleColor: _propTypes2.default.string,
    accordionMenuModifier: _propTypes2.default.string,
    isRemovable: _propTypes2.default.bool
};

module.exports = AccordionMenuItem;
//# sourceMappingURL=AccordionMenuItem.js.map