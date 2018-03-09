import {Numeric} from '../../fields';
import {LayoutPanel, Fold, Section} from '..';
import React from 'react';
import {TestEditor, fixtures, mount} from 'lib/test-utils';

// Basic Section visibility rules (in a panel for context)
describe('Panel > Section', () => {
  describe('div', () => {
    const wrapper = mount(
      <TestEditor {...fixtures.scatter()}>
        <LayoutPanel>
          <Section>
            <div id="thediv"> ok </div>
          </Section>
        </LayoutPanel>
      </TestEditor>
    );

    it('shows Section', () =>
      expect(wrapper.find('div.section').length).toEqual(1));
    it('shows div', () => expect(wrapper.find('#thediv').length).toEqual(1));
  });

  describe('Field-with-visible-attr', () => {
    const wrapper = mount(
      <TestEditor {...fixtures.scatter()}>
        <LayoutPanel>
          <Section>
            <Numeric attr="title" />
          </Section>
        </LayoutPanel>
      </TestEditor>
    );
    it('shows Section', () =>
      expect(wrapper.find('div.section').length).toEqual(1));
    it('shows Field', () => expect(wrapper.find('input').length).toEqual(1));
  });

  describe('Field-with-invisible-attr', () => {
    const wrapper = mount(
      <TestEditor {...fixtures.scatter()}>
        <LayoutPanel>
          <Section>
            <Numeric attr="not_an_attr" />
          </Section>
        </LayoutPanel>
      </TestEditor>
    );

    it('HIDES Section', () =>
      expect(wrapper.find('div.section').length).toEqual(0));
    it('HIDES Field', () => expect(wrapper.find('input').length).toEqual(0));
  });
});

// Basic Fold visibility rules
describe('Panel > Fold', () => {
  describe('div', () => {
    const wrapper = mount(
      <TestEditor {...fixtures.scatter()}>
        <LayoutPanel>
          <Fold>
            <div id="thediv"> ok </div>
          </Fold>
        </LayoutPanel>
      </TestEditor>
    );

    it('shows Fold', () => expect(wrapper.find('div.fold').length).toEqual(1));
    it('shows div', () => expect(wrapper.find('#thediv').length).toEqual(1));
  });

  describe('Field-with-visible-attr', () => {
    const wrapper = mount(
      <TestEditor {...fixtures.scatter()}>
        <LayoutPanel>
          <Fold>
            <Numeric attr="title" />
          </Fold>
        </LayoutPanel>
      </TestEditor>
    );
    it('shows Fold', () => expect(wrapper.find('div.fold').length).toEqual(1));
    it('shows Field', () => expect(wrapper.find('input').length).toEqual(1));
  });

  describe('Field-with-invisible-attr', () => {
    const wrapper = mount(
      <TestEditor {...fixtures.scatter()}>
        <LayoutPanel>
          <Fold>
            <Numeric attr="not_an_attr" />
          </Fold>
        </LayoutPanel>
      </TestEditor>
    );

    it('HIDES Fold', () => expect(wrapper.find('div.fold').length).toEqual(0));
    it('HIDES Field', () => expect(wrapper.find('input').length).toEqual(0));
  });
});

// Section alone can't force a Fold to show itself at the moment
describe('Panel > Fold > Section', () => {
  describe('div', () => {
    const wrapper = mount(
      <TestEditor {...fixtures.scatter()}>
        <LayoutPanel>
          <Fold>
            <Section>
              <div id="thediv"> ok </div>
            </Section>
          </Fold>
        </LayoutPanel>
      </TestEditor>
    );
    it('HIDES Fold', () => expect(wrapper.find('div.fold').length).toEqual(0));
    it('HIDES Section', () =>
      expect(wrapper.find('div.section').length).toEqual(0));
    it('HIDES div', () => expect(wrapper.find('#thediv').length).toEqual(0));
  });

  describe('Field-with-visible-attr', () => {
    const wrapper = mount(
      <TestEditor {...fixtures.scatter()}>
        <LayoutPanel>
          <Fold>
            <Section>
              <Numeric attr="title" />
            </Section>
          </Fold>
        </LayoutPanel>
      </TestEditor>
    );
    it('HIDES Fold', () => expect(wrapper.find('div.fold').length).toEqual(0));
    it('HIDES Section', () =>
      expect(wrapper.find('div.section').length).toEqual(0));
    it('HIDES Field', () => expect(wrapper.find('input').length).toEqual(0));
  });

  describe('Field-with-invisible-attr', () => {
    const wrapper = mount(
      <TestEditor {...fixtures.scatter()}>
        <LayoutPanel>
          <Fold>
            <Section>
              <Numeric attr="not_an_attr" />
            </Section>
          </Fold>
        </LayoutPanel>
      </TestEditor>
    );

    it('HIDES Fold', () => expect(wrapper.find('div.fold').length).toEqual(0));
    it('HIDES Section', () =>
      expect(wrapper.find('div.section').length).toEqual(0));
    it('HIDES Field', () => expect(wrapper.find('input').length).toEqual(0));
  });
});

// p forces Fold open, then normal Section rules apply
describe('Panel > Fold > p & Section', () => {
  describe('div', () => {
    const wrapper = mount(
      <TestEditor {...fixtures.scatter()}>
        <LayoutPanel>
          <Fold>
            <p>I force visibility of the fold</p>
            <Section>
              <div id="thediv"> ok </div>
            </Section>
          </Fold>
        </LayoutPanel>
      </TestEditor>
    );
    it('shows Fold', () => expect(wrapper.find('div.fold').length).toEqual(1));
    it('shows Section', () =>
      expect(wrapper.find('div.section').length).toEqual(1));
    it('shows div', () => expect(wrapper.find('#thediv').length).toEqual(1));
  });

  describe('Field-with-visible-attr', () => {
    const wrapper = mount(
      <TestEditor {...fixtures.scatter()}>
        <LayoutPanel>
          <Fold>
            <p>I force visibility of the fold</p>
            <Section>
              <Numeric attr="title" />
            </Section>
          </Fold>
        </LayoutPanel>
      </TestEditor>
    );
    it('shows Fold', () => expect(wrapper.find('div.fold').length).toEqual(1));
    it('shows Section', () =>
      expect(wrapper.find('div.section').length).toEqual(1));
    it('shows Field', () => expect(wrapper.find('input').length).toEqual(1));
  });

  describe('Field-with-invisible-attr', () => {
    const wrapper = mount(
      <TestEditor {...fixtures.scatter()}>
        <LayoutPanel>
          <Fold>
            <p>I force visibility of the fold</p>
            <Section>
              <Numeric attr="not_an_attr" />
            </Section>
          </Fold>
        </LayoutPanel>
      </TestEditor>
    );

    it('shows Fold', () => expect(wrapper.find('div.fold').length).toEqual(1));
    it('HIDES Section', () =>
      expect(wrapper.find('div.section').length).toEqual(0));
    it('HIDES Field', () => expect(wrapper.find('input').length).toEqual(0));
  });
});

// visible attr on Section forces Fold open
describe('Panel > Fold > Section-with-visible-attr', () => {
  describe('div', () => {
    const wrapper = mount(
      <TestEditor {...fixtures.scatter()}>
        <LayoutPanel>
          <Fold>
            <Section attr="title">
              <div id="thediv"> ok </div>
            </Section>
          </Fold>
        </LayoutPanel>
      </TestEditor>
    );
    it('shows Fold', () => expect(wrapper.find('div.fold').length).toEqual(1));
    it('shows Section', () =>
      expect(wrapper.find('div.section').length).toEqual(1));
    it('shows div', () => expect(wrapper.find('#thediv').length).toEqual(1));
  });

  describe('Field-with-visible-attr', () => {
    const wrapper = mount(
      <TestEditor {...fixtures.scatter()}>
        <LayoutPanel>
          <Fold>
            <Section attr="title">
              <Numeric attr="title" />
            </Section>
          </Fold>
        </LayoutPanel>
      </TestEditor>
    );
    it('shows Fold', () => expect(wrapper.find('div.fold').length).toEqual(1));
    it('shows Section', () =>
      expect(wrapper.find('div.section').length).toEqual(1));
    it('shows Field', () => expect(wrapper.find('input').length).toEqual(1));
  });

  describe('Field-with-invisible-attr', () => {
    const wrapper = mount(
      <TestEditor {...fixtures.scatter()}>
        <LayoutPanel>
          <Fold>
            <Section attr="title">
              <Numeric attr="not_an_attr" />
            </Section>
          </Fold>
        </LayoutPanel>
      </TestEditor>
    );

    it('shows Fold', () => expect(wrapper.find('div.fold').length).toEqual(1));
    it('shows Section', () =>
      expect(wrapper.find('div.section').length).toEqual(1));
    it('HIDES Field', () => expect(wrapper.find('input').length).toEqual(0));
  });
});

// invisible attr on Section doesn't force Fold open
describe('Panel > Fold > Section-with-invisible-attr', () => {
  describe('div', () => {
    const wrapper = mount(
      <TestEditor {...fixtures.scatter()}>
        <LayoutPanel>
          <Fold>
            <Section attr="not_an_attr">
              <div id="thediv"> ok </div>
            </Section>
          </Fold>
        </LayoutPanel>
      </TestEditor>
    );
    it('HIDES Fold', () => expect(wrapper.find('div.fold').length).toEqual(0));
    it('HIDES Section', () =>
      expect(wrapper.find('div.section').length).toEqual(0));
    it('HIDES div', () => expect(wrapper.find('#thediv').length).toEqual(0));
  });

  describe('Field-with-visible-attr', () => {
    const wrapper = mount(
      <TestEditor {...fixtures.scatter()}>
        <LayoutPanel>
          <Fold>
            <Section attr="not_an_attr">
              <Numeric attr="title" />
            </Section>
          </Fold>
        </LayoutPanel>
      </TestEditor>
    );
    it('HIDES Fold', () => expect(wrapper.find('div.fold').length).toEqual(0));
    it('HIDES Section', () =>
      expect(wrapper.find('div.section').length).toEqual(0));
    it('HIDES Field', () => expect(wrapper.find('input').length).toEqual(0));
  });

  describe('Field-with-invisible-attr', () => {
    const wrapper = mount(
      <TestEditor {...fixtures.scatter()}>
        <LayoutPanel>
          <Fold>
            <Section attr="not_an_attr">
              <Numeric attr="not_an_attr" />
            </Section>
          </Fold>
        </LayoutPanel>
      </TestEditor>
    );

    it('HIDES Fold', () => expect(wrapper.find('div.fold').length).toEqual(0));
    it('HIDES Section', () =>
      expect(wrapper.find('div.section').length).toEqual(0));
    it('HIDES Field', () => expect(wrapper.find('input').length).toEqual(0));
  });
});

// nothing in the lower level Fold can force the upper one open
describe('Panel > Fold > Panel > Fold', () => {
  describe('div', () => {
    const wrapper = mount(
      <TestEditor {...fixtures.scatter()}>
        <LayoutPanel>
          <Fold>
            <LayoutPanel>
              <Fold>
                <div id="thediv"> ok </div>
              </Fold>
            </LayoutPanel>
          </Fold>
        </LayoutPanel>
      </TestEditor>
    );

    it('HIDES Fold', () => expect(wrapper.find('div.fold').length).toEqual(0));
    it('HIDES div', () => expect(wrapper.find('#thediv').length).toEqual(0));
  });

  describe('Field-with-visible-attr', () => {
    const wrapper = mount(
      <TestEditor {...fixtures.scatter()}>
        <LayoutPanel>
          <Fold>
            <LayoutPanel>
              <Fold>
                <Numeric attr="title" />
              </Fold>
            </LayoutPanel>
          </Fold>
        </LayoutPanel>
      </TestEditor>
    );
    it('HIDES Fold', () => expect(wrapper.find('div.fold').length).toEqual(0));
    it('HIDES Field', () => expect(wrapper.find('input').length).toEqual(0));
  });

  describe('Field-with-invisible-attr', () => {
    const wrapper = mount(
      <TestEditor {...fixtures.scatter()}>
        <LayoutPanel>
          <Fold>
            <LayoutPanel>
              <Fold>
                <Numeric attr="not_an_attr" />
              </Fold>
            </LayoutPanel>
          </Fold>
        </LayoutPanel>
      </TestEditor>
    );

    it('HIDES Fold', () => expect(wrapper.find('div.fold').length).toEqual(0));
    it('HIDES Field', () => expect(wrapper.find('input').length).toEqual(0));
  });
});

// nothing in the lower level Fold can force the upper one open

describe('Panel > Fold > Panel > Fold > Section', () => {
  describe('div', () => {
    const wrapper = mount(
      <TestEditor {...fixtures.scatter()}>
        <LayoutPanel>
          <Fold>
            <LayoutPanel>
              <Fold>
                <Section>
                  <div id="thediv"> ok </div>
                </Section>
              </Fold>
            </LayoutPanel>
          </Fold>
        </LayoutPanel>
      </TestEditor>
    );

    it('HIDES Fold', () => expect(wrapper.find('div.fold').length).toEqual(0));
    it('HIDES Section', () =>
      expect(wrapper.find('div.section').length).toEqual(0));
    it('HIDES div', () => expect(wrapper.find('#thediv').length).toEqual(0));
  });

  describe('Field-with-visible-attr', () => {
    const wrapper = mount(
      <TestEditor {...fixtures.scatter()}>
        <LayoutPanel>
          <Fold>
            <LayoutPanel>
              <Fold>
                <Section>
                  <Numeric attr="title" />
                </Section>
              </Fold>
            </LayoutPanel>
          </Fold>
        </LayoutPanel>
      </TestEditor>
    );
    it('HIDES Fold', () => expect(wrapper.find('div.fold').length).toEqual(0));
    it('HIDES Section', () =>
      expect(wrapper.find('div.section').length).toEqual(0));
    it('HIDES Field', () => expect(wrapper.find('input').length).toEqual(0));
  });

  describe('Field-with-invisible-attr', () => {
    const wrapper = mount(
      <TestEditor {...fixtures.scatter()}>
        <LayoutPanel>
          <Fold>
            <LayoutPanel>
              <Fold>
                <Section>
                  <Numeric attr="not_an_attr" />
                </Section>
              </Fold>
            </LayoutPanel>
          </Fold>
        </LayoutPanel>
      </TestEditor>
    );

    it('HIDES Fold', () => expect(wrapper.find('div.fold').length).toEqual(0));
    it('HIDES Section', () =>
      expect(wrapper.find('div.section').length).toEqual(0));
    it('HIDES Field', () => expect(wrapper.find('input').length).toEqual(0));
  });
});

// Lower level Panel with visible attr forces the upper Fold open, and visible
// attr on Section forces the lower Fold open

describe('Panel > Fold > Panel-with-visible-attr > Fold > Section-with-visible-attr', () => {
  describe('div', () => {
    const wrapper = mount(
      <TestEditor {...fixtures.scatter()}>
        <LayoutPanel>
          <Fold>
            <LayoutPanel attr="title">
              <Fold>
                <Section attr="title">
                  <div id="thediv"> ok </div>
                </Section>
              </Fold>
            </LayoutPanel>
          </Fold>
        </LayoutPanel>
      </TestEditor>
    );

    it('shows 2 Folds', () =>
      expect(wrapper.find('div.fold').length).toEqual(2));
    it('shows Section', () =>
      expect(wrapper.find('div.section').length).toEqual(1));
    it('shows div', () => expect(wrapper.find('#thediv').length).toEqual(1));
  });

  describe('Field-with-visible-attr', () => {
    const wrapper = mount(
      <TestEditor {...fixtures.scatter()}>
        <LayoutPanel>
          <Fold>
            <LayoutPanel attr="title">
              <Fold>
                <Section attr="title">
                  <Numeric attr="title" />
                </Section>
              </Fold>
            </LayoutPanel>
          </Fold>
        </LayoutPanel>
      </TestEditor>
    );
    it('shows 2 Folds', () =>
      expect(wrapper.find('div.fold').length).toEqual(2));
    it('shows Section', () =>
      expect(wrapper.find('div.section').length).toEqual(1));
    it('shows Field', () => expect(wrapper.find('input').length).toEqual(1));
  });

  describe('Field-with-invisible-attr', () => {
    const wrapper = mount(
      <TestEditor {...fixtures.scatter()}>
        <LayoutPanel>
          <Fold>
            <LayoutPanel attr="title">
              <Fold>
                <Section attr="title">
                  <Numeric attr="not_an_attr" />
                </Section>
              </Fold>
            </LayoutPanel>
          </Fold>
        </LayoutPanel>
      </TestEditor>
    );

    it('shows 2 Folds', () =>
      expect(wrapper.find('div.fold').length).toEqual(2));
    it('shows Section', () =>
      expect(wrapper.find('div.section').length).toEqual(1));
    it('HIDES Field', () => expect(wrapper.find('input').length).toEqual(0));
  });
});
