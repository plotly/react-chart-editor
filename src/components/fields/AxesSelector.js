import Field from './Field';
import PropTypes from 'prop-types';
import Dropdown from '../widgets/Dropdown';
import RadioBlocks from '../widgets/RadioBlocks';
import {Component} from 'react';
import {getParsedTemplateString} from 'lib';

class AxesSelector extends Component {
  constructor(props, context) {
    super(props, context);
    const {localize: _} = context;

    if (!context.axesTargetHandler) {
      throw new Error(_('AxesSelector must be nested within a connectAxesToPlot component'));
    }
  }

  render() {
    const {axesTargetHandler, axesTarget, fullLayout, localize: _} = this.context;
    const {axesOptions} = this.props;
    const maxCharsThatFitInRadio = 27;
    const maxOptions = axesOptions.length > 4; // eslint-disable-line

    const multipleSublots =
      fullLayout &&
      fullLayout._subplots &&
      Object.values(fullLayout._subplots).some((s) => s.length > 1);

    const options = multipleSublots
      ? axesOptions.map((option) =>
          option.value === 'allaxes'
            ? option
            : {
                label: getParsedTemplateString(option.title, {
                  meta: fullLayout.meta,
                }),
                value: option.value,
              }
        )
      : axesOptions;

    const totalCharsInOptions =
      (options && options.map((o) => o.label).reduce((acc, o) => acc + o.length, 0)) || 0;

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

AxesSelector.contextTypes = {
  axesTargetHandler: PropTypes.func,
  axesTarget: PropTypes.string,
  fullLayout: PropTypes.object,
  localize: PropTypes.func,
};

AxesSelector.propTypes = {
  axesOptions: PropTypes.array,
};

export default AxesSelector;
