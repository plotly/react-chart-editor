import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  Dropdown,
  Radio,
  TextEditor,
  PlotlySection,
  LayoutPanel,
  AxesFold,
  AxisSide,
  VisibilitySelect,
  DropdownCustom,
  TickFormat,
} from '../components';

class StyleAxesPanel extends Component {
  render() {
    const {localize: _} = this.context;
    return (
      <LayoutPanel>
        <AxesFold
          name={_('Titles')}
          axisFilter={(axis) => !(axis._name.includes('angular') || axis._subplot.includes('geo'))}
        >
          <TextEditor attr="title.text" richTextOnly />
        </AxesFold>

        <AxesFold name={_('Range')}>
          <PlotlySection name={_('Range')} attr="autorange">
            <Dropdown
              attr="type"
              label={_('Type')}
              clearable={false}
              options={[
                {label: _('Linear'), value: 'linear'},
                {label: _('Log'), value: 'log'},
                {label: _('Date'), value: 'date'},
                {label: _('Categorical'), value: 'category'},
                {label: _('Multicategorical'), value: 'multicategory'},
              ]}
            />
          </PlotlySection>
          <Dropdown
            label={_('Direction')}
            attr="direction"
            options={[
              {label: _('Clockwise'), value: 'clockwise'},
              {label: _('Counter Clockwise'), value: 'counterclockwise'},
            ]}
            clearable={false}
          />
        </AxesFold>

        <AxesFold name={_('Lines')}>
          <PlotlySection name={_('Axis Line')} attr="showline">
            <VisibilitySelect
              attr="showline"
              options={[
                {label: _('Show'), value: true},
                {label: _('Hide'), value: false},
              ]}
              showOn={true}
              defaultOpt={true}
            >
              <AxisSide label={_('Position')} attr="side" />
              <Radio
                label={_('Mirror Axis')}
                attr="mirror"
                options={[
                  {label: _('On'), value: 'ticks'},
                  {label: _('Off'), value: false},
                ]}
              />
            </VisibilitySelect>
          </PlotlySection>
          <PlotlySection name={_('Grid Lines')} attr="showgrid">
            <VisibilitySelect
              attr="showgrid"
              options={[
                {label: _('Show'), value: true},
                {label: _('Hide'), value: false},
              ]}
              showOn={true}
              defaultOpt={true}
            />
          </PlotlySection>
       </AxesFold>

        <AxesFold name={_('Tick Labels')} axisFilter={(axis) => !axis._subplot.includes('geo')}>
          <PlotlySection name={_('Tick Labels')} attr="showticklabels">
            <VisibilitySelect
              attr="showticklabels"
              options={[
                {label: _('Show'), value: true},
                {label: _('Hide'), value: false},
              ]}
              showOn={true}
              defaultOpt={true}
            >
              <AxisSide label={_('Position')} attr="side" />
              <Radio
                label={_('Position on')}
                attr="tickson"
                options={[
                  {label: _('Labels'), value: 'labels'},
                  {label: _('Boundaries'), value: 'boundaries'},
                ]}
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

              <TickFormat
                label={_('Label Format')}
                attr="tickformat"
                dafaultOpt=""
                clearable={false}
              />
              <Radio
                label={_('Separate Thousands')}
                attr="separatethousands"
                options={[
                  {label: _('True'), value: true},
                  {label: _('False'), value: false},
                ]}
              />
              <Dropdown
                label={_('Exponents')}
                attr="exponentformat"
                clearable={false}
                options={[
                  {label: _('None'), value: 'none'},
                  {label: _('e+6'), value: 'e'},
                  {label: _('E+6'), value: 'E'},
                  {label: _('x10^6'), value: 'power'},
                  {label: _('k/M/G'), value: 'SI'},
                  {label: _('k/M/B'), value: 'B'},
                ]}
              />
              <Dropdown
                label={_('Show Exponents')}
                attr="showexponent"
                clearable={false}
                options={[
                  {label: _('All'), value: 'all'},
                  {label: _('First'), value: 'first'},
                  {label: _('Last'), value: 'last'},
                  {label: _('None'), value: 'none'},
                ]}
              />

              <DropdownCustom
                label={_('Prefix')}
                attr="tickprefix"
                options={[
                  {label: _('None'), value: ''},
                  {label: _('x'), value: 'x'},
                  {label: _('£'), value: '£'},
                  {label: _('$'), value: '$'},
                  {label: _('#'), value: '#'},
                  {label: _('@'), value: '@'},
                  {label: _('Custom'), value: 'custom'},
                ]}
                customOpt="custom"
                dafaultOpt=""
                clearable={false}
              />
              <Dropdown
                label={_('Show Prefix')}
                attr="showtickprefix"
                options={[
                  {label: _('Every label'), value: 'all'},
                  {label: _('First label'), value: 'first'},
                  {label: _('Last label'), value: 'last'},
                  {label: _('None'), value: 'none'},
                ]}
              />
              <DropdownCustom
                label={_('Suffix')}
                attr="ticksuffix"
                options={[
                  {label: _('None'), value: ''},
                  {label: _('C'), value: 'C'},
                  {label: _('%'), value: '%'},
                  {label: _('^'), value: '^'},
                  {label: _('Custom'), value: 'custom'},
                ]}
                customOpt="custom"
                dafaultOpt=""
                clearable={false}
              />
              <Dropdown
                label={_('Show Suffix')}
                attr="showticksuffix"
                options={[
                  {label: _('Every label'), value: 'all'},
                  {label: _('First label'), value: 'first'},
                  {label: _('Last label'), value: 'last'},
                  {label: _('None'), value: 'none'},
                ]}
              />
            </VisibilitySelect>
          </PlotlySection>
        </AxesFold>
        <AxesFold name={_('Tick Markers')} axisFilter={(axis) => !axis._subplot.includes('geo')}>
          <PlotlySection name={_('Tick Markers')} attr="ticks">
            <VisibilitySelect
              attr="ticks"
              options={[
                {label: _('Inside'), value: 'inside'},
                {label: _('Outside'), value: 'outside'},
                {label: _('Hide'), value: ''},
              ]}
              showOn={['inside', 'outside']}
              defaultOpt={'Outside'}
            >
              <AxisSide label={_('Position')} attr="side" />
              <Radio
                label={_('Position on')}
                attr="tickson"
                options={[
                  {label: _('Labels'), value: 'labels'},
                  {label: _('Boundaries'), value: 'boundaries'},
                ]}
              />
            </VisibilitySelect>
          </PlotlySection>
          <PlotlySection name={_('Multicategory Dividers')} attr="showdividers">
            <VisibilitySelect
              attr="showdividers"
              options={[
                {label: _('Show'), value: true},
                {label: _('Hide'), value: false},
              ]}
              showOn={true}
            />
          </PlotlySection>
        </AxesFold>

        <AxesFold
          name={_('Spike Lines')}
          axisFilter={(axis) =>
            !(
              axis._subplot.includes('ternary') ||
              axis._subplot.includes('polar') ||
              axis._subplot.includes('geo')
            )
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

        </AxesFold>
      </LayoutPanel>
    );
  }
}

StyleAxesPanel.contextTypes = {
  fullLayout: PropTypes.object,
  localize: PropTypes.func,
};

export default StyleAxesPanel;
