import ColorscalePickerWidget from '../widgets/ColorscalePicker';
import Field from './Field';
import PropTypes from 'prop-types';
import {Component} from 'react';
import {connectToContainer} from 'lib';

class UnconnectedColorwayPicker extends Component {
  render() {
    return (
      <Field {...this.props}>
        <ColorscalePickerWidget
          selected={this.props.fullValue}
          onColorscaleChange={this.props.updatePlot}
          initialCategory="categorical"
          disableCategorySwitch={this.props.disableCategorySwitch}
        />
      </Field>
    );
  }
}

UnconnectedColorwayPicker.propTypes = {
  fullValue: PropTypes.any,
  updatePlot: PropTypes.func,
  ...Field.propTypes,
};

UnconnectedColorwayPicker.displayName = 'UnconnectedColorwayPicker';

export default connectToContainer(UnconnectedColorwayPicker);
