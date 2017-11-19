import {Numeric} from '../components/fields';
import NumericInput from '../components/widgets/NumericInputStatefulWrapper';
import React from 'react';
import {EDITOR_ACTIONS} from '../constants';
import {TestEditor, fixtures} from '../lib/test-utils';
import {
  connectAxesToLayout,
  connectLayoutToPlot,
  connectToContainer,
  connectTraceToPlot,
} from '../lib';
import {mount} from 'enzyme';

describe('Plot Connection', () => {
  it('can connect Field directly with full connection pipeline', () => {
    const onUpdate = jest.fn();
    const fixtureProps = fixtures.scatter({layout: {xaxis: {range: [0, 10]}}});
    const LayoutAxesNumeric = connectLayoutToPlot(
      connectAxesToLayout(connectToContainer(Numeric))
    );
    mount(
      <TestEditor {...{...fixtureProps, onUpdate}}>
        <LayoutAxesNumeric label="Min" attr="range[0]" />
      </TestEditor>
    )
      .find('[attr="range[0]"]')
      .find(NumericInput)
      .find('.js-numeric-increase')
      .simulate('click');

    expect(onUpdate).toBeCalled();
    const update = onUpdate.mock.calls[0][0];
    const {type, payload} = update;
    expect(type).toBe(EDITOR_ACTIONS.UPDATE_LAYOUT);
    expect(payload).toEqual({update: {'xaxis.range[0]': 1}});
  });

  it('can connect to layout when connected within trace context', () => {
    const onUpdate = jest.fn();
    const fixtureProps = fixtures.scatter({layout: {width: 10}});
    const TraceLayoutNumeric = connectTraceToPlot(
      connectLayoutToPlot(connectToContainer(Numeric))
    );
    mount(
      <TestEditor {...{...fixtureProps, onUpdate}}>
        <TraceLayoutNumeric traceIndex={0} label="Width" attr="width" />
      </TestEditor>
    )
      .find('[attr="width"]')
      .find(NumericInput)
      .find('.js-numeric-increase')
      .simulate('click');

    expect(onUpdate).toBeCalled();
    const update = onUpdate.mock.calls[0][0];
    const {type, payload} = update;
    expect(type).toBe(EDITOR_ACTIONS.UPDATE_LAYOUT);
    expect(payload).toEqual({update: {width: 11}});
  });
});
