import Field from './Field';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import SymbolSelectorWidget from '../widgets/SymbolSelector';
import nestedProperty from 'plotly.js/src/lib/nested_property';
import {connectToContainer, tooLight} from 'lib';
import {MULTI_VALUED, COLORS} from 'lib/constants';

// TODO compute these from plotly.js
const SYMBOLS = [
  {
    value: 'circle',
    label: 'M5,0A5,5 0 1,1 0,-5A5,5 0 0,1 5,0Z',
    threeD: true,
    gl: true,
  },
  {
    value: 'circle-open',
    label: 'M5,0A5,5 0 1,1 0,-5A5,5 0 0,1 5,0Z',
    fill: 'none',
    threeD: true,
    gl: true,
  },
  {
    value: 'circle-open-dot',
    label: 'M5,0A5,5 0 1,1 0,-5A5,5 0 0,1 5,0ZM0,0.5L0.5,0L0,-0.5L-0.5,0Z',
    fill: 'none',
  },

  {value: 'square', label: 'M5,5H-5V-5H5Z', threeD: true, gl: true},
  {
    value: 'square-open',
    label: 'M5,5H-5V-5H5Z',
    fill: 'none',
    threeD: true,
    gl: true,
  },
  {
    value: 'square-open-dot',
    label: 'M5,5H-5V-5H5ZM0,0.5L0.5,0L0,-0.5L-0.5,0Z',
    fill: 'none',
  },

  {
    value: 'diamond',
    label: 'M6.5,0L0,6.5L-6.5,0L0,-6.5Z',
    threeD: true,
    gl: true,
  },
  {
    value: 'diamond-open',
    label: 'M6.5,0L0,6.5L-6.5,0L0,-6.5Z',
    fill: 'none',
    threeD: true,
    gl: true,
  },
  {
    value: 'diamond-open-dot',
    label: 'M6.5,0L0,6.5L-6.5,0L0,-6.5ZM0,0.5L0.5,0L0,-0.5L-0.5,0Z',
    fill: 'none',
  },

  {
    value: 'cross',
    label: 'M6,2H2V6H-2V2H-6V-2H-2V-6H2V-2H6Z',
    threeD: true,
    gl: true,
  },
  {
    value: 'cross-open',
    label: 'M6,2H2V6H-2V2H-6V-2H-2V-6H2V-2H6Z',
    fill: 'none',
    gl: true,
  },

  {
    value: 'x',
    label:
      'M0,2.83l2.83,2.83l2.83,-2.83l-2.83,-2.83l2.83,-2.83l-2.83,-2.83l-2.83,2.83l-2.83,-2.83l-2.83,2.83l2.83,2.83l-2.83,2.83l2.83,2.83Z',
    threeD: true,
    gl: true,
  },
  {
    value: 'x-open',
    label:
      'M0,2.83l2.83,2.83l2.83,-2.83l-2.83,-2.83l2.83,-2.83l-2.83,-2.83l-2.83,2.83l-2.83,-2.83l-2.83,2.83l2.83,2.83l-2.83,2.83l2.83,2.83Z',
    fill: 'none',
    gl: true,
  },

  {value: 'triangle-up', label: 'M-5.77,2.5H5.77L0,-5Z', gl: true},
  {
    value: 'triangle-up-open',
    label: 'M-5.77,2.5H5.77L0,-5Z',
    fill: 'none',
    gl: true,
  },

  {value: 'triangle-down', label: 'M-5.77,-2.5H5.77L0,5Z', gl: true},
  {
    value: 'triangle-down-open',
    label: 'M-5.77,-2.5H5.77L0,5Z',
    fill: 'none',
    gl: true,
  },

  {value: 'triangle-left', label: 'M2.5,-5.77V5.77L-5,0Z', gl: true},
  {
    value: 'triangle-left-open',
    label: 'M2.5,-5.77V5.77L-5,0Z',
    fill: 'none',
    gl: true,
  },

  {value: 'triangle-right', label: 'M-2.5,-5.77V5.77L5,0Z', gl: true},
  {
    value: 'triangle-right-open',
    label: 'M-2.5,-5.77V5.77L5,0Z',
    fill: 'none',
    gl: true,
  },

  {value: 'triangle-ne', label: 'M-6,-3H3V6Z', gl: true},
  {
    value: 'triangle-ne-open',
    label: 'M-6,-3H3V6Z',
    fill: 'none',
    gl: true,
  },

  {value: 'triangle-se', label: 'M3,-6V3H-6Z', gl: true},
  {
    value: 'triangle-se-open',
    label: 'M3,-6V3H-6Z',
    fill: 'none',
    gl: true,
  },

  {value: 'triangle-sw', label: 'M6,3H-3V-6Z', gl: true},
  {
    value: 'triangle-sw-open',
    label: 'M6,3H-3V-6Z',
    fill: 'none',
    gl: true,
  },

  {value: 'triangle-nw', label: 'M-3,6V-3H6Z', gl: true},
  {
    value: 'triangle-nw-open',
    label: 'M-3,6V-3H6Z',
    fill: 'none',
    gl: true,
  },

  {
    value: 'pentagon',
    label: 'M4.76,-1.54L2.94,4.05H-2.94L-4.76,-1.54L0,-5Z',
    gl: true,
  },
  {
    value: 'pentagon-open',
    label: 'M4.76,-1.54L2.94,4.05H-2.94L-4.76,-1.54L0,-5Z',
    fill: 'none',
    gl: true,
  },

  {
    value: 'hexagon',
    label: 'M4.33,-2.5V2.5L0,5L-4.33,2.5V-2.5L0,-5Z',
    gl: true,
  },
  {
    value: 'hexagon-open',
    label: 'M4.33,-2.5V2.5L0,5L-4.33,2.5V-2.5L0,-5Z',
    fill: 'none',
    gl: true,
  },

  {
    value: 'hexagon2',
    label: 'M-2.5,4.33H2.5L5,0L2.5,-4.33H-2.5L-5,0Z',
    gl: true,
  },
  {
    value: 'hexagon2-open',
    label: 'M-2.5,4.33H2.5L5,0L2.5,-4.33H-2.5L-5,0Z',
    fill: 'none',
    gl: true,
  },

  {
    value: 'octagon',
    label: 'M-1.92,-4.62H1.92L4.62,-1.92V1.92L1.92,4.62H-1.92L-4.62,1.92V-1.92Z',
  },
  {
    value: 'octagon-open',
    label: 'M-1.92,-4.62H1.92L4.62,-1.92V1.92L1.92,4.62H-1.92L-4.62,1.92V-1.92Z',
    fill: 'none',
  },

  {
    value: 'star',
    label:
      'M1.58,-2.16H6.66L2.54,0.83L4.12,5.66L0,2.67L-4.12,5.66L-2.54,0.83L-6.66,-2.16H-1.58L0,-7Z',
    gl: true,
  },
  {
    value: 'star-open',
    alias: 17,
    label:
      'M1.58,-2.16H6.66L2.54,0.83L4.12,5.66L0,2.67L-4.12,5.66L-2.54,0.83L-6.66,-2.16H-1.58L0,-7Z',
    fill: 'none',
    gl: true,
  },

  {
    value: 'hexagram',
    label:
      'M-3.8,0l-1.9,-3.3h3.8l1.9,-3.3l1.9,3.3h3.8l-1.9,3.3l1.9,3.3h-3.8l-1.9,3.3l-1.9,-3.3h-3.8Z',
  },
  {
    value: 'hexagram-open',
    label:
      'M-3.8,0l-1.9,-3.3h3.8l1.9,-3.3l1.9,3.3h3.8l-1.9,3.3l1.9,3.3h-3.8l-1.9,3.3l-1.9,-3.3h-3.8Z',
    fill: 'none',
  },

  {
    value: 'star-triangle-up',
    label: 'M-6.93,4A 20,20 0 0 1 6.93,4A 20,20 0 0 1 0,-8A 20,20 0 0 1 -6.93,4Z',
  },
  {
    value: 'star-triangle-up-open',
    label: 'M-6.93,4A 20,20 0 0 1 6.93,4A 20,20 0 0 1 0,-8A 20,20 0 0 1 -6.93,4Z',
    fill: 'none',
  },

  {
    value: 'star-triangle-down',
    label: 'M6.93,-4A 20,20 0 0 1 -6.93,-4A 20,20 0 0 1 0,8A 20,20 0 0 1 6.93,-4Z',
  },
  {
    value: 'star-triangle-down-open',
    label: 'M6.93,-4A 20,20 0 0 1 -6.93,-4A 20,20 0 0 1 0,8A 20,20 0 0 1 6.93,-4Z',
    fill: 'none',
  },

  {
    value: 'star-square',
    label:
      'M-5.5,-5.5A 10,10 0 0 1 -5.5,5.5A 10,10 0 0 1 5.5,5.5A 10,10 0 0 1 5.5,-5.5A 10,10 0 0 1 -5.5,-5.5Z',
  },
  {
    value: 'star-square-open',
    label:
      'M-5.5,-5.5A 10,10 0 0 1 -5.5,5.5A 10,10 0 0 1 5.5,5.5A 10,10 0 0 1 5.5,-5.5A 10,10 0 0 1 -5.5,-5.5Z',
    fill: 'none',
  },

  {
    value: 'star-diamond',
    label: 'M-7,0A 9.5,9.5 0 0 1 0,7A 9.5,9.5 0 0 1 7,0A 9.5,9.5 0 0 1 0,-7A 9.5,9.5 0 0 1 -7,0Z',
  },
  {
    value: 'star-diamond-open',
    label: 'M-7,0A 9.5,9.5 0 0 1 0,7A 9.5,9.5 0 0 1 7,0A 9.5,9.5 0 0 1 0,-7A 9.5,9.5 0 0 1 -7,0Z',
    fill: 'none',
  },

  {
    value: 'diamond-tall',
    label: 'M0,7L3.5,0L0,-7L-3.5,0Z',
    gl: true,
  },
  {
    value: 'diamond-tall-open',
    label: 'M0,7L3.5,0L0,-7L-3.5,0Z',
    fill: 'none',
    gl: true,
  },

  {value: 'diamond-wide', label: 'M0,3.5L7,0L0,-3.5L-7,0Z'},
  {
    value: 'diamond-wide-open',
    label: 'M0,3.5L7,0L0,-3.5L-7,0Z',
    fill: 'none',
  },

  {value: 'hourglass', label: 'M5,5H-5L5,-5H-5Z'},
  {value: 'bowtie', label: 'M5,5V-5L-5,5V-5Z', gl: true},
  {
    value: 'cross-thin-open',
    label: 'M0,7V-7M7,0H-7',
    fill: 'none',
    gl: true,
  },
  {
    value: 'x-thin-open',
    label: 'M5,5L-5,-5M5,-5L-5,5',
    fill: 'none',
  },
  {
    value: 'asterisk-open',
    label: 'M0,6V-6M6,0H-6M4.25,4.25L-4.25,-4.25M4.25,-4.25L-4.25,4.25',
    fill: 'none',
    gl: true,
  },

  {
    value: 'hash-open',
    label: 'M2.5,5V-5m-5,0V5M5,2.5H-5m0,-5H5',
    fill: 'none',
  },
  {
    value: 'hash-open-dot',
    label: 'M2.5,5V-5m-5,0V5M5,2.5H-5m0,-5H5M0,0.5L0.5,0L0,-0.5L-0.5,0Z',
    fill: 'none',
  },

  {
    value: 'y-up-open',
    label: 'M-6,4L0,0M6,4L0,0M0,-8L0,0',
    fill: 'none',
    gl: true,
  },
  {
    value: 'y-down-open',
    label: 'M-6,-4L0,0M6,-4L0,0M0,8L0,0',
    fill: 'none',
    gl: true,
  },
  {
    value: 'y-left-open',
    label: 'M4,6L0,0M4,-6L0,0M-8,0L0,0',
    fill: 'none',
  },
  {
    value: 'y-right-open',
    label: 'M-4,6L0,0M-4,-6L0,0M8,0L0,0',
    fill: 'none',
  },
  {value: 'line-ew-open', label: 'M7,0H-7', fill: 'none', gl: true},
  {value: 'line-ns-open', label: 'M0,7V-7', fill: 'none', gl: true},
  {value: 'line-ne-open', label: 'M5,-5L-5,5', fill: 'none'},
  {value: 'line-nw-open', label: 'M5,5L-5,-5', fill: 'none'},
];

class SymbolSelector extends Component {
  constructor(props, context) {
    super(props, context);
    this.setLocals(props, context);
  }

  UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
    this.setLocals(nextProps, nextContext);
  }

  setLocals(props, context) {
    const {fullContainer} = props;
    const {defaultContainer} = context;

    this.markerColor = nestedProperty(fullContainer, 'marker.color').get();
    this.borderWidth = nestedProperty(fullContainer, 'marker.line.width').get();

    if (this.markerColor === MULTI_VALUED) {
      this.markerColor = nestedProperty(defaultContainer, 'marker.color').get();
    }
    this.markerColor = Array.isArray(this.markerColor) ? COLORS.mutedBlue : this.markerColor;

    this.borderColor = this.markerColor;
    if (this.borderWidth) {
      this.borderColor = nestedProperty(fullContainer, 'marker.line.color').get();
      if (this.borderColor === MULTI_VALUED) {
        this.borderColor = nestedProperty(defaultContainer, 'marker.line.color').get();
      }
    }

    this.borderColor = Array.isArray(this.borderColor) ? COLORS.charcoal : this.borderColor;

    this.symbolOptions =
      this.props.container.type === 'scatter3d'
        ? SYMBOLS.filter((option) => option.threeD)
        : [...SYMBOLS];
  }

  render() {
    const {fullValue, updatePlot} = this.props;
    return (
      <Field {...this.props}>
        <SymbolSelectorWidget
          markerColor={this.markerColor}
          borderColor={this.borderColor}
          value={fullValue}
          onChange={updatePlot}
          symbolOptions={this.symbolOptions}
          backgroundDark={tooLight(this.markerColor)}
        />
      </Field>
    );
  }
}

SymbolSelector.propTypes = {
  defaultValue: PropTypes.string,
  fullValue: PropTypes.any,
  updatePlot: PropTypes.func,
  ...Field.propTypes,
};
SymbolSelector.contextTypes = {
  defaultContainer: PropTypes.object,
};

SymbolSelector.defaultProps = {
  showArrows: true,
};

export default connectToContainer(SymbolSelector);
