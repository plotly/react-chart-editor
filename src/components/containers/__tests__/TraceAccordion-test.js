import React from 'react';
import {TraceAccordion, Fold} from '..';
import {Numeric} from '../../fields';
import {EDITOR_ACTIONS} from '../../../lib/constants';
import {TestEditor, fixtures, mount} from '../../../lib/test-utils';

describe('<TraceAccordion>', () => {
  it('generates trace Folds with name == text', () => {
    const fixture = fixtures.scatter({data: [{name: 'hodor'}]});

    const folds = mount(
      <TestEditor {...{...fixture, onUpdate: jest.fn()}}>
        <TraceAccordion>
          <Numeric attr="textangle" />
        </TraceAccordion>
      </TestEditor>
    ).find(Fold);

    expect(folds.at(0).prop('name')).toBe('hodor');
  });

  it('can add traces', () => {
    const fixture = fixtures.scatter();
    const onUpdate = jest.fn();
    const editor = mount(
      <TestEditor {...{...fixture, onUpdate}}>
        <TraceAccordion canAdd>
          <Numeric attr="textangle" />
        </TraceAccordion>
      </TestEditor>
    );

    editor.find('.panel__add-button').simulate('click');

    const update = onUpdate.mock.calls[0][0];
    expect(update.type).toBe(EDITOR_ACTIONS.ADD_TRACE);
  });

  it('can delete traces', () => {
    const fixture = fixtures.scatter({data: [{name: 'hodor'}]});
    const onUpdate = jest.fn();
    const editor = mount(
      <TestEditor {...{...fixture, onUpdate}}>
        <TraceAccordion>
          <Numeric attr="textangle" />
        </TraceAccordion>
      </TestEditor>
    );

    editor
      .find('.fold__delete')
      .at(0)
      .simulate('click');

    const update = onUpdate.mock.calls[0][0];
    expect(update.type).toBe(EDITOR_ACTIONS.DELETE_TRACE);
  });
});
