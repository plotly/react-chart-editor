import Field from './Field';
import FlaglistCheckboxGroup from '../widgets/FlaglistCheckboxGroup';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connectToContainer} from '../../lib';

class Flaglist extends Component {
  render() {
    return (
      <Field {...this.props}>
        <FlaglistCheckboxGroup
          options={this.props.options}
          activeOption={this.props.fullValue}
          onChange={this.props.updatePlot}
        />
      </Field>
    );
  }
}

Flaglist.propTypes = {
  fullValue: PropTypes.any,
  options: PropTypes.array.isRequired,
  updatePlot: PropTypes.func,
  ...Field.propTypes,
};

export default connectToContainer(Flaglist);
