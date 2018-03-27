import {Numeric} from '../../fields';
import {LayoutPanel, PlotlyFold, PlotlySection, Panel, Fold, Section} from '..';
import Field from '../../fields/Field';
import React from 'react';
import {TestEditor, fixtures, mount} from 'lib/test-utils';

// Basic PlotlySection visibility rules (in a panel for context)
describe('PlotlyPanel > PlotlySection', () => {
  describe('div', () => {
    const wrapper = mount(
      <TestEditor {...fixtures.scatter()}>
        <LayoutPanel>
          <PlotlySection>
            <div id="thediv"> ok </div>
          </PlotlySection>
        </LayoutPanel>
      </TestEditor>
    );

    it('shows PlotlySection', () =>
      expect(wrapper.find('div.section').length).toEqual(1));
    it('shows div', () => expect(wrapper.find('#thediv').length).toEqual(1));
  });

  describe('Field-with-visible-attr', () => {
    const wrapper = mount(
      <TestEditor {...fixtures.scatter()}>
        <LayoutPanel>
          <PlotlySection>
            <Numeric attr="title" />
          </PlotlySection>
        </LayoutPanel>
      </TestEditor>
    );
    it('shows PlotlySection', () =>
      expect(wrapper.find('div.section').length).toEqual(1));
    it('shows Field', () => expect(wrapper.find('input').length).toEqual(1));
  });

  describe('Field-with-invisible-attr', () => {
    const wrapper = mount(
      <TestEditor {...fixtures.scatter()}>
        <LayoutPanel>
          <PlotlySection>
            <Numeric attr="not_an_attr" />
          </PlotlySection>
        </LayoutPanel>
      </TestEditor>
    );

    it('HIDES PlotlySection', () =>
      expect(wrapper.find('div.section').length).toEqual(0));
    it('HIDES Field', () => expect(wrapper.find('input').length).toEqual(0));
  });
});

// Basic Section visibility rules
describe('PlotlyPanel > Section', () => {
  describe('Field-with-invisible-attr', () => {
    const wrapper = mount(
      <TestEditor {...fixtures.scatter()}>
        <LayoutPanel>
          <Section name="custom section">
            <Numeric attr="not_an_attr" />
          </Section>
        </LayoutPanel>
      </TestEditor>
    );

    it('SHOWS Section', () =>
      expect(wrapper.find('div.section').length).toEqual(1));
    it('SHOWS custom title', () => {
      expect(wrapper.find('.section__heading__text').text()).toEqual(
        'custom section'
      );
    });
    it('HIDES Field', () => expect(wrapper.find('input').length).toEqual(0));
  });

  describe('Field-with-custom-component', () => {
    const wrapper = mount(
      <TestEditor {...fixtures.scatter()}>
        <LayoutPanel>
          <PlotlyFold>
            <Section name="custom section">
              <Field>
                <div id="theDiv" />
              </Field>
            </Section>
          </PlotlyFold>
        </LayoutPanel>
      </TestEditor>
    );

    it('SHOWS Section', () =>
      expect(wrapper.find('div.section').length).toEqual(1));
    it('SHOWS custom title', () => {
      expect(wrapper.find('.section__heading__text').text()).toEqual(
        'custom section'
      );
    });
    it('SHOWS div', () => expect(wrapper.find('#theDiv').length).toEqual(1));
    it('SHOWS PlotlyFold', () =>
      expect(wrapper.find(PlotlyFold).length).toEqual(1));
  });
});

describe('Panel > Fold ', () => {
  describe('unconnected Panel and Fold', () => {
    const wrapper = mount(
      <TestEditor {...fixtures.scatter()}>
        <Panel>
          <Fold>
            <div id="theDiv" />
          </Fold>
        </Panel>
      </TestEditor>
    );

    it('SHOWS Fold', () => expect(wrapper.find(Fold).length).toEqual(1));
    it('behaves as PlotlyFold', () => {
      expect(wrapper.find(Fold).props().folded).toEqual(false);
      expect(typeof wrapper.find(Fold).props().toggleFold).toEqual('function');
    });
    it('SHOWS div', () => expect(wrapper.find('#theDiv').length).toEqual(1));
  });
});

// Basic PlotlyFold visibility rules
describe('PlotlyPanel > PlotlyFold', () => {
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

    it('shows PlotlyFold', () =>
      expect(wrapper.find('div.fold').length).toEqual(1));
    it('shows div', () => expect(wrapper.find('#thediv').length).toEqual(1));
  });

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
    it('shows PlotlyFold', () =>
      expect(wrapper.find('div.fold').length).toEqual(1));
    it('shows Field', () => expect(wrapper.find('input').length).toEqual(1));
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

    it('HIDES PlotlyFold', () =>
      expect(wrapper.find('div.fold').length).toEqual(0));
    it('HIDES Field', () => expect(wrapper.find('input').length).toEqual(0));
  });

  describe('PlotlyPanel > PlotlyFold > Panel', () => {
    const wrapper = mount(
      <TestEditor {...fixtures.scatter()}>
        <LayoutPanel>
          <PlotlyFold>
            <Panel />
          </PlotlyFold>
        </LayoutPanel>
      </TestEditor>
    );

    it('SHOWS PlotlyFold', () =>
      expect(wrapper.find(PlotlyFold).length).toEqual(1));
    it('SHOWS Panel', () => expect(wrapper.find(Panel).length).toEqual(1));
  });
});

// Section alone can't force a PlotlyFold to show itself at the moment
describe('PlotlyPanel > PlotlyFold > PlotlySection', () => {
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
    it('HIDES PlotlyFold', () =>
      expect(wrapper.find('div.fold').length).toEqual(0));
    it('HIDES PlotlySection', () =>
      expect(wrapper.find('div.section').length).toEqual(0));
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
    it('HIDES PlotlyFold', () =>
      expect(wrapper.find('div.fold').length).toEqual(0));
    it('HIDES PlotlySection', () =>
      expect(wrapper.find('div.section').length).toEqual(0));
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

    it('HIDES PlotlyFold', () =>
      expect(wrapper.find('div.fold').length).toEqual(0));
    it('HIDES PlotlySection', () =>
      expect(wrapper.find('div.section').length).toEqual(0));
    it('HIDES Field', () => expect(wrapper.find('input').length).toEqual(0));
  });
});

// p forces PlotlyFold open, then normal PlotlySection rules apply
describe('PlotlyPanel > PlotlyFold > p & PlotlySection', () => {
  describe('div', () => {
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
    it('shows PlotlyFold', () =>
      expect(wrapper.find('div.fold').length).toEqual(1));
    it('shows PlotlySection', () =>
      expect(wrapper.find('div.section').length).toEqual(1));
    it('shows div', () => expect(wrapper.find('#thediv').length).toEqual(1));
  });

  describe('Field-with-visible-attr', () => {
    const wrapper = mount(
      <TestEditor {...fixtures.scatter()}>
        <LayoutPanel>
          <PlotlyFold>
            <p>I force visibility of the fold</p>
            <PlotlySection>
              <Numeric attr="title" />
            </PlotlySection>
          </PlotlyFold>
        </LayoutPanel>
      </TestEditor>
    );
    it('shows PlotlyFold', () =>
      expect(wrapper.find('div.fold').length).toEqual(1));
    it('shows PlotlySection', () =>
      expect(wrapper.find('div.section').length).toEqual(1));
    it('shows Field', () => expect(wrapper.find('input').length).toEqual(1));
  });

  describe('Field-with-invisible-attr', () => {
    const wrapper = mount(
      <TestEditor {...fixtures.scatter()}>
        <LayoutPanel>
          <PlotlyFold>
            <p>I force visibility of the fold</p>
            <PlotlySection>
              <Numeric attr="not_an_attr" />
            </PlotlySection>
          </PlotlyFold>
        </LayoutPanel>
      </TestEditor>
    );

    it('shows PlotlyFold', () =>
      expect(wrapper.find('div.fold').length).toEqual(1));
    it('HIDES PlotlySection', () =>
      expect(wrapper.find('div.section').length).toEqual(0));
    it('HIDES Field', () => expect(wrapper.find('input').length).toEqual(0));
  });
});

// Field forces PlotlyFold open, then normal PlotlySection rules apply
describe('PlotlyPanel > PlotlyFold > Field-with-visible-attr & PlotlySection', () => {
  describe('div', () => {
    const wrapper = mount(
      <TestEditor {...fixtures.scatter()}>
        <LayoutPanel>
          <PlotlyFold>
            <Numeric attr="width" />
            <PlotlySection>
              <div id="thediv"> ok </div>
            </PlotlySection>
          </PlotlyFold>
        </LayoutPanel>
      </TestEditor>
    );
    it('shows PlotlyFold', () =>
      expect(wrapper.find('div.fold').length).toEqual(1));
    it('shows PlotlySection', () =>
      expect(wrapper.find('div.section').length).toEqual(1));
    it('shows div', () => expect(wrapper.find('#thediv').length).toEqual(1));
  });

  describe('Field-with-visible-attr', () => {
    const wrapper = mount(
      <TestEditor {...fixtures.scatter()}>
        <LayoutPanel>
          <PlotlyFold>
            <Numeric attr="width" />
            <PlotlySection>
              <Numeric attr="title" />
            </PlotlySection>
          </PlotlyFold>
        </LayoutPanel>
      </TestEditor>
    );
    it('shows PlotlyFold', () =>
      expect(wrapper.find('div.fold').length).toEqual(1));
    it('shows PlotlySection', () =>
      expect(wrapper.find('div.section').length).toEqual(1));
    it('shows Field in PlotlySection', () =>
      expect(wrapper.find('input').length).toEqual(2));
  });

  describe('Field-with-invisible-attr', () => {
    const wrapper = mount(
      <TestEditor {...fixtures.scatter()}>
        <LayoutPanel>
          <PlotlyFold>
            <Numeric attr="width" />
            <PlotlySection>
              <Numeric attr="not_an_attr" />
            </PlotlySection>
          </PlotlyFold>
        </LayoutPanel>
      </TestEditor>
    );

    it('shows PlotlyFold', () =>
      expect(wrapper.find('div.fold').length).toEqual(1));
    it('HIDES PlotlySection', () =>
      expect(wrapper.find('div.section').length).toEqual(0));
    it('HIDES Field in PlotlySection', () =>
      expect(wrapper.find('input').length).toEqual(1));
  });
});

// invisible Field doesn't forces PlotlyFold open
describe('PlotlyPanel > PlotlyFold > Field-with-invisible-attr & PlotlySection', () => {
  describe('div', () => {
    const wrapper = mount(
      <TestEditor {...fixtures.scatter()}>
        <LayoutPanel>
          <PlotlyFold>
            <Numeric attr="not_an_attr" />
            <PlotlySection>
              <div id="thediv"> ok </div>
            </PlotlySection>
          </PlotlyFold>
        </LayoutPanel>
      </TestEditor>
    );
    it('HIDES PlotlyFold', () =>
      expect(wrapper.find('div.fold').length).toEqual(0));
    it('HIDES PlotlySection', () =>
      expect(wrapper.find('div.section').length).toEqual(0));
    it('HIDES div', () => expect(wrapper.find('#thediv').length).toEqual(0));
  });

  describe('Field-with-visible-attr', () => {
    const wrapper = mount(
      <TestEditor {...fixtures.scatter()}>
        <LayoutPanel>
          <PlotlyFold>
            <Numeric attr="not_an_attr" />
            <PlotlySection>
              <Numeric attr="title" />
            </PlotlySection>
          </PlotlyFold>
        </LayoutPanel>
      </TestEditor>
    );
    it('HIDES PlotlyFold', () =>
      expect(wrapper.find('div.fold').length).toEqual(0));
    it('HIDES PlotlySection', () =>
      expect(wrapper.find('div.section').length).toEqual(0));
    it('HIDES Field', () => expect(wrapper.find('input').length).toEqual(0));
  });

  describe('Field-with-invisible-attr', () => {
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
    it('HIDES PlotlyFold', () =>
      expect(wrapper.find('div.fold').length).toEqual(0));
    it('HIDES PlotlySection', () =>
      expect(wrapper.find('div.section').length).toEqual(0));
    it('HIDES Field', () => expect(wrapper.find('input').length).toEqual(0));
  });
});

// visible attr on PlotlySection forces PlotlyFold open
describe('PlotlyPanel > PlotlyFold > PlotlySection-with-visible-attr', () => {
  describe('div', () => {
    const wrapper = mount(
      <TestEditor {...fixtures.scatter()}>
        <LayoutPanel>
          <PlotlyFold>
            <PlotlySection attr="title">
              <div id="thediv"> ok </div>
            </PlotlySection>
          </PlotlyFold>
        </LayoutPanel>
      </TestEditor>
    );
    it('shows PlotlyFold', () =>
      expect(wrapper.find('div.fold').length).toEqual(1));
    it('shows PlotlySection', () =>
      expect(wrapper.find('div.section').length).toEqual(1));
    it('shows div', () => expect(wrapper.find('#thediv').length).toEqual(1));
  });

  describe('Field-with-visible-attr', () => {
    const wrapper = mount(
      <TestEditor {...fixtures.scatter()}>
        <LayoutPanel>
          <PlotlyFold>
            <PlotlySection attr="title">
              <Numeric attr="title" />
            </PlotlySection>
          </PlotlyFold>
        </LayoutPanel>
      </TestEditor>
    );
    it('shows PlotlyFold', () =>
      expect(wrapper.find('div.fold').length).toEqual(1));
    it('shows PlotlySection', () =>
      expect(wrapper.find('div.section').length).toEqual(1));
    it('shows Field', () => expect(wrapper.find('input').length).toEqual(1));
  });

  describe('Field-with-invisible-attr', () => {
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

    it('shows PlotlyFold', () =>
      expect(wrapper.find('div.fold').length).toEqual(1));
    it('shows PlotlySection', () =>
      expect(wrapper.find('div.section').length).toEqual(1));
    it('HIDES Field', () => expect(wrapper.find('input').length).toEqual(0));
  });
});

// invisible attr on Section doesn't force PlotlyFold open
describe('PlotlyPanel > PlotlyFold > PlotlySection-with-invisible-attr', () => {
  describe('div', () => {
    const wrapper = mount(
      <TestEditor {...fixtures.scatter()}>
        <LayoutPanel>
          <PlotlyFold>
            <PlotlySection attr="not_an_attr">
              <div id="thediv"> ok </div>
            </PlotlySection>
          </PlotlyFold>
        </LayoutPanel>
      </TestEditor>
    );
    it('HIDES PlotlyFold', () =>
      expect(wrapper.find('div.fold').length).toEqual(0));
    it('HIDES PlotlySection', () =>
      expect(wrapper.find('div.section').length).toEqual(0));
    it('HIDES div', () => expect(wrapper.find('#thediv').length).toEqual(0));
  });

  describe('Field-with-visible-attr', () => {
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
    it('HIDES PlotlyFold', () =>
      expect(wrapper.find('div.fold').length).toEqual(0));
    it('HIDES PlotlySection', () =>
      expect(wrapper.find('div.section').length).toEqual(0));
    it('HIDES Field', () => expect(wrapper.find('input').length).toEqual(0));
  });

  describe('Field-with-invisible-attr', () => {
    const wrapper = mount(
      <TestEditor {...fixtures.scatter()}>
        <LayoutPanel>
          <PlotlyFold>
            <PlotlySection attr="not_an_attr">
              <Numeric attr="not_an_attr" />
            </PlotlySection>
          </PlotlyFold>
        </LayoutPanel>
      </TestEditor>
    );

    it('HIDES PlotlyFold', () =>
      expect(wrapper.find('div.fold').length).toEqual(0));
    it('HIDES PlotlySection', () =>
      expect(wrapper.find('div.section').length).toEqual(0));
    it('HIDES Field', () => expect(wrapper.find('input').length).toEqual(0));
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

    it('HIDES PlotlyFold', () =>
      expect(wrapper.find('div.fold').length).toEqual(0));
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
    it('HIDES PlotlyFold', () =>
      expect(wrapper.find('div.fold').length).toEqual(0));
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

    it('HIDES PlotlyFold', () =>
      expect(wrapper.find('div.fold').length).toEqual(0));
    it('HIDES Field', () => expect(wrapper.find('input').length).toEqual(0));
  });
});

// nothing in the lower level PlotlyFold can force the upper one open

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

    it('HIDES PlotlyFold', () =>
      expect(wrapper.find('div.fold').length).toEqual(0));
    it('HIDES PlotlySection', () =>
      expect(wrapper.find('div.section').length).toEqual(0));
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
    it('HIDES PlotlyFold', () =>
      expect(wrapper.find('div.fold').length).toEqual(0));
    it('HIDES PlotlySection', () =>
      expect(wrapper.find('div.section').length).toEqual(0));
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

    it('HIDES PlotlyFold', () =>
      expect(wrapper.find('div.fold').length).toEqual(0));
    it('HIDES PlotlySection', () =>
      expect(wrapper.find('div.section').length).toEqual(0));
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

    it('shows 2 PlotlyFolds', () =>
      expect(wrapper.find('div.fold').length).toEqual(2));
    it('shows PlotlySection', () =>
      expect(wrapper.find('div.section').length).toEqual(1));
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
    it('shows 2 PlotlyFolds', () =>
      expect(wrapper.find('div.fold').length).toEqual(2));
    it('shows PlotlySection', () =>
      expect(wrapper.find('div.section').length).toEqual(1));
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

    it('shows 2 PlotlyFolds', () =>
      expect(wrapper.find('div.fold').length).toEqual(2));
    it('shows PlotlySection', () =>
      expect(wrapper.find('div.section').length).toEqual(1));
    it('HIDES Field', () => expect(wrapper.find('input').length).toEqual(0));
  });
});
