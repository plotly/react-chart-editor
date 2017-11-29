import Dropdown from './Dropdown';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import nestedProperty from 'plotly.js/src/lib/nested_property';
import {tooLight} from '../../lib';

/* eslint-disable react/prop-types */
const styledRenderer = ({label}) => {
  return (
    <svg width="100" height="4">
      <g>{label}</g>
    </svg>
  );
};
/* eslint-enable react/prop-types */

const computeOptions = lineColor => {
  return [
    {
      label: (
        <path
          d="M5,0h100"
          style={{
            fill: 'none',
            stroke: lineColor,
            strokeOpacity: 1,
            strokeWidth: '4px',
          }}
        />
      ),
      value: 'solid',
    },
    {
      label: (
        <path
          d="M5,0h100"
          style={{
            fill: 'none',
            stroke: lineColor,
            strokeOpacity: 1,
            strokeDasharray: '3px, 3px',
            strokeWidth: '4px',
          }}
        />
      ),
      value: 'dot',
    },
    {
      label: (
        <path
          d="M5,0h100"
          style={{
            fill: 'none',
            stroke: lineColor,
            strokeOpacity: 1,
            strokeDasharray: '9px, 9px',
            strokeWidth: '4px',
          }}
        />
      ),
      value: 'dash',
    },
    {
      label: (
        <path
          d="M5,0h100"
          style={{
            fill: 'none',
            stroke: lineColor,
            strokeOpacity: 1,
            strokeDasharray: '15px, 15px',
            strokeWidth: '4px',
          }}
        />
      ),
      value: 'longdash',
    },
    {
      label: (
        <path
          d="M5,0h100"
          style={{
            fill: 'none',
            stroke: lineColor,
            strokeOpacity: 1,
            strokeDasharray: '9px, 3px, 3px, 3px',
            strokeWidth: '4px',
          }}
        />
      ),
      value: 'dashdot',
    },
    {
      label: (
        <path
          d="M5,0h100"
          style={{
            fill: 'none',
            stroke: lineColor,
            strokeOpacity: 1,
            strokeDasharray: '15px, 6px, 3px, 6px',
            strokeWidth: '4px',
          }}
        />
      ),
      value: 'longdashdot',
    },
    {
      label: '',
      value: null,
    },
  ];
};

class LineDashSelector extends Component {
  constructor(props, context) {
    super(props, context);
    this.setLocals(props, context);
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.setLocals(nextProps, nextContext);
  }

  setLocals(nextProps, nextContext) {
    const {fullContainer} = nextContext;
    const lineColor = nestedProperty(fullContainer, 'line.color').get();
    if (!this.options || this.lineColor !== lineColor) {
      this.options = computeOptions(lineColor);
      this.lineColor = lineColor;
    }
  }

  render() {
    return (
      <Dropdown
        {...this.props}
        options={this.options}
        valueRenderer={styledRenderer}
        optionRenderer={styledRenderer}
        backgroundDark={tooLight(this.lineColor)}
      />
    );
  }
}

LineDashSelector.propTypes = {
  ...Dropdown.propTypes,
};

LineDashSelector.defaultProps = {
  clearable: false,
};

LineDashSelector.contextTypes = {
  fullContainer: PropTypes.object,
};

export default LineDashSelector;
