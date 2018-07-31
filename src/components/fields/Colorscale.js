import ColorscalePicker from '../widgets/ColorscalePicker';
import Field from './Field';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connectToContainer, adjustColorscale} from 'lib';

class Colorscale extends Component {
  constructor(props) {
    super(props);
    this.onUpdate = this.onUpdate.bind(this);
  }

  onUpdate(colorscale, colorscaleType) {
    if (Array.isArray(colorscale)) {
      if (this.context.container.type === 'pie') {
        const numPieSlices = this.context.graphDiv.calcdata[0].length + 1;
        const adjustedColorscale = adjustColorscale(
          colorscale,
          numPieSlices,
          colorscaleType,
          {repeat: true}
        );
        this.props.updatePlot(adjustedColorscale);
        return;
      }

      this.props.updatePlot(
        colorscale.map((c, i) => {
          let step = i / (colorscale.length - 1);
          if (i === 0) {
            step = 0;
          }
          return [step, c];
        }),
        colorscaleType
      );
    }
  }

  render() {
    const {fullValue} = this.props;
    const colorscale = Array.isArray(fullValue)
      ? fullValue.map(v => v[1])
      : null;

    return (
      <Field {...this.props}>
        <ColorscalePicker
          selected={colorscale}
          onColorscaleChange={this.onUpdate}
          initialCategory={this.props.initialCategory}
        />
      </Field>
    );
  }
}

Colorscale.propTypes = {
  fullValue: PropTypes.any,
  updatePlot: PropTypes.func,
  initialCategory: PropTypes.string,
  ...Field.propTypes,
};

Colorscale.contextTypes = {
  container: PropTypes.object,
  graphDiv: PropTypes.object,
};

export default connectToContainer(Colorscale, {
  modifyPlotProps: (props, context, plotProps) => {
    if (
      props.attr === 'marker.color' &&
      context.fullData
        .filter(t => context.traceIndexes.includes(t.index))
        .every(t => t.marker && t.marker.color) &&
      (plotProps.fullValue && typeof plotProps.fullValue === 'string')
    ) {
      plotProps.fullValue =
        context.fullData &&
        context.fullData
          .filter(t => context.traceIndexes.includes(t.index))
          .map(t => [0, t.marker.color]);
    }

    if (
      context &&
      context.container &&
      context.graphDiv &&
      (!plotProps.fullValue ||
        (Array.isArray(plotProps.fullValue) && !plotProps.fullValue.length)) &&
      context.container.type === 'pie' &&
      context.graphDiv.calcdata
    ) {
      plotProps.fullValue = context.graphDiv.calcdata[0].map(d => [0, d.color]);
    }

    if (
      props.attr === 'marker.colors' &&
      plotProps.fullValue &&
      Array.isArray(plotProps.fullValue) &&
      !plotProps.fullValue.every(el => Array.isArray(el))
    ) {
      plotProps.fullValue = plotProps.fullValue.map(c => [0, c]);
    }

    if (context.container.type === 'pie' && context.traceIndexes.length > 1) {
      plotProps.isVisible = false;
    }
  },
});
