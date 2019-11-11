import React from 'react';
import Field from '../Field';
import Radio from '../Radio';
import {PlotlySection} from '../../containers';
import {TestEditor, fixtures, plotly} from 'lib/test-utils';
import {connectTraceToPlot} from 'lib';
import {mount} from 'enzyme';

const Trace = connectTraceToPlot(PlotlySection);

describe('<Radio>', () => {
  it('enables <Field> centering by default', () => {
    const wrapper = mount(
      <TestEditor plotly={plotly} {...fixtures.area()}>
        <Trace traceIndexes={[0]}>
          <Radio
            label="Connect Gaps"
            attr="connectgaps"
            options={[
              {label: 'Connect', value: true},
              {label: 'Blank', value: false},
            ]}
          />
        </Trace>
      </TestEditor>
    ).find(Field);

    expect(wrapper.prop('center')).toBe(true);
  });

  it('permits <Field> centering to be disabled', () => {
    const wrapper = mount(
      <TestEditor plotly={plotly} {...fixtures.area()}>
        <Trace traceIndexes={[0]}>
          <Radio
            center={false}
            label="Connect Gaps"
            attr="connectgaps"
            options={[
              {label: 'Connect', value: true},
              {label: 'Blank', value: false},
            ]}
          />
        </Trace>
      </TestEditor>
    ).find(Field);

    expect(wrapper.prop('center')).toBe(false);
  });
});
