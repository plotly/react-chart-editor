import Field from './Field';
import FlaglistCheckboxGroup from '../widgets/FlaglistCheckboxGroup';
import PropTypes from 'prop-types';
import {Component} from 'react';
import {connectToContainer} from 'lib';

export class UnconnectedFlaglist extends Component {
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

UnconnectedFlaglist.propTypes = {
  fullValue: PropTypes.any,
  options: PropTypes.array.isRequired,
  updatePlot: PropTypes.func,
  ...Field.propTypes,
};

UnconnectedFlaglist.displayName = 'UnconnectedFlaglist';

export default connectToContainer(UnconnectedFlaglist);
