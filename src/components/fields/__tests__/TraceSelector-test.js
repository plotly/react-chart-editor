/* eslint-disable no-magic-numbers */
import Dropdown from '../../widgets/Dropdown';
import React from 'react';
import TraceSelector from '../TraceSelector';
import {Section} from '../../containers';
import {TestEditor, fixtures, plotly, mount} from '../../../lib/test-utils';
import {connectTraceToPlot} from '../../../lib';

describe('TraceSelector', () => {
  const TraceSection = connectTraceToPlot(Section);

  it('interprets scatter + fill as type=area', () => {
    const editorProps = {
      ...fixtures.scatter({data: [{fill: 'tonexty'}]}),
      onUpdate: jest.fn(),
    };
    const wrapper = mount(
      <TestEditor {...editorProps} plotly={plotly}>
        <TraceSection traceIndex={0}>
          <TraceSelector attr="type" />
        </TraceSection>
      </TestEditor>
    ).find(TraceSelector);

    const innerDropdown = wrapper.find(Dropdown);

    expect(innerDropdown.prop('value')).toEqual('area');
  });

  it('interprets scatter + mode=lines as type=line', () => {
    const editorProps = {
      ...fixtures.scatter({data: [{mode: 'lines'}]}),
      onUpdate: jest.fn(),
    };
    const wrapper = mount(
      <TestEditor {...editorProps} plotly={plotly}>
        <TraceSection traceIndex={0}>
          <TraceSelector attr="type" />
        </TraceSection>
      </TestEditor>
    ).find(TraceSelector);

    const innerDropdown = wrapper.find(Dropdown);

    expect(innerDropdown.prop('value')).toEqual('line');
  });

  it('interprets scatter + mode=lines+markers as type=line', () => {
    const editorProps = {
      ...fixtures.scatter({data: [{mode: 'lines+markers'}]}),
      onUpdate: jest.fn(),
    };
    const wrapper = mount(
      <TestEditor {...editorProps} plotly={plotly}>
        <TraceSection traceIndex={0}>
          <TraceSelector attr="type" />
        </TraceSection>
      </TestEditor>
    ).find(TraceSelector);

    const innerDropdown = wrapper.find(Dropdown);

    expect(innerDropdown.prop('value')).toEqual('line');
  });

  it('updates type=scatter mode=lines when type=line', () => {
    const onUpdateTraces = jest.fn();
    const editorProps = {
      ...fixtures.scatter({data: [{type: 'scatter', mode: 'markers'}]}),
      onUpdateTraces,
      plotly,
    };
    const wrapper = mount(
      <TestEditor {...editorProps}>
        <TraceSection traceIndex={0}>
          <TraceSelector attr="type" />
        </TraceSection>
      </TestEditor>
    ).find(TraceSelector);

    const innerDropdown = wrapper.find(Dropdown);
    innerDropdown.prop('onChange')('line');

    const payload = onUpdateTraces.mock.calls[0][0];
    expect(payload.update).toEqual({
      fill: 'none',
      mode: 'lines',
      type: 'scatter',
    });
  });

  it('updates type=scatter fill=tozeroy when type=area', () => {
    const onUpdateTraces = jest.fn();
    const editorProps = {
      ...fixtures.scatter({data: [{type: 'scatter', mode: 'markers'}]}),
      onUpdateTraces,
      plotly,
    };
    const wrapper = mount(
      <TestEditor {...editorProps}>
        <TraceSection traceIndex={0}>
          <TraceSelector attr="type" />
        </TraceSection>
      </TestEditor>
    ).find(TraceSelector);

    const innerDropdown = wrapper.find(Dropdown);
    innerDropdown.prop('onChange')('area');

    const payload = onUpdateTraces.mock.calls[0][0];
    expect(payload.update).toEqual({fill: 'tozeroy', type: 'scatter'});
  });
});
