import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {bem} from 'lib';
import ChevronRightIcon from 'mdi-react/ChevronRightIcon';
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
    const {group, panels, selectedGroup} = this.props;
    const {expanded} = this.state;
    return (
      <div
        className={bem('sidebar-group', [
          expanded ? 'is-expanded' : '',
          selectedGroup === group ? 'is-active' : '',
        ])}
      >
        <div
          onClick={this.toggleExpanded}
          className={bem('sidebar-group', 'title')}
        >
          <div className={bem('sidebar-group', 'title__icon')}>
            <ChevronRightIcon />
          </div>
          <div className={bem('sidebar-group', 'title__label')}>{group}</div>
        </div>
        {expanded && panels.map(this.renderSubItem)}
      </div>
    );
  }
}

SidebarGroup.propTypes = {
  group: PropTypes.string,
  onChangeGroup: PropTypes.func,
  panels: PropTypes.array,
  selectedGroup: PropTypes.string,
  selectedPanel: PropTypes.string,
};
