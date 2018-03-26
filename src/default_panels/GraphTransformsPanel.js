import React from 'react';
import PropTypes from 'prop-types';
import {
  Radio,
  TransformAccordion,
  TraceAccordion,
  DataSelector,
} from '../components';
import {localize} from '../lib';

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
      </TransformAccordion>
    </TraceAccordion>
  );
};

GraphTransformsPanel.propTypes = {
  localize: PropTypes.func,
};

export default localize(GraphTransformsPanel);
