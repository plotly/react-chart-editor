import Field from './Field';
import NumericInput from '../widgets/NumericInput';
import PropTypes from 'prop-types';
import {Component} from 'react';
import {connectToContainer} from 'lib';

export class UnconnectedNumeric extends Component {
  render() {
    let fullValue = this.props.fullValue;
    let placeholder;
    if (this.props.multiValued) {
      placeholder = fullValue;
      fullValue = '';
    }

    return (
      <Field {...this.props}>
        <NumericInput
          value={fullValue}
          defaultValue={this.props.defaultValue}
          placeholder={placeholder}
          step={this.props.step}
          stepmode={this.props.stepmode}
          min={this.props.min}
          max={this.props.max}
          onChange={this.props.updatePlot}
          onUpdate={this.props.updatePlot}
          showArrows={!this.props.hideArrows}
          showSlider={this.props.showSlider}
        />
      </Field>
    );
  }
}

UnconnectedNumeric.propTypes = {
  defaultValue: PropTypes.any,
  fullValue: PropTypes.any,
  min: PropTypes.number,
  max: PropTypes.number,
  multiValued: PropTypes.bool,
  hideArrows: PropTypes.bool,
  showSlider: PropTypes.bool,
  step: PropTypes.number,
  stepmode: PropTypes.string,
  updatePlot: PropTypes.func,
  ...Field.propTypes,
};

UnconnectedNumeric.displayName = 'UnconnectedNumeric';

export default connectToContainer(UnconnectedNumeric);
