import React from 'react';
import PropTypes from 'prop-types';

import {
  Radio,
  TextEditor,
  TraceAccordion,
  Numeric,
  Fold,
  Panel,
  Section,
  Dropdown,
  FontSelector,
  ColorPicker,
  MenuPanel,
} from '..';

import {localize} from '../lib';

const StyleColorBarsPanel = ({localize: _}) => (
  <TraceAccordion messageIfEmptyFold="Need a color for a colorbar!">
    <Radio
      attr="showscale"
      options={[
        {label: _('Show'), value: true},
        {label: _('Hide'), value: false},
      ]}
    />
    <Panel showExpandCollapse={false}>
      <Fold name={_('Title')}>
        <TextEditor attr="colorbar.title" />

        <Dropdown
          label={_('Location')}
          attr="colorbar.titleside"
          options={[
            {label: _('Top'), value: 'top'},
            {label: _('Right'), value: 'right'},
            {label: _('Bottom'), value: 'bottom'},
          ]}
        />
        <FontSelector label={_('Typeface')} attr="colorbar.titlefont.family" />
        <Numeric
          label={_('Font Size')}
          attr="colorbar.titlefont.size"
          units="px"
        />
        <ColorPicker label={_('Font Color')} attr="colorbar.titlefont.color" />
      </Fold>
      <Fold name={_('Size and Positioning')}>
        <Section name={_('Size')} attr="colorbar.len">
          <Numeric label={_('Height')} attr="colorbar.len" />

          <Radio
            attr="colorbar.lenmode"
            options={[
              {label: _('Fraction of Plot'), value: 'fraction'},
              {label: _('Pixels'), value: 'pixels'},
            ]}
          />

          <Numeric label={_('Width')} attr="colorbar.thickness" />

          <Radio
            attr="colorbar.thicknessmode"
            options={[
              {label: _('Fraction of Plot'), value: 'fraction'},
              {label: _('Pixels'), value: 'pixels'},
            ]}
          />
        </Section>
        <Section name={_('Horizontal Positioning')} attr="colorbar.x">
          <Numeric label={_('Horizontal Position')} attr="colorbar.x" />

          <Dropdown
            label={_('Positioning Anchor')}
            attr="colorbar.xanchor"
            options={[
              {label: _('Left'), value: 'left'},
              {label: _('Center'), value: 'center'},
              {label: _('Right'), value: 'right'},
            ]}
          />
        </Section>
        <Section name={_('Vertical Positioning')} attr="colorbar.y">
          <Numeric label={_('Vertical Position')} attr="colorbar.y" />

          <Dropdown
            label={_('Positioning Anchor')}
            attr="colorbar.yanchor"
            options={[
              {label: _('Top'), value: 'top'},
              {label: _('Middle'), value: 'middle'},
              {label: _('Bottom'), value: 'bottom'},
            ]}
          />
        </Section>
        <Section name={_('Padding')} attr="colorbar.xpad">
          <Numeric
            label={_('Vertical Padding')}
            attr="colorbar.ypad"
            units="px"
          />
          <Numeric
            label={_('Horizontal Padding')}
            attr="colorbar.xpad"
            units="px"
          />
        </Section>
      </Fold>
      <Fold name={_('Labels')}>
        <Radio
          attr="colorbar.showticklabels"
          options={[
            {label: _('Show'), value: true},
            {label: _('Hide'), value: false},
          ]}
        />
        <FontSelector label={_('Typeface')} attr="colorbar.tickfont.family" />
        <Numeric
          label={_('Font Size')}
          attr="colorbar.tickfont.size"
          units="px"
        />
        <ColorPicker label={_('Font Color')} attr="colorbar.tickfont.color" />
        <Dropdown
          label={_('Angle')}
          attr="colorbar.tickangle"
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
          attr="colorbar.exponentformat"
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
        <Section name={_('Label Formatting')}>
          <MenuPanel>
            <Section name={_('Prefix')}>
              <Radio
                attr="colorbar.showtickprefix"
                options={[
                  {label: _('Every'), value: 'all'},
                  {label: _('First'), value: 'first'},
                  {label: _('Last'), value: 'last'},
                  {label: _('None'), value: 'none'},
                ]}
              />
            </Section>
            <Section name={_('Suffix')}>
              <Radio
                attr="colorbar.showticksuffix"
                options={[
                  {label: _('Every'), value: 'all'},
                  {label: _('First'), value: 'first'},
                  {label: _('Last'), value: 'last'},
                  {label: _('None'), value: 'none'},
                ]}
              />
            </Section>
          </MenuPanel>
          <Dropdown
            label={_('Prefix')}
            attr="colorbar.tickprefix"
            options={[
              {label: _('x'), value: 'x'},
              {label: _('$'), value: '$'},
              {label: _('#'), value: '#'},
              {label: _('@'), value: '@'},
              {label: _('custom'), value: 'custom'},
            ]}
          />
          <Dropdown
            label={_('Suffix')}
            attr="colorbar.ticksuffix"
            options={[
              {label: _('C'), value: 'C'},
              {label: _('%'), value: '%'},
              {label: _('^'), value: '^'},
              {label: _('custom'), value: 'custom'},
            ]}
          />
        </Section>
        <Section name={_('Number of labels')}>
          <Radio
            attr="colorbar.tickmode"
            options={[
              {label: _('Linear'), value: 'linear'},
              {label: _('Custom'), value: 'auto'},
            ]}
          />

          <Numeric label={_('Step Offset')} attr="colorbar.tick0" />
          <Numeric label={_('Step Size')} attr="colorbar.dtick" />
          <Numeric label={_('Max Number of Labels')} attr="colorbar.nticks" />
        </Section>
      </Fold>
      <Fold name={_('Ticks')}>
        <Radio
          attr="colorbar.ticks"
          options={[
            {label: _('Inside'), value: 'inside'},
            {label: _('Outside'), value: 'outside'},
            {label: _('Hide'), value: ''},
          ]}
        />
        <Numeric label={_('Length')} attr="colorbar.ticklen" units="px" />
        <Numeric label={_('Width')} attr="colorbar.tickwidth" units="px" />
        <ColorPicker label={_('Tick Color')} attr="colorbar.tickcolor" />
        <Section name={_('Number of Markers')}>
          <Radio
            attr="colorbar.tickmode"
            options={[
              {label: _('Linear'), value: 'linear'},
              {label: _('Custom'), value: 'auto'},
            ]}
          />

          <Numeric label={_('Step Offset')} attr="colorbar.tick0" />
          <Numeric label={_('Step Size')} attr="colorbar.dtick" />
          <Numeric label={_('Max Number of Markers')} attr="colorbar.nticks" />
        </Section>
      </Fold>
      <Fold name={_('Borders and Background')}>
        <Section name={_('Color Bar')} attr="colorbar.outlinewidth">
          <Numeric label={_('Border Width')} attr="colorbar.outlinewidth" />
          <ColorPicker label={_('Border Color')} attr="colorbar.outlinecolor" />
        </Section>
        <Section name={_('Container')} attr="colorbar.bgcolor">
          <ColorPicker label={_('Background Color')} attr="colorbar.bgcolor" />
          <Numeric label={_('Border Width')} attr="colorbar.borderwidth" />
          <ColorPicker label={_('Border Color')} attr="colorbar.bordercolor" />
        </Section>
      </Fold>
    </Panel>
  </TraceAccordion>
);

StyleColorBarsPanel.propTypes = {
  localize: PropTypes.func,
};

export default localize(StyleColorBarsPanel);
