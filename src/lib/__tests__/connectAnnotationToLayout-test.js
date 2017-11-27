import NumericInput from '../../components/widgets/NumericInput';
import React from 'react';
import {EDITOR_ACTIONS} from '../constants';
import {Numeric} from '../../components/fields';
import {TestEditor, fixtures, mount} from '../test-utils';
import {connectLayoutToPlot, connectAnnotationToLayout} from '..';

describe('connectAnnotationToLayout', () => {
  it('sends update to layout.annotation[index]', () => {
    const onUpdate = jest.fn();
    const fixture = fixtures.scatter({
      layout: {annotations: [{text: 'hodor'}]},
    });
    const ConnectedNumeric = connectLayoutToPlot(
      connectAnnotationToLayout(Numeric)
    );

    mount(
      <TestEditor {...{...fixture, onUpdate}}>
        <ConnectedNumeric annotationIndex={0} label="Angle" attr="textangle" />
      </TestEditor>
    )
      .find(NumericInput)
      .find('.js-numeric-increase')
      .simulate('click');

    const update = onUpdate.mock.calls[0][0];
    const {type, payload} = update;
    expect(type).toBe(EDITOR_ACTIONS.UPDATE_LAYOUT);
    expect(payload.update).toEqual({'annotations[0].textangle': 1});
  });
});
