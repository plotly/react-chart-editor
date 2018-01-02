import {Numeric} from '../../fields';
import {Fold} from '..';
import React from 'react';
import {TestEditor, fixtures, mount} from 'lib/test-utils';
import {connectTraceToPlot} from 'lib';

const TraceFold = connectTraceToPlot(Fold);

describe('<Fold>', () => {
  it('shows deleteContainer button when deleteContainer function present', () => {
    const withoutDelete = mount(
      <TestEditor {...fixtures.scatter()}>
        <Fold>
          <Numeric attr="opacity" />
        </Fold>
      </TestEditor>
    ).find('.js-fold__delete');
    expect(withoutDelete.exists()).toBe(false);

    const withDelete = mount(
      <TestEditor {...fixtures.scatter()}>
        <TraceFold traceIndex={0}>
          <Numeric attr="opacity" />
        </TraceFold>
      </TestEditor>
    ).find('.js-fold__delete');
    expect(withDelete.exists()).toBe(true);
  });

  it('calls deleteContainer when function present', () => {
    const onDeleteTrace = jest.fn();
    mount(
      <TestEditor {...fixtures.scatter()} onDeleteTrace={onDeleteTrace}>
        <TraceFold traceIndex={0}>
          <Numeric attr="opacity" />
        </TraceFold>
      </TestEditor>
    )
      .find('.js-fold__delete')
      .simulate('click');

    const payload = onDeleteTrace.mock.calls[0][0];
    expect(payload).toEqual({traceIndexes: [0]});
  });
});
