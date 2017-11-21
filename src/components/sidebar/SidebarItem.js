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
