import React from 'react';
import {TraceAccordion, PlotlyFold, LayoutPanel} from '..';
import {TextEditor} from '../../fields';
import {TestEditor, fixtures, mount} from 'lib/test-utils';

describe('<TraceAccordion>', () => {
  it('generates trace PlotlyFolds with name == text', () => {
    const fixture = fixtures.scatter({data: [{name: 'hodor'}]});

    const folds = mount(
      <TestEditor {...{...fixture, onUpdate: jest.fn()}}>
        <LayoutPanel>
          <TraceAccordion>
            <TextEditor attr="name" />
          </TraceAccordion>
        </LayoutPanel>
      </TestEditor>
    ).find(PlotlyFold);

    expect(folds.at(0).prop('name')).toBe('hodor');
  });

  it('can add traces', () => {
    const fixture = fixtures.scatter({data: [{name: 'hodor'}]});
    const beforeAddTrace = jest.fn();
    const editor = mount(
      <TestEditor {...{...fixture, beforeAddTrace}}>
        <LayoutPanel>
          <TraceAccordion canAdd>
            <TextEditor attr="name" />
          </TraceAccordion>
        </LayoutPanel>
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
        <LayoutPanel>
          <TraceAccordion canAdd>
            <TextEditor attr="name" />
          </TraceAccordion>
        </LayoutPanel>
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
