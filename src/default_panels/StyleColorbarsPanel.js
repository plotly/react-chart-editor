import React from 'react';
import PropTypes from 'prop-types';

import {
  Radio,
  TextEditor,
  TraceAccordion,
  Numeric,
  PlotlyFold,
  PlotlyPanel,
  PlotlySection,
  Dropdown,
  FontSelector,
  ColorPicker,
} from '..';

import {localize} from '../lib';

const StyleColorBarsPanel = ({localize: _}) => {
  return (
    <TraceAccordion messageIfEmptyFold="Need a color scale for a colorbar!">
      {['', 'marker.'].map(prefix => {
        return (
          <Radio
            attr={prefix + 'showscale'}
            key={'x' + prefix}
            options={[
              {label: _('Show'), value: true},
              {label: _('Hide'), value: false},
            ]}
          />
        );
      })}
      {['', 'marker.'].map(prefix => {
        return (
          <PlotlyPanel showExpandCollapse={false} key={prefix + ' panel'}>
            <PlotlyFold name={_('Title')}>
              <TextEditor attr={prefix + 'colorbar.title'} />

              <Dropdown
                label={_('Location')}
                attr={prefix + 'colorbar.titleside'}
                options={[
                  {label: _('Top'), value: 'top'},
                  {label: _('Right'), value: 'right'},
                  {label: _('Bottom'), value: 'bottom'},
                ]}
              />
              <FontSelector
                label={_('Typeface')}
                attr={prefix + 'colorbar.titlefont.family'}
              />
              <Numeric
                label={_('Font Size')}
                attr={prefix + 'colorbar.titlefont.size'}
                units="px"
              />
              <ColorPicker
                label={_('Font Color')}
                attr={prefix + 'colorbar.titlefont.color'}
              />
            </PlotlyFold>
            <PlotlyFold name={_('Size and Positioning')}>
              <PlotlySection name={_('Size')} attr={prefix + 'colorbar.len'}>
                <Numeric label={_('Height')} attr={prefix + 'colorbar.len'} />

                <Radio
                  attr={prefix + 'colorbar.lenmode'}
                  options={[
                    {label: _('Fraction of Plot'), value: 'fraction'},
                    {label: _('Pixels'), value: 'pixels'},
                  ]}
                />

                <Numeric
                  label={_('Width')}
                  attr={prefix + 'colorbar.thickness'}
                />

                <Radio
                  attr={prefix + 'colorbar.thicknessmode'}
                  options={[
                    {label: _('Fraction of Plot'), value: 'fraction'},
                    {label: _('Pixels'), value: 'pixels'},
                  ]}
                />
              </PlotlySection>
              <PlotlySection
                name={_('Horizontal Positioning')}
                attr={prefix + 'colorbar.x'}
              >
                <Numeric
                  label={_('Horizontal Position')}
                  attr={prefix + 'colorbar.x'}
                  showSlider
                  step={0.02}
                />

                <Dropdown
                  label={_('Positioning Anchor')}
                  attr={prefix + 'colorbar.xanchor'}
                  options={[
                    {label: _('Left'), value: 'left'},
                    {label: _('Center'), value: 'center'},
                    {label: _('Right'), value: 'right'},
                  ]}
                />
              </PlotlySection>
              <PlotlySection
                name={_('Vertical Positioning')}
                attr={prefix + 'colorbar.y'}
              >
                <Numeric
                  label={_('Vertical Position')}
                  attr={prefix + 'colorbar.y'}
                  showSlider
                  step={0.02}
                />

                <Dropdown
                  label={_('Positioning Anchor')}
                  attr={prefix + 'colorbar.yanchor'}
                  options={[
                    {label: _('Top'), value: 'top'},
                    {label: _('Middle'), value: 'middle'},
                    {label: _('Bottom'), value: 'bottom'},
                  ]}
                />
              </PlotlySection>
              <PlotlySection
                name={_('Padding')}
                attr={prefix + 'colorbar.xpad'}
              >
                <Numeric
                  label={_('Vertical Padding')}
                  attr={prefix + 'colorbar.ypad'}
                  units="px"
                />
                <Numeric
                  label={_('Horizontal Padding')}
                  attr={prefix + 'colorbar.xpad'}
                  units="px"
                />
              </PlotlySection>
            </PlotlyFold>
            <PlotlyFold name={_('Labels')}>
              <Radio
                attr={prefix + 'colorbar.showticklabels'}
                options={[
                  {label: _('Show'), value: true},
                  {label: _('Hide'), value: false},
                ]}
              />
              <FontSelector
                label={_('Typeface')}
                attr={prefix + 'colorbar.tickfont.family'}
              />
              <Numeric
                label={_('Font Size')}
                attr={prefix + 'colorbar.tickfont.size'}
                units="px"
              />
              <ColorPicker
                label={_('Font Color')}
                attr={prefix + 'colorbar.tickfont.color'}
              />
              <Dropdown
                label={_('Angle')}
                attr={prefix + 'colorbar.tickangle'}
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
                attr={prefix + 'colorbar.exponentformat'}
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
              <PlotlySection name={_('Label Prefix')}>
                <Dropdown
                  label={_('Prefix')}
                  attr={prefix + 'colorbar.tickprefix'}
                  options={[
                    {label: _('x'), value: 'x'},
                    {label: _('$'), value: '$'},
                    {label: _('#'), value: '#'},
                    {label: _('@'), value: '@'},
                    {label: _('custom'), value: 'custom'},
                  ]}
                />
                <Radio
                  attr={prefix + 'colorbar.showtickprefix'}
                  options={[
                    {label: _('Every'), value: 'all'},
                    {label: _('First'), value: 'first'},
                    {label: _('Last'), value: 'last'},
                    {label: _('None'), value: 'none'},
                  ]}
                />
              </PlotlySection>
              <PlotlySection name={_('Label Suffix')}>
                <Dropdown
                  label={_('Suffix')}
                  attr={prefix + 'colorbar.ticksuffix'}
                  options={[
                    {label: _('C'), value: 'C'},
                    {label: _('%'), value: '%'},
                    {label: _('^'), value: '^'},
                    {label: _('custom'), value: 'custom'},
                  ]}
                />
                <Radio
                  attr={prefix + 'colorbar.showticksuffix'}
                  options={[
                    {label: _('Every'), value: 'all'},
                    {label: _('First'), value: 'first'},
                    {label: _('Last'), value: 'last'},
                    {label: _('None'), value: 'none'},
                  ]}
                />
              </PlotlySection>
              <PlotlySection name={_('Number of Labels')}>
                <Radio
                  attr={prefix + 'colorbar.tickmode'}
                  options={[
                    {label: _('Linear'), value: 'linear'},
                    {label: _('Custom'), value: 'auto'},
                  ]}
                />

                <Numeric
                  label={_('Step Offset')}
                  attr={prefix + 'colorbar.tick0'}
                />
                <Numeric
                  label={_('Step Size')}
                  attr={prefix + 'colorbar.dtick'}
                />
                <Numeric
                  label={_('Max Number of Labels')}
                  attr={prefix + 'colorbar.nticks'}
                />
              </PlotlySection>
            </PlotlyFold>
            <PlotlyFold name={_('Ticks')}>
              <Radio
                attr={prefix + 'colorbar.ticks'}
                options={[
                  {label: _('Inside'), value: 'inside'},
                  {label: _('Outside'), value: 'outside'},
                  {label: _('Hide'), value: ''},
                ]}
              />
              <Numeric
                label={_('Length')}
                attr={prefix + 'colorbar.ticklen'}
                units="px"
              />
              <Numeric
                label={_('Width')}
                attr={prefix + 'colorbar.tickwidth'}
                units="px"
              />
              <ColorPicker
                label={_('Tick Color')}
                attr={prefix + 'colorbar.tickcolor'}
              />
              <PlotlySection name={_('Number of Markers')}>
                <Radio
                  attr={prefix + 'colorbar.tickmode'}
                  options={[
                    {label: _('Linear'), value: 'linear'},
                    {label: _('Custom'), value: 'auto'},
                  ]}
                />

                <Numeric
                  label={_('Step Offset')}
                  attr={prefix + 'colorbar.tick0'}
                />
                <Numeric
                  label={_('Step Size')}
                  attr={prefix + 'colorbar.dtick'}
                />
                <Numeric
                  label={_('Max Number of Markers')}
                  attr={prefix + 'colorbar.nticks'}
                />
              </PlotlySection>
            </PlotlyFold>
            <PlotlyFold name={_('Borders and Background')}>
              <PlotlySection
                name={_('Color Bar')}
                attr={prefix + 'colorbar.outlinewidth'}
              >
                <Numeric
                  label={_('Border Width')}
                  attr={prefix + 'colorbar.outlinewidth'}
                />
                <ColorPicker
                  label={_('Border Color')}
                  attr={prefix + 'colorbar.outlinecolor'}
                />
              </PlotlySection>
              <PlotlySection
                name={_('Container')}
                attr={prefix + 'colorbar.bgcolor'}
              >
                <ColorPicker
                  label={_('Background Color')}
                  attr={prefix + 'colorbar.bgcolor'}
                />
                <Numeric
                  label={_('Border Width')}
                  attr={prefix + 'colorbar.borderwidth'}
                />
                <ColorPicker
                  label={_('Border Color')}
                  attr={prefix + 'colorbar.bordercolor'}
                />
              </PlotlySection>
            </PlotlyFold>
          </PlotlyPanel>
        );
      })}
    </TraceAccordion>
  );
};

StyleColorBarsPanel.propTypes = {
  localize: PropTypes.func,
};

export default localize(StyleColorBarsPanel);
