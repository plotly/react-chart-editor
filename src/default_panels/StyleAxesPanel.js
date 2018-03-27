import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  AxisAnchorDropdown,
  AxisOverlayDropdown,
  AxisSide,
  AxesRange,
  DTicks,
  NTicks,
  ColorPicker,
  Dropdown,
  FontSelector,
  Numeric,
  NumericFraction,
  NumericFractionDomain,
  Radio,
  TextEditor,
  Section,
  TraceRequiredPanel,
  AxesFold,
  TraceTypeSection,
  RangesliderVisible,
  RangeSelectorAccordion,
} from '../components';

import {localize, connectLayoutToPlot} from '../lib';
import {TRACE_TO_AXIS} from '../lib/constants';

const LayoutSection = connectLayoutToPlot(Section);

class StyleAxesPanel extends Component {
  constructor(props, context) {
    super(props, context);
    this.hasAxes = this.hasAxes.bind(this);
  }

  hasAxes() {
    return (
      Object.keys(this.context.fullLayout._subplots).filter(
        type =>
          !['cartesian', 'mapbox'].includes(type) &&
          this.context.fullLayout._subplots[type].length > 0
      ).length > 0
    );
  }

  render() {
    const {localize: _} = this.props;
    return (
      <TraceRequiredPanel
        extraConditions={[this.hasAxes]}
        extraEmptyPanelMessages={[
          {
            heading: _('Your plot does not have any axes to style.'),
            message: '',
          },
        ]}
      >
        <AxesFold
          name={_('Titles')}
          axisFilter={axis => !axis._name.includes('angular')}
        >
          <TextEditor attr="title" />
          <FontSelector label={_('Typeface')} attr="titlefont.family" />
          <Numeric label={_('Font Size')} attr="titlefont.size" units="px" />
          <ColorPicker label={_('Font Color')} attr="titlefont.color" />
        </AxesFold>

        <AxesFold
          name={_('Layout')}
          axisFilter={axis =>
            !axis._name.includes('radial') && !axis._name.includes('angular')
          }
        >
          <Section name={_('Boundaries')} attr="domain[0]">
            <AxisOverlayDropdown
              label={_('Overlay')}
              attr="overlaying"
              localize={_}
            />
            <NumericFractionDomain
              label={_('Start Position')}
              attr="domain[0]"
            />
            <NumericFractionDomain label={_('End Position')} attr="domain[1]" />
          </Section>

          <TraceTypeSection
            name={_('Anchor')}
            traceTypes={TRACE_TO_AXIS.cartesian}
          >
            <AxisAnchorDropdown
              label={_('Anchor To')}
              attr="anchor"
              localize={_}
            />
            <AxisSide label={_('Side')} attr="side" localize={_} />
          </TraceTypeSection>
        </AxesFold>

        <AxesFold
          name={_('Angular Range')}
          axisFilter={axis => axis._name.includes('angular')}
        >
          <Dropdown
            attr="type"
            label={_('Type')}
            clearable={false}
            options={[
              {label: _('Linear'), value: 'linear'},
              {label: _('Categorical'), value: 'category'},
            ]}
          />
          <Dropdown
            label={_('Direction')}
            attr="direction"
            options={[
              {label: _('Clockwise'), value: 'clockwise'},
              {label: _('Counter Clockwise'), value: 'counterclockwise'},
            ]}
            clearable={false}
          />
          <LayoutSection>
            <Numeric
              attr="polar.sector[0]"
              label={_('Theta Start')}
              min={0}
              max={360}
              showSlider
            />
            <Numeric
              attr="polar.sector[1]"
              label={_('Theta End')}
              min={0}
              max={360}
              showSlider
            />
          </LayoutSection>
        </AxesFold>

        <AxesFold
          name={_('Range')}
          axisFilter={axis => !axis._name.includes('angular')}
        >
          <Section name={_('Range')} attr="autorange">
            <Dropdown
              attr="type"
              label={_('Type')}
              clearable={false}
              options={[
                {label: _('Linear'), value: 'linear'},
                {label: _('Log'), value: 'log'},
                {label: _('Date'), value: 'date'},
                {label: _('Categorical'), value: 'category'},
              ]}
            />
            <Radio
              attr="autorange"
              label={_('Range')}
              options={[
                {label: _('Auto'), value: true},
                {label: _('Custom'), value: false},
              ]}
            />
            <AxesRange label={_('Min')} attr="range[0]" />
            <AxesRange label={_('Max')} attr="range[1]" />
          </Section>
          <TraceTypeSection
            name={_('Range')}
            traceTypes={['choropleth', 'scattergeo']}
            attr="range"
          >
            <AxesRange label={_('Min')} attr="range[0]" />
            <AxesRange label={_('Max')} attr="range[1]" />
          </TraceTypeSection>
        </AxesFold>

        <AxesFold name={_('Lines')}>
          <Section name={_('Axis Line')} attr="showline">
            <Radio
              attr="showline"
              options={[
                {label: _('Show'), value: true},
                {label: _('Hide'), value: false},
              ]}
            />
            <Numeric label={_('Thickness')} attr="linewidth" units="px" />
            <ColorPicker label={_('Color')} attr="linecolor" />

            <Radio
              label={_('Position')}
              attr="side"
              options={[
                {label: _('Bottom'), value: 'bottom'},
                {label: _('Top'), value: 'top'},
                {label: _('Left'), value: 'left'},
                {label: _('Right'), value: 'right'},
              ]}
            />
            <Radio
              label={_('Mirror Axis')}
              attr="mirror"
              options={[
                {label: _('On'), value: true},
                {label: _('Off'), value: false},
              ]}
            />
          </Section>
          <Section name={_('Grid Lines')} attr="showgrid">
            <Radio
              attr="showgrid"
              options={[
                {label: _('Show'), value: true},
                {label: _('Hide'), value: false},
              ]}
            />
            <Numeric label={_('Thickness')} attr="gridwidth" units="px" />
            <ColorPicker label={_('Color')} attr="gridcolor" />
          </Section>
          <Section name={_('Zero Line')} attr="zeroline">
            <Radio
              attr="zeroline"
              options={[
                {label: _('Show'), value: true},
                {label: _('Hide'), value: false},
              ]}
            />
            <Numeric label={_('Thickness')} attr="zerolinewidth" units="px" />
            <ColorPicker label={_('Color')} attr="zerolinecolor" />
          </Section>

          <Section name={_('Axis Background')} attr="showbackground">
            <Radio
              attr="showbackground"
              options={[
                {label: _('Show'), value: true},
                {label: _('Hide'), value: false},
              ]}
            />
            <ColorPicker label={_('Color')} attr="backgroundcolor" />
          </Section>
        </AxesFold>

        <AxesFold name={_('Tick Labels')}>
          <Section name={_('Tick Labels')} attr="showticklabels">
            <Radio
              attr="showticklabels"
              options={[
                {label: _('Show'), value: true},
                {label: _('Hide'), value: false},
              ]}
            />
            <FontSelector label={_('Typeface')} attr="tickfont.family" />
            <Numeric label={_('Font Size')} attr="tickfont.size" units="px" />
            <ColorPicker label={_('Font Color')} attr="tickfont.color" />
            <Dropdown
              label={_('Direction')}
              attr="side"
              options={[
                {label: _('Clockwise'), value: 'clockwise'},
                {label: _('Counter Clockwise'), value: 'counterclockwise'},
              ]}
              clearable={false}
            />
            <Dropdown
              label={_('Angle')}
              attr="tickangle"
              clearable={false}
              options={[
                {label: _('Auto'), value: 'auto'},
                {label: _('45'), value: 45},
                {label: _('90'), value: 90},
                {label: _('135'), value: 135},
                {label: _('180'), value: 180},
              ]}
            />

            <Dropdown
              label={_('Exponents')}
              attr="exponentformat"
              clearable={false}
              options={[
                {label: _('None'), value: '000'},
                {label: _('e+6'), value: 'e'},
                {label: _('E+6'), value: 'E'},
                {label: _('x10^6'), value: 'power'},
                {label: _('k/M/G'), value: 'SI'},
                {label: _('k/M/B'), value: 'B'},
              ]}
            />
          </Section>

          <Section name={_('Label Prefix')}>
            <Dropdown
              label={_('Prefix')}
              attr="tickprefix"
              options={[
                {label: _('x'), value: 'x'},
                {label: _('$'), value: '$'},
                {label: _('#'), value: '#'},
                {label: _('@'), value: '@'},
                {label: _('custom'), value: 'custom'},
              ]}
            />
            <Radio
              attr="showtickprefix"
              options={[
                {label: _('Every'), value: 'all'},
                {label: _('First'), value: 'first'},
                {label: _('Last'), value: 'last'},
                {label: _('None'), value: 'none'},
              ]}
            />
          </Section>
          <Section name={_('Label Suffix')}>
            <Dropdown
              label={_('Suffix')}
              attr="ticksuffix"
              options={[
                {label: _('C'), value: 'C'},
                {label: _('%'), value: '%'},
                {label: _('^'), value: '^'},
                {label: _('custom'), value: 'custom'},
              ]}
            />
            <Radio
              attr="showticksuffix"
              options={[
                {label: _('Every'), value: 'all'},
                {label: _('First'), value: 'first'},
                {label: _('Last'), value: 'last'},
                {label: _('None'), value: 'none'},
              ]}
            />
          </Section>

          <Section name={_('Spacing')} attr="dtick">
            <Radio
              attr="tickmode"
              options={[
                {label: _('Auto'), value: 'auto'},
                {label: _('Custom'), value: 'linear'},
              ]}
            />

            <DTicks label={_('Step Offset')} attr="tick0" />
            <DTicks label={_('Step Size')} attr="dtick" />
            <NTicks label={_('Max Number of Labels')} attr="nticks" />
          </Section>
        </AxesFold>
        <AxesFold name={_('Tick Markers')}>
          <Radio
            label={_('Separate Thousands')}
            attr="separatethousands"
            options={[
              {label: _('True'), value: true},
              {label: _('False'), value: false},
            ]}
          />
          <Section name={_('Tick Markers')} attr="ticks">
            <Radio
              attr="ticks"
              options={[
                {label: _('Inside'), value: 'inside'},
                {label: _('Outside'), value: 'outside'},
                {label: _('Hide'), value: ''},
              ]}
            />
            <Numeric label={_('Length')} attr="ticklen" units="px" />
            <Numeric label={_('Width')} attr="tickwidth" units="px" />
            <ColorPicker label={_('Tick Color')} attr="tickcolor" />
          </Section>
          <Section name={_('Spacing')}>
            <Radio
              attr="tickmode"
              options={[
                {label: _('Auto'), value: 'auto'},
                {label: _('Custom'), value: 'linear'},
              ]}
            />

            <DTicks label={_('Step Offset')} attr="tick0" />
            <DTicks label={_('Step Size')} attr="dtick" />
            <NTicks label={_('Max Number of Markers')} attr="nticks" />
          </Section>
        </AxesFold>

        <AxesFold
          name={_('Range Slider')}
          axisFilter={axis => axis._subplot.includes('xaxis')}
        >
          <RangesliderVisible
            attr="rangeslider.visible"
            options={[
              {label: _('Show'), value: true},
              {label: _('Hide'), value: false},
            ]}
          />
          <NumericFraction label={_('Height')} attr="rangeslider.thickness" />
          <ColorPicker
            label={_('Background Color')}
            attr="rangeslider.bgcolor"
          />
          <Numeric
            label={_('Border Width')}
            attr="rangeslider.borderwidth"
            units="px"
          />
          <ColorPicker
            label={_('Border Color')}
            attr="rangeslider.bordercolor"
          />
        </AxesFold>

        <AxesFold
          name={_('Timescale Buttons')}
          axisFilter={axis =>
            axis._subplot.includes('xaxis') && axis.type === 'date'
          }
        >
          <Radio
            attr="rangeselector.visible"
            options={[
              {label: _('Show'), value: true},
              {label: _('Hide'), value: false},
            ]}
          />

          <RangeSelectorAccordion>
            <TextEditor attr="label" label={_('Label')} show />
            <Numeric label={_('Count')} attr="count" />
            <Dropdown
              label={_('Step')}
              attr="step"
              clearable={false}
              options={[
                {label: _('Year'), value: 'year'},
                {label: _('Month'), value: 'month'},
                {label: _('Day'), value: 'day'},
                {label: _('Hour'), value: 'hour'},
                {label: _('Minute'), value: 'minute'},
                {label: _('Second'), value: 'second'},
                {label: _('All'), value: 'all'},
              ]}
            />
            <Dropdown
              label={_('Stepmode')}
              attr="stepmode"
              clearable={false}
              options={[
                {label: _('To Date'), value: 'todate'},
                {label: _('Backward'), value: 'backward'},
              ]}
            />
          </RangeSelectorAccordion>
          <Section name={_('Text')}>
            <FontSelector
              label={_('Typeface')}
              attr="rangeselector.font.family"
            />
            <Numeric
              label={_('Font Size')}
              attr="rangeselector.font.size"
              units="px"
            />
            <ColorPicker
              label={_('Font Color')}
              attr="rangeselector.font.color"
            />
          </Section>
          <Section name={_('Style')}>
            <ColorPicker
              label={_('Background Color')}
              attr="rangeselector.bgcolor"
            />
            <ColorPicker
              label={_('Active Color')}
              attr="rangeselector.activecolor"
            />
            <Numeric
              label={_('Border Width')}
              attr="rangeselector.borderwidth"
              units="px"
            />
            <ColorPicker
              label={_('Border Color')}
              attr="rangeselector.bordercolor"
            />
          </Section>
          <Section name={_('Horizontal Positioning')}>
            <Dropdown
              label={_('Anchor Point')}
              clearable={false}
              attr="rangeselector.xanchor"
              options={[
                {label: _('Auto'), value: 'auto'},
                {label: _('Left'), value: 'left'},
                {label: _('Center'), value: 'center'},
                {label: _('Right'), value: 'right'},
              ]}
            />
            <Numeric label={_('Position')} step={0.02} attr="rangeselector.x" />
          </Section>
          <Section name={_('Vertical Positioning')}>
            <Dropdown
              label={_('Anchor Point')}
              clearable={false}
              attr="rangeselector.yanchor"
              options={[
                {label: _('Auto'), value: 'auto'},
                {label: _('Top'), value: 'top'},
                {label: _('Middle'), value: 'middle'},
                {label: _('Bottom'), value: 'bottom'},
              ]}
            />
            <Numeric label={_('Position')} step={0.02} attr="rangeselector.y" />
          </Section>
        </AxesFold>

        <AxesFold
          name={_('Zoom Interactivity')}
          axisFilter={axis =>
            !axis._name.includes('angular') && !axis._name.includes('radial')
          }
        >
          <Radio
            attr="fixedrange"
            options={[
              {label: _('Enable'), value: false},
              {label: _('Disable'), value: true},
            ]}
          />
        </AxesFold>

        <AxesFold
          name={_('Hover Projections')}
          axisFilter={axis =>
            !axis._name.includes('angular') && !axis._name.includes('radial')
          }
        >
          <Radio
            attr="showspikes"
            options={[
              {label: _('Show'), value: true},
              {label: _('Hide'), value: false},
            ]}
          />
          <Radio
            attr="spikesides"
            label={_('Show Sides')}
            options={[
              {label: _('Show'), value: true},
              {label: _('Hide'), value: false},
            ]}
          />

          <Numeric label={_('Thickness')} attr="spikethickness" units="px" />
          <ColorPicker label={_('Color')} attr="spikecolor" />
        </AxesFold>
      </TraceRequiredPanel>
    );
  }
}

StyleAxesPanel.propTypes = {
  localize: PropTypes.func,
};

StyleAxesPanel.contextTypes = {
  fullLayout: PropTypes.object,
};

export default localize(StyleAxesPanel);
