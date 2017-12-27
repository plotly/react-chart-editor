import React from 'react';
import {TraceAccordion, Fold} from '..';
import {Numeric} from '../../fields';
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
    const onAddTrace = jest.fn();
    const editor = mount(
      <TestEditor {...{...fixture, onAddTrace}}>
        <TraceAccordion canAdd>
          <Numeric attr="textangle" />
        </TraceAccordion>
      </TestEditor>
    );

    editor.find('.panel__add-button').simulate('click');

    expect(onAddTrace).toBeCalled();
  });

  it('can delete traces', () => {
    const fixture = fixtures.scatter({data: [{name: 'hodor'}]});
    const onDeleteTrace = jest.fn();
    const editor = mount(
      <TestEditor {...{...fixture, onDeleteTrace}}>
        <TraceAccordion>
          <Numeric attr="textangle" />
        </TraceAccordion>
      </TestEditor>
    );

    editor
      .find('.fold__top__delete')
      .at(0)
      .simulate('click');

    expect(onDeleteTrace).toBeCalled();
    const update = onDeleteTrace.mock.calls[0][0];
    expect(update.traceIndexes[0]).toBe(0);
  });
});
