import React from "react";
import { mount } from "enzyme";

import TabPanel from "../TabPanel";

const selectedClass = "tab-panel__tab--selected";

const tabs = [{ key: "A", label: "a" }, { key: "B", label: "b" }];

const TabOneComponent = () => <div />;
const TabTwoComponent = () => <div />;

const components = {
  A: TabOneComponent,
  B: TabTwoComponent,
};

describe("TabPanel", () => {
  it("renders configured tabs", () => {
    const component = mount(
      <TabPanel components={components} onTabChange={() => {}} tabs={tabs} />
    );

    const tabEls = component.find("li");
    expect(tabEls.length).toBe(tabs.length);

    const firstTab = tabEls.first();
    const secondTab = tabEls.last();

    const firstTabLabel = tabs[0].label;
    const secondTabLabel = tabs[1].label;

    expect(firstTab.text()).toBe(firstTabLabel);
    expect(firstTab.prop("data-role")).toBe("button");

    expect(secondTab.text()).toBe(secondTabLabel);
    expect(secondTab.prop("data-role")).toBe("button");
  });

  it("selects first tab by default", () => {
    const component = mount(
      <TabPanel components={components} onTabChange={() => {}} tabs={tabs} />
    );

    const tabEls = component.find("li");
    const firstTab = tabEls.first();
    const secondTab = tabEls.last();

    expect(firstTab.hasClass(selectedClass)).toBe(true);
    expect(firstTab.prop("data-pressed")).toBe(true);

    expect(secondTab.hasClass(selectedClass)).toBe(false);
    expect(secondTab.prop("data-pressed")).toBe(false);
  });

  it("selects tab according to passed in `selectedTab`prop", () => {
    const component = mount(
      <TabPanel
        components={components}
        onTabChange={() => {}}
        selectedTab={tabs[1].key}
        tabs={tabs}
      />
    );

    const tabEls = component.find("li");
    const firstTab = tabEls.first();
    const secondTab = tabEls.last();

    expect(firstTab.hasClass(selectedClass)).toBe(false);
    expect(firstTab.prop("data-pressed")).toBe(false);

    expect(secondTab.hasClass(selectedClass)).toBe(true);
    expect(secondTab.prop("data-pressed")).toBe(true);
  });

  it("calls back with current and next tab keys when tab is clicked", () => {
    const onTabChange = jest.genMockFn();

    const component = mount(
      <TabPanel components={components} onTabChange={onTabChange} tabs={tabs} />
    );

    const tabEls = component.find("li");
    const secondTab = tabEls.last();
    const firstTabKey = tabs[0].key;
    const secondTabKey = tabs[1].key;

    secondTab.simulate("click");

    expect(onTabChange).toBeCalledWith(firstTabKey, secondTabKey);
  });
});
