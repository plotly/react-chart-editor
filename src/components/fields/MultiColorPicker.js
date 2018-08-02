import React, {Component} from 'react';
import Color from './Color';
import Colorscale from './Colorscale';
import Info from './Info';
import Field from './Field';
import RadioBlocks from '../widgets/RadioBlocks';
import PropTypes from 'prop-types';
import {adjustColorscale, connectToContainer} from 'lib';

class UnconnectedMultiColorPicker extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      selectedConstantColorOption:
        context.traceIndexes.length > 1 ? 'multiple' : 'single',
    };
    this.setColor = this.setColor.bind(this);
    this.setColors = this.setColors.bind(this);
  }

  setColor(color) {
    this.props.updatePlot(color);
  }

  setColors(colorscale, colorscaleType) {
    const numberOfTraces = this.context.traceIndexes.length;
    const colors = colorscale.map(c => c[1]);

    let adjustedColors = colors;

    if (colorscaleType !== 'categorical') {
      adjustedColors = adjustColorscale(colors, numberOfTraces, colorscaleType);
    }

    if (
      adjustedColors.every(c => c === adjustedColors[0]) ||
      colorscaleType === 'categorical'
    ) {
      adjustedColors = adjustColorscale(
        colors,
        numberOfTraces,
        colorscaleType,
        {repeat: true}
      );
    }

    const updates = adjustedColors.map(color => ({
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
    const selectedConstantColorOption = this.props.parentState
      ? this.props.parentState.selectedConstantColorOption
      : this.state.selectedConstantColorOption;

    if (this.context.traceIndexes.length > 1) {
      return (
        <Field>
          <RadioBlocks
            options={constantOptions}
            activeOption={
              this.props.parentState
                ? this.props.parentState.selectedConstantColorOption
                : this.state.selectedConstantColorOption
            }
            onOptionChange={
              this.props.onConstantColorOptionChange
                ? this.props.onConstantColorOptionChange
                : value => this.setState({selectedConstantColorOption: value})
            }
          />
          <Info>
            {selectedConstantColorOption === 'single'
              ? this.props.singleColorMessage
                ? this.props.singleColorMessage
                : _('All will be colored in the same color.')
              : this.props.multiColorMessage
                ? this.props.multiColorMessage
                : _('The selected colors will be used to color.')}
          </Info>
          {selectedConstantColorOption === 'single' ? (
            <Color
              attr={this.props.attr}
              updatePlot={
                this.props.setColor ? this.props.setColor : this.setColor
              }
            />
          ) : (
            <Colorscale
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
      <Color
        attr={this.props.attr}
        updatePlot={this.props.setColor ? this.props.setColor : this.setColor}
      />
    );
  }
}

UnconnectedMultiColorPicker.propTypes = {
  multiColorMessage: PropTypes.string,
  singleColorMessage: PropTypes.string,
  updatePlot: PropTypes.func,
  attr: PropTypes.string,
  parentState: PropTypes.object,
  onConstantColorOptionChange: PropTypes.func,
  ...Field.propTypes,
};

UnconnectedMultiColorPicker.contextTypes = {
  localize: PropTypes.func,
  updateContainer: PropTypes.func,
  traceIndexes: PropTypes.array,
  fullData: PropTypes.array,
};

export default connectToContainer(UnconnectedMultiColorPicker, {
  modifyPlotProps(props, context, plotProps) {
    plotProps.fullValue = context.traceIndexes
      .map(index => {
        const trace = context.fullData.filter(
          trace => trace.index === index
        )[0];

        const properties = props.attr.split('.');
        let value = trace;

        properties.forEach(prop => {
          value = value[prop];
        });

        return value;
      })
      .map(c => [0, c]);
  },
});
