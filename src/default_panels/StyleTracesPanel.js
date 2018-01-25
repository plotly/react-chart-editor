import React from 'react';
import PropTypes from 'prop-types';

import {
  ColorPicker,
  Dropdown,
  Flaglist,
  LayoutNumericFraction,
  LayoutNumericFractionInverse,
  LineDashSelector,
  LineShapeSelector,
  Numeric,
  Radio,
  TextEditor,
  Section,
  SymbolSelector,
  TraceAccordion,
  TraceMarkerSection,
  TraceRequiredPanel,
  TraceTypeSection,
} from '../components';

import {localize} from '../lib';

const StyleTracesPanel = ({localize: _}) => (
  <TraceRequiredPanel>
    <TraceAccordion>
      <Section
        name={_('Trace')}
        infoTextIfEmpty={_(
          'Trace opacity is not supported for a scatter trace with fill ' +
            'or for a scatter trace that gets filled by another scatter trace.'
        )}
      >
        <Numeric label={_('Opacity')} step={0.1} attr="opacity" />
      </Section>

      <Section name={_('Text Attributes')}>
        <Flaglist
          attr="textinfo"
          options={[
            {label: 'Label', value: 'label'},
            {label: 'Text', value: 'text'},
            {label: 'Value', value: 'value'},
            {label: '%', value: 'percent'},
          ]}
        />
      </Section>

      <Section name={_('Display')}>
        <Flaglist
          attr="mode"
          options={[
            {label: 'Lines', value: 'lines'},
            {label: 'Points', value: 'markers'},
          ]}
        />
      </Section>

      <Section name={_('Filled Area')}>
        <Dropdown
          label="Fill to"
          attr="fill"
          clearable={false}
          options={[
            {label: 'None', value: 'none'},
            {label: 'Y = 0', value: 'tozeroy'},
            {label: 'X = 0', value: 'tozerox'},
            {label: 'Previous Y', value: 'tonexty'},
            {label: 'Previous X', value: 'tonextx'},
          ]}
        />

        <ColorPicker label={_('Color')} attr="fillcolor" />
      </Section>

      <TraceMarkerSection>
        <Radio
          attr="orientation"
          options={[
            {label: _('Vertical'), value: 'v'},
            {label: _('Horizontal'), value: 'h'},
          ]}
        />
        <ColorPicker label={_('Color')} attr="marker.color" />
        <Numeric label={_('Opacity')} step={0.1} attr="marker.opacity" />
        <Numeric label={_('Size')} attr="marker.size" />
        <SymbolSelector label={_('Symbol')} attr="marker.symbol" />
        <Numeric label={_('Border Width')} attr="marker.line.width" />
        <ColorPicker label={_('Border Color')} attr="marker.line.color" />
      </TraceMarkerSection>

      <Section name={_('Size and Spacing')}>
        <LayoutNumericFractionInverse label={_('Bar Width')} attr="bargap" />
        <LayoutNumericFractionInverse label={_('Box Width')} attr="boxgap" />
        <LayoutNumericFraction label={_('Bar Padding')} attr="bargroupgap" />
        <LayoutNumericFraction label={_('Box Padding')} attr="boxgroupgap" />
      </Section>

      <Section name={_('Ticks')}>
        <Numeric label={_('Width')} attr="tickwidth" />
      </Section>

      <Section name={_('Whiskers')}>
        <Numeric label={_('Width')} attr="whiskerwidth" />
      </Section>

      <TraceTypeSection name={_('Lines')} traceTypes={['scatter']}>
        <Numeric label={_('Width')} attr="line.width" />
        <ColorPicker label={_('Line Color')} attr="line.color" />
        <LineDashSelector label={_('Type')} attr="line.dash" />
        <LineShapeSelector label={_('Shape')} attr="line.shape" />
        <Radio
          label={_('Connect Gaps')}
          attr="connectgaps"
          options={[
            {label: _('Connect'), value: true},
            {label: _('Blank'), value: false},
          ]}
        />
      </TraceTypeSection>

      <TraceTypeSection name={_('Gaps in data')} traceTypes={['heatmap']}>
        <Radio
          label={_('Connect Gaps')}
          attr="connectgaps"
          options={[
            {label: _('Fill with Interpolation'), value: true},
            {label: _('Blank'), value: false},
          ]}
        />
      </TraceTypeSection>

      <Section name={_('Increasing Trace Styles')}>
        <TextEditor label={_('Name')} attr="increasing.name" richTextOnly />
        <Numeric label={_('Width')} attr="increasing.line.width" />
        <ColorPicker label={_('Line Color')} attr="increasing.line.color" />
        <ColorPicker label={_('Fill Color')} attr="increasing.fillcolor" />
        <LineDashSelector label={_('Type')} attr="increasing.line.dash" />
        <Radio
          label="Show in Legend"
          attr="increasing.showlegend"
          options={[
            {label: _('Show'), value: true},
            {label: _('Hide'), value: false},
          ]}
        />
      </Section>

      <Section name={_('Decreasing Trace Styles')}>
        <TextEditor label={_('Name')} attr="decreasing.name" richTextOnly />
        <Numeric label={_('Width')} attr="decreasing.line.width" />
        <ColorPicker label={_('Line Color')} attr="decreasing.line.color" />
        <ColorPicker label={_('Fill Color')} attr="decreasing.fillcolor" />
        <LineDashSelector label={_('Type')} attr="decreasing.line.dash" />
        <Radio
          label="Show in Legend"
          attr="decreasing.showlegend"
          options={[
            {label: _('Show'), value: true},
            {label: _('Hide'), value: false},
          ]}
        />
      </Section>

      <Section name={_('Text Shown on Hover')}>
        <TextEditor attr="text" />
      </Section>
    </TraceAccordion>
  </TraceRequiredPanel>
);

StyleTracesPanel.propTypes = {
  localize: PropTypes.func,
};

export default localize(StyleTracesPanel);
