import PropTypes from 'prop-types';
import {Component} from 'react';
import {bem} from 'lib';
import {AngleRightIcon} from 'plotly-icons';
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
      this.props.selectedPanel === panel && this.props.group === this.props.selectedGroup;

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
        className={bem('sidebar__group', [
          expanded ? 'is-expanded' : '',
          selectedGroup === group ? 'is-active' : '',
        ])}
      >
        <div onClick={this.toggleExpanded} className={bem('sidebar__group', 'title')}>
          <div className={bem('sidebar__group', 'title__icon')}>
            <AngleRightIcon />
          </div>
          <div className={bem('sidebar__group', 'title__label')}>{group}</div>
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
