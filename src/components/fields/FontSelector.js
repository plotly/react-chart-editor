import Dropdown from './Dropdown';
import React, {Component} from 'react';
import {EditorControlsContext} from '../../context';
import {containerConnectedContextTypes} from '../../lib';
// import PropTypes from 'prop-types';

/* eslint-disable react/prop-types */
const styledRenderer = ({value, label}) => <span style={{fontFamily: value}}>{label}</span>;
/* eslint-enable react/prop-types */

class FontSelector extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Dropdown
        {...this.props}
        options={this.context.fontOptions}
        valueRenderer={styledRenderer}
        optionRenderer={styledRenderer}
      />
    );
  }
}

FontSelector.propTypes = {
  ...Dropdown.propTypes,
};

FontSelector.defaultProps = {
  clearable: false,
};

FontSelector.contextType = EditorControlsContext;
FontSelector.requireContext = containerConnectedContextTypes;

export default FontSelector;
