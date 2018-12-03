import PropTypes from 'prop-types';
import React, {cloneElement, Component} from 'react';
import SidebarGroup from './sidebar/SidebarGroup';
import {bem} from 'lib';
import sortMenu from 'lib/sortMenu';
import {PanelMenuWrapperContext} from '../context';

class PanelsWithSidebar extends Component {
  constructor(props) {
    super(props);

    const opts = this.computeMenuOptions(props);
    const firstSidebarGroup = opts.filter(o => o.panels)[0];

    this.state = {
      group: firstSidebarGroup.name,
      panel: firstSidebarGroup.panels[0],
    };

    this.setPanel = this.setPanel.bind(this);
    this.renderSection = this.renderSection.bind(this);
  }

  setPanel(group, panel) {
    this.setState({group, panel});
  }

  provideValue() {
    return {
      setPanel: this.setPanel,
    };
  }

  renderSection(section, i) {
    if (section.type && (section.type.plotly_editor_traits || {}).sidebar_element) {
      return cloneElement(section, {key: i});
    }
    return (
      <SidebarGroup
        key={i}
        selectedGroup={this.state.group}
        selectedPanel={this.state.panel}
        group={section.name}
        panels={section.panels}
        onChangeGroup={this.setPanel}
      />
    );
  }

  computeMenuOptions(props) {
    const {children, menuPanelOrder} = props;
    const sections = [];
    const groupLookup = {};
    let groupIndex;
    const childrenArray = sortMenu(React.Children.toArray(children), menuPanelOrder);

    childrenArray.forEach(child => {
      if (!child) {
        return;
      }
      const group = child.props.group;
      const name = child.props.name;

      if (group && name) {
        let obj;
        if (groupLookup.hasOwnProperty(group)) {
          groupIndex = groupLookup[group];
          obj = sections[groupIndex];
        } else {
          groupLookup[group] = sections.length;
          obj = {name: group, panels: []};
          sections.push(obj);
        }
        obj.panels.push(name);
      }

      if ((child.type.plotly_editor_traits || {}).sidebar_element) {
        sections.push(child);
      }
    });

    return sections;
  }

  render() {
    const menuOpts = this.computeMenuOptions(this.props);

    return (
      <PanelMenuWrapperContext.Provider value={this.provideValue()}>
        <div className={bem('editor_controls', 'wrapper')}>
          <div className={bem('sidebar')}>{menuOpts.map(this.renderSection)}</div>
          {React.Children.map(this.props.children, (child, i) =>
            child === null ||
            this.state.group !== child.props.group ||
            this.state.panel !== child.props.name
              ? null
              : cloneElement(child, {key: i})
          )}
        </div>
      </PanelMenuWrapperContext.Provider>
    );
  }
}

PanelsWithSidebar.propTypes = {
  children: PropTypes.node,
  menuPanelOrder: PropTypes.array,
};

export default PanelsWithSidebar;
