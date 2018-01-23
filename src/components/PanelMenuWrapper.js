import PropTypes from 'prop-types';
import React, {cloneElement, Component} from 'react';
import SidebarGroup from './sidebar/SidebarGroup';
import {bem} from 'lib';

class PanelsWithSidebar extends Component {
  constructor(props) {
    super(props);

    const opts = this.computeMenuOptions(props);

    this.state = {
      group: opts[0].name,
      panel: opts[0].panels[0],
    };

    this.setPanel = this.setPanel.bind(this);
    this.renderSection = this.renderSection.bind(this);
  }

  setPanel(group, panel) {
    this.setState({group, panel});
  }

  renderSection(section, i) {
    if (
      section.type &&
      (section.type.plotly_editor_traits || {}).sidebar_element
    ) {
      const sectionWithKey = cloneElement(section, {key: i});
      return <div>{sectionWithKey}</div>;
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
    const {children} = props;
    const sections = [];
    const groupLookup = {};
    let groupIndex;

    React.Children.forEach(children, child => {
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
      <div className={bem('plotly-editor', 'wrapper')}>
        <div className={bem('sidebar')}>{menuOpts.map(this.renderSection)}</div>
        {React.Children.map(this.props.children, (child, i) =>
          cloneElement(child, {
            key: i,
            visible:
              this.state.group === child.props.group &&
              this.state.panel === child.props.name,
          })
        )}
      </div>
    );
  }
}

PanelsWithSidebar.propTypes = {
  children: PropTypes.node,
};

export default PanelsWithSidebar;
