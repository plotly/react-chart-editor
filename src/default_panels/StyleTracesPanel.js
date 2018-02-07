import React from 'react';
import PropTypes from 'prop-types';

import {
  ColorPicker,
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
  TraceMarkerSection,
  TraceOrientation,
  ColorscalePicker,
  HoverInfo,
  FillDropdown,
} from '../components';

import {localize} from '../lib';

const StyleTracesPanel = ({localize: _}) => (
  <TraceAccordion>
    <Section name={_('Trace')} attr="name">
      <TextEditor label={_('Name')} attr="name" richTextOnly />
      <TraceOrientation
        label={_('Orientation')}
        attr="orientation"
        options={[
          {label: _('Vertical'), value: 'v'},
          {label: _('Horizontal'), value: 'h'},
        ]}
      />

      <Numeric label={_('Opacity')} step={0.1} attr="opacity" />
      <ColorPicker label={_('Color')} attr="color" />
    </Section>

    <Section name={_('Text Attributes')}>
      <Flaglist
        attr="textinfo"
        options={[
          {label: _('Label'), value: 'label'},
          {label: _('Text'), value: 'text'},
          {label: _('Value'), value: 'value'},
          {label: _('%'), value: 'percent'},
        ]}
      />
    </Section>

    <Section name={_('Display')}>
      <Flaglist
        attr="mode"
        options={[
          {label: _('Lines'), value: 'lines'},
          {label: _('Points'), value: 'markers'},
          {label: _('Text'), value: 'text'},
        ]}
      />
      <Radio
        attr="flatshading"
        label={_('flatshading')}
        options={[
          {label: _('Enable'), value: true},
          {label: _('Disable'), value: false},
        ]}
      />
    </Section>

    <Section name={_('Filled Area')}>
      <FillDropdown attr="fill" label={_('Fill to')} localize={_} />
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
      <ColorscalePicker label={_('Colorscale')} attr="marker.colorscale" />
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

    <TraceTypeSection
      name={_('Lines')}
      traceTypes={['scatter', 'contour', 'scatterternary']}
    >
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

    <TraceTypeSection name={_('Lines')} traceTypes={['scatter3d']}>
      <Numeric label={_('Width')} attr="line.width" />
      <ColorPicker label={_('Line Color')} attr="line.color" />
      <LineDashSelector label={_('Type')} attr="line.dash" />
      <LineShapeSelector label={_('Shape')} attr="line.shape" />
    </TraceTypeSection>

    <Section name={_('Colorscale')}>
      <ColorscalePicker label={_('Colorscale')} attr="colorscale" />
      <Radio
        label={_('Orientation')}
        attr="reversescale"
        options={[
          {label: _('Normal'), value: false},
          {label: _('Reversed'), value: true},
        ]}
      />
      <Radio
        label={_('Range')}
        attr="zauto"
        options={[
          {label: _('Auto'), value: true},
          {label: _('Custom'), value: false},
        ]}
      />
      <Numeric label={_('Min')} attr="zmin" />
      <Numeric label={_('Max')} attr="zmax" />
      <Radio
        label={_('Color Bar')}
        attr="showscale"
        options={[
          {label: _('Show'), value: true},
          {label: _('Hide'), value: false},
        ]}
      />
    </Section>
    <Section name={_('Heatmap')}>
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
      <Numeric
        label={_('Vertex Normal')}
        attr="lighting.vertexnormalsepsilon"
        units="%"
        step={0.1}
      />
      <Numeric
        label={_('Face Normal')}
        attr="lighting.facenormalsepsilon"
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

    <Section name={_('On Hover')}>
      <HoverInfo
        attr="hoverinfo"
        label={_('Values Shown On Hover')}
        localize={_}
      />
      <Radio
        label={_('Show contour')}
        attr="contour.show"
        options={[
          {label: _('Show'), value: true},
          {label: _('Hide'), value: false},
        ]}
      />
      <ColorPicker label={_('Contour Color')} attr="contour.color" />
      <Numeric label={_('Contour Width')} attr="contour.width" />
    </Section>

    <TraceTypeSection name={_('Hover Action')} traceTypes={['box']}>
      <Flaglist
        attr="hoveron"
        label={_('Hover on')}
        options={[
          {label: _('Boxes'), value: 'boxes'},
          {label: _('Points'), value: 'points'},
        ]}
      />
    </TraceTypeSection>

    <TraceTypeSection
      name={_('Hover Action')}
      traceTypes={['scatter', 'scatterternary']}
    >
      <Flaglist
        attr="hoveron"
        label={_('Hover on')}
        options={[
          {label: _('Fills'), value: 'fills'},
          {label: _('Points'), value: 'points'},
        ]}
      />
    </TraceTypeSection>
  </TraceAccordion>
);

StyleTracesPanel.propTypes = {
  localize: PropTypes.func,
};

export default localize(StyleTracesPanel);
