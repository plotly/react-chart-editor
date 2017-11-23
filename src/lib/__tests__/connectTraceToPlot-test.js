import NumericInput from '../../components/widgets/NumericInputStatefulWrapper';
import React from 'react';
import connectTraceToPlot from '../connectTraceToPlot';
import {EDITOR_ACTIONS} from '../constants';
import {Fold, Panel, Section} from '../../components/containers';
import {Numeric} from '../../components/fields';
import {TestEditor, fixtures, plotly} from '../test-utils';
import {mount} from 'enzyme';

const Traces = [Panel, Fold, Section].map(connectTraceToPlot);
const Editor = props => (
  <TestEditor {...{plotly, onUpdate: jest.fn(), ...props}} />
);

const defaultMarkerSize = 6;

Traces.forEach(Trace => {
  describe(`<${Trace.displayName}>`, () => {
    it('wraps container with fullValue pointing to gd._fullData[i]', () => {
      const wrapper = mount(
        <Editor {...fixtures.scatter()}>
          <Trace traceIndex={0}>
            <Numeric label="Marker Size" attr="marker.size" />
          </Trace>
        </Editor>
      )
        .find('[attr="marker.size"]')
        .find(NumericInput);

      expect(wrapper.prop('value')).toBe(defaultMarkerSize);
    });

    it('sends updates to gd.data', () => {
      const onUpdate = jest.fn();
      const wrapper = mount(
        <Editor onUpdate={onUpdate} {...fixtures.scatter()}>
          <Trace traceIndex={0}>
            <Numeric label="Marker Size" attr="marker.size" />
          </Trace>
        </Editor>
      )
        .find('[attr="marker.size"]')
        .find(NumericInput);

      const sizeUpdate = 200;
      wrapper.prop('onChange')(sizeUpdate);
      const event = onUpdate.mock.calls[0][0];
      expect(event.type).toBe(EDITOR_ACTIONS.UPDATE_TRACES);
      expect(event.payload).toEqual({
        update: {'marker.size': sizeUpdate},
        traceIndexes: [0],
      });
    });

    it('automatically computes min and max defaults', () => {
      const onUpdate = jest.fn();
      const wrapper = mount(
        <Editor onUpdate={onUpdate} {...fixtures.scatter()}>
          <Trace traceIndex={0}>
            <Numeric label="marker size" attr="marker.size" />
          </Trace>
        </Editor>
      )
        .find('[attr="marker.size"]')
        .find(NumericInput);

      expect(wrapper.prop('min')).toBe(0);
      expect(wrapper.prop('max')).toBe(void 0);
    });
  });
});
