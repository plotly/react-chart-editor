import React, {Component} from 'react';
import {bem} from '../../lib';

import SidebarItem from './SidebarItem';

export default class SidebarSection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: this.props.section === this.props.selectedSection,
    };

    this.toggleExpanded = this.toggleExpanded.bind(this);
    this.onChangeSection = this.onChangeSection.bind(this);
    this.renderSubItem = this.renderSubItem.bind(this);
  }

  toggleExpanded() {
    this.setState({expanded: !this.state.expanded});
  }

  onChangeSection(panel) {
    this.props.onChangeSection(this.props.section, panel);
  }

  renderSubItem(panel, i) {
    const isActive =
      this.props.selectedPanel === panel &&
      this.props.section === this.props.selectedSection;

    return (
      <SidebarItem
        key={'subitem-' + i}
        active={isActive}
        onClick={() => this.onChangeSection(panel)}
        label={panel}
      />
    );
  }

  render() {
    return (
      <div
        className={bem('sidebar-section', [
          this.state.expanded ? 'is-expanded' : '',
        ])}
      >
        <div
          onClick={this.toggleExpanded}
          className={bem('sidebar-section', 'title')}
        >
          {this.props.section}
        </div>
        {this.state.expanded && this.props.panels.map(this.renderSubItem)}
      </div>
    );
  }
}

SidebarSection.defaultProps = {
  expanded: false,
};
