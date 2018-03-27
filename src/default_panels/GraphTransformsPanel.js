import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  Radio,
  TransformAccordion,
  TraceAccordion,
  DataSelector,
  Dropdown,
  Section,
} from '../components';
import {connectAggregationToTransform, localize} from '../lib';

const AggregationSection = connectAggregationToTransform(Section);

class UnlocalizedAggregations extends Component {
  render() {
    const {fullContainer: {aggregations = []}} = this.context;
    const {localize: _} = this.props;
    if (aggregations.length === 0) {
      return null;
    }

    return aggregations.map(({target}, i) => (
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

UnlocalizedAggregations.contextTypes = {
  fullContainer: PropTypes.object,
};

UnlocalizedAggregations.propTypes = {
  localize: PropTypes.func,
};

const Aggregations = localize(UnlocalizedAggregations);

const GraphTransformsPanel = ({localize: _}) => {
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

        <Section name={_('Aggregations')} attr="aggregations">
          <Aggregations />
        </Section>
      </TransformAccordion>
    </TraceAccordion>
  );
};

GraphTransformsPanel.propTypes = {
  localize: PropTypes.func,
};

export default localize(GraphTransformsPanel);
