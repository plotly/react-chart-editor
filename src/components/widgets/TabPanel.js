import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

/*
 * A `TabGroup` renders a list of clickable tab buttons.
 */
const TabGroup = props => {
  const tabs = props.tabs.map(tab => {
    const isSelected = tab.key === props.selectedTab;
    const tabClass = classnames(props.tabClassName, {
      [props.selectedTabClassName]: isSelected,
    });

    return (
      <li
        key={tab.key}
        className={tabClass}
        onClick={() => props.onTabChange(tab.key)}
        data-role="button"
        data-pressed={isSelected}
      >
        {tab.label}
      </li>
    );
  });

  return <ul className={props.className}>{tabs}</ul>;
};
TabGroup.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string,
    })
  ).isRequired,
  selectedTab: PropTypes.string,
  onTabChange: PropTypes.func,
};

/*
 * A `TabContentPanel` renders the content for the currently
 * selected tab.
 */
const TabContentPanel = props => {
  const ContentComponent = props.components[props.selectedTab];

  return <div className={props.className}>{ContentComponent}</div>;
};
TabContentPanel.propTypes = {
  selectedTab: PropTypes.string.isRequired,
  components: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.element, PropTypes.func])
  ).isRequired,
};

/*
 * A `TabPanel` renders a tab interface with tab buttons
 * and a content panel.
 */
const TabPanel = props => {
  if (!props.tabs.length) {
    throw new Error(
      "Must provide at least one object " + "in TabPanel `tabs` prop"
    );
  }
  const selectedTab = props.selectedTab || props.tabs[0].key;

  const tabPanelClassName = props.tabPanelClassName || "tab-panel";
  const tabGroupClassName = props.tabGroupClassName || "tab-panel__tabs";
  const tabGroupTabClassName = props.tabGroupTabClassName || "tab-panel__tab";
  const tabGroupSelectedTabClassName =
    props.tabGroupSelectedTabClassName || "tab-panel__tab--selected";
  const tabContentPanelClassName =
    props.tabContentPanelClassName || "tab-panel__content";

  return (
    <div className={tabPanelClassName}>
      <TabGroup
        className={tabGroupClassName}
        tabClassName={tabGroupTabClassName}
        selectedTabClassName={tabGroupSelectedTabClassName}
        onTabChange={nextTab => {
          if (nextTab !== selectedTab) {
            props.onTabChange(selectedTab, nextTab);
          }
        }}
        selectedTab={selectedTab}
        tabs={props.tabs}
      />
      <TabContentPanel
        components={props.components}
        onChange={props.onChange}
        placeholder={props.placeholder}
        selectedTab={selectedTab}
        value={props.value}
        className={tabContentPanelClassName}
      />
    </div>
  );
};

TabPanel.propTypes = {
  components: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.element, PropTypes.func])
  ).isRequired,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string,
    })
  ).isRequired,
  onTabChange: PropTypes.func.isRequired,
  selectedTab: PropTypes.string,
  tabPanelClassName: PropTypes.string,
  tabGroupClassName: PropTypes.string,
  tabGroupTabClassName: PropTypes.string,
  tabGroupSelectedTabClassName: PropTypes.string,
};

export default TabPanel;
