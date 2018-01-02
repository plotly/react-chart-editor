import React from 'react';
import {AnnotationAccordion, Panel, Fold} from '..';
import {Numeric} from '../../fields';
import {TestEditor, fixtures, mount} from 'lib/test-utils';
import {connectLayoutToPlot} from 'lib';

const LayoutPanel = connectLayoutToPlot(Panel);

describe('<AnnotationAccordion>', () => {
  it('generates annotation Folds with name == text', () => {
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
    ).find(Fold);

    expect(folds.length).toBe(2);
    expect(folds.at(0).prop('name')).toBe('hodor');
    expect(folds.at(1).prop('name')).toBe('rodoh');
  });

  it('can add annotations', () => {
    const fixture = fixtures.scatter();
    const onUpdateLayout = jest.fn();
    const editor = mount(
      <TestEditor {...{...fixture, onUpdateLayout}}>
        <LayoutPanel name="Annotations">
          <AnnotationAccordion canAdd>
            <Numeric attr="textangle" />
          </AnnotationAccordion>
        </LayoutPanel>
      </TestEditor>
    );

    editor.find('button.js-add-annotation-button').simulate('click');

    const payload = onUpdateLayout.mock.calls[0][0];
    expect(payload.update).toEqual({'annotations[0]': {text: 'new text'}});
  });

  it('can delete annotations', () => {
    const fixture = fixtures.scatter({
      layout: {annotations: [{text: 'hodor'}, {text: 'rodoh'}]},
    });
    const onDeleteAnnotation = jest.fn();
    const editor = mount(
      <TestEditor {...{...fixture, onDeleteAnnotation}}>
        <LayoutPanel name="Annotations">
          <AnnotationAccordion>
            <Numeric attr="textangle" />
          </AnnotationAccordion>
        </LayoutPanel>
      </TestEditor>
    );
    editor
      .find('.js-fold__delete')
      .at(0)
      .simulate('click');

    const update = onDeleteAnnotation.mock.calls[0][0];
    expect(update.annotationIndex).toBe(0);
  });
});
