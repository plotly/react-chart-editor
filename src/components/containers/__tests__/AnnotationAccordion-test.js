import React from 'react';
import {AnnotationAccordion, Panel, Fold} from '..';
import {Numeric} from '../../fields';
import {TestEditor, fixtures, mount} from '../../../lib/test-utils';
import {connectLayoutToPlot} from '../../../lib';

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
});
