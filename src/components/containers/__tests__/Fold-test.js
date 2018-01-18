import {Numeric} from '../../fields';
import {Fold, Panel} from '..';
import React from 'react';
import {TestEditor, fixtures, mount} from 'lib/test-utils';
import {connectTraceToPlot} from 'lib';

const TraceFold = connectTraceToPlot(Fold);

describe('<Fold>', () => {
  it('shows deleteContainer button when deleteContainer function present and canDelete is true', () => {
    const withoutDelete = mount(
      <TestEditor {...fixtures.scatter()}>
        <Panel>
          <Fold foldIndex={0}>
            <Numeric attr="opacity" />
          </Fold>
        </Panel>
      </TestEditor>
    ).find('.js-fold__delete');
    expect(withoutDelete.exists()).toBe(false);

    const withDelete = mount(
      <TestEditor {...fixtures.scatter()}>
        <Panel>
          <TraceFold traceIndex={0} canDelete={true} foldIndex={0}>
            <Numeric attr="opacity" />
          </TraceFold>
        </Panel>
      </TestEditor>
    ).find('.js-fold__delete');
    expect(withDelete.exists()).toBe(true);
  });

  it('calls deleteContainer when function present and canDelete is true', () => {
    const beforeDeleteTrace = jest.fn();
    mount(
      <TestEditor {...fixtures.scatter()} beforeDeleteTrace={beforeDeleteTrace}>
        <Panel>
          <TraceFold traceIndex={0} canDelete={true} foldIndex={0}>
            <Numeric attr="opacity" />
          </TraceFold>
        </Panel>
      </TestEditor>
    )
      .find('.js-fold__delete')
      .simulate('click');

    const payload = beforeDeleteTrace.mock.calls[0][0];
    expect(payload).toEqual({traceIndexes: [0]});
  });
});
