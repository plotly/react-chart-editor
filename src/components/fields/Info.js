import Field from './Field';
import React, {Component} from 'react';

export default class Info extends Component {
  render() {
    return <Field {...this.props}>{this.props.children}</Field>;
  }
}

Info.plotly_editor_traits = {
  no_visibility_forcing: true,
};

Info.propTypes = {
  ...Field.propTypes,
};
