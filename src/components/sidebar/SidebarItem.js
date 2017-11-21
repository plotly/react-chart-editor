import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {bem} from '../../lib';

export default class SidebarItem extends Component {
  render() {
    return (
      <div
        onClick={this.props.onClick}
        className={bem('sidebar-item', [this.props.active ? 'is-active' : ''])}
      >
        {this.props.label}
      </div>
    );
  }
}

SidebarItem.propTypes = {
  active: PropTypes.bool,
  label: PropTypes.string,
  onClick: PropTypes.func,
};
