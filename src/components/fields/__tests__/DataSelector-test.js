/* eslint-disable no-magic-numbers*/
import DataSelector from '../DataSelector';
import DropdownWidget from '../../widgets/Dropdown';
import {TestEditor, fixtures, plotly} from 'lib/test-utils';
import connectTraceToPlot from 'lib/connectTraceToPlot';
import {mount} from 'enzyme';

function render(overrides = {}, children) {
  const {attr = 'x', ...props} = overrides;
  const editorProps = {...fixtures.scatter(), onUpdate: jest.fn(), ...props};

  // return the inner-most plot connected dropdown (last)
  return mount(
    <TestEditor {...editorProps} plotly={plotly}>
      {children}
    </TestEditor>
  )
    .find(`[attr="${attr}"]`)
    .last();
}

describe('DataSelector', () => {
  it('contains options defined by dataSources', () => {
    const {dataSources} = fixtures.scatter();
    const wrapper = render({dataSources}).find(DropdownWidget);
    expect(wrapper.prop('options')).toEqual([
      {label: 'xCol', value: 'x1'},
      {label: 'yCol', value: 'y1'},
      {label: 'yCol2', value: 'y2'},
    ]);
  });

  it('uses gd.data dataSrc value not fullValue when data_array', () => {
    const wrapper = render().find(DropdownWidget);
    expect(wrapper.prop('value')).toBe('x1');
  });

  // arrayOk not implemented in defaultEditor yet
  it('uses gd.data dataSrc value not fullValue when arrayOk', () => {});

  it('calls updatePlot with srcAttr and data when present', () => {
    const beforeUpdateTraces = jest.fn();
    const wrapper = render({beforeUpdateTraces}).find(DropdownWidget);
    beforeUpdateTraces.mockClear();
    wrapper.prop('onChange')('y1');
    expect(beforeUpdateTraces.mock.calls[0][0]).toEqual({
      update: {'meta.columnNames.x': 'yCol', xsrc: 'y1', x: [2, 3, 4]},
      traceIndexes: [1],
    });
  });

  it('is invisible when a data src does not exist for trace type', () => {
    let wrapper = render().find(DropdownWidget);
    expect(wrapper.exists()).toBe(true);

    wrapper = render({...fixtures.pie(), attr: 'x'}).find(DropdownWidget);
    expect(wrapper.exists()).toBe(false);
  });

  it('uses trace specific label', () => {
    const TraceDataSelector = connectTraceToPlot(DataSelector);
    const wrapper = render(
      {},
      <TraceDataSelector traceIndexes={[0]} label={{pie: 'hodor', '*': 'rodoh'}} attr="x" />
    );
    expect(wrapper.find('.field__title-text').text()).toContain('rodoh');
  });
});
