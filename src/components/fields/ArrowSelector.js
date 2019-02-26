import Dropdown from './Dropdown';
import React from 'react';
import ARROW_PATHS from 'plotly.js/src/components/annotations/arrow_paths';

const ARROW_OPTIONS = ARROW_PATHS.map(({path}, index) => {
  const label = (
    <svg width="40" height="20" style={{position: 'relative'}}>
      <line
        stroke="rgb(68, 68, 68)"
        style={{fill: 'none'}}
        x1="5"
        y1="10"
        x2="23.8"
        y2="10"
        strokeWidth="2"
      />
      <path
        d={path}
        transform="translate(23.8,10)rotate(360)scale(2)"
        style={{fill: 'rgb(68, 68, 68)', opacity: 1, strokeWidth: 0}}
      />
    </svg>
  );

  return {
    label,
    value: index,
    key: 'arrow' + index,
  };
});

const ArrowSelector = props => {
  return <Dropdown {...props} options={ARROW_OPTIONS} />;
};

ArrowSelector.propTypes = {
  ...Dropdown.propTypes,
};

ArrowSelector.defaultProps = {
  clearable: false,
};

export default ArrowSelector;
