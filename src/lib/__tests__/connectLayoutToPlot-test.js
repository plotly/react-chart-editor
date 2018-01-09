import NumericInput from '../../components/widgets/NumericInput';
import React from 'react';
import connectLayoutToPlot from '../connectLayoutToPlot';
import {Fold, Panel, Section} from '../../components/containers';
import {Numeric} from '../../components/fields';
import {TestEditor, fixtures, plotly} from '../test-utils';
import {mount} from 'enzyme';

const Layouts = [Panel, Fold, Section].map(connectLayoutToPlot);
const Editor = props => (
  <TestEditor {...{plotly, onUpdate: jest.fn(), ...props}} />
);

Layouts.forEach(Layout => {
  describe(`<${Layout.displayName}>`, () => {
    it(`wraps container with fullValue pointing to gd._fullLayout`, () => {
      const wrapper = mount(
        <Editor {...fixtures.scatter({layout: {width: 100}})}>
          <Panel>
            <Layout foldIndex={0}>
              <Numeric label="Width" step={10} attr="width" />
            </Layout>
          </Panel>
        </Editor>
      )
        .find('[attr="width"]')
        .find(NumericInput);

      expect(wrapper.prop('value')).toBe(100);
    });

    it(`sends updates to gd._layout`, () => {
      const onUpdateLayout = jest.fn();
      const wrapper = mount(
        <Editor
          onUpdateLayout={onUpdateLayout}
          {...fixtures.scatter({layout: {width: 100}})}
        >
          <Panel>
            <Layout foldIndex={0}>
              <Numeric label="Width" step={10} attr="width" />
            </Layout>
          </Panel>
        </Editor>
      )
        .find('[attr="width"]')
        .find(NumericInput);

      const widthUpdate = 200;
      wrapper.prop('onChange')(widthUpdate);
      const payload = onUpdateLayout.mock.calls[0][0];
      expect(payload).toEqual({update: {width: widthUpdate}});
    });

    it(`automatically computes min and max defaults`, () => {
      const onUpdate = jest.fn();
      const wrapper = mount(
        <Editor
          onUpdate={onUpdate}
          {...fixtures.scatter({layout: {showlegend: true}})}
        >
          <Panel>
            <Layout foldIndex={0}>
              <Numeric label="Position x" step={0.01} attr="legend.x" />
            </Layout>
          </Panel>
        </Editor>
      )
        .find('[attr="legend.x"]')
        .find(NumericInput);

      const expectedMin = -2;
      const expectedMax = 3;
      expect(wrapper.prop('min')).toBe(expectedMin);
      expect(wrapper.prop('max')).toBe(expectedMax);
    });
  });
});
