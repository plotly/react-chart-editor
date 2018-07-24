import React, {Fragment, Component} from 'react';
import PropTypes from 'prop-types';
import {connectToContainer} from 'lib';
import Field from './Field';
import Radio from './Radio';
import Dropdown from './Dropdown';
import nestedProperty from 'plotly.js/src/lib/nested_property';

class UnconnectedVisibilitySelect extends Component {
  constructor(props, context) {
    super(props, context);

    const value = nestedProperty(props.container, props.attr).get();
    this.state = {
      mode: value === undefined ? this.props.defaultOpt : value, // eslint-disable-line no-undefined
    };

    this.setMode = this.setMode.bind(this);
  }

  setMode(mode) {
    this.setState({mode: mode});
    this.props.updateContainer({[this.props.attr]: mode});
  }

  render() {
    const {dropdown, clearable, options, showOn, attr, label} = this.props;
    const {mode} = this.state;

    return (
      <Fragment>
        {dropdown ? (
          <Dropdown
            attr={attr}
            label={label}
            options={options}
            fullValue={mode}
            updatePlot={this.setMode}
            clearable={clearable}
          />
        ) : (
          <Radio
            attr={attr}
            label={label}
            options={options}
            fullValue={mode}
            updatePlot={this.setMode}
          />
        )}
        {mode !== showOn ? '' : this.props.children}
      </Fragment>
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
  ]),
  defaultOpt: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.bool,
    PropTypes.string,
  ]),
  label: PropTypes.string,
  attr: PropTypes.string,
  ...Field.propTypes,
};

UnconnectedVisibilitySelect.contextTypes = {
  updateContainer: PropTypes.func,
};

export default connectToContainer(UnconnectedVisibilitySelect);
