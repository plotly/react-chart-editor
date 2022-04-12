import React from 'react';
import PropTypes from 'prop-types';

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
  Text,
  PlotlySection,
  LayoutSection,
  SymbolSelector,
  TraceAccordion,
  TraceTypeSection,
  TraceMarkerSection,
  HoverInfo,
  HoverTemplateText,
  HoverTemplateSwitch,
  Dropdown,
  FillDropdown,
  FontSelector,
  MarkerSize,
  MarkerColor,
  MultiColorPicker,
  VisibilitySelect,
  NumericOrDate,
  AxisInterval,
} from '../components';
import {
  BinningDropdown,
  NumericReciprocal,
  ShowInLegend,
  HoveronDropdown,
} from '../components/fields/derived';

const StyleTracesPanel = (props, {localize: _}) => (
  <TraceAccordion canGroup>
    <TextEditor label={_('Name')} attr="name" richTextOnly />
    <PlotlySection name={_('Legend')}>
      <ShowInLegend
        label={_('Show in Legend')}
        attr="showlegend"
        options={[
          {label: _('Show'), value: true},
          {label: _('Hide'), value: false},
        ]}
        showOn={true}
      />
    </PlotlySection>
    <PlotlySection name={_('Values')}>
      <BinningDropdown label={_('Histogram Function')} attr="histfunc" />
      <Dropdown
        label={_('Histogram Normalization')}
        options={[
          {label: _('Number of Occurrences'), value: ''},
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
    <PlotlySection name={_('Header')}>
      <Numeric label={_('Height')} attr="header.height" showSlider={false} />
      <MultiColorPicker label={_('Fill Color')} attr="header.fill.color" />
      <FontSelector label={_('Typeface')} attr="header.font.family" />
      <Numeric label={_('Font Size')} attr="header.font.size" showSlider={false} />
      <Dropdown
        label={_('Text Alignment')}
        options={[
          {label: _('Left'), value: 'left'},
          {label: _('Center'), value: 'center'},
          {label: _('Right'), value: 'right'},
        ]}
        attr="header.align"
      />
      <Numeric label={_('Border Width')} attr="header.line.width" showSlider={false} />
    </PlotlySection>
    <PlotlySection name={_('Cells')}>
      <Numeric label={_('Height')} attr="cells.height" showSlider={false} />
      <MultiColorPicker label={_('Fill Color')} attr="cells.fill.color" />
      <FontSelector label={_('Typeface')} attr="cells.font.family" />
      <Numeric label={_('Font Size')} attr="cells.font.size" showSlider={false} />
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
      <Numeric label={_('Border Width')} attr="cells.line.width" showSlider={false} />
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
        options={[
          {label: _('Enable'), value: true},
          {label: _('Disable'), value: false},
        ]}
      />
    </PlotlySection>
    <TraceTypeSection
      name={_('Bar Grouping, Sizing and Spacing')}
      traceTypes={['bar']}
      mode="trace"
    >
      <LayoutSection attr="name">
        <Dropdown
          label={_('Bar Mode')}
          attr="barmode"
          options={[
            {label: _('Grouped'), value: 'group'},
            {label: _('Positive/Negative Stacked'), value: 'relative'},
            {label: _('Strict Sum Stacked'), value: 'stack'},
            {label: _('Overlaid'), value: 'overlay'},
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
        <NumericFractionInverse label={_('Bar Width')} attr="bargap" showSlider={false} />
        <NumericFraction label={_('Bar Padding')} attr="bargroupgap" showSlider={false} />
      </LayoutSection>
    </TraceTypeSection>
    <PlotlySection name={_('Binning')}>
      <NumericOrDate label={_('X Bin Start')} attr="xbins.start" axis="x" showSlider={false} />
      <NumericOrDate label={_('X Bin End')} attr="xbins.end" axis="x" showSlider={false} />
      <Numeric label={_('Max X Bins')} attr="nbinsx" showSlider={false} />
      <AxisInterval label={_('X Bin Size')} attr="xbins.size" axis="x" />

      <NumericOrDate label={_('Y Bin Start')} attr="ybins.start" axis="y" showSlider={false} />
      <NumericOrDate label={_('Y Bin End')} attr="ybins.end" axis="y" showSlider={false} />
      <Numeric label={_('Max Y Bins')} attr="nbinsy" showSlider={false} />
      <AxisInterval label={_('Y Bin Size')} attr="ybins.size" axis="y" />
    </PlotlySection>
    <PlotlySection label={_('Bar Position')}>
      <NumericOrDate label={_('Base')} attr="base" showSlider={false} />
      <Numeric label={_('Offset')} attr="offset" showSlider={false} />
      <Numeric label={_('Width')} attr="width" showSlider={false} />
    </PlotlySection>
    <NumericFraction label={_('Whisker Width')} attr="whiskerwidth" showSlider={false} />
    <TraceMarkerSection>
      <Radio
        label={_('Order')}
        attr="sort"
        options={[
          {label: _('Sorted'), value: true},
          {label: _('Unsorted'), value: false},
        ]}
      />
      <Radio
        label={_('Direction')}
        attr="direction"
        options={[
          {label: _('Clockwise'), value: 'clockwise'},
          {label: _('Counterclockwise'), value: 'counterclockwise'},
        ]}
      />
      <Numeric label={_('Rotation')} attr="rotation" showSlider={false} />
      <NumericFraction label={_('Hole Size')} attr="hole" showSlider={false} />
      <NumericFraction label={_('Pull')} attr="pull" showSlider={false} />
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
      <NumericFraction label={_('Jitter')} attr="jitter" showSlider={false} />
      <Numeric label={_('Position')} attr="pointpos" step={0.1} showSlider={false} />
      <MarkerColor
        suppressMultiValuedMessage
        label={_('Color')}
        attr="marker.color"
        labelWidth={80}
      />
      <NumericFraction label={_('Point Opacity')} attr="marker.opacity" showSlider={false} />
      <MarkerSize label={_('Size')} attr="marker.size" />
      <NumericReciprocal
        label={_('Size Scale')}
        attr="marker.sizeref"
        step={0.2}
        stepmode="relative"
        showSlider={false}
      />
      <Radio
        label={_('Size Mode')}
        attr="marker.sizemode"
        options={[
          {label: _('Area'), value: 'area'},
          {label: _('Diameter'), value: 'diameter'},
        ]}
      />
      <Numeric label={_('Minimum Size')} attr="marker.sizemin" showSlider={false} />
      <SymbolSelector label={_('Symbol')} attr="marker.symbol" />
      <Numeric label={_('Border Width')} attr="marker.line.width" showSlider={false} />
    </TraceMarkerSection>
    <PlotlySection name={_('Connector Styles')}>
      <Radio
        attr="connector.visible"
        options={[
          {label: _('Show'), value: true},
          {label: _('Hide'), value: false},
        ]}
      />
      <MultiColorPicker label={_('Fill Color')} attr="connector.fillcolor" />
      <Numeric label={_('Line Width')} attr="connector.line.width" showSlider={false} />
      <MultiColorPicker label={_('Line Color')} attr="connector.line.color" />
      <LineDashSelector label={_('Line Type')} attr="connector.line.dash" />
      <Dropdown
        label={_('Line Shape')}
        options={[
          {label: _('Spanning'), value: 'spanning'},
          {label: _('Between'), value: 'between'},
        ]}
        attr="connector.mode"
        clearable={false}
      />
    </PlotlySection>
    <PlotlySection name={_('Increasing Marker Styles')}>
      <TextEditor label={_('Name')} attr="increasing.name" richTextOnly />
      <Numeric label={_('Width')} attr="increasing.line.width" showSlider={false} />
      <MultiColorPicker label={_('Line Color')} attr="increasing.line.color" />
      <MultiColorPicker label={_('Marker Color')} attr="increasing.marker.color" />
      <MultiColorPicker label={_('Line Color')} attr="increasing.marker.line.color" />
      <Numeric label={_('Line Width')} attr="increasing.marker.line.width" showSlider={false} />
      <MultiColorPicker label={_('Fill Color')} attr="increasing.fillcolor" />
      <LineDashSelector label={_('Type')} attr="increasing.line.dash" />
      <Radio
        label={_('Show in Legend')}
        attr="increasing.showlegend"
        options={[
          {label: _('Show'), value: true},
          {label: _('Hide'), value: false},
        ]}
      />
    </PlotlySection>
    <PlotlySection name={_('Decreasing Marker Styles')}>
      <TextEditor label={_('Name')} attr="decreasing.name" richTextOnly />
      <Numeric label={_('Width')} attr="decreasing.line.width" showSlider={false} />
      <MultiColorPicker label={_('Line Color')} attr="decreasing.line.color" />
      <MultiColorPicker label={_('Marker Color')} attr="decreasing.marker.color" />
      <MultiColorPicker label={_('Line Color')} attr="decreasing.marker.line.color" />
      <Numeric label={_('Line Width')} attr="decreasing.marker.line.width" showSlider={false} />
      <MultiColorPicker label={_('Fill Color')} attr="decreasing.fillcolor" />
      <LineDashSelector label={_('Type')} attr="decreasing.line.dash" />
      <Radio
        label={_('Show in Legend')}
        attr="decreasing.showlegend"
        options={[
          {label: _('Show'), value: true},
          {label: _('Hide'), value: false},
        ]}
      />
    </PlotlySection>
    <PlotlySection name={_('Total Marker Styles')}>
      <MultiColorPicker label={_('Marker Color')} attr="totals.marker.color" />
      <MultiColorPicker label={_('Line Color')} attr="totals.marker.line.color" />
      <Numeric label={_('Line Width')} attr="totals.marker.line.width" showSlider={false} />
    </PlotlySection>
    <PlotlySection name={_('Ticks')}>
      <Numeric label={_('Width')} attr="tickwidth" showSlider={false} />
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
        options={[
          {label: _('On'), value: true},
          {label: _('Off'), value: false},
        ]}
      />
      <Radio
        label={_('Contour Labels')}
        attr="contours.showlabels"
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
      <Numeric label={_('Max Contours')} attr="ncontours" showSlider={false} />

      <ContourNumeric label={_('Step Size')} attr="contours.size" showSlider={false} />
      <ContourNumeric label={_('Min Contour')} attr="contours.start" showSlider={false} />
      <ContourNumeric label={_('Max Contour')} attr="contours.end"  showSlider={false}/>
    </PlotlySection>
    <TraceTypeSection name={_('Stacking')} traceTypes={['scatter']} mode="trace">
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
        options={[
          {label: _('Horizontal'), value: 'h'},
          {label: _('Vertical'), value: 'v'},
        ]}
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
      traceTypes={['scatter', 'contour']}
      mode="trace"
    >
      <Numeric label={_('Width')} attr="line.width" showSlider={false} />
      <Radio
        label={_('Color Bar')}
        attr="line.showscale"
        options={[
          {label: _('Show'), value: true},
          {label: _('Hide'), value: false},
        ]}
      />
      <LineDashSelector label={_('Type')} attr="line.dash" />
      <LineShapeSelector label={_('Shape')} attr="line.shape" />
      <Numeric label={_('Smoothing')} attr="line.smoothing" step={0.1} showSlider={false}/>
      <Radio
        label={_('Connect Gaps')}
        attr="connectgaps"
        options={[
          {label: _('Connect'), value: true},
          {label: _('Blank'), value: false},
        ]}
      />
    </TraceTypeSection>
    <PlotlySection name={_('Filled Area')}>
      <FillDropdown attr="fill" label={_('Fill to')} />
    </PlotlySection>
    <PlotlySection name={_('Notches')}>
      <Radio
        attr="notched"
        options={[
          {label: _('Show'), value: true},
          {label: _('Hide'), value: false},
        ]}
      />
      <Numeric label={_('Width')} attr="notchwidth" min={0} max={0.5} step={0.1} showSlider={false} />
    </PlotlySection>
    <PlotlySection name={_('Colorscale')}>
      <Radio
        label={_('Color Bar')}
        attr="showscale"
        options={[
          {label: _('Show'), value: true},
          {label: _('Hide'), value: false},
        ]}
      />
      <Radio
        label={_('Orientation')}
        attr="reversescale"
        options={[
          {label: _('Normal'), value: false},
          {label: _('Reversed'), value: true},
        ]}
      />
      <VisibilitySelect
        label={_('Range')}
        attr="zauto"
        options={[
          {label: _('Auto'), value: true},
          {label: _('Custom'), value: false},
        ]}
        showOn={false}
        defaultOpt={true}
      >
        <Numeric label={_('Min')} attr="zmin" showSlider={false} />
        <Numeric label={_('Max')} attr="zmax" showSlider={false} />
      </VisibilitySelect>
      <VisibilitySelect
        label={_('Range')}
        attr="cauto"
        options={[
          {label: _('Auto'), value: true},
          {label: _('Custom'), value: false},
        ]}
        showOn={false}
        defaultOpt={true}
      >
        <Numeric label={_('Min')} attr="cmin" showSlider={false} />
        <Numeric label={_('Max')} attr="cmax" showSlider={false} />
      </VisibilitySelect>
      <Radio
        label={_('Smoothing')}
        attr="zsmooth"
        options={[
          {label: _('On'), value: 'best'},
          {label: _('Off'), value: false},
        ]}
      />
    </PlotlySection>
    <PlotlySection name={_('Gaps Between Cells')}>
      <Numeric label={_('Horizontal Gap')} attr="xgap" showSlider={false} />
      <Numeric label={_('Vertical Gap')} attr="ygap" showSlider={false} />
    </PlotlySection>
    <PlotlySection name={_('Heatmap')}>
      <Numeric label={_('Horizontal Gaps')} attr="xgap" showSlider={false} />
      <Numeric label={_('Vertical Gaps')} attr="ygap" showSlider={false} />
    </PlotlySection>
    <TraceTypeSection
      name={_('Gaps in Data')}
      traceTypes={['heatmap', 'contour']}
      mode="trace"
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
    <PlotlySection name={_('Hover/Tooltip')}>
      <HoveronDropdown attr="hoveron" label={_('Hover on')} />
      <Radio
        label={_('Hover on Gaps')}
        attr="hoverongaps"
        options={[
          {label: _('Yes'), value: true},
          {label: _('No'), value: false},
        ]}
      />
      <HoverTemplateSwitch attr="hovertemplate" label={_('Mode')} />
      <HoverInfo attr="hoverinfo" label={_('Show')} />
      <HoverTemplateText attr="hovertemplate" label={_('Template')} richTextOnly />
      <Radio
        label={_('Split labels')}
        attr="hoverlabel.split"
        options={[
          {label: _('Yes'), value: true},
          {label: _('No'), value: false},
        ]}
      />
      <VisibilitySelect
        attr="contour.show"
        label={_('Show Contour')}
        options={[
          {label: _('Show'), value: true},
          {label: _('Hide'), value: false},
        ]}
        showOn={true}
        defaultOpt={false}
      >
        <Numeric label={_('Contour Width')} attr="contour.width" showSlider={false} />
      </VisibilitySelect>
      <Text label={_('Value Format')} attr="valueformat" />
      <Text label={_('Value Suffix')} attr="valuesuffix" />
    </PlotlySection>
  </TraceAccordion>
);

StyleTracesPanel.contextTypes = {
  localize: PropTypes.func,
};

export default StyleTracesPanel;
