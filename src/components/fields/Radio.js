import PropTypes from 'prop-types';
import {Component} from 'react';
import RadioBlocks from '../widgets/RadioBlocks';
import Field from './Field';
import {connectToContainer} from 'lib';

export class UnconnectedRadio extends Component {
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

UnconnectedRadio.propTypes = {
  center: PropTypes.bool,
  fullValue: PropTypes.any,
  options: PropTypes.array.isRequired,
  updatePlot: PropTypes.func,
  ...Field.propTypes,
};

// for better appearance <Radio> overrides <Field> {center: false}
// default prop. This can be overridden manually using props for <Radio>.
UnconnectedRadio.defaultProps = {
  center: true,
};

UnconnectedRadio.displayName = 'UnconnectedRadio';

export default connectToContainer(UnconnectedRadio);
