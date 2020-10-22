import {Numeric} from '../../components';
import {TestEditor, fixtures, plotly} from '../test-utils';
import {connectLayoutToPlot, connectAxesToLayout} from '..';
import {mount} from 'enzyme';

describe('multiValued Numeric', () => {
  it('uses multiValued defaultContainer as default increment value', () => {
    const beforeUpdateLayout = jest.fn();
    const xaxisLowerRange = -30;
    const fixtureProps = fixtures.scatter({
      layout: {xaxis: {range: [xaxisLowerRange, 3]}, yaxis: {range: [0, 3]}},
    });
    const AxesNumeric = connectLayoutToPlot(connectAxesToLayout(Numeric));

    mount(
      <TestEditor {...{...fixtureProps, beforeUpdateLayout, plotly}}>
        <AxesNumeric attr="range[0]" />
      </TestEditor>
    )
      .find('.js-numeric-increase')
      .simulate('click');

    expect(beforeUpdateLayout).toBeCalled();
    const payload = beforeUpdateLayout.mock.calls[0][0];
    expect(payload.update).toEqual({
      'xaxis.range[0]': xaxisLowerRange + 1,
    });
  });
});
