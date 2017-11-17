import Field from './Field';
import PropTypes from 'prop-types';
import RadioBlocks from '../widgets/RadioBlocks';
import React, {Component} from 'react';
import {connectToContainer} from '../../lib';

export default class AxesSelector extends Component {
  constructor(props, context) {
    super(props, context);

    if (!props.axesTargetHandler && !context.axesTargetHandler) {
      throw new Error(
        'AxesSelector must be nested within a connectAxesToPlot component ' +
          'or passed axesTargetHandler and axesOptions props'
      );
    }
  }

  render() {
    let axesTargetHandler, axesOptions, axesTarget;
    if (this.props.axesTargetHandler) {
      axesTargetHandler = this.props.axesTargetHandler;
      axesOptions = this.props.axesOptions;
      axesTarget = this.props.axesTarget;
    } else {
      axesTargetHandler = this.context.axesTargetHandler;
      axesOptions = this.context.axesOptions;
      axesTarget = this.context.axesTarget;
    }
    return (
      <Field {...this.props}>
        <RadioBlocks
          options={axesOptions}
          activeOption={axesTarget}
          onOptionChange={axesTargetHandler}
        />
      </Field>
    );
  }
}

AxesSelector.propTypes = {
  axesTargetHandler: PropTypes.func,
  axesOptions: PropTypes.array,
  axesTarget: PropTypes.string,
};

AxesSelector.contextTypes = {
  axesTargetHandler: PropTypes.func,
  axesOptions: PropTypes.array,
  axesTarget: PropTypes.string,
};
