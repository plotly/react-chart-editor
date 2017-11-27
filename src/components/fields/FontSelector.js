import Dropdown from './Dropdown';
import React from 'react';
import {DEFAULT_FONTS} from '../../lib/constants';

/* eslint-disable react/prop-types */
const styledRenderer = ({value, label}) => (
  <span style={{fontFamily: value}}>{label}</span>
);
/* eslint-enable react/prop-types */

const FontSelector = props => {
  return (
    <Dropdown
      {...props}
      options={[...DEFAULT_FONTS]}
      valueRenderer={styledRenderer}
      optionRenderer={styledRenderer}
    />
  );
};

FontSelector.propTypes = {
  ...Dropdown.propTypes,
};

FontSelector.defaultFonts = {
  clearable: false,
};

export default FontSelector;
