import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connectToContainer} from 'lib';
import {MULTI_VALUED_PLACEHOLDER} from 'lib/constants';
import Field from './Field';
import DropdownWidget from '../widgets/Dropdown';
import Text from './Text';

export class UnconnectedDropdownCustom extends Component {
  constructor(props) {
    super(props);

    this.setValue = this.setValue.bind(this);
    this.setLocals = this.setLocals.bind(this);

    this.setLocals(props);

    this.state = {
      custom:
        this.value === props.customOpt ||
        !this.props.options.map(o => o.value).includes(this.value),
    };
  }

  componentWillReceiveProps(props) {
    this.setLocals(props);
  }

  setLocals(props) {
    this.value =
      props.fullValue === undefined || props.fullValue === MULTI_VALUED_PLACEHOLDER // eslint-disable-line no-undefined
        ? this.props.defaultOpt
        : props.fullValue;
  }

  setValue(value, custom = false) {
    this.value = value;
    const customOpt = this.props.customOpt;
    this.setState({
      custom: (custom || value === customOpt) && value !== '',
    });
    this.props.updateContainer({
      [this.props.attr]: value === customOpt && !custom ? customOpt : value,
    });
  }

  render() {
    const {options, attr, customOpt} = this.props;
    const value =
      (this.value === '' || !options.map(o => o.value).includes(this.value)) && this.state.custom
        ? customOpt
        : this.value;

    return (
      <Field {...this.props}>
        <DropdownWidget
          backgroundDark={this.props.backgroundDark}
          options={options}
          value={value}
          onChange={this.setValue}
          clearable={this.props.clearable}
          optionRenderer={this.props.optionRenderer}
          valueRenderer={this.props.valueRenderer}
          placeholder={this.props.placeholder}
        />

        {this.state.custom && (
          <Text
            attr={attr}
            updatePlot={value => this.setValue(value, true)}
            onChange={value => {
              if (value) {
                this.setValue(value, true);
              }
            }}
          />
        )}
      </Field>
    );
  }
}

UnconnectedDropdownCustom.propTypes = {
  fullValue: PropTypes.any,
  updatePlot: PropTypes.func,
  clearable: PropTypes.bool,
  defaultOpt: PropTypes.oneOfType([PropTypes.number, PropTypes.bool, PropTypes.string]),
  customOpt: PropTypes.oneOfType([PropTypes.number, PropTypes.bool, PropTypes.string]),
  label: PropTypes.string,
  attr: PropTypes.string,
  ...Field.propTypes,
};

UnconnectedDropdownCustom.requireContext = {
  updateContainer: PropTypes.func,
};

export default connectToContainer(UnconnectedDropdownCustom);
