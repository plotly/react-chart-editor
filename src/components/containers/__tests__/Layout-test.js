import {Numeric} from '../../fields';
import {PlotlyFold, PlotlyPanel, PlotlySection} from '..';
import NumericInput from '../../widgets/NumericInput';
import {TestEditor, fixtures} from 'lib/test-utils';
import {connectLayoutToPlot} from 'lib';
import {mount} from 'enzyme';

const Layouts = [PlotlyPanel, PlotlyFold, PlotlySection].map(connectLayoutToPlot);
const Editor = (props) => <TestEditor {...{onUpdate: jest.fn(), ...props}} />;

Layouts.forEach((Layout) => {
  describe(`<${Layout.displayName}>`, () => {
    it(`wraps container with fullValue pointing to gd._fullLayout`, () => {
      const wrapper = mount(
        <Editor {...fixtures.scatter({layout: {height: 100}})}>
          <PlotlyPanel>
            <Layout>
              <Numeric label="Height" min={100} step={10} attr="height" />
            </Layout>
          </PlotlyPanel>
        </Editor>
      )
        .find('[attr="height"]')
        .find(NumericInput);
      expect(wrapper.prop('value')).toBe(100);
    });

    it(`sends updates to gd._layout`, () => {
      const beforeUpdateLayout = jest.fn();
      const wrapper = mount(
        <Editor
          beforeUpdateLayout={beforeUpdateLayout}
          {...fixtures.scatter({layout: {height: 100}})}
        >
          <PlotlyPanel>
            <Layout>
              <Numeric label="Height" min={100} step={10} attr="height" />
            </Layout>
          </PlotlyPanel>
        </Editor>
      )
        .find('[attr="height"]')
        .find(NumericInput);

      const heightUpdate = 200;
      wrapper.prop('onChange')(heightUpdate);
      const payload = beforeUpdateLayout.mock.calls[0][0];
      expect(payload).toEqual({update: {height: heightUpdate}});
    });
  });
});
