import React from 'react';
// import PropTypes from 'prop-types';

import {
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
  ColorwayPicker,
  HoverInfo,
  Dropdown,
  FillDropdown,
  FontSelector,
  TextPosition,
  MarkerSize,
  MarkerColor,
  MultiColorPicker,
  ErrorBars,
  DataSelector,
  VisibilitySelect,
  GroupCreator,
} from '../components';
import {
  BinningDropdown,
  NumericReciprocal,
  ShowInLegend,
  TextInfo,
  HoveronDropdown,
} from '../components/fields/derived';
import {EditorControlsContext} from '../context';

const StyleTracesPanel = () => (
  <EditorControlsContext.Consumer>
    {({localize: _}) => (
      <TraceAccordion canGroup>
        <TextEditor label={_('Name')} attr="name" richTextOnly />
        <NumericFraction label={_('Trace Opacity')} attr="opacity" />
        <PlotlySection name={_('Legend')}>
          <ShowInLegend
            label={_('Show in Legend')}
            attr="showlegend"
            options={[{label: _('Show'), value: true}, {label: _('Hide'), value: false}]}
            showOn={true}
          >
            <GroupCreator label={_('Legend Group')} prefix={_('Group')} attr="legendgroup" />
          </ShowInLegend>
        </PlotlySection>
        <PlotlySection name={_('Cones & Streamtubes')}>
          <Numeric label={_('Size')} attr="sizeref" stepmode="relative" />
          <Dropdown
            label={_('Size Mode')}
            options={[
              {label: _('scaled'), value: 'scaled'},
              {label: _('absolute'), value: 'absolute'},
            ]}
            attr="sizemode"
          />
          <Dropdown
            label={_('Cone Anchor')}
            options={[
              {label: _('Tip'), value: 'tip'},
              {label: _('Tail'), value: 'tail'},
              {label: _('Center'), value: 'center'},
              {label: _('Center of Mass'), value: 'cm'},
            ]}
            attr="anchor"
          />
          <Numeric label={_('Max Tube segments')} attr="maxdisplayed" />
        </PlotlySection>
        <MultiColorPicker label={_('Color')} attr="color" />
        <TraceTypeSection name={_('Pie Colors')} traceTypes={['pie']} mode="trace">
          <LayoutSection attr="name">
            <ColorwayPicker label={_('Colors')} attr="piecolorway" />
            <Radio
              label={_('Extended Colors')}
              attr="extendpiecolors"
              options={[{label: _('On'), value: true}, {label: _('Off'), value: false}]}
            />
          </LayoutSection>
        </TraceTypeSection>
        <PlotlySection name={_('Pie Title')} attr="title">
          <TextEditor label={_('Name')} attr="title" />
          <Dropdown
            label={'Title Position'}
            attr="titleposition"
            options={[
              {label: _('Top Left'), value: 'top left'},
              {label: _('Top Center'), value: 'top center'},
              {label: _('Top Right'), value: 'top right'},
              {label: _('Middle Center'), value: 'middle center'},
              {label: _('Bottom Left'), value: 'bottom left'},
              {label: _('Bottom Center'), value: 'bottom center'},
              {label: _('Bottom Right'), value: 'bottom right'},
            ]}
          />
          <FontSelector label={_('Typeface')} attr="titlefont.family" clearable={false} />
          <Numeric label={_('Font Size')} attr="titlefont.size" units="px" />
        </PlotlySection>
        <PlotlySection name={_('Values')}>
          <BinningDropdown label={_('Histogram Function')} attr="histfunc" />
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
        </PlotlySection>
        <PlotlySection name={_('Cumulative')}>
          <Radio
            label={_('Cumulative')}
            attr="cumulative.enabled"
            options={[{label: _('Enabled'), value: true}, {label: _('Disabled'), value: false}]}
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

        <PlotlySection name={_('Header')}>
          <Numeric label={_('Height')} attr="header.height" />
          <MultiColorPicker label={_('Fill Color')} attr="header.fill.color" />
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
          <MultiColorPicker label={_('Font Color')} attr="header.font.color" />
          <Numeric label={_('Border Width')} attr="header.line.width" />
          <MultiColorPicker label={_('Border Color')} attr="header.line.color" />
        </PlotlySection>
        <PlotlySection name={_('Cells')}>
          <Numeric label={_('Height')} attr="cells.height" />
          <MultiColorPicker label={_('Fill Color')} attr="cells.fill.color" />
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
          <MultiColorPicker label={_('Font Color')} attr="cells.font.color" />
          <Numeric label={_('Border Width')} attr="cells.line.width" />
          <MultiColorPicker label={_('Border Color')} attr="cells.line.color" />
        </PlotlySection>
        <PlotlySection name={_('Display')}>
          <Flaglist
            attr="mode"
            options={[
              {label: _('Points'), value: 'markers'},
              {label: _('Lines'), value: 'lines'},
              {label: _('Text'), value: 'text'},
            ]}
          />
          <Radio
            attr="flatshading"
            label={_('Flatshading')}
            options={[{label: _('Enable'), value: true}, {label: _('Disable'), value: false}]}
          />
        </PlotlySection>
        <PlotlySection name={_('Binning')}>
          <Numeric label={_('X Bin Start')} attr="xbins.start" axis="x" />
          <Numeric label={_('X Bin End')} attr="xbins.end" axis="x" />
          <Numeric label={_('X Bin Size')} attr="xbins.size" axis="x" />
          <Numeric label={_('Max X Bins')} attr="nbinsx" />

          <Numeric label={_('Y Bin Start')} attr="ybins.start" axis="y" />
          <Numeric label={_('Y Bin End')} attr="ybins.end" axis="y" />
          <Numeric label={_('Y Bin Size')} attr="ybins.size" axis="y" />
          <Numeric label={_('Max Y Bins')} attr="nbinsy" />
        </PlotlySection>
        <PlotlySection label={_('Bar Position')}>
          <Numeric label={_('Base')} attr="base" />
          <Numeric label={_('Offset')} attr="offset" />
          <Numeric label={_('Width')} attr="width" />
        </PlotlySection>

        <TraceMarkerSection>
          <Radio
            label={_('Order')}
            attr="sort"
            options={[{label: _('Sorted'), value: true}, {label: _('Unsorted'), value: false}]}
          />
          <Radio
            label={_('Direction')}
            attr="direction"
            options={[
              {label: _('Clockwise'), value: 'clockwise'},
              {label: _('Counterclockwise'), value: 'counterclockwise'},
            ]}
          />
          <Numeric label={_('Rotation')} attr="rotation" />
          <NumericFraction label={_('Hole Size')} attr="hole" />
          <NumericFraction label={_('Pull')} attr="pull" />
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
          <MarkerColor suppressMultiValuedMessage label={_('Color')} attr="marker.color" />
          <NumericFraction label={_('Point Opacity')} attr="marker.opacity" />
          <MarkerSize label={_('Size')} attr="marker.size" />
          <NumericReciprocal
            label={_('Size Scale')}
            attr="marker.sizeref"
            step={0.2}
            stepmode="relative"
          />
          <Radio
            label={_('Size Mode')}
            attr="marker.sizemode"
            options={[{label: _('Area'), value: 'area'}, {label: _('Diameter'), value: 'diameter'}]}
          />
          <Numeric label={_('Minimum Size')} attr="marker.sizemin" />
          <SymbolSelector label={_('Symbol')} attr="marker.symbol" />
          <Numeric label={_('Border Width')} attr="marker.line.width" />
          <MultiColorPicker label={_('Border Color')} attr="marker.line.color" />
          <Numeric label={_('Max Number of Points')} attr="marker.maxdisplayed" />
        </TraceMarkerSection>

        <TraceTypeSection
          name={_('Bar Size and Spacing')}
          traceTypes={['bar', 'histogram']}
          mode="trace"
        >
          <LayoutSection attr="name">
            <Dropdown
              label={_('Bar Mode')}
              attr="barmode"
              options={[
                {label: _('Overlay'), value: 'overlay'},
                {label: _('Group'), value: 'group'},
                {label: _('Stack'), value: 'stack'},
                {label: _('Relative'), value: 'relative'},
              ]}
              clearable={false}
            />
            <Dropdown
              label={_('Normalization')}
              attr="barnorm"
              options={[
                {label: _('None'), value: ''},
                {label: _('Fraction'), value: 'fraction'},
                {label: _('Percent'), value: 'percent'},
              ]}
              clearable={false}
            />
            <NumericFractionInverse label={_('Bar Width')} attr="bargap" />
            <NumericFraction label={_('Bar Padding')} attr="bargroupgap" />
          </LayoutSection>
        </TraceTypeSection>
        <TraceTypeSection name={_('Box Size and Spacing')} traceTypes={['box']} mode="trace">
          <LayoutSection attr="name">
            <Radio
              label={_('Box Mode')}
              attr="boxmode"
              options={[
                {label: _('Overlay'), value: 'overlay'},
                {label: _('Group'), value: 'group'},
              ]}
            />
            <NumericFractionInverse label={_('Box Width')} attr="boxgap" />
            <NumericFraction label={_('Box Padding')} attr="boxgroupgap" />
          </LayoutSection>
        </TraceTypeSection>
        <TraceTypeSection name={_('Violin Size and Spacing')} traceTypes={['violin']} mode="trace">
          <LayoutSection attr="name">
            <Radio
              label={_('Violin Mode')}
              attr="violinmode"
              options={[
                {label: _('Overlay'), value: 'overlay'},
                {label: _('Group'), value: 'group'},
              ]}
            />
            <NumericFractionInverse label={_('Violin Width')} attr="violingap" />
            <NumericFraction label={_('Violin Padding')} attr="violingroupgap" />
          </LayoutSection>
        </TraceTypeSection>

        <NumericFraction label={_('Whisker Width')} attr="whiskerwidth" />
        <PlotlySection name={_('Ticks')}>
          <Numeric label={_('Width')} attr="tickwidth" />
        </PlotlySection>
        <PlotlySection name={_('Contours')}>
          <Radio
            label={_('Type')}
            attr="contours.type"
            options={[
              {label: _('Levels'), value: 'levels'},
              {label: _('Constraint'), value: 'constraint'},
            ]}
          />
          <Dropdown
            label={_('Coloring')}
            attr="contours.coloring"
            options={[
              {label: _('Fill'), value: 'fill'},
              {label: _('Heatmap'), value: 'heatmap'},
              {label: _('Lines'), value: 'lines'},
              {label: _('None'), value: 'none'},
            ]}
            clearable={false}
          />
          <Radio
            label={_('Contour Lines')}
            attr="contours.showlines"
            options={[{label: _('On'), value: true}, {label: _('Off'), value: false}]}
          />
          <Radio
            label={_('Contour Labels')}
            attr="contours.showlabels"
            options={[{label: _('On'), value: true}, {label: _('Off'), value: false}]}
          />
          <Radio
            label={_('Number of Contours')}
            attr="autocontour"
            options={[{label: _('Auto'), value: true}, {label: _('Custom'), value: false}]}
          />
          <Numeric label={_('Max Contours')} attr="ncontours" />

          <ContourNumeric label={_('Step Size')} attr="contours.size" />
          <ContourNumeric label={_('Min Contour')} attr="contours.start" />
          <ContourNumeric label={_('Max Contour')} attr="contours.end" />
        </PlotlySection>
        <TraceTypeSection name={_('Stacking')} traceTypes={['scatter']} mode="trace">
          <GroupCreator label={_('Group')} prefix={_('Stack')} attr="stackgroup" />
          <Radio
            label={_('Gaps')}
            attr="stackgaps"
            options={[
              {label: _('Infer Zero'), value: 'infer zero'},
              {label: _('Interpolate'), value: 'interpolate'},
            ]}
          />
          <Radio
            label={_('Orientation')}
            attr="orientation"
            options={[{label: _('Horizontal'), value: 'h'}, {label: _('Vertical'), value: 'v'}]}
          />
          <Radio
            label={_('Normalization')}
            attr="groupnorm"
            options={[
              {label: _('None'), value: ''},
              {label: _('Fraction'), value: 'fraction'},
              {label: _('Percent'), value: 'percent'},
            ]}
          />
        </TraceTypeSection>
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
            'scattergeo',
            'scattermapbox',
            'box',
            'violin',
          ]}
          mode="trace"
        >
          <Numeric label={_('Width')} attr="line.width" />
          <MultiColorPicker label={_('Color')} attr="line.color" />
          <Radio
            label={_('Color Bar')}
            attr="line.showscale"
            options={[{label: _('Show'), value: true}, {label: _('Hide'), value: false}]}
          />
          <ColorscalePicker label={_('Colorscale')} attr="line.colorscale" />
          <LineDashSelector label={_('Type')} attr="line.dash" />
          <LineShapeSelector label={_('Shape')} attr="line.shape" />
          <Numeric label={_('Smoothing')} attr="line.smoothing" showSlider step={0.1} />
          <Radio
            label={_('Connect Gaps')}
            attr="connectgaps"
            options={[{label: _('Connect'), value: true}, {label: _('Blank'), value: false}]}
          />
        </TraceTypeSection>
        <PlotlySection name={_('Filled Area')}>
          <FillDropdown attr="fill" label={_('Fill to')} />
          <MultiColorPicker label={_('Color')} attr="fillcolor" />
        </PlotlySection>
        <PlotlySection name={_('Text Attributes')}>
          <TextInfo attr="textinfo" />
        </PlotlySection>
        <TraceTypeSection
          name={_('Text')}
          traceTypes={[
            'scatter',
            'scattergl',
            'scatterpolar',
            'scatterpolargl',
            'barpolar',
            'pie',
            'scatter3d',
            'scatterternary',
            'bar',
            'scattergeo',
            'scattermapbox',
          ]}
          mode="trace"
        >
          <DataSelector label={_('Text')} attr="text" />
          <TextPosition label={_('Text Position')} attr="textposition" />
          <FontSelector label={_('Typeface')} attr="textfont.family" />
          <Numeric label={_('Font Size')} attr="textfont.size" units="px" />
          <MultiColorPicker label={_('Font Color')} attr="textfont.color" />
        </TraceTypeSection>
        <PlotlySection name={_('Colorscale')}>
          <ColorscalePicker label={_('Colorscale')} attr="colorscale" />
          <Radio
            label={_('Color Bar')}
            attr="showscale"
            options={[{label: _('Show'), value: true}, {label: _('Hide'), value: false}]}
          />
          <Radio
            label={_('Orientation')}
            attr="reversescale"
            options={[{label: _('Normal'), value: false}, {label: _('Reversed'), value: true}]}
          />
          <VisibilitySelect
            label={_('Range')}
            attr="zauto"
            options={[{label: _('Auto'), value: true}, {label: _('Custom'), value: false}]}
            showOn={false}
            defaultOpt={true}
          >
            <Numeric label={_('Min')} attr="zmin" />
            <Numeric label={_('Max')} attr="zmax" />
          </VisibilitySelect>
          <VisibilitySelect
            label={_('Range')}
            attr="cauto"
            options={[{label: _('Auto'), value: true}, {label: _('Custom'), value: false}]}
            showOn={false}
            defaultOpt={true}
          >
            <Numeric label={_('Min')} attr="cmin" />
            <Numeric label={_('Max')} attr="cmax" />
          </VisibilitySelect>
          <Radio
            label={_('Smoothing')}
            attr="zsmooth"
            options={[{label: _('On'), value: 'best'}, {label: _('Off'), value: false}]}
          />
        </PlotlySection>
        <PlotlySection name={_('Gaps Between Cells')}>
          <Numeric label={_('Horizontal Gap')} attr="xgap" />
          <Numeric label={_('Vertical Gap')} attr="ygap" />
        </PlotlySection>
        <PlotlySection name={_('Heatmap')}>
          <Numeric label={_('Horizontal Gaps')} attr="xgap" />
          <Numeric label={_('Vertical Gaps')} attr="ygap" />
        </PlotlySection>
        <TraceTypeSection
          name={_('Gaps in Data')}
          traceTypes={['heatmap', 'contour', 'heatmapgl']}
          mode="trace"
        >
          <Radio
            label={_('Interpolate Gaps')}
            attr="connectgaps"
            options={[{label: _('On'), value: true}, {label: _('Off'), value: false}]}
          />
        </TraceTypeSection>
        <PlotlySection name={_('Lighting')}>
          <NumericFraction label={_('Ambient')} attr="lighting.ambient" />
          <NumericFraction label={_('Diffuse')} attr="lighting.diffuse" />
          <NumericFraction label={_('Specular')} attr="lighting.specular" />
          <NumericFraction label={_('Roughness')} attr="lighting.roughness" />
          <NumericFraction label={_('Fresnel')} attr="lighting.fresnel" />
          <NumericFraction label={_('Vertex Normal')} attr="lighting.vertexnormalsepsilon" />
          <NumericFraction label={_('Face Normal')} attr="lighting.facenormalsepsilon" />
        </PlotlySection>
        <PlotlySection name={_('Light Position')}>
          <NumericFraction label={_('X')} attr="lightposition.x" />
          <NumericFraction label={_('Y')} attr="lightposition.y" />
          <NumericFraction label={_('Z')} attr="lightposition.z" />
        </PlotlySection>
        <PlotlySection name={_('Increasing Trace Styles')}>
          <TextEditor label={_('Name')} attr="increasing.name" richTextOnly />
          <Numeric label={_('Width')} attr="increasing.line.width" />
          <MultiColorPicker label={_('Line Color')} attr="increasing.line.color" />
          <MultiColorPicker label={_('Fill Color')} attr="increasing.fillcolor" />
          <LineDashSelector label={_('Type')} attr="increasing.line.dash" />
          <Radio
            label={_('Show in Legend')}
            attr="increasing.showlegend"
            options={[{label: _('Show'), value: true}, {label: _('Hide'), value: false}]}
          />
        </PlotlySection>
        <PlotlySection name={_('Decreasing Trace Styles')}>
          <TextEditor label={_('Name')} attr="decreasing.name" richTextOnly />
          <Numeric label={_('Width')} attr="decreasing.line.width" />
          <MultiColorPicker label={_('Line Color')} attr="decreasing.line.color" />
          <MultiColorPicker label={_('Fill Color')} attr="decreasing.fillcolor" />
          <LineDashSelector label={_('Type')} attr="decreasing.line.dash" />
          <Radio
            label={_('Show in Legend')}
            attr="decreasing.showlegend"
            options={[{label: _('Show'), value: true}, {label: _('Hide'), value: false}]}
          />
        </PlotlySection>
        <PlotlySection name={_('Scaling')}>
          <GroupCreator label={_('Scale Group')} prefix={_('Group')} attr="scalegroup" />
          <Radio
            label={_('Scale Mode')}
            attr="scalemode"
            options={[{label: _('Width'), value: 'width'}, {label: _('Count'), value: 'count'}]}
          />
          <Radio
            label={_('Span Mode')}
            attr="spanmode"
            options={[
              {label: _('Soft'), value: 'soft'},
              {label: _('Hard'), value: 'hard'},
              {label: _('Manual'), value: 'manual'},
            ]}
          />
          <Numeric label={_('Bandwidth')} attr="bandwidth" />
          <Numeric label={_('Span')} attr="span" />
          <Radio
            attr="side"
            label={_('Visible Sides')}
            options={[
              {label: _('Both'), value: 'both'},
              {label: _('Positive'), value: 'positive'},
              {label: _('Negative'), value: 'negative'},
            ]}
          />
        </PlotlySection>
        <PlotlySection name={_('Box Mean')}>
          <Radio
            attr="boxmean"
            options={[
              {label: _('Mean'), value: true},
              {label: _('Mean & SD'), value: 'sd'},
              {label: _('None'), value: false},
            ]}
          />
        </PlotlySection>
        <PlotlySection name={_('Box')}>
          <Radio
            attr="box.visible"
            options={[{label: _('Show'), value: true}, {label: _('Hide'), value: false}]}
          />
          <NumericFraction label={_('Box Width')} attr="box.width" />
          <MultiColorPicker label={_('Box Fill Color')} attr="box.color" />
          <NumericFraction label={_('Box Line Width')} attr="box.line.width" />
          <MultiColorPicker label={_('Box Line Color')} attr="box.line.color" />
        </PlotlySection>
        <PlotlySection name={_('Meanline')}>
          <Radio
            attr="meanline.visible"
            options={[{label: _('Show'), value: true}, {label: _('Hide'), value: false}]}
          />
          <NumericFraction label={_('Meanline Width')} attr="meanline.width" />
          <MultiColorPicker label={_('Meanline Color')} attr="meanline.color" />
        </PlotlySection>
        <PlotlySection name={_('On Hover')}>
          <HoverInfo attr="hoverinfo" label={_('Values Shown On Hover')} />
          <Radio
            label={_('Split labels')}
            attr="hoverlabel.split"
            options={[{label: _('Yes'), value: true}, {label: _('No'), value: false}]}
          />
          <VisibilitySelect
            attr="contour.show"
            label={_('Show Contour')}
            options={[{label: _('Show'), value: true}, {label: _('Hide'), value: false}]}
            showOn={true}
            defaultOpt={false}
          >
            <MultiColorPicker label={_('Contour Color')} attr="contour.color" />
            <Numeric label={_('Contour Width')} attr="contour.width" />
          </VisibilitySelect>
        </PlotlySection>

        <PlotlySection name={_('Hover Action')}>
          <HoveronDropdown attr="hoveron" label={_('Hover on')} />
        </PlotlySection>

        <TraceTypeSection
          name={_('Error Bars X')}
          traceTypes={['scatter', 'scattergl', 'scatter3d', 'bar']}
          mode="trace"
        >
          <ErrorBars attr="error_x" />
        </TraceTypeSection>

        <TraceTypeSection
          name={_('Error Bars Y')}
          traceTypes={['scatter', 'scattergl', 'scatter3d', 'bar']}
          mode="trace"
        >
          <ErrorBars attr="error_y" />
        </TraceTypeSection>

        <TraceTypeSection name={_('Error Bars Z')} traceTypes={['scatter3d']} mode="trace">
          <ErrorBars attr="error_z" />
        </TraceTypeSection>
      </TraceAccordion>
    )}
  </EditorControlsContext.Consumer>
);

export default StyleTracesPanel;
