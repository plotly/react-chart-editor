import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connectToContainer} from 'lib';
import {MULTI_VALUED_PLACEHOLDER} from 'lib/constants';
import Field from './Field';
import Radio from './Radio';
import Dropdown from './Dropdown';
import {RecursiveComponent, recursiveMap} from '../../lib/recursiveMap';

export class UnconnectedVisibilitySelect extends Component {
  constructor(props) {
    super(props);

    this.setMode = this.setMode.bind(this);
    this.setLocals = this.setLocals.bind(this);

    this.setLocals(props);
  }

  componentWillReceiveProps(props) {
    this.setLocals(props);
  }

  setLocals(props) {
    this.mode =
      props.fullValue === undefined || props.fullValue === MULTI_VALUED_PLACEHOLDER // eslint-disable-line no-undefined
        ? this.props.defaultOpt
        : props.fullValue;
  }

  setMode(mode) {
    this.props.context.updateContainer({[this.props.attr]: mode});
  }

  render() {
    const {dropdown, clearable, options, showOn, attr, label} = this.props;

    return (
      <RecursiveComponent context={this.props.context}>
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
          ? recursiveMap(this.props.children, this.props.context)
          : null}
      </RecursiveComponent>
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
  context: PropTypes.any,
  ...Field.propTypes,
};

UnconnectedVisibilitySelect.requireContext = {
  container: PropTypes.object,
  defaultContainer: PropTypes.object,
  fullContainer: PropTypes.object,
  updateContainer: PropTypes.func,
};

export default connectToContainer(UnconnectedVisibilitySelect);
