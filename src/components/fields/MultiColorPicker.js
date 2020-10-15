import ColorPicker from './ColorPicker';
import {UnconnectedColorscalePicker} from './ColorscalePicker';
import Field from './Field';
import Info from './Info';
import PropTypes from 'prop-types';
import RadioBlocks from '../widgets/RadioBlocks';
import {Component} from 'react';
import nestedProperty from 'plotly.js/src/lib/nested_property';
import {adjustColorscale, connectToContainer} from 'lib';

const CustomColorscalePicker = connectToContainer(UnconnectedColorscalePicker, {
  modifyPlotProps: (props, context, plotProps) => {
    if (
      props.attr === 'marker.color' &&
      context.fullData
        .filter((t) => context.traceIndexes.includes(t.index))
        .every((t) => t.marker && t.marker.color) &&
      plotProps.fullValue &&
      typeof plotProps.fullValue === 'string'
    ) {
      plotProps.fullValue =
        context.fullData &&
        context.fullData
          .filter((t) => context.traceIndexes.includes(t.index))
          .map((t) => [0, t.marker.color]);
    }
  },
});

class UnconnectedMultiColorPicker extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      selectedConstantColorOption:
        context.traceIndexes.length > 1 &&
        props.fullValue &&
        props.fullValue.every((v) => v[1] === props.fullValue[0][1])
          ? 'single'
          : 'multiple',
    };
    this.setColor = this.setColor.bind(this);
    this.setColors = this.setColors.bind(this);
  }

  setColor(color) {
    if (this.props.setColor) {
      this.props.setColor(color);
    } else {
      this.props.updatePlot(color);
    }
  }

  setColors(colorscale, colorscaleType) {
    const numberOfTraces = this.props.tracesToColor.length;
    const colors = colorscale.map((c) => c[1]);

    let adjustedColors = colors;

    if (colorscaleType !== 'categorical') {
      adjustedColors = adjustColorscale(colors, numberOfTraces, colorscaleType);
    }

    if (adjustedColors.every((c) => c === adjustedColors[0]) || colorscaleType === 'categorical') {
      adjustedColors = adjustColorscale(colors, numberOfTraces, colorscaleType, {repeat: true});
    }

    const updates = adjustedColors.map((color) => ({
      [this.props.attr]: color,
    }));

    this.context.updateContainer(updates);
  }

  render() {
    const _ = this.context.localize;
    const constantOptions = [
      {label: _('Single'), value: 'single'},
      {label: _('Multiple'), value: 'multiple'},
    ];
    const selectedConstantColorOption = this.props.parentSelectedConstantColorOption
      ? this.props.parentSelectedConstantColorOption
      : this.state.selectedConstantColorOption;

    const multiMessage = this.props.multiColorMessage
      ? this.props.multiColorMessage
      : _('Each will be colored according to the selected colors.');

    const singleMessage = this.props.singleColorMessage
      ? this.props.singleColorMessage
      : _('All will be colored in the same color.');

    if (this.context.traceIndexes.length > 1) {
      return (
        <Field {...this.props} suppressMultiValuedMessage>
          <RadioBlocks
            options={constantOptions}
            activeOption={selectedConstantColorOption}
            onOptionChange={
              this.props.onConstantColorOptionChange
                ? this.props.onConstantColorOptionChange
                : (value) => this.setState({selectedConstantColorOption: value})
            }
          />
          <Info>{selectedConstantColorOption === 'single' ? singleMessage : multiMessage}</Info>
          {selectedConstantColorOption === 'single' ? (
            <ColorPicker attr={this.props.attr} updatePlot={this.setColor} />
          ) : (
            <CustomColorscalePicker
              suppressMultiValuedMessage
              attr={this.props.attr}
              updatePlot={this.setColors}
              fullValue={this.props.fullValue}
              initialCategory={'categorical'}
            />
          )}
        </Field>
      );
    }

    return (
      <ColorPicker attr={this.props.attr} updatePlot={this.setColor} label={this.props.label} />
    );
  }
}

UnconnectedMultiColorPicker.propTypes = {
  multiColorMessage: PropTypes.string,
  singleColorMessage: PropTypes.string,
  updatePlot: PropTypes.func,
  attr: PropTypes.string,
  parentSelectedConstantColorOption: PropTypes.string,
  onConstantColorOptionChange: PropTypes.func,
  messageKeyWordSingle: PropTypes.string,
  messageKeyWordPlural: PropTypes.string,
  tracesToColor: PropTypes.array,
  ...Field.propTypes,
};

UnconnectedMultiColorPicker.contextTypes = {
  localize: PropTypes.func,
  updateContainer: PropTypes.func,
  traceIndexes: PropTypes.array,
  fullData: PropTypes.array,
};

UnconnectedMultiColorPicker.displayName = 'UnconnectedMultiColorPicker';

export default connectToContainer(UnconnectedMultiColorPicker, {
  modifyPlotProps(props, context, plotProps) {
    if (plotProps.isVisible) {
      const colors = [];
      let tracesToColor = [];
      const dedupedTraceIndexes = [];

      context.traceIndexes.forEach((i) => {
        if (!dedupedTraceIndexes.includes(i)) {
          dedupedTraceIndexes.push(i);
        }
      });

      dedupedTraceIndexes.forEach((traceIndex) => {
        const traces = context.fullData.filter((trace) => trace.index === traceIndex);
        tracesToColor = tracesToColor.concat(traces);

        traces.forEach((t) => {
          const value = nestedProperty(t, props.attr).get();
          if (value) {
            colors.push(value);
          }
        });
      });

      plotProps.tracesToColor = tracesToColor;
      plotProps.fullValue = colors.map((c) => [0, c]);
    }
  },
});
