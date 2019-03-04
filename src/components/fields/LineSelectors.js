import Dropdown from './Dropdown';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import nestedProperty from 'plotly.js/src/lib/nested_property';
import {tooLight} from 'lib';
import {COLORS, MULTI_VALUED} from 'lib/constants';

const strokeDashes = [
  {value: 'solid', strokeDasharray: ''},
  {value: 'dot', strokeDasharray: '3px, 3px'},
  {value: 'dash', strokeDasharray: '9px, 9px'},
  {value: 'longdash', strokeDasharray: '15px, 15px'},
  {value: 'dashdot', strokeDasharray: '9px, 3px, 3px, 3px'},
  {value: 'longdashdot', strokeDasharray: '15px, 6px, 3px, 6px'},
];

const strokeShapes = [
  {d: 'M2,14L14,2', value: 'linear'},
  {d: 'M2,14C4,4 16,16 18,2', value: 'spline'},
  {d: 'M2,14H14V2', value: 'hv'},
  {d: 'M2,14V2H14', value: 'vh'},
  {d: 'M2,14H8V2H14', value: 'hvh'},
  {d: 'M2,14V8H14V2', value: 'vhv'},
];

const computeOptions = (strokeData, stroke) =>
  strokeData.map(({value, strokeDasharray, d = 'M0,8h100'}) => ({
    label: (
      <svg width="100" height="16">
        <g>
          <path
            d={d}
            style={{
              fill: 'none',
              strokeWidth: '4px',
              stroke: !stroke || stroke === MULTI_VALUED ? COLORS.mutedBlue : stroke,
              strokeDasharray,
            }}
          />
        </g>
      </svg>
    ),
    value,
  }));

export const LineShapeSelector = props => (
  <LineSelector {...props} computeOptions={computeOptions.bind(null, strokeShapes)} />
);

export const LineDashSelector = props => (
  <LineSelector
    {...props}
    computeOptions={lineColor =>
      computeOptions(strokeDashes, lineColor).concat([
        {
          label: '',
          value: null,
        },
      ])
    }
  />
);

class LineSelector extends Component {
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
      this.options = this.props.computeOptions(lineColor);
      this.lineColor = lineColor;
    }
  }

  render() {
    return (
      <Dropdown {...this.props} options={this.options} backgroundDark={tooLight(this.lineColor)} />
    );
  }
}

LineSelector.propTypes = {
  computeOptions: PropTypes.func,
  ...Dropdown.propTypes,
};

LineSelector.defaultProps = {
  clearable: false,
};

LineSelector.contextTypes = {
  fullContainer: PropTypes.object,
};
