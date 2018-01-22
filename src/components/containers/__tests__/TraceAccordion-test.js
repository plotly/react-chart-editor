import React from 'react';
import {TraceAccordion, Fold, Panel} from '..';
import {Numeric} from '../../fields';
import {TestEditor, fixtures, mount} from 'lib/test-utils';

describe('<TraceAccordion>', () => {
  it('generates trace Folds with name == text', () => {
    const fixture = fixtures.scatter({data: [{name: 'hodor'}]});

    const folds = mount(
      <TestEditor {...{...fixture, onUpdate: jest.fn()}}>
        <Panel>
          <TraceAccordion>
            <Numeric attr="textangle" />
          </TraceAccordion>
        </Panel>
      </TestEditor>
    ).find(Fold);

    expect(folds.at(0).prop('name')).toBe('hodor');
  });

  it('can add traces', () => {
    const fixture = fixtures.scatter();
    const beforeAddTrace = jest.fn();
    const editor = mount(
      <TestEditor {...{...fixture, beforeAddTrace}}>
        <Panel>
          <TraceAccordion canAdd>
            <Numeric attr="textangle" />
          </TraceAccordion>
        </Panel>
      </TestEditor>
    );

    editor.find('button.js-add-button').simulate('click');

    expect(beforeAddTrace).toBeCalled();
  });

  it('can delete traces', () => {
    const fixture = fixtures.scatter({data: [{name: 'hodor'}]});
    const beforeDeleteTrace = jest.fn();
    const editor = mount(
      <TestEditor {...{...fixture, beforeDeleteTrace}}>
        <Panel>
          <TraceAccordion canAdd>
            <Numeric attr="textangle" />
          </TraceAccordion>
        </Panel>
      </TestEditor>
    );

    editor
      .find('.js-fold__delete')
      .at(0)
      .simulate('click');

    expect(beforeDeleteTrace).toBeCalled();
    const update = beforeDeleteTrace.mock.calls[0][0];
    expect(update.traceIndexes[0]).toBe(0);
  });
});
