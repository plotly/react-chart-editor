import {Numeric} from '../../fields';
import {PlotlyFold, PlotlyPanel} from '..';
import React from 'react';
import {TestEditor, fixtures, mount} from 'lib/test-utils';
import {connectTraceToPlot} from 'lib';

const TraceFold = connectTraceToPlot(PlotlyFold);

describe('<PlotlyFold>', () => {
  it('shows deleteContainer button when deleteContainer function present and canDelete is true', () => {
    const withoutDelete = mount(
      <TestEditor {...fixtures.scatter()}>
        <PlotlyPanel>
          <PlotlyFold>
            <Numeric attr="opacity" />
          </PlotlyFold>
        </PlotlyPanel>
      </TestEditor>
    ).find('.js-fold__delete');
    expect(withoutDelete.exists()).toBe(false);

    const withDelete = mount(
      <TestEditor {...fixtures.scatter()}>
        <PlotlyPanel>
          <TraceFold traceIndexes={[0]} canDelete={true}>
            <Numeric attr="opacity" />
          </TraceFold>
        </PlotlyPanel>
      </TestEditor>
    ).find('.js-fold__delete');
    expect(withDelete.exists()).toBe(true);
  });

  it('calls deleteContainer when function present and canDelete is true', () => {
    const beforeDeleteTrace = jest.fn();
    mount(
      <TestEditor {...fixtures.scatter()} beforeDeleteTrace={beforeDeleteTrace}>
        <PlotlyPanel>
          <TraceFold traceIndexes={[0]} canDelete={true}>
            <Numeric attr="opacity" />
          </TraceFold>
        </PlotlyPanel>
      </TestEditor>
    )
      .find('.js-fold__delete')
      .simulate('click');

    const payload = beforeDeleteTrace.mock.calls[0][0];
    expect(payload).toEqual({traceIndexes: [0]});
  });
});
