import Field from './Field';
import Picker from '../widgets/DateTimePicker';
import PropTypes from 'prop-types';
import {Component} from 'react';
import {connectToContainer} from 'lib';

export class UnconnectedDateTimePicker extends Component {
  render() {
    return (
      <Field {...this.props}>
        <Picker
          value={this.props.fullValue}
          placeholder={this.props.placeholder}
          onChange={this.props.updatePlot}
        />
      </Field>
    );
  }
}

UnconnectedDateTimePicker.propTypes = {
  fullValue: PropTypes.string,
  updatePlot: PropTypes.func,
  placeholder: PropTypes.string,
  ...Field.propTypes,
};

UnconnectedDateTimePicker.displayName = 'UnconnectedDateTimePicker';

export default connectToContainer(UnconnectedDateTimePicker);
