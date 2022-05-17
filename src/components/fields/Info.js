import Field from './Field';
import {Component} from 'react';

export default class Info extends Component {
  render() {
    return (
      <Field {...this.props}>
        <div className={`js-test-info ${this.props.className ? this.props.className : ''}`}>
          {this.props.children}
        </div>
      </Field>
    );
  }
}

Info.plotly_editor_traits = {
  no_visibility_forcing: true,
};

Info.propTypes = {
  ...Field.propTypes,
};
