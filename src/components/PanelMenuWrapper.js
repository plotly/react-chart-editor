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
    this.renderGroup = this.renderGroup.bind(this);
  }

  setPanel(group, panel) {
    this.setState({group, panel});
  }

  renderGroup(group, i) {
    if (group.type === 'Button') {
      return <div className="sidebar__group">{group.component}</div>;
    }
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
    let obj, child, group, name;

    let {children} = props;

    if (!Array.isArray(children)) {
      children = [children];
    }

    const groupLookup = {};
    let groupIndex;
    const groups = [];

    for (let i = 0; i < children.length; i++) {
      child = children[i];
      group = child.props.group;
      name = child.props.name;

      if (child.type.name === 'Button') {
        if (groupLookup.hasOwnProperty(group)) {
          throw new Error('cannot have 2 menu buttons with same name');
        }
        groupLookup[group] = groups.length;
        obj = {
          name: group,
          type: 'Button',
          component: child,
        };
        groups.push(obj);
      } else {
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
    }

    return groups;
  }

  render() {
    const menuOpts = this.computeMenuOptions(this.props);

    const children = Array.isArray(this.props.children)
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
