import Field from './Field';
import PropTypes from 'prop-types';
import Dropdown from '../widgets/Dropdown';
import RadioBlocks from '../widgets/RadioBlocks';
import React, {Component} from 'react';
import {EditorControlsContext} from '../../context';

class AxesSelector extends Component {
  constructor(props, context) {
    super(props, context);
    const {localize: _} = context;

    if (!props.context.axesTargetHandler) {
      throw new Error(_('AxesSelector must be nested within a connectAxesToPlot component'));
    }
  }

  render() {
    const {localize: _} = this.context;
    const {axesTargetHandler, axesTarget, fullLayout} = this.props.context;
    const {axesOptions} = this.props;
    const maxCharsThatFitInRadio = 27;
    const maxOptions = axesOptions.length > 4; // eslint-disable-line

    const multipleSublots =
      fullLayout &&
      fullLayout._subplots &&
      Object.values(fullLayout._subplots).some(s => s.length > 1);

    const options = multipleSublots
      ? axesOptions.map(
          option =>
            option.value === 'allaxes'
              ? option
              : {
                  label: option.title,
                  value: option.value,
                }
        )
      : axesOptions;

    const totalCharsInOptions =
      (options && options.map(o => o.label).reduce((acc, o) => acc + o.length, 0)) || 0;

    return maxOptions || totalCharsInOptions >= maxCharsThatFitInRadio ? (
      <Field {...this.props} label={_('Axis to Style')}>
        <Dropdown
          options={options}
          value={axesTarget}
          onChange={axesTargetHandler}
          clearable={false}
        />
      </Field>
    ) : (
      <Field {...this.props} center>
        <RadioBlocks
          options={options}
          activeOption={axesTarget}
          onOptionChange={axesTargetHandler}
        />
      </Field>
    );
  }
}
AxesSelector.requireContext = {
  axesTargetHandler: PropTypes.func,
  axesTarget: PropTypes.string,
  fullLayout: PropTypes.object,
};

AxesSelector.contextType = EditorControlsContext;

AxesSelector.propTypes = {
  axesOptions: PropTypes.array,
  context: PropTypes.object,
};

export default AxesSelector;
