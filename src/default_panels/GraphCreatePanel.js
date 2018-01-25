import React from 'react';
import {
  Panel,
  TraceAccordion,
  TraceSelector,
  DataSelector,
} from '../components';

const GraphCreatePanel = () => (
  <Panel>
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

export default GraphCreatePanel;
