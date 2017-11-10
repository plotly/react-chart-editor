import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bem} from '../../lib';

export default class CogMenu extends Component {
  render() {
    return <div className={bem('panel')}>{this.props.children}</div>;
  }
}
