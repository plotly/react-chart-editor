import React, {Component} from 'react';
import NumericInput from '../widgets/NumericInputStatefulWrapper';
import Field from './Field';
import {bem, connectToContainer} from '../../lib';

class Numeric extends Component {
  render() {
    return (
      <Field label={this.props.label} postfix={this.props.postfix}>
        <NumericInput
          value={this.props.fullValue()}
          step={this.props.step}
          min={this.props.min}
          max={this.props.max}
          onChange={this.props.updatePlot}
          onUpdate={this.props.updatePlot}
          showArrows
        />
      </Field>
    );
  }
}

export default connectToContainer(Numeric);
