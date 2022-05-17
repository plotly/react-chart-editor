import {Numeric, Info} from '../../fields';
import {LayoutPanel, PlotlyFold, PlotlySection} from '..';
import {TestEditor, fixtures, mount} from 'lib/test-utils';

// Visibility rules are computed Top -> Down,
// I.E. PlotlyPanel > PlotlyFold > PlotlySection > Field (Numeric)
// PlotlyFold decides if it's going to render itself and it's children depending
// on child type vs PlotlySection communicating visibility decisions up to PlotlyFold

describe('Basic PlotlyPanel rules', () => {
  describe('no PlotlyPanel, no context for Fields', () => {
    const wrapper = mount(
      <TestEditor {...fixtures.scatter()}>
        <div>
          <div id="thediv"> ok </div>
          <Numeric attr="title" />
        </div>
      </TestEditor>
    );

    it('HIDES Field', () => expect(wrapper.find('input').length).toEqual(0));
    it('SHOWS div which does not need context', () =>
      expect(wrapper.find('input').length).toEqual(0));
  });

  describe('PlotlyPanel gives context to Field', () => {
    const wrapper = mount(
      <TestEditor {...fixtures.scatter()}>
        <LayoutPanel>
          <Numeric attr="title" />
        </LayoutPanel>
      </TestEditor>
    );
    it('SHOWS Field', () => expect(wrapper.find('input').length).toEqual(1));
  });

  describe('no PlotlyPanel, does not affect PlotlySection', () => {
    const wrapper = mount(
      <TestEditor {...fixtures.scatter()}>
        <div>
          <PlotlySection>
            <div id="thediv"> ok </div>
            <Numeric attr="title" />
          </PlotlySection>
        </div>
      </TestEditor>
    );

    it('SHOWS PlotlySection and #thediv', () => {
      expect(wrapper.find('div.section').length).toEqual(1);
      expect(wrapper.find('#thediv').length).toEqual(1);
    });

    it('HIDES Field because it needs context from PlotlyPanel', () =>
      expect(wrapper.find('input').length).toEqual(0));
  });
});

describe('Basic PlotlySection rules', () => {
  describe('hides itself when it has no visible children', () => {
    describe('PlotlyPanel > PlotlySection > Field-with-no-visible-attr', () => {
      const wrapper = mount(
        <TestEditor {...fixtures.scatter()}>
          <LayoutPanel>
            <PlotlySection>
              <Numeric attr="not_an_attr" />
            </PlotlySection>
          </LayoutPanel>
        </TestEditor>
      );

      it('HIDES PlotlySection', () => expect(wrapper.find('div.section').length).toEqual(0));
      it('HIDES Field', () => expect(wrapper.find('input').length).toEqual(0));
    });

    describe('PlotlyPanel > PlotlySection > Field-with-no-visible-attr-based-on-customConfig', () => {
      const wrapper = mount(
        <TestEditor
          {...fixtures.scatter({
            customConfig: {
              visibility_rules: {
                blacklist: [{type: 'attrName', regex_match: 'color'}],
              },
            },
          })}
        >
          <LayoutPanel>
            <PlotlySection>
              <Numeric attr="title.font.color" />
            </PlotlySection>
          </LayoutPanel>
        </TestEditor>
      );

      it('HIDES Field based on customConfig', () =>
        expect(wrapper.find('input').length).toEqual(0));
      it('HIDES PlotlySection because no visible children according to custom config', () =>
        expect(wrapper.find('div.section').length).toEqual(0));
    });

    describe('PlotlyPanel > PlotlySection > Field-with-no-visible-attr-based-on-customConfig', () => {
      const wrapper = mount(
        <TestEditor
          {...fixtures.scatter({
            customConfig: {
              visibility_rules: {
                blacklist: [{type: 'attrName', regex_match: 'color'}],
              },
            },
          })}
        >
          <LayoutPanel>
            <PlotlySection attr="title">
              <Numeric attr="title.font.color" />
              <Numeric attr="title" />
            </PlotlySection>
          </LayoutPanel>
        </TestEditor>
      );

      it('HIDES the title.font.color Field based on customConfig', () =>
        expect(wrapper.find('input').length).toEqual(1));
      it('SHOWS PlotlySection if it has an attr that is accepted by customConfig', () =>
        expect(wrapper.find('div.section').length).toEqual(1));
    });

    describe('div > PlotlySection > Field-with-visible-attr', () => {
      const wrapper = mount(
        <TestEditor {...fixtures.scatter()}>
          <div>
            <PlotlySection>
              <Numeric attr="title" />
            </PlotlySection>
          </div>
        </TestEditor>
      );

      it('HIDES PlotlySection', () => expect(wrapper.find('div.section').length).toEqual(0));
      it('HIDES Field', () => expect(wrapper.find('input').length).toEqual(0));
    });
  });

  describe('shows itself when it has visible children', () => {
    describe('PlotlyPanel > PlotlySection > Field-with-visible-attr', () => {
      const wrapper = mount(
        <TestEditor {...fixtures.scatter()}>
          <LayoutPanel>
            <PlotlySection>
              <Numeric attr="title" />
            </PlotlySection>
          </LayoutPanel>
        </TestEditor>
      );

      it('SHOWS PlotlySection', () => expect(wrapper.find('div.section').length).toEqual(1));
      it('SHOWS Field', () => expect(wrapper.find('input').length).toEqual(1));
    });

    describe('PlotlyPanel > PlotlySection > div', () => {
      const wrapper = mount(
        <TestEditor {...fixtures.scatter()}>
          <LayoutPanel>
            <PlotlySection>
              <div id="thediv" />
              <Numeric attr="not_an_attr" />
            </PlotlySection>
          </LayoutPanel>
        </TestEditor>
      );

      it('SHOWS PlotlySection', () => expect(wrapper.find('div.section').length).toEqual(1));
      it('HIDES Field', () => expect(wrapper.find('input').length).toEqual(0));
      it('SHOWS div', () => expect(wrapper.find('#thediv').length).toEqual(1));
    });
  });
});

describe('Basic PlotlyFold rules', () => {
  describe('when children have an attr prop', () => {
    describe('Field-with-visible-attr', () => {
      const wrapper = mount(
        <TestEditor {...fixtures.scatter()}>
          <LayoutPanel>
            <PlotlyFold>
              <Numeric attr="title" />
            </PlotlyFold>
          </LayoutPanel>
        </TestEditor>
      );
      it('SHOWS PlotlyFold', () => expect(wrapper.find('div.fold').length).toEqual(1));
      it('SHOWS Field', () => expect(wrapper.find('input').length).toEqual(1));
    });

    describe('Field-with-invisible-attr', () => {
      const wrapper = mount(
        <TestEditor {...fixtures.scatter()}>
          <LayoutPanel>
            <PlotlyFold>
              <Numeric attr="not_an_attr" />
            </PlotlyFold>
          </LayoutPanel>
        </TestEditor>
      );

      it('HIDES PlotlyFold', () => expect(wrapper.find('div.fold').length).toEqual(0));
      it('HIDES Field', () => expect(wrapper.find('input').length).toEqual(0));
    });
  });

  describe('when childen do not have an attr prop', () => {
    describe('div', () => {
      const wrapper = mount(
        <TestEditor {...fixtures.scatter()}>
          <LayoutPanel>
            <PlotlyFold>
              <div id="thediv"> ok </div>
            </PlotlyFold>
          </LayoutPanel>
        </TestEditor>
      );

      it('SHOWS PlotlyFold', () => expect(wrapper.find('div.fold').length).toEqual(1));
      it('SHOWS div', () => expect(wrapper.find('#thediv').length).toEqual(1));
    });

    describe('when children have a no_visibility_forcing, plotly_editor_trait', () => {
      describe('PlotlySection', () => {
        describe('div', () => {
          const wrapper = mount(
            <TestEditor {...fixtures.scatter()}>
              <LayoutPanel>
                <PlotlyFold>
                  <PlotlySection>
                    <div id="thediv"> ok </div>
                  </PlotlySection>
                </PlotlyFold>
              </LayoutPanel>
            </TestEditor>
          );
          it('HIDES PlotlyFold', () => expect(wrapper.find('div.fold').length).toEqual(0));
          it('HIDES PlotlySection', () => expect(wrapper.find('div.section').length).toEqual(0));
          it('HIDES div', () => expect(wrapper.find('#thediv').length).toEqual(0));
        });

        describe('Field-with-visible-attr', () => {
          const wrapper = mount(
            <TestEditor {...fixtures.scatter()}>
              <LayoutPanel>
                <PlotlyFold>
                  <PlotlySection>
                    <Numeric attr="title" />
                  </PlotlySection>
                </PlotlyFold>
              </LayoutPanel>
            </TestEditor>
          );
          it('HIDES PlotlyFold', () => expect(wrapper.find('div.fold').length).toEqual(0));
          it('HIDES PlotlySection', () => expect(wrapper.find('div.section').length).toEqual(0));
          it('HIDES Field', () => expect(wrapper.find('input').length).toEqual(0));
        });

        describe('Field-with-invisible-attr', () => {
          const wrapper = mount(
            <TestEditor {...fixtures.scatter()}>
              <LayoutPanel>
                <PlotlyFold>
                  <PlotlySection>
                    <Numeric attr="not_an_attr" />
                  </PlotlySection>
                </PlotlyFold>
              </LayoutPanel>
            </TestEditor>
          );

          it('HIDES PlotlyFold', () => expect(wrapper.find('div.fold').length).toEqual(0));
          it('HIDES PlotlySection', () => expect(wrapper.find('div.section').length).toEqual(0));
          it('HIDES Field', () => expect(wrapper.find('input').length).toEqual(0));
        });
      });
    });

    describe('PlotlyPanel', () => {
      describe('Field-with-visible-attr', () => {
        const wrapper = mount(
          <TestEditor {...fixtures.scatter()}>
            <LayoutPanel>
              <PlotlyFold>
                <LayoutPanel>
                  <Numeric attr="title" />
                </LayoutPanel>
              </PlotlyFold>
            </LayoutPanel>
          </TestEditor>
        );

        it('HIDES PlotlyFold', () => expect(wrapper.find('div.fold').length).toEqual(0));
        it('HIDES inner PlotlyPanel', () => expect(wrapper.find('div.panel').length).toEqual(1));
        it('HIDES Field', () => expect(wrapper.find('input').length).toEqual(0));
      });
    });

    describe('Info', () => {
      describe('Field-with-visible-attr', () => {
        const wrapper = mount(
          <TestEditor {...fixtures.scatter()}>
            <LayoutPanel>
              <PlotlyFold>
                <Info>
                  <Numeric attr="title" />
                </Info>
              </PlotlyFold>
            </LayoutPanel>
          </TestEditor>
        );

        it('HIDES PlotlyFold', () => expect(wrapper.find('div.fold').length).toEqual(0));
        it('HIDES Info', () => expect(wrapper.find('.js-test-info').length).toEqual(0));
        it('HIDES Field', () => expect(wrapper.find('input').length).toEqual(0));
      });
    });

    describe('no_visibility_forcing containers can be visibility forcing with a visible attr', () => {
      describe('PlotlySection-with-visible-attr', () => {
        const wrapper = mount(
          <TestEditor {...fixtures.scatter()}>
            <LayoutPanel>
              <PlotlyFold>
                <PlotlySection attr="title">
                  <Numeric attr="not_an_attr" />
                </PlotlySection>
              </PlotlyFold>
            </LayoutPanel>
          </TestEditor>
        );

        it('SHOWS PlotlyFold', () => expect(wrapper.find('div.fold').length).toEqual(1));
        it('SHOWS PlotlySection', () => expect(wrapper.find('div.section').length).toEqual(1));
        it('HIDES Field', () => expect(wrapper.find('input').length).toEqual(0));
      });

      describe('PlotlySection-with-invisible-attr', () => {
        const wrapper = mount(
          <TestEditor {...fixtures.scatter()}>
            <LayoutPanel>
              <PlotlyFold>
                <PlotlySection attr="not_an_attr">
                  <Numeric attr="title" />
                </PlotlySection>
              </PlotlyFold>
            </LayoutPanel>
          </TestEditor>
        );

        it('HIDES PlotlyFold', () => expect(wrapper.find('div.fold').length).toEqual(0));
        it('HIDES PlotlySection', () => expect(wrapper.find('div.section').length).toEqual(0));
        it('HIDES Field', () => expect(wrapper.find('input').length).toEqual(0));
      });
    });
  });
});

describe('Other ways to force PlotlyFold visibility', () => {
  describe('Adding a custom component as child of PlotlyFold', () => {
    const wrapper = mount(
      <TestEditor {...fixtures.scatter()}>
        <LayoutPanel>
          <PlotlyFold>
            <p>I force visibility of the fold</p>
            <PlotlySection>
              <div id="thediv"> ok </div>
            </PlotlySection>
          </PlotlyFold>
        </LayoutPanel>
      </TestEditor>
    );
    it('shows PlotlyFold', () => expect(wrapper.find('div.fold').length).toEqual(1));
    it('shows PlotlySection', () => expect(wrapper.find('div.section').length).toEqual(1));
    it('shows div', () => expect(wrapper.find('#thediv').length).toEqual(1));
  });

  // What most of DefaultPanels do
  describe('adding a Field with visible attr as child of PlotlyFold', () => {
    const wrapper = mount(
      <TestEditor {...fixtures.scatter()}>
        <LayoutPanel>
          <PlotlyFold>
            <Numeric attr="width" />
            <PlotlySection>
              <div id="thediv"> ok </div>
              <Numeric attr="title" />
            </PlotlySection>
          </PlotlyFold>
        </LayoutPanel>
      </TestEditor>
    );
    it('shows PlotlyFold', () => expect(wrapper.find('div.fold').length).toEqual(1));
    it('shows PlotlySection', () => expect(wrapper.find('div.section').length).toEqual(1));
    it('shows div', () => expect(wrapper.find('#thediv').length).toEqual(1));
    it('shows Field in PlotlySection', () => expect(wrapper.find('input').length).toEqual(2));
  });

  describe('adding a Field with invisible attr will hide PlotlyFold', () => {
    const wrapper = mount(
      <TestEditor {...fixtures.scatter()}>
        <LayoutPanel>
          <PlotlyFold>
            <Numeric attr="not_an_attr" />
            <PlotlySection>
              <Numeric attr="not_an_attr" />
            </PlotlySection>
          </PlotlyFold>
        </LayoutPanel>
      </TestEditor>
    );

    it('HIDES PlotlyFold', () => expect(wrapper.find('div.fold').length).toEqual(0));
    it('HIDES PlotlySection', () => expect(wrapper.find('div.section').length).toEqual(0));
    it('HIDES Field in PlotlySection', () => expect(wrapper.find('input').length).toEqual(0));
  });
});

// nothing in the lower level PlotlyFold can force the upper one open

describe('PlotlyPanel > PlotlyFold > PlotlyPanel > PlotlyFold', () => {
  describe('div', () => {
    const wrapper = mount(
      <TestEditor {...fixtures.scatter()}>
        <LayoutPanel>
          <PlotlyFold>
            <LayoutPanel>
              <PlotlyFold>
                <div id="thediv"> ok </div>
              </PlotlyFold>
            </LayoutPanel>
          </PlotlyFold>
        </LayoutPanel>
      </TestEditor>
    );

    it('HIDES PlotlyFold', () => expect(wrapper.find('div.fold').length).toEqual(0));
    it('HIDES div', () => expect(wrapper.find('#thediv').length).toEqual(0));
  });

  describe('Field-with-visible-attr', () => {
    const wrapper = mount(
      <TestEditor {...fixtures.scatter()}>
        <LayoutPanel>
          <PlotlyFold>
            <LayoutPanel>
              <PlotlyFold>
                <Numeric attr="title" />
              </PlotlyFold>
            </LayoutPanel>
          </PlotlyFold>
        </LayoutPanel>
      </TestEditor>
    );
    it('HIDES PlotlyFold', () => expect(wrapper.find('div.fold').length).toEqual(0));
    it('HIDES Field', () => expect(wrapper.find('input').length).toEqual(0));
  });

  describe('Field-with-invisible-attr', () => {
    const wrapper = mount(
      <TestEditor {...fixtures.scatter()}>
        <LayoutPanel>
          <PlotlyFold>
            <LayoutPanel>
              <PlotlyFold>
                <Numeric attr="not_an_attr" />
              </PlotlyFold>
            </LayoutPanel>
          </PlotlyFold>
        </LayoutPanel>
      </TestEditor>
    );

    it('HIDES PlotlyFold', () => expect(wrapper.find('div.fold').length).toEqual(0));
    it('HIDES Field', () => expect(wrapper.find('input').length).toEqual(0));
  });
});

describe('PlotlyPanel > PlotlyFold > PlotlyPanel > PlotlyFold > PlotlySection', () => {
  describe('div', () => {
    const wrapper = mount(
      <TestEditor {...fixtures.scatter()}>
        <LayoutPanel>
          <PlotlyFold>
            <LayoutPanel>
              <PlotlyFold>
                <PlotlySection>
                  <div id="thediv"> ok </div>
                </PlotlySection>
              </PlotlyFold>
            </LayoutPanel>
          </PlotlyFold>
        </LayoutPanel>
      </TestEditor>
    );

    it('HIDES PlotlyFold', () => expect(wrapper.find('div.fold').length).toEqual(0));
    it('HIDES PlotlySection', () => expect(wrapper.find('div.section').length).toEqual(0));
    it('HIDES div', () => expect(wrapper.find('#thediv').length).toEqual(0));
  });

  describe('Field-with-visible-attr', () => {
    const wrapper = mount(
      <TestEditor {...fixtures.scatter()}>
        <LayoutPanel>
          <PlotlyFold>
            <LayoutPanel>
              <PlotlyFold>
                <PlotlySection>
                  <Numeric attr="title" />
                </PlotlySection>
              </PlotlyFold>
            </LayoutPanel>
          </PlotlyFold>
        </LayoutPanel>
      </TestEditor>
    );
    it('HIDES PlotlyFold', () => expect(wrapper.find('div.fold').length).toEqual(0));
    it('HIDES PlotlySection', () => expect(wrapper.find('div.section').length).toEqual(0));
    it('HIDES Field', () => expect(wrapper.find('input').length).toEqual(0));
  });

  describe('Field-with-invisible-attr', () => {
    const wrapper = mount(
      <TestEditor {...fixtures.scatter()}>
        <LayoutPanel>
          <PlotlyFold>
            <LayoutPanel>
              <PlotlyFold>
                <PlotlySection>
                  <Numeric attr="not_an_attr" />
                </PlotlySection>
              </PlotlyFold>
            </LayoutPanel>
          </PlotlyFold>
        </LayoutPanel>
      </TestEditor>
    );

    it('HIDES PlotlyFold', () => expect(wrapper.find('div.fold').length).toEqual(0));
    it('HIDES PlotlySection', () => expect(wrapper.find('div.section').length).toEqual(0));
    it('HIDES Field', () => expect(wrapper.find('input').length).toEqual(0));
  });
});

// Lower level PlotlyPanel with visible attr forces the upper PlotlyFold open, and visible
// attr on PlotlySection forces the lower PlotlyFold open

describe('PlotlyPanel > PlotlyFold > PlotlyPanel-with-visible-attr > PlotlyFold > PlotlySection-with-visible-attr', () => {
  describe('div', () => {
    const wrapper = mount(
      <TestEditor {...fixtures.scatter()}>
        <LayoutPanel>
          <PlotlyFold>
            <LayoutPanel attr="title">
              <PlotlyFold>
                <PlotlySection attr="title">
                  <div id="thediv"> ok </div>
                </PlotlySection>
              </PlotlyFold>
            </LayoutPanel>
          </PlotlyFold>
        </LayoutPanel>
      </TestEditor>
    );

    it('shows 2 PlotlyFolds', () => expect(wrapper.find('div.fold').length).toEqual(2));
    it('shows PlotlySection', () => expect(wrapper.find('div.section').length).toEqual(1));
    it('shows div', () => expect(wrapper.find('#thediv').length).toEqual(1));
  });

  describe('Field-with-visible-attr', () => {
    const wrapper = mount(
      <TestEditor {...fixtures.scatter()}>
        <LayoutPanel>
          <PlotlyFold>
            <LayoutPanel attr="title">
              <PlotlyFold>
                <PlotlySection attr="title">
                  <Numeric attr="title" />
                </PlotlySection>
              </PlotlyFold>
            </LayoutPanel>
          </PlotlyFold>
        </LayoutPanel>
      </TestEditor>
    );
    it('shows 2 PlotlyFolds', () => expect(wrapper.find('div.fold').length).toEqual(2));
    it('shows PlotlySection', () => expect(wrapper.find('div.section').length).toEqual(1));
    it('shows Field', () => expect(wrapper.find('input').length).toEqual(1));
  });

  describe('Field-with-invisible-attr', () => {
    const wrapper = mount(
      <TestEditor {...fixtures.scatter()}>
        <LayoutPanel>
          <PlotlyFold>
            <LayoutPanel attr="title">
              <PlotlyFold>
                <PlotlySection attr="title">
                  <Numeric attr="not_an_attr" />
                </PlotlySection>
              </PlotlyFold>
            </LayoutPanel>
          </PlotlyFold>
        </LayoutPanel>
      </TestEditor>
    );

    it('shows 2 PlotlyFolds', () => expect(wrapper.find('div.fold').length).toEqual(2));
    it('shows PlotlySection', () => expect(wrapper.find('div.section').length).toEqual(1));
    it('HIDES Field', () => expect(wrapper.find('input').length).toEqual(0));
  });
});
