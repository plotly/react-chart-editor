import DropdownWidget from '../widgets/Dropdown';
import React, {Component} from 'react';
import Field from './Field';

export class DetachedDataSelector extends Component {
  constructor(props, context) {
    super(props, context);
  }


  render() {
    return (
      <Field>
        <DropdownWidget
          options={this.props.options}
          value={this.props.value}
          onChange={this.props.onChange}
          multi={this.props.multi}
          clearable={true}
        />
      </Field>
    );
  }
}

DetachedDataSelector.defaultProps = {
  options: null,
  value: '',
  onChange: null,
  multi: false
};


export default DetachedDataSelector;