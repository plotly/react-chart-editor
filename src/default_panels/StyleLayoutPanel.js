import React from 'react';
import PropTypes from 'prop-types';
import {
  Dropdown,
  PlotlyFold,
  Numeric,
  TextEditor,
  PlotlySection,
  LayoutPanel,
  VisibilitySelect,
  HovermodeDropdown,
  Flaglist,
  Info,
} from '../components';
import DataSelector from '../components/fields/DataSelector';

const StyleLayoutPanel = (props, {localize: _}) => (
  <LayoutPanel>
    <PlotlyFold name={_('Title')}>
      <TextEditor attr="title.text" richTextOnly />
    </PlotlyFold>
    <PlotlyFold name={_('Size and Margins')}>
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
      <Numeric label={_('Top')} attr="margin.t" units="px" />
      <Numeric label={_('Bottom')} attr="margin.b" units="px" />
      <Numeric label={_('Left')} attr="margin.l" units="px" />
      <Numeric label={_('Right')} attr="margin.r" units="px" />
      <Numeric label={_('Padding')} attr="margin.pad" units="px" />
    </PlotlyFold>
    <PlotlyFold name={_('Interactions')}>
      <PlotlySection name={_('Drag')} attr="dragmode">
        <Dropdown
          label={_('Mode')}
          attr="dragmode"
          options={[
            {label: _('Zoom'), value: 'zoom'},
            {label: _('Select'), value: 'select'},
            {label: _('Pan'), value: 'pan'},
            {label: _('Lasso'), value: 'lasso'},
            {label: _('Orbit'), value: 'orbit'},
            {label: _('Turntable'), value: 'turntable'},
          ]}
          clearable={false}
        />
        <Dropdown
          label={_('Select Direction')}
          attr="selectdirection"
          options={[
            {label: _('Any'), value: 'any'},
            {label: _('Horizontal'), value: 'h'},
            {label: _('Vertical'), value: 'v'},
            {label: _('Diagonal'), value: 'd'},
          ]}
          clearable={false}
        />
      </PlotlySection>
      <PlotlySection name={_('Click')} attr="clickmode">
        <Flaglist
          label={_('Mode')}
          attr="clickmode"
          options={[
            {label: _('Click Event'), value: 'event'},
            {label: _('Select Data Point'), value: 'select'},
          ]}
        />
      </PlotlySection>
      <PlotlySection name={_('Hover')}>
        <HovermodeDropdown label={_('Mode')} attr="hovermode">
          <Dropdown
            label={_('Text Alignment')}
            attr="hoverlabel.align"
            options={[
              {label: _('Auto'), value: 'auto'},
              {label: _('Left'), value: 'left'},
              {label: _('Right'), value: 'right'},
            ]}
            clearable={false}
          />
        </HovermodeDropdown>
      </PlotlySection>
    </PlotlyFold>
    <PlotlyFold name={_('Meta Text')}>
      <DataSelector label={_('Custom Data')} attr="meta" />
      <Info>
        <p>
          {_(
            'You can refer to the items in this column in any text fields of the editor like so: '
          )}
        </p>
        <p>
          {_('Ex: ')}
          <span style={{letterSpacing: '1px', fontStyle: 'italic', userSelect: 'text'}}>
            {_('My custom title %{meta[1]}')}
          </span>
        </p>
      </Info>
    </PlotlyFold>
  </LayoutPanel>
);

StyleLayoutPanel.contextTypes = {
  localize: PropTypes.func,
};

export default StyleLayoutPanel;
