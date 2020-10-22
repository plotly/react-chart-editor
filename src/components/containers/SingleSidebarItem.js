import PropTypes from 'prop-types';
import {Component} from 'react';

export default class SingleSidebarItem extends Component {
  render() {
    return this.props.children ? (
      <div className="sidebar__item--single">{this.props.children}</div>
    ) : null;
  }
}

SingleSidebarItem.plotly_editor_traits = {sidebar_element: true};

SingleSidebarItem.propTypes = {
  children: PropTypes.any,
};
