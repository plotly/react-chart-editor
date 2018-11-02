import PropTypes from 'prop-types';
import React, {cloneElement, Component} from 'react';
import SidebarGroup from './sidebar/SidebarGroup';
import {bem} from 'lib';

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

  getChildContext() {
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

  getUniqueValues(value, index, self) {
    return self.indexOf(value) === index;
  }

  computeMenuOptions(props) {
    const {children, order} = props;
    const sections = [];
    const groupLookup = {};
    let groupIndex;
    const orderedChildren = React.Children.toArray(children);

    if (order) {
      const groupOrder = order.map(panel => panel.group).filter(this.getUniqueValues);
      const nameOrder = order.map(panel => panel.name).filter(this.getUniqueValues);

      orderedChildren.sort((a, b) => {
        // if one of the elements is not in the groupOrder array, then it goes to the end of the list
        if (groupOrder.includes(a.props.group) && !groupOrder.includes(b.props.group)) {
          return -1;
        }
        if (!groupOrder.includes(a.props.group) && groupOrder.includes(b.props.group)) {
          return 1;
        }

        // if both elements are not in the groupOrder array, they get sorted alphabetically,
        // by group, then by name
        if (!groupOrder.includes(a.props.group) && !groupOrder.includes(b.props.group)) {
          const sortByGroup =
            a.props.group === b.props.group ? 0 : a.props.group < b.props.group ? -1 : 1;
          const sortByName =
            a.props.name === b.props.name ? 0 : a.props.name < b.props.name ? -1 : 1;
          return sortByGroup || sortByName;
        }

        // if both elements are in the groupOrder array, they get sorted according to their order in
        // the groupOrder, then nameOrder arrays.
        if (groupOrder.includes(a.props.group) && groupOrder.includes(b.props.group)) {
          const sortByGroup = groupOrder.indexOf(a.props.group) - groupOrder.indexOf(b.props.group);
          const sortByName = nameOrder.indexOf(a.props.name) - nameOrder.indexOf(b.props.name);
          return sortByGroup || sortByName;
        }
        return 0;
      });
    }

    orderedChildren.forEach(child => {
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
      <div className={bem('editor_controls', 'wrapper')}>
        <div className={bem('sidebar')}>{menuOpts.map(this.renderSection)}</div>
        {React.Children.map(
          this.props.children,
          (child, i) =>
            child === null ||
            this.state.group !== child.props.group ||
            this.state.panel !== child.props.name
              ? null
              : cloneElement(child, {key: i})
        )}
      </div>
    );
  }
}

PanelsWithSidebar.propTypes = {
  children: PropTypes.node,
  order: PropTypes.array,
};

PanelsWithSidebar.childContextTypes = {
  setPanel: PropTypes.func,
};

export default PanelsWithSidebar;
