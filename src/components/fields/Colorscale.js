import ColorscalePicker from '../widgets/ColorscalePicker';
import Field from './Field';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connectToContainer} from 'lib';

class Colorscale extends Component {
  constructor(props) {
    super(props);
    this.onUpdate = this.onUpdate.bind(this);
  }

  onUpdate(colorscale) {
    if (Array.isArray(colorscale)) {
      this.props.updatePlot(
        colorscale.map((c, i) => {
          let step = i / (colorscale.length - 1);
          if (i === 0) {
            step = 0;
          }
          return [step, c];
        })
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
  },
});
