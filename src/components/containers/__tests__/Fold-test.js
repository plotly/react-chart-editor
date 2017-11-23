import {Numeric} from '../../fields';
import {Fold} from '..';
import React from 'react';
import {EDITOR_ACTIONS} from '../../../lib/constants';
import {TestEditor, fixtures, mount} from '../../../lib/test-utils';
import {connectTraceToPlot} from '../../../lib';

const TraceFold = connectTraceToPlot(Fold);

describe('<Fold>', () => {
  it('shows deleteContainer button when deleteContainer function present', () => {
    const withoutDelete = mount(
      <TestEditor {...fixtures.scatter()}>
        <Fold>
          <Numeric attr="opacity" />
        </Fold>
      </TestEditor>
    ).find('.fold__delete');
    expect(withoutDelete.exists()).toBe(false);

    const withDelete = mount(
      <TestEditor {...fixtures.scatter()}>
        <TraceFold traceIndex={0}>
          <Numeric attr="opacity" />
        </TraceFold>
      </TestEditor>
    ).find('.fold__delete');
    expect(withDelete.exists()).toBe(true);
  });

  it('calls deleteContainer when function present', () => {
    const onUpdate = jest.fn();
    mount(
      <TestEditor {...fixtures.scatter()} onUpdate={onUpdate}>
        <TraceFold traceIndex={0}>
          <Numeric attr="opacity" />
        </TraceFold>
      </TestEditor>
    )
      .find('.fold__delete')
      .simulate('click');

    const {type, payload} = onUpdate.mock.calls[0][0];
    expect(type).toBe(EDITOR_ACTIONS.DELETE_TRACE);
    expect(payload).toEqual({traceIndexes: [0]});
  });
});
