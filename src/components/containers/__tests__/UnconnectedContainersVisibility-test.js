import {Numeric, Info} from '../../fields';
import {Panel, Fold, Section, LayoutPanel, PlotlySection} from '..';
import {TestEditor, fixtures, mount} from 'lib/test-utils';

// Stylistically Panel, Fold, Section are the same as PlotlyPanel, PlotlyFold, PlotlySection
// but unlike them, they have no special visibility rules, they always display themselves
// and their children.

describe('Basic Panel rules', () => {
  describe('not connected, provides no context, cannot use with Fields', () => {
    const wrapper = mount(
      <TestEditor {...fixtures.scatter()}>
        <Panel>
          <div id="thediv"> ok </div>
          <Numeric attr="title" />
        </Panel>
      </TestEditor>
    );

    it('HIDES Field', () => expect(wrapper.find('input').length).toEqual(0));
    it('SHOWS div which does not need context', () =>
      expect(wrapper.find('input').length).toEqual(0));
  });

  describe("displays all it's children", () => {
    const wrapper = mount(
      <TestEditor {...fixtures.scatter()}>
        <Panel>
          <Section>
            <div id="thediv"> ok </div>
            <Numeric attr="title" />
          </Section>
          <Fold>
            <div id="theseconddiv" />
          </Fold>
          <Fold>
            <Info />
          </Fold>
        </Panel>
      </TestEditor>
    );

    it('SHOWS Section, Fold, #thediv, #theseconddiv, Info', () => {
      expect(wrapper.find('div.section').length).toEqual(1);
      expect(wrapper.find('div.fold').length).toEqual(2);
      expect(wrapper.find('#thediv').length).toEqual(1);
      expect(wrapper.find('#theseconddiv').length).toEqual(1);
      expect(wrapper.find('.js-test-info').length).toEqual(1);
    });

    it('HIDES Field because it needs context', () =>
      expect(wrapper.find('input').length).toEqual(0));

    it('PANEL shows collapse functionality, FOLD is foldable', () => {
      expect(wrapper.find('.panel__header__collapse').length).toEqual(1);
      expect(wrapper.find(Fold).first().props().folded).toBe(false);
      expect(typeof wrapper.find(Fold).first().props().toggleFold).toBe('function');
    });
  });
});

describe('Basic Section rules', () => {
  describe('always shows itself and its children', () => {
    describe('Panel > Section > Field-with-visible-attr', () => {
      const wrapper = mount(
        <TestEditor {...fixtures.scatter()}>
          <Panel>
            <Section>
              <Numeric attr="title" />
            </Section>
          </Panel>
        </TestEditor>
      );

      it('SHOWS Section because it always shows itself', () =>
        expect(wrapper.find('div.section').length).toEqual(1));
      it("HIDES Field because there's no context for it", () =>
        expect(wrapper.find('input').length).toEqual(0));
    });

    describe('PlotlyPanel > Section > Field-with-visible-attr', () => {
      const wrapper = mount(
        <TestEditor {...fixtures.scatter()}>
          <LayoutPanel>
            <Section>
              <Numeric attr="title" />
            </Section>
          </LayoutPanel>
        </TestEditor>
      );

      it('SHOWS Section because it always shows itself', () =>
        expect(wrapper.find('div.section').length).toEqual(1));
      it('SHOWS Field', () => expect(wrapper.find('input').length).toEqual(1));
    });

    describe('PlotlyPanel > Section > Field-with-invisible-attr', () => {
      const wrapper = mount(
        <TestEditor {...fixtures.scatter()}>
          <LayoutPanel>
            <Section>
              <Numeric attr="not_an_attr" />
            </Section>
          </LayoutPanel>
        </TestEditor>
      );

      it('SHOWS Section because it always shows itself', () =>
        expect(wrapper.find('div.section').length).toEqual(1));
      it('HIDES Field', () => expect(wrapper.find('input').length).toEqual(0));
    });

    describe('Panel > Section > div', () => {
      const wrapper = mount(
        <TestEditor {...fixtures.scatter()}>
          <Panel>
            <Section>
              <div id="thediv" />
            </Section>
          </Panel>
        </TestEditor>
      );

      it('SHOWS PlotlySection', () => expect(wrapper.find('div.section').length).toEqual(1));
      it('SHOWS div', () => expect(wrapper.find('#thediv').length).toEqual(1));
    });
  });
});

describe('Basic Fold rules', () => {
  describe('always shows itself and its children', () => {
    describe('Panel > Fold > Field-with-visible-attr', () => {
      const wrapper = mount(
        <TestEditor {...fixtures.scatter()}>
          <Panel>
            <Fold>
              <Numeric attr="title" />
            </Fold>
          </Panel>
        </TestEditor>
      );
      it('SHOWS Fold', () => expect(wrapper.find('div.fold').length).toEqual(1));
      it('HIDES Field because it has no context', () =>
        expect(wrapper.find('input').length).toEqual(0));
    });

    describe('LayoutPanel > Fold > Field-with-visible-attr', () => {
      const wrapper = mount(
        <TestEditor {...fixtures.scatter()}>
          <LayoutPanel>
            <Fold>
              <Numeric attr="title" />
            </Fold>
          </LayoutPanel>
        </TestEditor>
      );

      it('SHOWS Fold', () => expect(wrapper.find('div.fold').length).toEqual(1));
      it('SHOWS Field', () => expect(wrapper.find('input').length).toEqual(1));
    });

    describe('LayoutPanel > Fold > Field-with-invisible-attr', () => {
      const wrapper = mount(
        <TestEditor {...fixtures.scatter()}>
          <LayoutPanel>
            <Fold>
              <Numeric attr="not_an_attr" />
            </Fold>
          </LayoutPanel>
        </TestEditor>
      );

      it('SHOWS Fold', () => expect(wrapper.find('div.fold').length).toEqual(1));
      it('HIDES Field', () => expect(wrapper.find('input').length).toEqual(0));
    });

    describe('Panel > Fold > div', () => {
      const wrapper = mount(
        <TestEditor {...fixtures.scatter()}>
          <Panel>
            <Fold>
              <div id="thediv"> ok </div>
            </Fold>
          </Panel>
        </TestEditor>
      );

      it('SHOWS Fold', () => expect(wrapper.find('div.fold').length).toEqual(1));
      it('SHOWS div', () => expect(wrapper.find('#thediv').length).toEqual(1));
    });

    describe('no_visibility_forcing, plotly_editor_trait have no effect', () => {
      describe('PlotlySection', () => {
        describe('div', () => {
          const wrapper = mount(
            <TestEditor {...fixtures.scatter()}>
              <Panel>
                <Fold>
                  <PlotlySection>
                    <div id="thediv"> ok </div>
                  </PlotlySection>
                </Fold>
              </Panel>
            </TestEditor>
          );
          it('SHOWS Fold', () => expect(wrapper.find('div.fold').length).toEqual(1));
          it('SHOWS PlotlySection', () => expect(wrapper.find('div.section').length).toEqual(1));
          it('SHOWS div', () => expect(wrapper.find('#thediv').length).toEqual(1));
        });

        describe('Field-with-visible-attr', () => {
          const wrapper = mount(
            <TestEditor {...fixtures.scatter()}>
              <LayoutPanel>
                <Fold>
                  <PlotlySection>
                    <Numeric attr="title" />
                  </PlotlySection>
                </Fold>
              </LayoutPanel>
            </TestEditor>
          );
          it('SHOWS Fold', () => expect(wrapper.find('div.fold').length).toEqual(1));
          it('SHOWS PlotlySection', () => expect(wrapper.find('div.section').length).toEqual(1));
          it('SHOWS Field', () => expect(wrapper.find('input').length).toEqual(1));
        });

        describe('Field-with-invisible-attr', () => {
          const wrapper = mount(
            <TestEditor {...fixtures.scatter()}>
              <LayoutPanel>
                <Fold>
                  <PlotlySection>
                    <Numeric attr="not_an_attr" />
                  </PlotlySection>
                </Fold>
              </LayoutPanel>
            </TestEditor>
          );

          it('SHOWS Fold', () => expect(wrapper.find('div.fold').length).toEqual(1));
          it('HIDES PlotlySection because Plotly Section visibility rules apply', () =>
            expect(wrapper.find('div.section').length).toEqual(0));
          it('HIDES Field', () => expect(wrapper.find('input').length).toEqual(0));
        });
      });
    });

    describe('PlotlyPanel', () => {
      describe('Field-with-visible-attr', () => {
        const wrapper = mount(
          <TestEditor {...fixtures.scatter()}>
            <LayoutPanel>
              <Fold>
                <LayoutPanel>
                  <Numeric attr="title" />
                </LayoutPanel>
              </Fold>
            </LayoutPanel>
          </TestEditor>
        );

        it('SHOWS Fold', () => expect(wrapper.find('div.fold').length).toEqual(1));
        it('SHOWS PlotlyPanel', () => expect(wrapper.find('div.panel').length).toEqual(2));
        it('SHOWS Field', () => expect(wrapper.find('input').length).toEqual(1));
      });
    });

    describe('Info', () => {
      describe('Field-with-visible-attr', () => {
        const wrapper = mount(
          <TestEditor {...fixtures.scatter()}>
            <LayoutPanel>
              <Fold>
                <Info>ok</Info>
              </Fold>
            </LayoutPanel>
          </TestEditor>
        );

        it('SHOWS Fold', () => expect(wrapper.find('div.fold').length).toEqual(1));
        it('SHOWS Info', () => expect(wrapper.find('.js-test-info').length).toEqual(1));
      });
    });
  });
});
