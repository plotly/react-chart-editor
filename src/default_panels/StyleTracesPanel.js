import React from 'react';
import PropTypes from 'prop-types';

import {
  ColorPicker,
  Flaglist,
  ContourNumeric,
  LineDashSelector,
  LineShapeSelector,
  Numeric,
  NumericFraction,
  NumericFractionInverse,
  Radio,
  TextEditor,
  PlotlySection,
  LayoutSection,
  SymbolSelector,
  TraceAccordion,
  TraceTypeSection,
  TraceMarkerSection,
  ColorscalePicker,
  HoverInfo,
  Dropdown,
  FillDropdown,
  FontSelector,
  TextPosition,
} from '../components';
import {BinningNumeric, BinningDropdown} from '../components/fields/derived';

const StyleTracesPanel = (props, {localize: _}) => (
  <TraceAccordion canGroup>
    <TextEditor label={_('Name')} attr="name" richTextOnly />
    <Radio
      label="Show in Legend"
      attr="showlegend"
      options={[
        {label: _('Show'), value: true},
        {label: _('Hide'), value: false},
      ]}
    />
    <NumericFraction label={_('Opacity')} attr="opacity" />
    <ColorPicker label={_('Color')} attr="color" />
    <NumericFraction label={_('Hole Size')} attr="hole" />
    <Dropdown
      label={_('Histogram Normalization')}
      options={[
        {label: _('Number of Occurences'), value: ''},
        {label: _('Percent'), value: 'percent'},
        {label: _('Probability'), value: 'probability'},
        {label: _('Density'), value: 'density'},
        {label: _('Probability Density'), value: 'probability density'},
      ]}
      attr="histnorm"
    />
    <PlotlySection name={_('Cumulative')}>
      <Radio
        label={_('Cumulative')}
        attr="cumulative.enabled"
        options={[
          {label: _('Enabled'), value: true},
          {label: _('Disabled'), value: false},
        ]}
      />
      <Radio
        label={_('Direction')}
        attr="cumulative.direction"
        options={[
          {label: _('Increasing'), value: 'increasing'},
          {label: _('Decreasing'), value: 'decreasing'},
        ]}
      />
      <Radio
        label={_('Current Bin')}
        attr="cumulative.currentbin"
        options={[
          {label: _('Include'), value: 'include'},
          {label: _('Exclude'), value: 'exclude'},
          {label: _('Half'), value: 'half'},
        ]}
      />
    </PlotlySection>

    <PlotlySection name={_('Text Attributes')}>
      <Flaglist
        attr="textinfo"
        options={[
          {label: _('Label'), value: 'label'},
          {label: _('Text'), value: 'text'},
          {label: _('Value'), value: 'value'},
          {label: _('%'), value: 'percent'},
        ]}
      />
    </PlotlySection>
    <PlotlySection name={_('Header')}>
      <Numeric label={_('Height')} attr="header.height" />
      <ColorPicker label={_('Fill Color')} attr="header.fill.color" />
      <FontSelector label={_('Typeface')} attr="header.font.family" />
      <Numeric label={_('Font Size')} attr="header.font.size" />
      <Dropdown
        label={_('Text Alignment')}
        options={[
          {label: _('Left'), value: 'left'},
          {label: _('Center'), value: 'center'},
          {label: _('Right'), value: 'right'},
        ]}
        attr="header.align"
      />
      <ColorPicker label={_('Font Color')} attr="header.font.color" />
      <Numeric label={_('Border Width')} attr="header.line.width" />
      <ColorPicker label={_('Border Color')} attr="header.line.color" />
    </PlotlySection>
    <PlotlySection name={_('Cells')}>
      <Numeric label={_('Height')} attr="cells.height" />
      <ColorPicker label={_('Fill Color')} attr="cells.fill.color" />
      <FontSelector label={_('Typeface')} attr="cells.font.family" />
      <Numeric label={_('Font Size')} attr="cells.font.size" />
      <Dropdown
        label={_('Text Alignment')}
        options={[
          {label: _('Left'), value: 'left'},
          {label: _('Center'), value: 'center'},
          {label: _('Right'), value: 'right'},
        ]}
        attr="cells.align"
      />
      <ColorPicker label={_('Font Color')} attr="cells.font.color" />
      <Numeric label={_('Border Width')} attr="cells.line.width" />
      <ColorPicker label={_('Border Color')} attr="cells.line.color" />
    </PlotlySection>
    <PlotlySection name={_('Display')}>
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
        label={_('Flatshading')}
        options={[
          {label: _('Enable'), value: true},
          {label: _('Disable'), value: false},
        ]}
      />
    </PlotlySection>
    <PlotlySection name={_('Filled Area')}>
      <FillDropdown attr="fill" label={_('Fill to')} />
      <ColorPicker label={_('Color')} attr="fillcolor" />
    </PlotlySection>
    <PlotlySection name={_('Binning')}>
      <BinningDropdown label={_('Binning Function')} attr="histfunc" />
      <Radio
        label={_('X Binning')}
        attr="autobinx"
        options={[
          {label: _('Auto'), value: true},
          {label: _('Custom'), value: false},
        ]}
      />
      <BinningNumeric label={_('X Bin Start')} attr="xbins.start" axis="x" />
      <BinningNumeric label={_('X Bin End')} attr="xbins.end" axis="x" />
      <BinningNumeric label={_('X Bin Size')} attr="xbins.size" axis="x" />
      <Numeric label={_('Max X Bins')} attr="nbinsx" />
      <Radio
        label={_('Y Binning')}
        attr="autobiny"
        options={[
          {label: _('Auto'), value: true},
          {label: _('Custom'), value: false},
        ]}
      />
      <BinningNumeric label={_('Y Bin Start')} attr="ybins.start" axis="y" />
      <BinningNumeric label={_('Y Bin End')} attr="ybins.end" axis="y" />
      <BinningNumeric label={_('Y Bin Size')} attr="ybins.size" axis="y" />
      <Numeric label={_('Max Y Bins')} attr="nbinsy" />
    </PlotlySection>
    <PlotlySection name={_('Gaps Between Cells')}>
      <Numeric label={_('Horizontal Gap')} attr="xgap" />
      <Numeric label={_('Vertical Gap')} attr="ygap" />
    </PlotlySection>
    <TraceMarkerSection>
      <Radio
        label="Order"
        attr="sort"
        options={[
          {label: _('Sorted'), value: true},
          {label: _('Unsorted'), value: false},
        ]}
      />
      <Dropdown
        options={[
          {label: _('Show All'), value: 'all'},
          {label: _('Outliers'), value: 'outliers'},
          {label: _('Suspected Outliers'), value: 'suspectedoutliers'},
          {label: _('Hide'), value: false},
        ]}
        attr="boxpoints"
        clearable={false}
      />
      <Dropdown
        options={[
          {label: _('Show All'), value: 'all'},
          {label: _('Outliers'), value: 'outliers'},
          {label: _('Suspected Outliers'), value: 'suspectedoutliers'},
          {label: _('Hide'), value: false},
        ]}
        attr="points"
        clearable={false}
      />
      <NumericFraction label={_('Jitter')} attr="jitter" />
      <Numeric label={_('Position')} attr="pointpos" step={0.1} showSlider />
      <ColorscalePicker label={_('Colorscale')} attr="marker.colorscale" />
      <ColorPicker label={_('Color')} attr="marker.color" />
      <NumericFraction label={_('Opacity')} attr="marker.opacity" />
      <Numeric label={_('Size')} attr="marker.size" />
      <SymbolSelector label={_('Symbol')} attr="marker.symbol" />
      <Numeric label={_('Border Width')} attr="marker.line.width" />
      <ColorPicker label={_('Border Color')} attr="marker.line.color" />
    </TraceMarkerSection>
    <LayoutSection name={_('Size and Spacing')}>
      <NumericFractionInverse label={_('Bar Width')} attr="bargap" />
      <NumericFractionInverse label={_('Box Width')} attr="boxgap" />
      <NumericFraction label={_('Bar Padding')} attr="bargroupgap" />
      <NumericFraction label={_('Box Padding')} attr="boxgroupgap" />
    </LayoutSection>
    <PlotlySection name={_('Ticks')}>
      <Numeric label={_('Width')} attr="tickwidth" />
    </PlotlySection>
    <PlotlySection name={_('Whiskers')}>
      <Numeric label={_('Width')} attr="whiskerwidth" />
    </PlotlySection>
    <TraceTypeSection
      name={_('Lines')}
      traceTypes={[
        'scatter',
        'contour',
        'scatterternary',
        'scatterpolar',
        'scatterpolargl',
        'scatter3d',
        'scattergl',
      ]}
    >
      <Numeric label={_('Width')} attr="line.width" />
      <ColorPicker label={_('Line Color')} attr="line.color" />
      <Radio
        label={_('Color Bar')}
        attr="line.showscale"
        options={[
          {label: _('Show'), value: true},
          {label: _('Hide'), value: false},
        ]}
      />
      <ColorscalePicker label={_('Colorscale')} attr="line.colorscale" />
      <LineDashSelector label={_('Type')} attr="line.dash" />
      <LineShapeSelector label={_('Shape')} attr="line.shape" />
      <Numeric
        label={_('Smoothing')}
        attr="line.smoothing"
        showSlider
        step={0.1}
      />
      <Radio
        label={_('Connect Gaps')}
        attr="connectgaps"
        options={[
          {label: _('Connect'), value: true},
          {label: _('Blank'), value: false},
        ]}
      />
    </TraceTypeSection>
    <TraceTypeSection
      name={_('Text')}
      traceTypes={['scatter', 'scatterpolar', 'scatterpolargl', 'pie']}
    >
      <FontSelector label={_('Typeface')} attr="textfont.family" />
      <Numeric label={_('Font Size')} attr="textfont.size" units="px" />
      <ColorPicker label={_('Font Color')} attr="textfont.color" />
      <TextPosition label={_('Text Position')} attr="textposition" />
    </TraceTypeSection>
    <PlotlySection name={_('Colorscale')}>
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
    </PlotlySection>
    <PlotlySection name={_('Heatmap')}>
      <Numeric label={_('Horizontal Gaps')} attr="xgap" />
      <Numeric label={_('Vertical Gaps')} attr="ygap" />
    </PlotlySection>
    <TraceTypeSection
      name={_('Gaps in Data')}
      traceTypes={['heatmap', 'contour', 'heatmapgl']}
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
    <PlotlySection name={_('Contours')}>
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
    </PlotlySection>
    <PlotlySection name={_('Lighting')}>
      <NumericFraction label={_('Ambient')} attr="lighting.ambient" />
      <NumericFraction label={_('Diffuse')} attr="lighting.diffuse" />
      <NumericFraction label={_('Specular')} attr="lighting.specular" />
      <NumericFraction label={_('Roughness')} attr="lighting.roughness" />
      <NumericFraction label={_('Fresnel')} attr="lighting.fresnel" />
      <NumericFraction
        label={_('Vertex Normal')}
        attr="lighting.vertexnormalsepsilon"
      />
      <NumericFraction
        label={_('Face Normal')}
        attr="lighting.facenormalsepsilon"
      />
    </PlotlySection>
    <PlotlySection name={_('Light Position')}>
      <NumericFraction label={_('X')} attr="lightposition.x" />
      <NumericFraction label={_('Y')} attr="lightposition.y" />
      <NumericFraction label={_('Z')} attr="lightposition.z" />
    </PlotlySection>
    <PlotlySection name={_('Increasing Trace Styles')}>
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
    </PlotlySection>
    <PlotlySection name={_('Decreasing Trace Styles')}>
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
    </PlotlySection>
    <PlotlySection name={_('Scaling')}>
      <Numeric label={_('Bandwidth')} attr="bandwidth" />
      <Radio
        label="Scale Mode"
        attr="scalemode"
        options={[
          {label: _('Width'), value: 'width'},
          {label: _('Count'), value: 'count'},
        ]}
      />
      <Radio
        label="Span Mode"
        attr="spanmode"
        options={[
          {label: _('Soft'), value: 'soft'},
          {label: _('Hard'), value: 'hard'},
          {label: _('Manual'), value: 'manual'},
        ]}
      />
      <Numeric label={_('Span')} attr="span" />
    </PlotlySection>
    <PlotlySection name={_('Highlight')}>
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
      <Radio
        attr="box.visible"
        label={_('Box Visible')}
        options={[
          {label: _('Show'), value: true},
          {label: _('Hide'), value: false},
        ]}
      />
      <NumericFraction label={_('Box Width')} attr="box.width" />
      <ColorPicker label={_('Box Fill Color')} attr="box.color" />
      <NumericFraction label={_('Box Line Width')} attr="box.line.width" />
      <ColorPicker label={_('Box Line Color')} attr="box.line.color" />
      <Radio
        attr="meanline.visible"
        label={_('Meanline Visible')}
        options={[
          {label: _('Show'), value: true},
          {label: _('Hide'), value: false},
        ]}
      />
      <NumericFraction label={_('Meanline Width')} attr="meanline.width" />
      <ColorPicker label={_('Meanline Color')} attr="meanline.color" />
      <Radio
        attr="side"
        label={_('Density Function Side')}
        options={[
          {label: _('Both'), value: 'both'},
          {label: _('Positive'), value: 'positive'},
          {label: _('Negative'), value: 'negative'},
        ]}
      />
    </PlotlySection>
    <PlotlySection name={_('On Hover')}>
      <HoverInfo attr="hoverinfo" label={_('Values Shown On Hover')} />
      <Radio
        label={_('Show Contour')}
        attr="contour.show"
        options={[
          {label: _('Show'), value: true},
          {label: _('Hide'), value: false},
        ]}
      />
      <ColorPicker label={_('Contour Color')} attr="contour.color" />
      <Numeric label={_('Contour Width')} attr="contour.width" />
    </PlotlySection>
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
      traceTypes={[
        'scatter',
        'scatterternary',
        'scatterpolar',
        'scatterpolargl',
      ]}
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

StyleTracesPanel.contextTypes = {
  localize: PropTypes.func,
};

export default StyleTracesPanel;
