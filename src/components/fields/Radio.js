import PropTypes from 'prop-types';
import React, {Component} from 'react';
import RadioBlocks from '../widgets/RadioBlocks';
import Field from './Field';
import {connectToContainer} from '../../lib';

class Radio extends Component {
  render() {
    return (
      <Field {...this.props}>
        <RadioBlocks
          options={this.props.options}
          activeOption={this.props.fullValue}
          onOptionChange={this.props.updatePlot}
        />
      </Field>
    );
  }
}

Radio.propTypes = {
  center: PropTypes.bool,
  fullValue: PropTypes.any,
  options: PropTypes.array.isRequired,
  updatePlot: PropTypes.func,
  ...Field.propTypes,
};

// for better appearance <Radio> overrides <Field> {center: false}
// default prop. This can be overridden manually using props for <Radio>.
Radio.defaultProps = {
  center: true,
};

export default connectToContainer(Radio);
