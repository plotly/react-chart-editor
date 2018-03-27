import NumericInput from '../../components/widgets/NumericInput';
import React from 'react';
import connectTraceToPlot from '../connectTraceToPlot';
import {
  PlotlyFold,
  PlotlyPanel,
  PlotlySection,
} from '../../components/containers';
import {Numeric} from '../../components/fields';
import {TestEditor, fixtures, plotly} from '../test-utils';
import {mount} from 'enzyme';

const Traces = [PlotlyPanel, PlotlyFold, PlotlySection].map(connectTraceToPlot);
const Editor = props => (
  <TestEditor {...{plotly, onUpdate: jest.fn(), ...props}} />
);

const defaultMarkerSize = 6;

Traces.forEach(Trace => {
  describe(`<${Trace.displayName}>`, () => {
    it('wraps container with fullValue pointing to gd._fullData[i]', () => {
      const wrapper = mount(
        <Editor {...fixtures.scatter()}>
          <PlotlyPanel>
            <Trace traceIndexes={[0]}>
              <Numeric label="Marker Size" attr="marker.size" />
            </Trace>
          </PlotlyPanel>
        </Editor>
      )
        .find('[attr="marker.size"]')
        .find(NumericInput);

      expect(wrapper.prop('value')).toBe(defaultMarkerSize);
    });

    it('sends updates to gd.data', () => {
      const beforeUpdateTraces = jest.fn();
      const wrapper = mount(
        <Editor beforeUpdateTraces={beforeUpdateTraces} {...fixtures.scatter()}>
          <PlotlyPanel>
            <Trace traceIndexes={[0]}>
              <Numeric label="Marker Size" attr="marker.size" />
            </Trace>
          </PlotlyPanel>
        </Editor>
      )
        .find('[attr="marker.size"]')
        .find(NumericInput);

      const sizeUpdate = 200;
      wrapper.prop('onChange')(sizeUpdate);
      const payload = beforeUpdateTraces.mock.calls[0][0];
      expect(payload).toEqual({
        update: {'marker.size': sizeUpdate},
        traceIndexes: [0],
      });
    });

    it('automatically computes min and max defaults', () => {
      const wrapper = mount(
        <Editor {...fixtures.scatter()}>
          <PlotlyPanel>
            <Trace traceIndexes={[0]}>
              <Numeric label="marker size" attr="marker.size" />
            </Trace>
          </PlotlyPanel>
        </Editor>
      )
        .find('[attr="marker.size"]')
        .find(NumericInput);

      expect(wrapper.prop('min')).toBe(0);
      expect(wrapper.prop('max')).toBe(void 0);
    });

    it('has the correct name', () => {
      const name = 'Voldemort';
      const wrapper = mount(
        <Editor {...fixtures.scatter({data: [{name}]})}>
          <PlotlyPanel>
            <Trace traceIndexes={[0]} />
          </PlotlyPanel>
        </Editor>
      )
        .find(Trace)
        .childAt(0);
      expect(wrapper.props().name).toBe(name);
    });
  });
});
