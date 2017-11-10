import Field from './Field';
import PropTypes from 'prop-types';
import React, {Component} from 'react';

export default class Info extends Component {
  render() {
    return <Field {...this.props}>{this.props.children}</Field>;
  }
}

Info.propTypes = {
  ...Field.propTypes,
};
