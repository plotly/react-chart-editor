import React from 'react';
import PropTypes from 'prop-types';
import {
  ColorPicker,
  Dropdown,
  FontSelector,
  PlotlyFold,
  Numeric,
  TextEditor,
  PlotlySection,
  TraceRequiredPanel,
  VisibilitySelect,
} from '../components';

const StyleLayoutPanel = (props, {localize: _}) => (
  <TraceRequiredPanel>
    <PlotlyFold name={_('Canvas')}>
      <VisibilitySelect
        attr="autosize"
        label={_('Size')}
        options={[
          {label: _('Auto'), value: true},
          {label: _('Custom'), value: false},
        ]}
        showOn={false}
        defaultOpt={true}
      >
        <Numeric label={_('Fixed Width')} attr="width" units="px" />
        <Numeric label={_('Fixed height')} attr="height" units="px" />
      </VisibilitySelect>
      <ColorPicker label={_('Plot Background')} attr="plot_bgcolor" />
      <ColorPicker label={_('Plot Background')} attr="polar.bgcolor" />
      <ColorPicker label={_('Margin Color')} attr="paper_bgcolor" />
      <Dropdown
        label="Hover Interaction"
        attr="hovermode"
        options={[
          {label: _('Closest'), value: 'closest'},
          {label: _('X Axis'), value: 'x'},
          {label: _('Y Axis'), value: 'y'},
          {label: _('Disable'), value: false},
        ]}
        clearable={false}
      />
      <Dropdown
        label="Drag Interaction"
        attr="dragmode"
        options={[
          {label: _('Orbit'), value: 'orbit'},
          {label: _('Turntable'), value: 'turntable'},
          {label: _('Zoom'), value: 'zoom'},
          {label: _('Pan'), value: 'pan'},
        ]}
        clearable={false}
      />
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
