import React from 'react';
import PropTypes from 'prop-types';

import {
  ColorPicker,
  Dropdown,
  Flaglist,
  ContourNumeric,
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
  TraceTypeSection,
  TraceRequiredPanel,
  TraceMarkerSection,
} from '../components';

import {localize} from '../lib';

const StyleTracesPanel = ({localize: _}) => (
  <TraceRequiredPanel>
    <TraceAccordion>
      <Section name={_('Trace')}>
        <TextEditor label={_('Name')} attr="name" richTextOnly />
        <Radio
          label={_('Orientation')}
          attr="orientation"
          options={[
            {label: _('Vertical'), value: 'v'},
            {label: _('Horizontal'), value: 'h'},
          ]}
        />
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
          attr="boxpoints"
          options={[
            {label: _('Show'), value: 'all'},
            {label: _('Hide'), value: false},
          ]}
        />
        <Numeric label={_('Jitter')} attr="jitter" min={0} max={1} step={0.1} />
        <Numeric
          label={_('Position')}
          attr="pointpos"
          min={-2}
          max={2}
          step={0.1}
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

      <TraceTypeSection name={_('Lines')} traceTypes={['scatter', 'contour']}>
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

      <Section name={_('Heatmap')}>
        <Radio
          label={_('Smoothing')}
          attr="zsmooth"
          options={[
            {label: _('On'), value: 'fast'},
            {label: _('Off'), value: false},
          ]}
        />
        <Numeric label={_('Horizontal Gaps')} attr="xgap" />
        <Numeric label={_('Vertical Gaps')} attr="ygap" />
      </Section>

      <TraceTypeSection
        name={_('Gaps in Data')}
        traceTypes={['heatmap', 'contour']}
      >
        <Radio
          label={_('Interpolate Gaps')}
          attr="connectgaps"
          options={[
            {label: _('On'), value: true},
            {label: _('Off'), value: false},
          ]}
        />
      </TraceTypeSection>

      <Section name={_('Contours')}>
        <Radio
          label={_('Coloring')}
          attr="contours.coloring"
          options={[
            {label: _('Fill'), value: 'fill'},
            {label: _('Heatmap'), value: 'heatmap'},
            {label: _('Lines'), value: 'lines'},
          ]}
        />
        <Radio
          label={_('Contour Lines')}
          attr="contours.showlines"
          options={[
            {label: _('On'), value: true},
            {label: _('Off'), value: false},
          ]}
        />
        <Radio
          label={_('Number of Contours')}
          attr="autocontour"
          options={[
            {label: _('Auto'), value: true},
            {label: _('Custom'), value: false},
          ]}
        />
        <Numeric label={_('Max Contours')} attr="ncontours" />

        <ContourNumeric label={_('Step Size')} attr="contours.size" />
        <ContourNumeric label={_('Min Contour')} attr="contours.start" />
        <ContourNumeric label={_('Max Contour')} attr="contours.end" />
      </Section>

      <Section name={_('Lighting')}>
        <Numeric
          label={_('Ambient')}
          attr="lighting.ambient"
          units="%"
          step={0.1}
        />
        <Numeric
          label={_('Diffuse')}
          attr="lighting.diffuse"
          units="%"
          step={0.1}
        />
        <Numeric
          label={_('Specular')}
          attr="lighting.specular"
          units="%"
          step={0.1}
        />
        <Numeric
          label={_('Roughness')}
          attr="lighting.roughness"
          units="%"
          step={0.1}
        />
        <LayoutNumericFraction
          label={_('Fresnel')}
          attr="lighting.fresnel"
          units="%"
          step={0.1}
        />
      </Section>

      <Section name={_('Light Position')}>
        <Numeric label={_('X')} attr="lightposition.x" />
        <Numeric label={_('Y')} attr="lightposition.y" />
        <Numeric label={_('Z')} attr="lightposition.z" />
      </Section>

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

      <Section name={_('Highlight')}>
        <Radio
          attr="boxmean"
          label={_('Mean')}
          options={[
            {label: _('Show'), value: true},
            {label: _('Hide'), value: false},
          ]}
        />
        <Radio
          attr="boxmean"
          label={_('Standard Deviation')}
          options={[
            {label: _('Show'), value: 'sd'},
            {label: _('Hide'), value: false},
          ]}
        />
      </Section>

      <Section name={_('Values Shown On Hover')}>
        <Flaglist
          attr="hoverinfo"
          label={_('Values Shown On Hover')}
          options={[
            {label: _('X'), value: 'x'},
            {label: _('Y'), value: 'y'},
            {label: _('Z'), value: 'z'},
          ]}
        />
      </Section>

      <Section name={_('Hover Action')}>
        <Flaglist
          attr="hoveron"
          label={_('Hover on')}
          options={[
            {label: _('Boxes'), value: 'boxes'},
            {label: _('Points'), value: 'points'},
          ]}
        />
        <TextEditor attr="text" label={_('Text')} richTextOnly />
      </Section>
    </TraceAccordion>
  </TraceRequiredPanel>
);

StyleTracesPanel.propTypes = {
  localize: PropTypes.func,
};

export default localize(StyleTracesPanel);
