import React, {Component} from 'react';
import FlaglistCheckboxGroup from './widgets/FlaglistCheckboxGroup';
import Field from './Field';
import {bem, connectToContainer} from '../lib';

class Flaglist extends Component {
  render() {
    return (
      <Field noTitle>
        <FlaglistCheckboxGroup
          options={this.props.options}
          activeOption={this.props.fullValue()}
          onChange={this.props.updatePlot}
        />
      </Field>
    );
  }
}

export default connectToContainer(Flaglist);
