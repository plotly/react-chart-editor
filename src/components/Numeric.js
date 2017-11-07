import React, {Component} from 'react';
import NumericInput from './widgets/NumericInputStatefulWrapper';
import {bem, connectToContainer} from '../lib';

class Numeric extends Component {
  render() {
    return (
      <div className={bem('field')}>
        <div className={bem('field', 'title')}>
          <div className={bem('field', 'title-text')}>{this.props.label}</div>
        </div>
        <div className={bem('field', 'widget')}>
          <NumericInput
            value={this.props.fullValue()}
            step={this.props.step}
            min={this.props.min}
            max={this.props.max}
            onChange={this.props.updatePlot}
            onUpdate={this.props.updatePlot}
            showArrows
          />
        </div>
      </div>
    );
  }
}

export default connectToContainer(Numeric);
