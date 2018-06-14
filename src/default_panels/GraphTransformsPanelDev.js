import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  Radio,
  // TransformAccordion,
  TraceAccordion,
  DataSelector,
  Dropdown,
  PlotlySection,
  FilterOperation,
  FilterValue,
} from '../components';
import TransformAccordion from '../components/containers/TransformAccordionDev';
import {connectAggregationToTransform} from '../lib';

const AggregationSection = connectAggregationToTransform(PlotlySection);

export class Aggregations extends Component {
  render() {
    const {
      fullContainer: {aggregations = []},
    } = this.context;
    const {localize: _} = this.context;
    if (aggregations.length === 0) {
      return null;
    }

    return aggregations
      .filter(aggr => aggr.target.match(/transforms\[\d*\]\./gi) === null)
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
            ]}
            clearable={false}
          />
        </AggregationSection>
      ));
  }
}

Aggregations.plotly_editor_traits = {no_visibility_forcing: true};
Aggregations.contextTypes = {
  fullContainer: PropTypes.object,
  localize: PropTypes.func,
};

const GraphTransformsPanel = (props, {localize: _}) => {
  return (
    <TraceAccordion>
      <TransformAccordion>
        <Radio
          attr="enabled"
          options={[
            {label: _('Enabled'), value: true},
            {label: _('Disabled'), value: false},
          ]}
        />

        <DataSelector label={_('By')} attr="groups" />

        <FilterOperation label={_('Operator')} attr="operation" />
        <FilterValue label={_('Value')} attr="value" />

        <PlotlySection name={_('Aggregations')} attr="aggregations">
          <Aggregations />
        </PlotlySection>
      </TransformAccordion>
    </TraceAccordion>
  );
};

GraphTransformsPanel.contextTypes = {
  localize: PropTypes.func,
};

export default GraphTransformsPanel;
