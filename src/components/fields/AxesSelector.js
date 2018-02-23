import Field from './Field';
import PropTypes from 'prop-types';
import Dropdown from '../widgets/Dropdown';
import RadioBlocks from '../widgets/RadioBlocks';
import React, {Component} from 'react';

export default class AxesSelector extends Component {
  constructor(props, context) {
    super(props, context);

    if (!context.axesTargetHandler) {
      throw new Error(
        'AxesSelector must be nested within a connectAxesToPlot component'
      );
    }
  }

  render() {
    const {axesTargetHandler, axesOptions, axesTarget} = this.context;

    return (
      <Field {...this.props} center>
        {axesOptions.length > 4 ? ( // eslint-disable-line no-magic-numbers
          <Dropdown
            options={axesOptions}
            value={axesTarget}
            onChange={axesTargetHandler}
            clearable={false}
          />
        ) : (
          <RadioBlocks
            options={axesOptions}
            activeOption={axesTarget}
            onOptionChange={axesTargetHandler}
          />
        )}
      </Field>
    );
  }
}

AxesSelector.contextTypes = {
  axesTargetHandler: PropTypes.func,
  axesOptions: PropTypes.array,
  axesTarget: PropTypes.string,
};
