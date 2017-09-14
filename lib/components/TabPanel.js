'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
 * A `TabGroup` renders a list of clickable tab buttons.
 */
var TabGroup = function TabGroup(props) {
    var tabs = props.tabs.map(function (tab) {
        var isSelected = tab.key === props.selectedTab;
        var tabClass = (0, _classnames3.default)(props.tabClassName, _defineProperty({}, props.selectedTabClassName, isSelected));

        return _react2.default.createElement(
            'li',
            { key: tab.key,
                className: tabClass,
                onClick: function onClick() {
                    return props.onTabChange(tab.key);
                },
                'data-role': 'button',
                'data-pressed': isSelected
            },
            tab.label
        );
    });

    return _react2.default.createElement(
        'ul',
        { className: props.className },
        tabs
    );
};
TabGroup.propTypes = {
    tabs: _react.PropTypes.arrayOf(_react.PropTypes.shape({
        key: _react.PropTypes.string.isRequired,
        label: _react.PropTypes.string
    })).isRequired,
    selectedTab: _react.PropTypes.string,
    onTabChange: _react.PropTypes.func
};

/*
 * A `TabContentPanel` renders the content for the currently
 * selected tab.
 */
var TabContentPanel = function TabContentPanel(props) {
    var ContentComponent = props.components[props.selectedTab];

    return _react2.default.createElement(
        'div',
        { className: props.className },
        ContentComponent
    );
};
TabContentPanel.propTypes = {
    selectedTab: _react.PropTypes.string.isRequired,
    components: _react.PropTypes.objectOf(_react.PropTypes.oneOfType([_react.PropTypes.element, _react.PropTypes.func])).isRequired
};

/*
 * A `TabPanel` renders a tab interface with tab buttons
 * and a content panel.
 */
var TabPanel = function TabPanel(props) {
    if (!props.tabs.length) {
        throw new Error('Must provide at least one object ' + 'in TabPanel `tabs` prop');
    }
    var selectedTab = props.selectedTab || props.tabs[0].key;

    var tabPanelClassName = props.tabPanelClassName || 'tab-panel';
    var tabGroupClassName = props.tabGroupClassName || 'tab-panel__tabs';
    var tabGroupTabClassName = props.tabGroupTabClassName || 'tab-panel__tab';
    var tabGroupSelectedTabClassName = props.tabGroupSelectedTabClassName || 'tab-panel__tab--selected';
    var tabContentPanelClassName = props.tabContentPanelClassName || 'tab-panel__content';

    return _react2.default.createElement(
        'div',
        { className: tabPanelClassName },
        _react2.default.createElement(TabGroup, {
            className: tabGroupClassName,
            tabClassName: tabGroupTabClassName,
            selectedTabClassName: tabGroupSelectedTabClassName,
            onTabChange: function onTabChange(nextTab) {
                if (nextTab !== selectedTab) {
                    props.onTabChange(selectedTab, nextTab);
                }
            },
            selectedTab: selectedTab,
            tabs: props.tabs
        }),
        _react2.default.createElement(TabContentPanel, {
            components: props.components,
            onChange: props.onChange,
            placeholder: props.placeholder,
            selectedTab: selectedTab,
            value: props.value,
            className: tabContentPanelClassName
        })
    );
};

TabPanel.propTypes = {
    components: _react.PropTypes.objectOf(_react.PropTypes.oneOfType([_react.PropTypes.element, _react.PropTypes.func])).isRequired,
    tabs: _react.PropTypes.arrayOf(_react.PropTypes.shape({
        key: _react.PropTypes.string.isRequired,
        label: _react.PropTypes.string
    })).isRequired,
    onTabChange: _react.PropTypes.func.isRequired,
    selectedTab: _react.PropTypes.string,
    tabPanelClassName: _react.PropTypes.string,
    tabGroupClassName: _react.PropTypes.string,
    tabGroupTabClassName: _react.PropTypes.string,
    tabGroupSelectedTabClassName: _react.PropTypes.string
};

exports.default = TabPanel;
module.exports = exports['default'];
//# sourceMappingURL=TabPanel.js.map