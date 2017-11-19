import React from 'react';
import {connectLayoutToPlot} from '../../../lib';
import {Panel, Fold, Numeric} from '../../';
import {TestEditor, fixtures} from '../../../lib/test-utils';
import {mount} from 'enzyme';
import CanvasSize from '../CanvasSize';

describe('CanvasSize', () => {
  const LayoutPanel = connectLayoutToPlot(Panel);

  it('is hidden when autosize is true', () => {
    const fixtureProps = fixtures.scatter({layout: {autosize: true}});
    const wrapper = mount(
      <TestEditor {...{...fixtureProps}}>
        <LayoutPanel name="Layout">
          <Fold name="Canvas">
            <CanvasSize attr="width" />
          </Fold>
        </LayoutPanel>
      </TestEditor>
    ).find(Numeric);

    expect(wrapper.length).toBe(0);
  });

  it('is visible when autosize is false', () => {
    const fixtureProps = fixtures.scatter({layout: {autosize: false}});
    const wrapper = mount(
      <TestEditor {...{...fixtureProps}}>
        <LayoutPanel name="Layout">
          <Fold name="Canvas">
            <CanvasSize attr="width" />
          </Fold>
        </LayoutPanel>
      </TestEditor>
    ).find(Numeric);

    expect(wrapper.length).toBe(1);
  });
});
