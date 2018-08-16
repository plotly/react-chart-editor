import Dropdown from './Dropdown';
import React from 'react';
import PropTypes from 'prop-types';

/* eslint-disable react/prop-types */
const styledRenderer = ({value, label}) => (
  <span style={{fontFamily: value}}>{label}</span>
);
/* eslint-enable react/prop-types */

const FontSelector = (props, context) => {
  return (
    <Dropdown
      {...props}
      options={context.fontOptions}
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

FontSelector.contextTypes = {
  fontOptions: PropTypes.array,
};

export default FontSelector;
