import ColorPicker from './components/Color';
import Dropdown from './components/Dropdown';
import DataSelector from './components/DataSelector';
import Flaglist from './components/Flaglist';
import Numeric from './components/Numeric';
import Panel from './components/Panel';
import PanelMenuWrapper from './components/PanelMenuWrapper';
import PropTypes from 'prop-types';
import Radio from './components/Radio';
import React, {Component} from 'react';
import Section from './components/Section';
import TraceAccordion from './components/TraceAccordion';
import {localize} from './lib';

class DefaultEditor extends Component {
  constructor(props, context) {
    super(props, context);

    const Plotly = context.plotly;
    const capitalize = s => s.charAt(0).toUpperCase() + s.substring(1);
    const traceTypes = Object.keys(Plotly.PlotSchema.get().traces);
    const labels = traceTypes.map(capitalize);
    this.traceOptions = traceTypes.map((t, i) => ({
      label: labels[i],
      value: t,
    }));
  }

  render() {
    const _ = this.props.localize;

    return (
      <PanelMenuWrapper>
        <Panel section="Graph" name="Create">
          <TraceAccordion canAdd>
            <Dropdown
              label="Plot Type"
              clearable={false}
              attr="type"
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

        <Panel section="Style" name="Traces">
          <TraceAccordion>
            <Section heading={_('Trace')}>
              <Numeric
                label={_('Opacity')}
                min={0}
                max={1}
                step={0.1}
                attr="opacity"
              />
            </Section>

            <Section heading={_('Display')}>
              <Flaglist
                attr="mode"
                options={[
                  {label: 'Lines', value: 'lines'},
                  {label: 'Points', value: 'markers'},
                ]}
              />
            </Section>

            <Section heading={_('Filled Area')}>
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

            <Section heading={_('Points')}>
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

            <Section heading={_('Lines')}>
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
      </PanelMenuWrapper>
    );
  }
}

DefaultEditor.contextTypes = {
  dataSourceNames: PropTypes.array,
  plotly: PropTypes.object,
};

export default localize(DefaultEditor);
