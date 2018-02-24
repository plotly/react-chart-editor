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
    const hasSecondaryAxis =
      axesOptions &&
      axesOptions.some(option => {
        return (
          option.axisGroup &&
          this.context.fullLayout._subplots[option.axisGroup].length > 1
        );
      });

    return (
      <Field {...this.props} center>
        {hasSecondaryAxis ? (
          <Dropdown
            label={_('Select Axis')}
            options={axesOptions.map(option => {
              if (option.value !== 'allaxes') {
                return {
                  label: option.title,
                  value: option.value,
                };
              }

              return option;
            })}
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
  fullLayout: PropTypes.object,
};
