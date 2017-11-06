import Layout from '../Layout';
import Numeric from '../Numeric';
import NumericInput from '../widgets/NumericInputStatefulWrapper';
import React from 'react';
import Section from '../Section';
import {EDITOR_ACTIONS} from '../../constants';
import {TestEditor, fixtures, plotly} from '../../lib/test-utils';
import {mount} from 'enzyme';

function render(config = {}) {
  const editorProps = {
    ...fixtures.scatter(config.fixture),
    onUpdate: jest.fn(),
    ...config.props,
  };

  // return the inner-most plot connected dropdown (last)
  return mount(
    <TestEditor {...editorProps} plotly={plotly}>
      <Layout>
        <Numeric label="Width" min={100} step={10} attr="width" />
      </Layout>
    </TestEditor>
  ).find(Layout);
}

describe('Layout', () => {
  it('wraps components with container pointing to gd._fullLayout', () => {
    const wrapper = render({fixture: {layout: {width: 100}}})
      .find('[attr="width"]')
      .find(NumericInput);

    expect(wrapper.prop('value')).toBe(100);
  });

  it('sends updates to gd._layout', () => {
    const onUpdate = jest.fn();
    const wrapper = render({props: {onUpdate}, fixture: {layout: {width: 100}}})
      .find('[attr="width"]')
      .find(NumericInput);

    wrapper.prop('onChange')(200);
    const event = onUpdate.mock.calls[0][0];
    expect(event.type).toBe(EDITOR_ACTIONS.UPDATE_LAYOUT);
    expect(event.payload).toEqual({update: {width: 200}});
  });
});
