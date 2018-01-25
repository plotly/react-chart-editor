import React from 'react';
import PropTypes from 'prop-types';
import {
  Panel,
  TraceAccordion,
  TraceSelector,
  DataSelector,
} from '../components';

const GraphCreatePanel = ({visible}) => (
  <Panel visible={visible}>
    <TraceAccordion canAdd>
      <TraceSelector label="Plot Type" attr="type" show />

      <DataSelector label="Labels" attr="labels" />

      <DataSelector label="Values" attr="values" />

      <DataSelector label="X" attr="x" />

      <DataSelector label="Y" attr="y" />

      <DataSelector label="Z" attr="z" />

      <DataSelector label="Open" attr="open" />

      <DataSelector label="High" attr="high" />

      <DataSelector label="Low" attr="low" />

      <DataSelector label="Close" attr="close" />
    </TraceAccordion>
  </Panel>
);

GraphCreatePanel.propTypes = {
  visible: PropTypes.bool,
};

export default GraphCreatePanel;
