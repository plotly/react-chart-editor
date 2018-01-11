import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  Panel,
  AxesSelector,
  ColorPicker,
  DataSelector,
  Fold,
  PanelMenuWrapper,
  MultiFormatTextEditor,
  TraceAccordion,
  TraceSelector,
  Numeric,
  localize,
  connectAxesToLayout,
  connectLayoutToPlot,
  connectToContainer,
} from 'react-plotly.js-editor';

// Example of extending the built-in Numeric component
// in this case linked Inches and PixelsPerInch components
// Plotly.js native works in Pixels, so this conversion must happen in the editor

const defaultPpi = 72;

const ppiConvert = (props, context, plotProps) => {
  const {fullValue, updatePlot} = plotProps;
  plotProps.fullValue = fullValue / (context.container.ppi || defaultPpi);
  plotProps.updatePlot = v =>
    updatePlot(v * (context.container.ppi || defaultPpi));
};

const Inches = connectToContainer(Numeric, {
  modifyPlotProps: ppiConvert,
});
Inches.defaultProps = {units: 'inches', step: 0.1, min: 0.1};

const PixelsPerInch = connectToContainer(Numeric, {
  modifyPlotProps: (props, context, plotProps) => {
    plotProps.fullValue = context.container.ppi || defaultPpi;
  },
});

PixelsPerInch.defaultProps = {attr: 'ppi', units: 'px/inch', show: true};

const LayoutPanel = connectLayoutToPlot(Panel);
const AxesFold = connectAxesToLayout(Fold);

class CustomEditor extends Component {
  render() {
    const {localize: _} = this.props;
    return (
      <PanelMenuWrapper>
        <Panel group="Editor" name="Traces">
          <TraceAccordion canAdd>
            <TraceSelector
              label="Plot Type"
              attr="type"
              clearable={false}
              show
            />
            <DataSelector
              label="Labels"
              attr="labels"
              clearable={false}
              hasBlank
            />

            <DataSelector
              label="Values"
              attr="values"
              clearable={false}
              hasBlank
            />

            <DataSelector label="X" attr="x" clearable={false} hasBlank />

            <DataSelector label="Y" attr="y" clearable={false} hasBlank />

            <DataSelector label="Z" attr="z" clearable={false} hasBlank />
          </TraceAccordion>
        </Panel>
        <LayoutPanel group="Editor" name={_('Layout')}>
          <Fold name={_('Canvas Size')}>
            <Numeric label={_('Width')} attr="width" units="px" />
            <Numeric label={_('Height')} attr="height" units="px" />
            <PixelsPerInch label={_('Resolution')} />
            <Inches label={_('Width')} attr="width" />
            <Inches label={_('Height')} attr="height" />
          </Fold>
          <Fold name={_('Colors')}>
            <ColorPicker label={_('Font Color')} attr="font.color" />
            <ColorPicker label={_('Plot Background')} attr="plot_bgcolor" />
            <ColorPicker label={_('Margin Color')} attr="paper_bgcolor" />
          </Fold>
          <AxesFold name={_('Axes')}>
            <AxesSelector />
            <MultiFormatTextEditor attr="title" />
          </AxesFold>
        </LayoutPanel>
      </PanelMenuWrapper>
    );
  }
}

CustomEditor.propTypes = {
  localize: PropTypes.func,
};

export default localize(CustomEditor);
