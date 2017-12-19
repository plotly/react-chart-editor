import NumericInput from '../../components/widgets/NumericInput';
import React from 'react';
import {Numeric, Section, Panel} from '../../components';
import {TestEditor, fixtures, mount} from '../test-utils';
import {
  connectAxesToLayout,
  connectLayoutToPlot,
  connectToContainer,
  connectTraceToPlot,
  getLayoutContext,
  unpackPlotProps,
} from '..';

describe('Plot Connection', () => {
  it('can connect Field directly with full connection pipeline', () => {
    const onUpdateLayout = jest.fn();
    const fixtureProps = fixtures.scatter({layout: {xaxis: {range: [0, 10]}}});
    const LayoutAxesNumeric = connectLayoutToPlot(
      connectAxesToLayout(connectToContainer(Numeric))
    );
    mount(
      <TestEditor {...{...fixtureProps, onUpdateLayout}}>
        <LayoutAxesNumeric label="Min" attr="range[0]" />
      </TestEditor>
    )
      .find('[attr="range[0]"]')
      .find(NumericInput)
      .find('.js-numeric-increase')
      .simulate('click');

    expect(onUpdateLayout).toBeCalled();
    const payload = onUpdateLayout.mock.calls[0][0];
    expect(payload).toEqual({update: {'xaxis.range[0]': 1}});
  });

  it('can connect to layout when connected within trace context', () => {
    const onUpdateLayout = jest.fn();
    const fixtureProps = fixtures.scatter({layout: {width: 10}});
    const TraceLayoutNumeric = connectTraceToPlot(
      connectLayoutToPlot(connectToContainer(Numeric))
    );
    mount(
      <TestEditor {...{...fixtureProps, onUpdateLayout}}>
        <TraceLayoutNumeric traceIndex={0} label="Width" attr="width" />
      </TestEditor>
    )
      .find('[attr="width"]')
      .find(NumericInput)
      .find('.js-numeric-increase')
      .simulate('click');

    expect(onUpdateLayout).toBeCalled();
    const payload = onUpdateLayout.mock.calls[0][0];
    expect(payload).toEqual({update: {width: 11}});
  });

  // see https://github.com/plotly/react-plotly.js-editor/issues/58#issuecomment-345492794
  it("can't find correct Container when Section divides Trace and Layout", () => {
    const fixtureProps = fixtures.scatter({layout: {width: 10}});
    const DeeplyConnectedNumeric = connectTraceToPlot(
      connectLayoutToPlot(
        connectToContainer(Numeric, {
          modifyPlotProps: (props, context, plotProps) => {
            plotProps.connectToContainerModifiedPlotProp = true;
          },
        })
      )
    );

    const wrapper = mount(
      <TestEditor {...{...fixtureProps}}>
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
    const onUpdateLayout = jest.fn();
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
      <TestEditor {...{...fixtureProps, onUpdateLayout}}>
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

    expect(onUpdateLayout).toBeCalled();
    const payload = onUpdateLayout.mock.calls[0][0];
    expect(payload).toEqual({update: {width: 11}});
  });

  it('can supply and modify plotProps with <Trace><Section><LayoutComp>', () => {
    const fixtureProps = fixtures.scatter({layout: {width: 10}});
    const TracePanel = connectTraceToPlot(Panel);
    const supplyLayoutPlotProps = (props, context) => {
      return unpackPlotProps(props, {
        ...context,
        ...getLayoutContext(context),
      });
    };

    const MAXWIDTH = 1000;
    const LayoutWidth = connectLayoutToPlot(
      connectToContainer(Numeric, {
        supplyPlotProps: supplyLayoutPlotProps,
        modifyPlotProps: (props, context, plotProps) => {
          plotProps.max = MAXWIDTH;
        },
      })
    );

    const wrapper = mount(
      <TestEditor {...{...fixtureProps}}>
        <TracePanel traceIndex={0}>
          <Section name="Canvas">
            <LayoutWidth traceIndex={0} label="Width" attr="width" />
          </Section>
        </TracePanel>
      </TestEditor>
    )
      .find('[attr="width"]')
      .find(NumericInput);

    expect(wrapper.prop('max')).toBe(MAXWIDTH);
  });
});
