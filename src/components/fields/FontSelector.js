import Dropdown from './Dropdown';
import React from 'react';
import {DEFAULT_FONTS} from '../../lib/constants';

/* eslint-disable react/prop-types */
const styledRenderer = ({value, label}) => (
  <span style={{fontFamily: value}}>{label}</span>
);
/* eslint-enable react/prop-types */

const FontSelector = props => {
  let options;
  if (Array.isArray(props.options)) {
    options = props.options;
  } else {
    options = [...DEFAULT_FONTS];
  }
  return (
    <Dropdown
      {...props}
      options={options}
      valueRenderer={styledRenderer}
      optionRenderer={styledRenderer}
    />
  );
};

FontSelector.propTypes = {
  ...Dropdown.propTypes,
};

FontSelector.defaultProps = {
  clearable: false,
};

export default FontSelector;
