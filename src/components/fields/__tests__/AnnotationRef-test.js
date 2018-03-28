import {AnnotationRef, AnnotationArrowRef} from '../derived';
import DropdownWidget from '../../widgets/Dropdown';
import React from 'react';
import {PlotlyPanel} from '../../';
import {TestEditor, fixtures, plotly, mount} from 'lib/test-utils';
import {connectAnnotationToLayout, connectLayoutToPlot} from 'lib';

const LayoutAnnoPanel = connectLayoutToPlot(
  connectAnnotationToLayout(PlotlyPanel)
);

describe('<AnnotationRef>', () => {
  function render(props) {
    return mount(
      <TestEditor {...{onUpdate: jest.fn(), ...props, plotly}}>
        <LayoutAnnoPanel name="Layout" annotationIndex={0}>
          <AnnotationRef attr="yref" />
        </LayoutAnnoPanel>
      </TestEditor>
    );
  }

  it('computes axes options for all axes using title and ids as labels', () => {
    const fixtureProps = fixtures.scatter({
      layout: {annotations: [{text: 'thor'}]},
    });
    const drop = render({...fixtureProps}).find(DropdownWidget);

    const options = drop.first().prop('options');
    expect(options.length).toBe(3);
    expect(options[0]).toEqual({label: 'Canvas', value: 'paper'});
    expect(options[1]).toEqual({label: 'Y 1', value: 'y'});
    expect(options[2]).toEqual({label: 'Y: yaxis2 title', value: 'y2'});
  });

  it('sends update for a[x|y]ref attr on [x|y]ref change', () => {
    const beforeUpdateLayout = jest.fn();
    const fixtureProps = fixtures.scatter({
      layout: {annotations: [{text: 'thor', ayref: 'y'}]},
    });
    const drop = render({beforeUpdateLayout, ...fixtureProps}).find(
      DropdownWidget
    );

    drop.prop('onChange')('y2');

    const {update} = beforeUpdateLayout.mock.calls[0][0];
    expect(update).toEqual({
      'annotations[0].ayref': 'y2',
      'annotations[0].yref': 'y2',
    });
  });

  it('does not send update for a[x|y]ref attr on "paper" change', () => {
    const beforeUpdateLayout = jest.fn();
    const fixtureProps = fixtures.scatter({
      layout: {annotations: [{text: 'thor', ayref: 'y'}]},
    });
    const drop = render({beforeUpdateLayout, ...fixtureProps}).find(
      DropdownWidget
    );

    drop.prop('onChange')('paper');
    const {update} = beforeUpdateLayout.mock.calls[0][0];
    expect(update).toEqual({
      'annotations[0].yref': 'paper',
    });
  });

  it('does not send update for a[x|y]ref when a[x|y]ref is pixel', () => {
    const beforeUpdateLayout = jest.fn();
    const fixtureProps = fixtures.scatter({
      layout: {annotations: [{text: 'thor', yref: 'y', ayref: 'pixel'}]},
    });
    const drop = render({beforeUpdateLayout, ...fixtureProps}).find(
      DropdownWidget
    );

    drop.prop('onChange')('y2');
    const {update} = beforeUpdateLayout.mock.calls[0][0];
    expect(update).toEqual({
      'annotations[0].yref': 'y2',
    });
  });
});

describe('<AnnotationArrowRef>', () => {
  function render(props) {
    return mount(
      <TestEditor {...{onUpdate: jest.fn(), ...props, plotly}}>
        <LayoutAnnoPanel name="Layout" annotationIndex={0}>
          <AnnotationArrowRef attr="ayref" />
        </LayoutAnnoPanel>
      </TestEditor>
    );
  }

  it('uses current value of axis ref as axes option when [x|y]ref set', () => {
    const fixtureProps = fixtures.scatter({
      layout: {annotations: [{text: 'thor', yref: 'y'}]},
    });
    const drop = render({...fixtureProps}).find(DropdownWidget);

    const options = drop.first().prop('options');
    expect(options.length).toBe(2);
    expect(options[0]).toEqual({label: 'in pixels', value: 'pixel'});
    expect(options[1]).toEqual({label: 'according to axis', value: 'y'});
  });

  it('provides all axes options when [x|y]ref set to paper', () => {
    const fixtureProps = fixtures.scatter({
      layout: {annotations: [{text: 'thor', yref: 'paper'}]},
    });
    const drop = render({...fixtureProps}).find(DropdownWidget);

    const options = drop.first().prop('options');
    expect(options.length).toBe(3);
    expect(options[0]).toEqual({label: 'in pixels', value: 'pixel'});
    expect(options[1]).toEqual({label: 'Y 1', value: 'y'});
    expect(options[2]).toEqual({label: 'Y: yaxis2 title', value: 'y2'});
  });
});
