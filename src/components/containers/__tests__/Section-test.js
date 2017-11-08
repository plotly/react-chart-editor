import Section from '../Section';
import Flaglist from '../Flaglist';
import Numeric from '../Numeric';
import {connectTraceToPlot} from '../../lib';
import React from 'react';
import {TestEditor, fixtures, plotly} from '../../lib/test-utils';
import {mount} from 'enzyme';

const TraceSection = connectTraceToPlot(Section);

describe('Section', () => {
  it('is visible if it contains any visible children', () => {
    // mode is visible with scatter. Hole is not visible. Section should show.
    const wrapper = mount(
      <TestEditor
        plotly={plotly}
        onUpdate={jest.fn()}
        {...fixtures.scatter({deref: true})}
      >
        <TraceSection traceIndex={0} name="test-section">
          <Flaglist
            attr="mode"
            options={[
              {label: 'Lines', value: 'lines'},
              {label: 'Points', value: 'markers'},
            ]}
          />
          <Numeric attr="hole" min={0} max={1} step={0.1} />
        </TraceSection>
      </TestEditor>
    )
      .find('[name="test-section"]')
      // we use last to select the Section within the higher-level component
      .last();

    expect(wrapper.children().length).toBe(1);
    expect(
      wrapper
        .find(Flaglist)
        .childAt(0) // unwrap higher-level component
        .exists()
    ).toBe(true);
    expect(
      wrapper
        .find(Numeric)
        .childAt(0) // unwrap higher-level component
        .exists()
    ).toBe(false);
  });

  it('is not visible if it contains no visible children', () => {
    // pull and hole are not scatter attrs. Section should not show.
    const wrapper = mount(
      <TestEditor
        plotly={plotly}
        onUpdate={jest.fn()}
        {...fixtures.scatter({deref: true})}
      >
        <TraceSection traceIndex={0} name="test-section">
          <Numeric attr="pull" min={0} max={1} step={0.1} traceIndex={0} />
          <Numeric attr="hole" min={0} max={1} step={0.1} traceIndex={0} />
        </TraceSection>
      </TestEditor>
    )
      .find('[name="test-section"]')
      // we use last to select the Section within the higher-level component
      .last();

    // childAt(0) unwraps higher-level component
    expect(wrapper.children().length).toBe(0);

    expect(wrapper.find(Flaglist).exists()).toBe(false);
    expect(wrapper.find(Numeric).exists()).toBe(false);
  });
});
