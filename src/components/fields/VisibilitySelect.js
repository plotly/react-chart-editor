import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connectToContainer} from 'lib';
import {MULTI_VALUED_PLACEHOLDER} from 'lib/constants';
import Field from './Field';
import Radio from './Radio';
import Dropdown from './Dropdown';

export class UnconnectedVisibilitySelect extends Component {
  constructor(props, context) {
    super(props, context);

    this.setMode = this.setMode.bind(this);
    this.setLocals = this.setLocals.bind(this);

    this.setLocals(props);
  }

  UNSAFE_componentWillReceiveProps(props) {
    this.setLocals(props);
  }

  setLocals(props) {
    this.mode =
      props.fullValue === undefined || props.fullValue === MULTI_VALUED_PLACEHOLDER // eslint-disable-line no-undefined
        ? this.props.defaultOpt
        : props.fullValue;
  }

  setMode(mode) {
    this.props.updateContainer({[this.props.attr]: mode});
  }

  render() {
    const {dropdown, clearable, options, showOn, attr, label} = this.props;

    return (
      <>
        {dropdown ? (
          <Dropdown
            attr={attr}
            label={label}
            options={options}
            fullValue={this.mode}
            updatePlot={this.setMode}
            clearable={clearable}
          />
        ) : (
          <Radio
            attr={attr}
            label={label}
            options={options}
            fullValue={this.mode}
            updatePlot={this.setMode}
          />
        )}
        {(Array.isArray(showOn) && showOn.includes(this.mode)) || this.mode === showOn
          ? this.props.children
          : null}
      </>
    );
  }
}

UnconnectedVisibilitySelect.propTypes = {
  fullValue: PropTypes.any,
  updatePlot: PropTypes.func,
  dropdown: PropTypes.bool,
  clearable: PropTypes.bool,
  showOn: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.bool,
    PropTypes.string,
    PropTypes.array,
  ]),
  defaultOpt: PropTypes.oneOfType([PropTypes.number, PropTypes.bool, PropTypes.string]),
  label: PropTypes.string,
  attr: PropTypes.string,
  ...Field.propTypes,
};

UnconnectedVisibilitySelect.contextTypes = {
  updateContainer: PropTypes.func,
};

UnconnectedVisibilitySelect.displayName = 'UnconnectedVisibilitySelect';

export default connectToContainer(UnconnectedVisibilitySelect);
