import NumericInput from '../../components/widgets/NumericInputStatefulWrapper';
import React from 'react';
import {EDITOR_ACTIONS} from '../../constants';
import {Numeric, Section, Panel} from '../../components';
import {TestEditor, fixtures} from '../test-utils';
import {
  connectAxesToLayout,
  connectLayoutToPlot,
  connectToContainer,
  connectTraceToPlot,
  getLayoutContext,
  unpackPlotProps,
} from '..';
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

  // see https://github.com/plotly/react-plotly.js-editor/issues/58#issuecomment-345492794
  it("can't find correct Container when Section divides Trace and Layout", () => {
    const onUpdate = jest.fn();
    const fixtureProps = fixtures.scatter({layout: {width: 10}});
    const DeeplyConnectedNumeric = connectTraceToPlot(
      connectLayoutToPlot(
        connectToContainer(Numeric, {
          supplyPlotProps: (props, context, plotProps) => {
            plotProps.connectToContainerModifiedPlotProp = true;
          },
        })
      )
    );

    const wrapper = mount(
      <TestEditor {...{...fixtureProps, onUpdate}}>
        <Section name="Canvas">
          <DeeplyConnectedNumeric traceIndex={0} label="Width" attr="width" />
        </Section>
      </TestEditor>
    )
      .find('[attr="width"]')
      .find(Numeric);

    // It is 0 because Section is passing _its_ context to unpackPlotProps.
    // The context of Section is Trace not layout and width isn't defined
    // in Trace. See next test for workaround.
    expect(wrapper.length).toBe(0);
  });

  it('can supplyPlotProps within <Section> and nested Layout and Trace', () => {
    const onUpdate = jest.fn();
    const fixtureProps = fixtures.scatter({layout: {width: 10}});
    const TracePanel = connectTraceToPlot(Panel);
    const LayoutConnectedNumeric = connectLayoutToPlot(
      connectToContainer(Numeric, {
        supplyPlotProps: (props, context) => {
          return unpackPlotProps(props, {
            ...context,
            ...getLayoutContext(context),
          });
        },
      })
    );

    mount(
      <TestEditor {...{...fixtureProps, onUpdate}}>
        <TracePanel traceIndex={0}>
          <Section name="Canvas">
            <LayoutConnectedNumeric traceIndex={0} label="Width" attr="width" />
          </Section>
        </TracePanel>
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
