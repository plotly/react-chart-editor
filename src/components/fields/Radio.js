import React, {Component} from 'react';
import RadioBlocks from '../widgets/RadioBlocks';
import Field from './Field';
import {bem, connectToContainer} from '../../lib';

class Radio extends Component {
  render() {
    return (
      <Field label={this.props.label} postfix={this.props.postfix}>
        <RadioBlocks
          options={this.props.options}
          activeOption={this.props.fullValue()}
          onOptionChange={this.props.updatePlot}
        />
      </Field>
    );
  }
}

export default connectToContainer(Radio);
