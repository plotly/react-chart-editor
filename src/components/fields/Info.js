import Field from './Field';
import React, {Component} from 'react';
import {bem} from '../../lib';

export default class Info extends Component {
  render() {
    return <Field {...this.props}>{this.props.children}</Field>;
  }
}

Info.propTypes = {
  ...Field.propTypes,
};
