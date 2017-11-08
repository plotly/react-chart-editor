import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  ColorPicker,
  DataSelector,
  Dropdown,
  Flaglist,
  Fold,
  Numeric,
  Panel,
  PanelMenuWrapper,
  Radio,
  Section,
  TraceAccordion,
  TraceSelector,
} from './components';
import {DEFAULT_FONTS} from './constants';
import {localize, connectLayoutToPlot} from './lib';

const LayoutPanel = connectLayoutToPlot(Panel);

class DefaultEditor extends Component {
  constructor(props, context) {
    super(props, context);

    const capitalize = s => s.charAt(0).toUpperCase() + s.substring(1);

    // Filter out Polar "area" type (it is fairly broken and we want to present
    // scatter with fill as an "area" chart type for convenience.
    const traceTypes = Object.keys(context.plotSchema.traces).filter(
      t => t !== 'area'
    );

    const labels = traceTypes.map(capitalize);
    this.traceOptions = traceTypes.map((t, i) => ({
      label: labels[i],
      value: t,
    }));

    const i = this.traceOptions.findIndex(opt => opt.value === 'scatter');
    this.traceOptions.splice(
      i + 1,
      0,
      {label: 'Line', value: 'line'},
      {label: 'Area', value: 'area'}
    );
  }

  render() {
    const _ = this.props.localize;

    return (
      <PanelMenuWrapper>
        <Panel group="Graph" name="Create">
          <TraceAccordion canAdd>
            <TraceSelector
              label="Plot Type"
              attr="type"
              clearable={false}
              options={this.traceOptions}
              show
            />

            <DataSelector
              label="Labels"
              attr="labels"
              options={this.context.dataSourceNames}
              clearable={false}
              hasBlank
            />

            <DataSelector
              label="Values"
              attr="values"
              options={this.context.dataSourceNames}
              clearable={false}
              hasBlank
            />

            <DataSelector
              label="X"
              attr="x"
              options={this.context.dataSourceNames}
              clearable={false}
              hasBlank
            />

            <DataSelector
              label="Y"
              attr="y"
              options={this.context.dataSourceNames}
              clearable={false}
              hasBlank
            />

            <DataSelector
              label="Z"
              attr="z"
              options={this.context.dataSourceNames}
              clearable={false}
              hasBlank
            />
          </TraceAccordion>
        </Panel>

        <Panel group="Style" name="Traces">
          <TraceAccordion>
            <Section name={_('Trace')}>
              <Numeric
                label={_('Opacity')}
                min={0}
                max={1}
                step={0.1}
                attr="opacity"
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

            <Section name={_('Points')}>
              <Numeric
                label={_('Marker Opacity')}
                min={0}
                max={1}
                step={0.1}
                attr="marker.opacity"
              />

              <ColorPicker label={_('Marker Color')} attr="marker.color" />

              <Numeric label={_('Size')} min={0} attr="marker.size" />

              <Numeric
                label={_('Line width')}
                min={0}
                attr="marker.line.width"
              />
            </Section>

            <Section name={_('Lines')}>
              <Numeric
                label={_('Width')}
                min={0}
                step={1.0}
                attr="line.width"
              />

              <ColorPicker label={_('Line color')} attr="line.color" />

              <Radio
                label={_('Connect Gaps')}
                attr="connectgaps"
                options={[
                  {value: true, label: 'Connect'},
                  {value: false, label: 'Blank'},
                ]}
              />
            </Section>
          </TraceAccordion>
        </Panel>

        <LayoutPanel group="Style" name={_('Layout')}>
          <Fold name={_('Canvas')}>
            <Numeric
              label={_('Fixed Width')}
              min={100}
              step={1}
              attr="width"
              postfix="px"
            />
          </Fold>
        </LayoutPanel>

        <LayoutPanel group="Style" name={_('Legend')}>
          <Fold hideHeader>
            <Section name={_('Legend')}>
              <Radio
                attr="showlegend"
                options={[
                  {value: true, label: _('Show')},
                  {value: false, label: _('Hide')},
                ]}
              />
            </Section>
            <Section name={_('Text')}>
              <Dropdown
                label={_('Typeface')}
                attr="legend.font.family"
                clearable={false}
                options={[...DEFAULT_FONTS]}
              />
              <Numeric
                label={_('Size')}
                min={1}
                step={1}
                attr="legend.font.size"
                postfix="px"
              />
            </Section>
            <Section name={_('Legend Box')}>
              <Numeric
                label={_('Border Width')}
                min={0}
                step={1}
                attr="legend.borderwidth"
                postfix="px"
              />
            </Section>
            <Section name={_('Positioning')}>
              <Numeric
                label={_('Border Width')}
                min={0}
                step={1}
                attr="legend.borderwidth"
                postfix="px"
              />
            </Section>
            <Section name={_('Orientation')}>
              <div />
            </Section>
            <Section name={_('Trace Order')}>
              <div />
            </Section>
          </Fold>
        </LayoutPanel>
      </PanelMenuWrapper>
    );
  }
}

DefaultEditor.contextTypes = {
  dataSourceNames: PropTypes.array.isRequired,
  plotSchema: PropTypes.object.isRequired,
};

export default localize(DefaultEditor);
