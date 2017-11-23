import NumericInput from '../../components/widgets/NumericInput';
import React from 'react';
import {MULTI_VALUED_PLACEHOLDER} from '../constants';
import {Numeric} from '../../components';
import {TestEditor, fixtures, plotly} from '../test-utils';
import {connectLayoutToPlot, connectAxesToLayout} from '..';
import {mount} from 'enzyme';

describe('multiValued Numeric', () => {
  it('uses placeholder and empty string value', () => {
    const fixtureProps = fixtures.scatter({
      layout: {xaxis: {range: [0, 1]}, yaxis: {range: [-1, 1]}},
    });
    const AxesNumeric = connectLayoutToPlot(connectAxesToLayout(Numeric));

    const rangeInputs = mount(
      <TestEditor {...{...fixtureProps, onUpdate: jest.fn(), plotly}}>
        <AxesNumeric attr="range[0]" defaultAxesTarget="xaxis" />
        <AxesNumeric attr="range[0]" defaultAxesTarget="yaxis" />
        <AxesNumeric attr="range[0]" defaultAxesTarget="allaxes" />
      </TestEditor>
    ).find(NumericInput);

    expect(rangeInputs.length).toBe(3);

    const xaxisRangeInput = rangeInputs.at(0);
    const yaxisRangeInput = rangeInputs.at(1);
    const allaxisRangeInput = rangeInputs.at(2);

    expect(xaxisRangeInput.prop('value')).toBe(0);
    expect(yaxisRangeInput.prop('value')).toBe(-1);
    expect(allaxisRangeInput.prop('value')).toBe('');
    expect(allaxisRangeInput.prop('placeholder')).toBe(
      MULTI_VALUED_PLACEHOLDER
    );
  });

  it('uses multiValued defaultContainer as default increment value', () => {
    const onUpdate = jest.fn();
    const xaxisLowerRange = -30;
    const fixtureProps = fixtures.scatter({
      layout: {xaxis: {range: [xaxisLowerRange, 3]}, yaxis: {range: [0, 3]}},
    });
    const AxesNumeric = connectLayoutToPlot(connectAxesToLayout(Numeric));

    mount(
      <TestEditor {...{...fixtureProps, onUpdate, plotly}}>
        <AxesNumeric attr="range[0]" defaultAxesTarget="allaxes" />
      </TestEditor>
    )
      .find('.js-numeric-increase')
      .simulate('click');

    expect(onUpdate).toBeCalled();
    const update = onUpdate.mock.calls[0][0];
    const {payload} = update;
    expect(payload.update).toEqual({
      'xaxis.range[0]': xaxisLowerRange,
      'yaxis.range[0]': xaxisLowerRange,
    });
  });
});
