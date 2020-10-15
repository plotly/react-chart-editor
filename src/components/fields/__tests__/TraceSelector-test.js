/* eslint-disable no-magic-numbers */
import Dropdown from '../../widgets/Dropdown';
import TraceSelector from '../TraceSelector';
import {PlotlySection} from '../../containers';
import {TestEditor, fixtures, plotly, mount} from 'lib/test-utils';
import {connectTraceToPlot} from 'lib';

describe('TraceSelector', () => {
  const TraceSection = connectTraceToPlot(PlotlySection);

  it('sets mode to markers if trace scatter, no data or mode provided', () => {
    const editorProps = {
      ...fixtures.scatter({data: [{mode: null, xsrc: null, ysrc: null}]}),
      onUpdate: jest.fn(),
    };

    const wrapper = mount(
      <TestEditor {...editorProps} plotly={plotly}>
        <TraceSection traceIndexes={[0]}>
          <TraceSelector attr="type" />
        </TraceSection>
      </TestEditor>
    ).find(TraceSelector);

    const innerDropdown = wrapper.find(Dropdown);
    expect(innerDropdown.prop('value')).toEqual('scatter');
  });

  it('if no data provided, but mode is provided, displays correct trace type', () => {
    const editorProps = {
      ...fixtures.scatter({
        data: [{mode: 'lines+markers', xsrc: null, ysrc: null}],
      }),
      onUpdate: jest.fn(),
    };
    const wrapper = mount(
      <TestEditor {...editorProps} plotly={plotly}>
        <TraceSection traceIndexes={[0]}>
          <TraceSelector attr="type" />
        </TraceSection>
      </TestEditor>
    ).find(TraceSelector);

    const innerDropdown = wrapper.find(Dropdown);
    expect(innerDropdown.prop('value')).toEqual('line');
  });

  it('if data provided, but no mode is provided, chooses mode according to fullData', () => {
    const editorProps = {
      ...fixtures.scatter(),
      onUpdate: jest.fn(),
    };

    expect(!editorProps.graphDiv.data[0].mode).toBe(true);
    expect(editorProps.graphDiv._fullData[0].mode).toBe('lines+markers');

    const wrapper = mount(
      <TestEditor {...editorProps} plotly={plotly}>
        <TraceSection traceIndexes={[0]}>
          <TraceSelector attr="type" />
        </TraceSection>
      </TestEditor>
    ).find(TraceSelector);

    const innerDropdown = wrapper.find(Dropdown);
    expect(innerDropdown.prop('value')).toEqual('line');
  });

  it('interprets scatter + fill as type=area', () => {
    const editorProps = {
      ...fixtures.scatter({data: [{fill: 'tonexty'}]}),
      onUpdate: jest.fn(),
    };
    const wrapper = mount(
      <TestEditor {...editorProps} plotly={plotly}>
        <TraceSection traceIndexes={[0]}>
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
        <TraceSection traceIndexes={[0]}>
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
        <TraceSection traceIndexes={[0]}>
          <TraceSelector attr="type" />
        </TraceSection>
      </TestEditor>
    ).find(TraceSelector);

    const innerDropdown = wrapper.find(Dropdown);

    expect(innerDropdown.prop('value')).toEqual('line');
  });

  it('updates type=scatter mode=lines when type=line', () => {
    const beforeUpdateTraces = jest.fn();
    const editorProps = {
      ...fixtures.scatter({data: [{type: 'scatter', mode: 'markers'}]}),
      beforeUpdateTraces,
      plotly,
    };
    const wrapper = mount(
      <TestEditor {...editorProps}>
        <TraceSection traceIndexes={[0]}>
          <TraceSelector attr="type" />
        </TraceSection>
      </TestEditor>
    ).find(TraceSelector);

    const innerDropdown = wrapper.find(Dropdown);
    innerDropdown.prop('onChange')('line');

    const payload = beforeUpdateTraces.mock.calls[0][0];
    expect(payload.update).toEqual({
      stackgroup: null,
      mode: 'lines',
      type: 'scatter',
    });
  });

  it('updates type=scatter stackgroup=1 when type=area', () => {
    const beforeUpdateTraces = jest.fn();
    const editorProps = {
      ...fixtures.scatter({data: [{type: 'scatter', mode: 'markers'}]}),
      beforeUpdateTraces,
      plotly,
    };
    const wrapper = mount(
      <TestEditor {...editorProps}>
        <TraceSection traceIndexes={[0]}>
          <TraceSelector attr="type" />
        </TraceSection>
      </TestEditor>
    ).find(TraceSelector);

    const innerDropdown = wrapper.find(Dropdown);
    innerDropdown.prop('onChange')('area');

    const payload = beforeUpdateTraces.mock.calls[0][0];
    expect(payload.update).toEqual({type: 'scatter', mode: 'lines', stackgroup: 1});
  });
});
