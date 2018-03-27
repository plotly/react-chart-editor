import {Numeric} from '../../fields';
import {PlotlyFold, PlotlyPanel, PlotlySection} from '..';
import NumericInput from '../../widgets/NumericInput';
import React from 'react';
import {TestEditor, fixtures} from 'lib/test-utils';
import {connectLayoutToPlot} from 'lib';
import {mount} from 'enzyme';

const Layouts = [PlotlyPanel, PlotlyFold, PlotlySection].map(
  connectLayoutToPlot
);
const Editor = props => <TestEditor {...{onUpdate: jest.fn(), ...props}} />;

Layouts.forEach(Layout => {
  describe(`<${Layout.displayName}>`, () => {
    it(`wraps container with fullValue pointing to gd._fullLayout`, () => {
      const wrapper = mount(
        <Editor {...fixtures.scatter({layout: {width: 100}})}>
          <PlotlyPanel>
            <Layout>
              <Numeric label="Width" min={100} step={10} attr="width" />
            </Layout>
          </PlotlyPanel>
        </Editor>
      )
        .find('[attr="width"]')
        .find(NumericInput);

      expect(wrapper.prop('value')).toBe(100);
    });

    it(`sends updates to gd._layout`, () => {
      const beforeUpdateLayout = jest.fn();
      const wrapper = mount(
        <Editor
          beforeUpdateLayout={beforeUpdateLayout}
          {...fixtures.scatter({layout: {width: 100}})}
        >
          <PlotlyPanel>
            <Layout>
              <Numeric label="Width" min={100} step={10} attr="width" />
            </Layout>
          </PlotlyPanel>
        </Editor>
      )
        .find('[attr="width"]')
        .find(NumericInput);

      const widthUpdate = 200;
      wrapper.prop('onChange')(widthUpdate);
      const payload = beforeUpdateLayout.mock.calls[0][0];
      expect(payload).toEqual({update: {width: widthUpdate}});
    });
  });
});
