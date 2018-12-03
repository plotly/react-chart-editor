import React from 'react';
// import PropTypes from 'prop-types';
import {
  ColorPicker,
  FontSelector,
  PlotlyFold,
  Numeric,
  Radio,
  PlotlySection,
  Dropdown,
  TraceRequiredPanel,
} from '../components';
import {EditorControlsContext} from '../context';

const StyleLegendPanel = () => (
  <EditorControlsContext.Consumer>
    {({localize: _}) => (
      <TraceRequiredPanel>
        <PlotlyFold name={_('Legend')}>
          <Radio
            attr="showlegend"
            options={[{label: _('Show'), value: true}, {label: _('Hide'), value: false}]}
          />
          <PlotlySection name={_('Text')}>
            <FontSelector label={_('Typeface')} attr="legend.font.family" />
            <Numeric label={_('Size')} attr="legend.font.size" units="px" />
            <ColorPicker label={_('Color')} attr="legend.font.color" />
          </PlotlySection>
          <PlotlySection name={_('Legend Box')}>
            <Numeric label={_('Border Width')} attr="legend.borderwidth" units="px" />
            <ColorPicker label={_('Border Color')} attr="legend.bordercolor" />
            <ColorPicker label={_('Background Color')} attr="legend.bgcolor" />
          </PlotlySection>
          <PlotlySection name={_('Horizontal Positioning')}>
            <Dropdown
              label={_('Anchor Point')}
              clearable={false}
              attr="legend.xanchor"
              options={[
                {label: _('Auto'), value: 'auto'},
                {label: _('Left'), value: 'left'},
                {label: _('Center'), value: 'center'},
                {label: _('Right'), value: 'right'},
              ]}
            />
            <Numeric label={_('Position')} showSlider step={0.02} attr="legend.x" />
          </PlotlySection>
          <PlotlySection name={_('Vertical Positioning')}>
            <Dropdown
              label={_('Anchor Point')}
              clearable={false}
              attr="legend.yanchor"
              options={[
                {label: _('Auto'), value: 'auto'},
                {label: _('Top'), value: 'top'},
                {label: _('Middle'), value: 'middle'},
                {label: _('Bottom'), value: 'bottom'},
              ]}
            />
            <Numeric label={_('Position')} showSlider step={0.02} attr="legend.y" />
          </PlotlySection>
          <PlotlySection name={_('Orientation')}>
            <Radio
              attr="legend.orientation"
              options={[{label: _('Vertical'), value: 'v'}, {label: _('Horizontal'), value: 'h'}]}
            />
          </PlotlySection>
          <PlotlySection name={_('Trace Order')}>
            <Dropdown
              attr="legend.traceorder"
              options={[
                {label: _('Normal'), value: 'normal'},
                {label: _('Reversed'), value: 'reversed'},
                {label: _('Grouped'), value: 'grouped'},
                {label: _('Reversed and Grouped'), value: 'reversed+grouped'},
              ]}
            />
            <Numeric label={_('Gap Between Groups')} attr="legend.tracegroupgap" units="px" />
          </PlotlySection>
        </PlotlyFold>
      </TraceRequiredPanel>
    )}
  </EditorControlsContext.Consumer>
);

export default StyleLegendPanel;
