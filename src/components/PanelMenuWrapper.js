import PropTypes from 'prop-types';
import React, {cloneElement, Component} from 'react';
import SidebarGroup from './sidebar/SidebarGroup';
import {bem} from '../lib';

const Fragment = React.Fragment;

class PanelsWithSidebar extends Component {
  constructor(props) {
    super(props);

    var opts = this.computeMenuOptions(props);

    this.state = {
      group: opts[0].name,
      panel: opts[0].panels[0],
    };

    this.setPanel = this.setPanel.bind(this);
    this.renderGroup = this.renderGroup.bind(this);
  }

  setPanel(group, panel) {
    this.setState({group, panel});
  }

  renderGroup(group, i) {
    return (
      <SidebarGroup
        key={i}
        selectedGroup={this.state.group}
        selectedPanel={this.state.panel}
        group={group.name}
        panels={group.panels}
        onChangeGroup={this.setPanel}
      />
    );
  }

  computeMenuOptions(props) {
    var obj, child, group, name;
    var children = props.children;
    if (!Array.isArray(children)) {
      children = [children];
    }
    var groupLookup = {};
    var groupIndex;
    var groups = [];
    for (var i = 0; i < children.length; i++) {
      child = children[i];
      group = child.props.group;
      name = child.props.name;

      if (groupLookup.hasOwnProperty(group)) {
        groupIndex = groupLookup[group];
        obj = groups[groupIndex];
      } else {
        groupLookup[group] = groups.length;
        obj = {name: group, panels: []};
        groups.push(obj);
      }

      obj.panels.push(name);
    }

    return groups;
  }

  render() {
    var menuOpts = this.computeMenuOptions(this.props);

    var children = Array.isArray(this.props.children)
      ? this.props.children
      : [this.props.children];

    return (
      <div className={bem('plotly-editor', 'wrapper')}>
        <div className={bem('sidebar')}>{menuOpts.map(this.renderGroup)}</div>
        {children.map((child, i) =>
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
