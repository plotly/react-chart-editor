import {UnconnectedDropdown} from './Dropdown';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import nestedProperty from 'plotly.js/src/lib/nested_property';
import {connectToPlot} from '../lib';

class TraceSelector extends Component {
  constructor(props, context) {
    super(props, context);
    this.updatePlot = this.updatePlot.bind(this);
    this.fullValue = this.fullValue.bind(this);

    const scatterAttrs = this.context.plotSchema.traces.scatter.attributes;
    this.fillTypes = scatterAttrs.fill.values.filter(v => v !== 'none');
  }

  updatePlot(value) {
    let update;
    if (value === 'line') {
      update = {type: ['scatter'], mode: ['lines'], fill: ['none']};
    } else if (value === 'scatter') {
      update = {type: ['scatter'], mode: ['markers'], fill: ['none']};
    } else if (value === 'area') {
      update = {type: ['scatter'], fill: ['tozeroy']};
    } else {
      update = {type: [value]};
    }

    this.props.updateContainer && this.props.updateContainer(update);
  }

  fullValue() {
    const type = this.props.fullValue();

    // we use gd.data instead of fullData so that we can show the trace
    // even if the trace is not visible due to missing data.
    // If we used fullData mode or fill will be undefined as the fullTrace
    // isn't computed when not visible.
    const mode = nestedProperty(this.props.trace, 'mode').get();
    const fill = nestedProperty(this.props.trace, 'fill').get();

    if (type === 'scatter' && this.fillTypes.includes(fill)) {
      return 'area';
    }

    if (type === 'scatter' && mode === 'lines') {
      return 'line';
    }

    return type;
  }

  render() {
    const props = Object.assign({}, this.props, {
      fullValue: this.fullValue,
      updatePlot: this.updatePlot,
    });

    return <UnconnectedDropdown {...props} />;
  }
}

TraceSelector.contextTypes = {
  plotSchema: PropTypes.object,
};

export default connectToPlot(TraceSelector);
