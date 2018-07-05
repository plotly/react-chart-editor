import React from 'react';
import PropTypes from 'prop-types';
import {
  CanvasSize,
  ColorPicker,
  FontSelector,
  PlotlyFold,
  Numeric,
  Radio,
  TextEditor,
  PlotlySection,
  TraceRequiredPanel,
  NumericFraction,
} from '../components';

const StyleLayoutPanel = (props, {localize: _}) => (
  <TraceRequiredPanel>
    <PlotlyFold name={_('Canvas')}>
      <Radio
        label={_('Size')}
        attr="autosize"
        options={[
          {label: _('Auto'), value: true},
          {label: _('Custom'), value: false},
        ]}
      />
      <CanvasSize label={_('Fixed Width')} attr="width" units="px" />
      <CanvasSize label={_('Fixed Height')} attr="height" units="px" />
      <ColorPicker label={_('Plot Background')} attr="plot_bgcolor" />
      <ColorPicker label={_('Plot Background')} attr="polar.bgcolor" />
      <ColorPicker label={_('Margin Color')} attr="paper_bgcolor" />
      <Radio
        label="Hover Interaction"
        attr="hovermode"
        options={[
          {label: _('Enable'), value: 'closest'},
          {label: _('Disable'), value: false},
        ]}
      />

      <PlotlySection name={_('Box Display Options')} attr="boxmode">
        <Radio
          label={_('Mode')}
          attr="boxmode"
          options={[
            {label: _('Overlay'), value: 'overlay'},
            {label: _('Group'), value: 'group'},
          ]}
        />
        <NumericFraction label={_('Gap Between Boxes')} attr="boxgap" />
        <NumericFraction
          label={_('Gap Between Boxes of Same Group')}
          attr="boxgroupgap"
        />
      </PlotlySection>

      <PlotlySection name={_('Bar Display Options')} attr="barmode">
        <Radio
          label={_('Mode')}
          attr="barmode"
          options={[
            {label: _('Overlay'), value: 'overlay'},
            {label: _('Group'), value: 'group'},
            {label: _('Stack'), value: 'stack'},
            {label: _('Relative'), value: 'relative'},
          ]}
        />
        <Radio
          label={_('Normalization for Bar Traces')}
          attr="barnorm"
          options={[
            {label: _('None'), value: ''},
            {label: _('Fraction'), value: 'fraction'},
            {label: _('Percent'), value: 'percent'},
          ]}
        />
        <NumericFraction label={_('Gap Between Bars')} attr="bargap" />
        <NumericFraction
          label={_('Gap Between Bars of Same Group')}
          attr="bargroupgap"
        />
      </PlotlySection>
      <PlotlySection name={_('Violin Display Options')} attr="violinmode">
        <Radio
          label={_('Mode')}
          attr="violinmode"
          options={[
            {label: _('Overlay'), value: 'overlay'},
            {label: _('Group'), value: 'group'},
          ]}
        />
        <NumericFraction label={_('Gap Between Violins')} attr="violingap" />
        <NumericFraction
          label={_('Gap Between Violins of Same Group')}
          attr="violingroupgap"
        />
      </PlotlySection>
    </PlotlyFold>
    <PlotlyFold name={_('Title and Fonts')}>
      <PlotlySection name={_('Title')} attr="title">
        <TextEditor attr="title" />
        <FontSelector
          label={_('Typeface')}
          attr="titlefont.family"
          clearable={false}
        />
        <Numeric label={_('Font Size')} attr="titlefont.size" units="px" />
        <ColorPicker label={_('Font Color')} attr="titlefont.color" />
      </PlotlySection>
      <PlotlySection name={_('Global Font')}>
        <FontSelector
          label={_('Typeface')}
          attr="font.family"
          clearable={false}
        />
        <Numeric label={_('Font Size')} attr="font.size" units="px" />
        <ColorPicker label={_('Font Color')} attr="font.color" />
      </PlotlySection>
    </PlotlyFold>
    <PlotlyFold name={_('Margins and Padding')}>
      <Numeric label={_('Top')} attr="margin.t" units="px" />
      <Numeric label={_('Bottom')} attr="margin.b" units="px" />
      <Numeric label={_('Left')} attr="margin.l" units="px" />
      <Numeric label={_('Right')} attr="margin.r" units="px" />
      <Numeric label={_('Padding')} attr="margin.pad" units="px" />
    </PlotlyFold>
  </TraceRequiredPanel>
);

StyleLayoutPanel.contextTypes = {
  localize: PropTypes.func,
};

export default StyleLayoutPanel;
