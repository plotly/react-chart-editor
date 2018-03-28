import React from 'react';
import {AnnotationAccordion, PlotlyPanel, PlotlyFold} from '..';
import {Numeric} from '../../fields';
import {TestEditor, fixtures, mount} from 'lib/test-utils';
import {connectLayoutToPlot} from 'lib';

const LayoutPanel = connectLayoutToPlot(PlotlyPanel);

describe('<AnnotationAccordion>', () => {
  it('generates annotation PlotlyFolds with name == text', () => {
    const fixture = fixtures.scatter({
      layout: {annotations: [{text: 'hodor'}, {text: 'rodoh'}]},
    });

    const folds = mount(
      <TestEditor {...{...fixture, onUpdate: jest.fn()}}>
        <LayoutPanel name="Annotations">
          <AnnotationAccordion>
            <Numeric attr="textangle" />
          </AnnotationAccordion>
        </LayoutPanel>
      </TestEditor>
    ).find(PlotlyFold);

    expect(folds.length).toBe(2);
    expect(folds.at(0).prop('name')).toBe('hodor');
    expect(folds.at(1).prop('name')).toBe('rodoh');
  });

  it('can add annotations', () => {
    const fixture = fixtures.scatter();
    const beforeUpdateLayout = jest.fn();
    const editor = mount(
      <TestEditor {...{...fixture, beforeUpdateLayout}}>
        <LayoutPanel name="Annotations">
          <AnnotationAccordion canAdd>
            <Numeric attr="textangle" />
          </AnnotationAccordion>
        </LayoutPanel>
      </TestEditor>
    );

    editor.find('button.js-add-button').simulate('click');

    const payload = beforeUpdateLayout.mock.calls[0][0];
    expect(payload.update).toEqual({'annotations[0]': {text: 'new text'}});
  });

  it('can delete annotations', () => {
    const fixture = fixtures.scatter({
      layout: {annotations: [{text: 'hodor'}, {text: 'rodoh'}]},
    });
    const beforeDeleteAnnotation = jest.fn();
    const editor = mount(
      <TestEditor {...{...fixture, beforeDeleteAnnotation}}>
        <LayoutPanel name="Annotations">
          <AnnotationAccordion canAdd>
            <Numeric attr="textangle" />
          </AnnotationAccordion>
        </LayoutPanel>
      </TestEditor>
    );
    editor
      .find('.js-fold__delete')
      .at(0)
      .simulate('click');

    const update = beforeDeleteAnnotation.mock.calls[0][0];
    expect(update.annotationIndex).toBe(0);
  });
});
