import Dropdown from './Dropdown';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import nestedProperty from 'plotly.js/src/lib/nested_property';
import {connectToPlot} from '../lib';

class TraceSelector extends Component {
  constructor() {
    super();
    this.updatePlot = this.updatePlot.bind(this);
    this.fullValue = this.fullValue.bind(this);
  }

  updatePlot(value) {
    let update;
    if (value === 'line') {
      update = {type: ['scatter'], mode: ['lines']};
    } else if (value === 'scatter') {
      update = {type: ['scatter'], mode: ['markers']};
    } else if (value === 'area') {
      update = {type: ['scatter'], fill: ['tozeroy']};
    } else {
      update = {type: [value]};
    }

    this.props.onUpdate && this.props.onUpdate(update, [this.props.index]);
  }

  fullValue() {
    const type = this.props.fullValue();

    // we use gd.data instead of fullData so that we can show the trace
    // even if the trace is not visible due to missing data.
    // If we used fullData mode or fill will be undefined as the fullTrace
    // isn't computed when not visible.
    const mode = nestedProperty(this.props.trace, 'mode').get();
    const fill = nestedProperty(this.props.trace, 'fill').get();

    if (type === 'scatter' && fill === 'tozeroy') {
      return 'area';
    }

    if (type === 'scatter' && mode === 'lines') {
      return 'line';
    }

    return type;
  }

  render() {
    const modifiedPlotProps = Object.assign({}, this.plotProps, {
      fullValue: this.fullValue,
      updatePlot: this.updatePlot,
    });

    return <Dropdown {...this.props} plotProps={modifiedPlotProps} />;
  }
}

export default connectToPlot(TraceSelector);
