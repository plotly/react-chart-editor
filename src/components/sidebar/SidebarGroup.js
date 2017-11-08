import React, {Component} from 'react';
import {bem} from '../../lib';

import SidebarItem from './SidebarItem';

export default class SidebarGroup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: this.props.group === this.props.selectedGroup,
    };

    this.toggleExpanded = this.toggleExpanded.bind(this);
    this.onChangeGroup = this.onChangeGroup.bind(this);
    this.renderSubItem = this.renderSubItem.bind(this);
  }

  toggleExpanded() {
    this.setState({expanded: !this.state.expanded});
  }

  onChangeGroup(panel) {
    this.props.onChangeGroup(this.props.group, panel);
  }

  renderSubItem(panel, i) {
    const isActive =
      this.props.selectedPanel === panel &&
      this.props.group === this.props.selectedGroup;

    return (
      <SidebarItem
        key={'subitem-' + i}
        active={isActive}
        onClick={() => this.onChangeGroup(panel)}
        label={panel}
      />
    );
  }

  render() {
    return (
      <div
        className={bem('sidebar-group', [
          this.state.expanded ? 'is-expanded' : '',
        ])}
      >
        <div
          onClick={this.toggleExpanded}
          className={bem('sidebar-group', 'title')}
        >
          {this.props.group}
        </div>
        {this.state.expanded && this.props.panels.map(this.renderSubItem)}
      </div>
    );
  }
}

SidebarGroup.defaultProps = {
  expanded: false,
};
