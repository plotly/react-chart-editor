import DropdownWidget from '../widgets/Dropdown';
import React from 'react';
import {EDITOR_ACTIONS} from '../../constants';
import {TestEditor, fixtures, plotly} from '../../lib/test-utils';
import {mount} from 'enzyme';

function render(overrides = {}) {
  const {attr = 'x', ...props} = overrides;
  const editorProps = {...fixtures.scatter(), onUpdate: jest.fn(), ...props};

  // return the inner-most plot connected dropdown (last)
  return mount(<TestEditor {...editorProps} plotly={plotly} />)
    .find(`[attr="${attr}"]`)
    .last();
}

describe('DataSelector', () => {
  it('contains options defined by dataSources', () => {
    const {dataSources} = fixtures.scatter();
    const wrapper = render({dataSources}).find(DropdownWidget);
    expect(wrapper.prop('options')).toEqual(Object.keys(dataSources));
  });

  it('uses gd.data dataSrc value not fullValue when data_array', () => {
    const wrapper = render().find(DropdownWidget);
    expect(wrapper.prop('value')).toBe('x1');
  });

  // arrayOk not implemented in defaultEditor yet
  it('uses gd.data dataSrc value not fullValue when arrayOk', () => {});

  it('calls updatePlot with srcAttr', () => {
    const onUpdate = jest.fn();
    const wrapper = render({onUpdate}).find(DropdownWidget);
    wrapper.prop('onChange')('y2');
    expect(onUpdate.mock.calls[0][0].payload).toEqual({
      update: {xsrc: ['y2']},
      traceIndexes: [0],
    });
  });

  it('is invisible when a data src does not exist for trace type', () => {
    let wrapper = render().find(DropdownWidget);
    expect(wrapper.exists()).toBe(true);

    wrapper = render({...fixtures.pie(), attr: 'x'}).find(DropdownWidget);
    expect(wrapper.exists()).toBe(false);
  });
});
