'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DropdownAddMenu = exports.SimpleAddMenu = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _AccordionMenuItem = require('./AccordionMenuItem');

var _AccordionMenuItem2 = _interopRequireDefault(_AccordionMenuItem);

var _Dropdown = require('@workspace/components/widgets/Dropdown');

var _Dropdown2 = _interopRequireDefault(_Dropdown);

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _customPropTypes = require('@workspace/utils/customPropTypes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SimpleAddMenu = exports.SimpleAddMenu = function (_Component) {
    _inherits(SimpleAddMenu, _Component);

    function SimpleAddMenu() {
        _classCallCheck(this, SimpleAddMenu);

        return _possibleConstructorReturn(this, (SimpleAddMenu.__proto__ || Object.getPrototypeOf(SimpleAddMenu)).apply(this, arguments));
    }

    _createClass(SimpleAddMenu, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                addNewMenuClass = _props.addNewMenuClass,
                disableAddMenu = _props.disableAddMenu,
                addNewMenuHandler = _props.addNewMenuHandler;


            var className = (0, _classnames2.default)('btnbase', 'btn--primary', 'js-test-add-new-layer', '+float-right', addNewMenuClass, { '--disabled': disableAddMenu });
            var buttonText = this.props.addMenuText || '';

            return _react2.default.createElement(
                'div',
                { className: className,
                    onClick: addNewMenuHandler
                },
                '+ ' + buttonText
            );
        }
    }]);

    return SimpleAddMenu;
}(_react.Component);

/*
 * See the main AccordionMenu component PropTypes section for more information.
 */


SimpleAddMenu.propTypes = {
    addNewMenuClass: _react.PropTypes.string,
    addNewMenuHandler: _react.PropTypes.func,
    disableAddMenu: _react.PropTypes.bool,
    addMenuText: _react.PropTypes.string
};

var DropdownAddMenu = exports.DropdownAddMenu = function (_Component2) {
    _inherits(DropdownAddMenu, _Component2);

    function DropdownAddMenu(props) {
        _classCallCheck(this, DropdownAddMenu);

        return _possibleConstructorReturn(this, (DropdownAddMenu.__proto__ || Object.getPrototypeOf(DropdownAddMenu)).call(this, props));
    }

    _createClass(DropdownAddMenu, [{
        key: 'render',
        value: function render() {
            var _props$addNewMenuConf = this.props.addNewMenuConfig,
                title = _props$addNewMenuConf.title,
                options = _props$addNewMenuConf.options;


            var simpleAddMenuPlaceholder = _react2.default.createElement(SimpleAddMenu, {
                addMenuText: title
            });

            /*
             * Always display `+` (SimpleAddMenu) and show a
             * dropdown when you click on it.
             * We're always displaying the `+` by returning SimpleAddMenu in
             * the valueRenderer and the placeholder
             */
            return _react2.default.createElement(
                'div',
                { className: '+float-right js-dropdown-add-menu' },
                _react2.default.createElement(_Dropdown2.default, {
                    className: this.props.addNewMenuClass + ' accordion-menu-dropdown-button',
                    style: { width: null },
                    options: options,
                    clearable: false,
                    onChange: this.props.addNewMenuHandler,
                    placeholder: simpleAddMenuPlaceholder,
                    valueRenderer: function valueRenderer() {
                        return simpleAddMenuPlaceholder;
                    }
                })
            );
        }
    }]);

    return DropdownAddMenu;
}(_react.Component);

/*
 * See the main AccordionMenu component PropTypes section for more information.
 */


DropdownAddMenu.propTypes = {
    addNewMenuConfig: _react.PropTypes.shape({
        title: _react.PropTypes.string.isRequired,
        options: _react.PropTypes.arrayOf(_customPropTypes.dropdownOptionShape).isRequired
    }),
    addNewMenuClass: _react.PropTypes.string,
    addNewMenuHandler: _react.PropTypes.func
};

function idOrIndex(id, index) {
    if (typeof id === 'string') {
        return id;
    }

    return String(index);
}

/*
 * Each AccordionMenuItem is passed in as an object and its content
 * as an element
 * The expand and collapse buttons set the state of each submenu
 */

var AccordionMenu = function (_Component3) {
    _inherits(AccordionMenu, _Component3);

    function AccordionMenu(props) {
        _classCallCheck(this, AccordionMenu);

        var _this3 = _possibleConstructorReturn(this, (AccordionMenu.__proto__ || Object.getPrototypeOf(AccordionMenu)).call(this, props));

        _this3.state = _this3.initialState(props);

        _this3.toggleAllHandler = _this3.toggleAll.bind(_this3);

        // Used to construct a collapse/expand handler for each sub-menu.
        var makeHandler = function makeHandler(index) {
            return _this3.toggleSubMenu(index);
        };
        _this3.toggleSubMenuHandlerConstructor = makeHandler.bind(_this3);
        return _this3;
    }

    _createClass(AccordionMenu, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(newProps) {
            var newSubmenuStates = this.initialState(newProps).subMenuStates;

            /*
             * Only update openess state when adding a new AccordionMenuItem
             * e.g for +Trace / +Filter / +Note
             */
            if (this.props.assignOpenState && newProps.subMenus.length !== Object.keys(this.state.subMenuStates).length) {
                this.setState({
                    subMenuStates: newSubmenuStates
                });
                return;
            }

            // Only update sub-menu states of those that are newly added.
            this.setState({
                subMenuStates: _ramda2.default.merge(newSubmenuStates, this.state.subMenuStates)
            });
        }
    }, {
        key: 'initialState',
        value: function initialState(props) {
            var subMenuStates = {};
            props.subMenus.forEach(function (subMenu, i) {
                var id = idOrIndex(subMenu.id, i);
                subMenuStates[id] = subMenu.isOpen;
            });

            return { subMenuStates: subMenuStates };
        }

        /**
         * Check if any sub-menu is open.
         * @return {Boolean} True if all sub-menus are closed.
         */

    }, {
        key: 'anySubMenusOpen',
        value: function anySubMenusOpen() {
            return _ramda2.default.any(_ramda2.default.identity, this.getMenuStates());
        }

        /**
         * Set all the sub-menus to a given state.
         * @param {Boolean} state the collapse state for all sub-menus
         */

    }, {
        key: 'setMenuStates',
        value: function setMenuStates(state) {
            var subMenuStates = {};
            var setState = function setState(menu, index) {
                var id = idOrIndex(menu.id, index);
                subMenuStates[id] = state;
            };
            this.props.subMenus.forEach(setState);
            this.setState({ subMenuStates: subMenuStates });
        }

        /**
         * Get all the sub-menu collapse states.
         * @return {Boolean[]} state: the collapse state for all sub-menus
         */

    }, {
        key: 'getMenuStates',
        value: function getMenuStates() {
            var _this4 = this;

            var getState = function getState(id) {
                return _this4.state.subMenuStates[id];
            };
            var menuStates = Object.keys(this.state.subMenuStates).map(getState);
            return menuStates;
        }

        /**
         * Given the state of all menus, expand or collapse all menus at once.
         */

    }, {
        key: 'toggleAll',
        value: function toggleAll() {
            /*
             * If any sub-menu is open, collapse all sub-menus
             * Else expand all sub-menus
             */

            if (this.anySubMenusOpen()) {
                this.setMenuStates(false);
            } else {
                this.setMenuStates(true);
            }
        }

        /**
         * Toggle an individual submenu
         * @param {Number} id: The sub-menu ref id.
         */

    }, {
        key: 'toggleSubMenu',
        value: function toggleSubMenu(id) {
            this.setState({
                subMenuStates: _ramda2.default.merge(this.state.subMenuStates, _defineProperty({}, id, !this.state.subMenuStates[id]))
            });
        }

        /**
         * Renders each sub-menu in the accordion menu.
         * @return {AccordionMenuItem[]} sub-menu DOM elements
         */

    }, {
        key: 'renderSubmenuItems',
        value: function renderSubmenuItems() {
            var _this5 = this;

            return this.props.subMenus.map(function (subMenuConfig, i) {
                var title = subMenuConfig.title,
                    titleColor = subMenuConfig.titleColor,
                    iconClass = subMenuConfig.iconClass,
                    content = subMenuConfig.content;


                var isRemovable = _ramda2.default.pathOr(_ramda2.default.has('removeMenuHandler', _this5.props), ['isRemovable'], subMenuConfig);

                var id = idOrIndex(subMenuConfig.id, i);

                return _react2.default.createElement(
                    _AccordionMenuItem2.default,
                    {
                        title: title,
                        titleColor: titleColor,
                        iconClass: iconClass,
                        key: id,
                        id: id,
                        ref: id,
                        isOpen: _this5.state.subMenuStates[id],
                        isRemovable: isRemovable,
                        removeMenuHandler: _this5.props.removeMenuHandler,
                        onToggle: function onToggle() {
                            return _this5.toggleSubMenuHandlerConstructor(id);
                        },
                        accordionMenuModifier: _this5.props.accordionMenuModifier || null
                    },
                    content
                );
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _props2 = this.props,
                addNewMenuHandler = _props2.addNewMenuHandler,
                addNewMenuConfig = _props2.addNewMenuConfig,
                header = _props2.header;

            /*
             * If the developer passes in a handler we are going to set up
             * an add new menu UI.
             */

            var doAddMenu = typeof addNewMenuHandler === 'function';

            /*
             * if the developer doesn't pass in options we just call the handler
             * when the user clicks on a "+" button.
             */
            var doSimpleAddMenu = doAddMenu && !addNewMenuConfig;

            /*
             * if the developer passes in options we are going to set up a
             * standalone box with a dropdown and a "+" button.
             */
            var doDropdownAddMenu = doAddMenu && Boolean(addNewMenuConfig);

            /*
             * Only render the components when needed.
             */
            var simpleAddMenu = doSimpleAddMenu ? _react2.default.createElement(SimpleAddMenu, {
                addNewMenuClass: this.props.addNewMenuClass,
                addNewMenuHandler: this.props.addNewMenuHandler,
                disableAddMenu: this.props.disableAddMenu,
                addMenuText: this.props.addMenuText
            }) : null;

            var dropdownAddMenu = doDropdownAddMenu ? _react2.default.createElement(DropdownAddMenu, {
                addNewMenuClass: this.props.addNewMenuClass,
                addNewMenuHandler: this.props.addNewMenuHandler,
                addNewMenuConfig: this.props.addNewMenuConfig
            }) : null;

            var collapseButtonText = void 0;
            if (this.anySubMenusOpen()) {
                collapseButtonText = 'Collapse All';
            } else {
                collapseButtonText = 'Expand All';
            }

            var collapseButton = this.props.subMenus.length > 0 ? _react2.default.createElement(
                'div',
                { className: 'accordion-menu-button +float-left js-test-collapse-text',
                    ref: 'collapse',
                    onClick: this.toggleAllHandler
                },
                this.anySubMenusOpen() ? _react2.default.createElement('i', { className: 'icon-resize-down +soft-quarter-right' }) : _react2.default.createElement('i', { className: 'icon-resize-expand +soft-quarter-right' }),
                collapseButtonText
            ) : null;

            var accordionClassName = (0, _classnames2.default)('accordion-menu__button-area', '+clearfix');

            return _react2.default.createElement(
                'div',
                { className: this.props.parentClassName },
                _react2.default.createElement(
                    'div',
                    { className: accordionClassName },
                    collapseButton,
                    simpleAddMenu,
                    dropdownAddMenu
                ),
                header,
                _react2.default.createElement(
                    'div',
                    null,
                    this.props.subMenus && this.props.subMenus.length > 0 ? this.renderSubmenuItems() : this.props.placeholder && this.props.placeholder()
                )
            );
        }
    }]);

    return AccordionMenu;
}(_react.Component);

exports.default = AccordionMenu;


AccordionMenu.defaultProps = {
    assignOpenState: false
};

AccordionMenu.propTypes = {
    subMenus: _react.PropTypes.arrayOf(_react.PropTypes.shape({
        title: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.node]).isRequired,
        titleColor: _react.PropTypes.string,
        isOpen: _react.PropTypes.bool,
        iconClass: _react.PropTypes.string,
        content: _react.PropTypes.element,
        id: _react.PropTypes.string,
        isRemovable: _react.PropTypes.bool
    })),

    /*
     * If this handler is passed in as a prop the Accordion menu
     * will have a "+" button in the top right with a click handler
     * set to the this function.
     */
    addNewMenuHandler: _react.PropTypes.func,

    // Make add layer button unclickable
    disableAddMenu: _react.PropTypes.bool,

    /*
     * A class in which to style the "+" button (if it is shown)
     */
    addNewMenuClass: _react.PropTypes.string,

    /*
     * Text to include in the "+" button (if it is shown)
     */
    addMenuText: _react.PropTypes.string,

    /*
     * If this object is present the accordian menu will show a "create
     * new menu" box with a dropdown consisting of the options
     * given in the list instead of the simple "+" button. The
     * addNewMenuClass handler will be passed the value in the dropdown
     * once the user clicks the plus button.
     */
    addNewMenuConfig: _react.PropTypes.shape({
        title: _react.PropTypes.string.isRequired,
        options: _react.PropTypes.arrayOf(_customPropTypes.dropdownOptionShape).isRequired
    }),

    /*
     * If this handler is passed in submenus will show an 'x'
     * which when called evokes this function with the id
     * of the submenu.
     */
    removeMenuHandler: _react.PropTypes.func,

    /*
     * Optionally display a generic header item at the top of the AccordionMenu
    */

    header: _react.PropTypes.element,

    parentClassName: _react.PropTypes.string,

    /*
     * On first render get open state from parent Component
     */
    assignOpenState: _react.PropTypes.bool,

    /*
     * Class to modify default look of accoridon menu
     */
    accordionMenuModifier: _react.PropTypes.string,

    /*
     * Optional method to render a placeholder when no subMenus present
     */
    placeholder: _react.PropTypes.func

};
//# sourceMappingURL=AccordionMenu.js.map