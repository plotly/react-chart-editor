import React from 'react';
import Section from '../Section';
import MenuPanel from '../MenuPanel';
import {Flaglist, Info, Numeric} from '../../fields';
import {TestEditor, fixtures} from '../../../lib/test-utils';
import {connectTraceToPlot} from '../../../lib';
import {mount} from 'enzyme';

const TraceSection = connectTraceToPlot(Section);

describe('Section', () => {
  it('is visible if it contains any visible children', () => {
    // mode is visible with scatter. Hole is not visible. Section should show.
    const wrapper = mount(
      <TestEditor onUpdate={jest.fn()} {...fixtures.scatter({deref: true})}>
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

  it('is visible if it contains any non attr children', () => {
    const wrapper = mount(
      <TestEditor onUpdate={jest.fn()} {...fixtures.scatter({deref: true})}>
        <Section name="test-section">
          <Info>INFO</Info>
        </Section>
      </TestEditor>
    ).find('[name="test-section"]');

    expect(wrapper.children().length).toBe(1);
    expect(wrapper.find(Info).exists()).toBe(true);
    expect(wrapper.find(Info).text()).toBe('INFO');
  });

  it('is not visible if it contains no visible children', () => {
    // pull and hole are not scatter attrs. Section should not show.
    const wrapper = mount(
      <TestEditor onUpdate={jest.fn()} {...fixtures.scatter({deref: true})}>
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

  it('will render first menuPanel even with no visible attrs', () => {
    const wrapper = mount(
      <TestEditor onUpdate={jest.fn()} {...fixtures.scatter({deref: true})}>
        <Section name="test-section">
          <MenuPanel show>
            <Info>INFO</Info>
          </MenuPanel>
          <MenuPanel show>
            <Info>MISINFORMATION</Info>
          </MenuPanel>
        </Section>
      </TestEditor>
    ).find('[name="test-section"]');

    expect(wrapper.find(Info).length).toBe(1);
    expect(wrapper.find(Info).text()).toBe('INFO');
  });
});
