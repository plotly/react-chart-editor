import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  Radio,
  TransformAccordion,
  TraceAccordion,
  DataSelector,
  Dropdown,
  PlotlySection,
  FilterOperation,
  FilterValue,
} from '../components';
import {connectAggregationToTransform} from '../lib';
import {TRANSFORMABLE_TRACES} from 'lib/constants';

const AggregationSection = connectAggregationToTransform(PlotlySection);
import {EditorControlsContext} from '../context';

export class Aggregations extends Component {
  render() {
    const {
      fullContainer: {aggregations = []},
    } = this.props.context;
    const {localize: _} = this.context;

    if (aggregations.length === 0) {
      return null;
    }

    return (
      <PlotlySection name={_('Aggregations')} attr="aggregations" context={this.props.context}>
        {aggregations
          .filter(aggr => aggr.target && aggr.target.match(/transforms\[\d*\]\./gi) === null)
          .map(({target}, i) => (
            <AggregationSection show key={i} aggregationIndex={i}>
              <Dropdown
                attr="func"
                label={target}
                options={[
                  {label: _('Count'), value: 'count'},
                  {label: _('Sum'), value: 'sum'},
                  {label: _('Average'), value: 'avg'},
                  {label: _('Median'), value: 'median'},
                  {label: _('Mode'), value: 'mode'},
                  {label: _('RMS'), value: 'rms'},
                  {label: _('Standard Deviation'), value: 'stddev'},
                  {label: _('Min'), value: 'min'},
                  {label: _('Max'), value: 'max'},
                  {label: _('First'), value: 'first'},
                  {label: _('Last'), value: 'last'},
                  {label: _('Change'), value: 'change'},
                  {label: _('Range'), value: 'range'},
                ]}
                clearable={false}
                context={this.props.context}
              />
            </AggregationSection>
          ))}
      </PlotlySection>
    );
  }
}

Aggregations.plotly_editor_traits = {no_visibility_forcing: true};
Aggregations.contextType = EditorControlsContext;
Aggregations.requireContext = {
  fullContainer: PropTypes.object,
};
Aggregations.propTypes = {
  context: PropTypes.any,
};

const GraphTransformsPanel = () => {
  return (
    <EditorControlsContext.Consumer>
      {({localize: _}) => (
        <TraceAccordion traceFilterCondition={t => TRANSFORMABLE_TRACES.includes(t.type)}>
          <TransformAccordion>
            <Radio
              attr="enabled"
              options={[{label: _('Enabled'), value: true}, {label: _('Disabled'), value: false}]}
            />

            <DataSelector label={_('By')} attr="groups" />

            <DataSelector label={_('Target')} attr="target" />
            <FilterOperation label={_('Operator')} attr="operation" />
            <FilterValue label={_('Value')} attr="value" />

            <Radio
              attr="order"
              options={[
                {label: _('Ascending'), value: 'ascending'},
                {label: _('Descending'), value: 'descending'},
              ]}
            />

            <Aggregations />
          </TransformAccordion>
        </TraceAccordion>
      )}
    </EditorControlsContext.Consumer>
  );
};

export default GraphTransformsPanel;
