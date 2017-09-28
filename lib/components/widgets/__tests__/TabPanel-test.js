"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _enzyme = require("enzyme");

var _TabPanel = require("../TabPanel");

var _TabPanel2 = _interopRequireDefault(_TabPanel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var selectedClass = "tab-panel__tab--selected";

var tabs = [{ key: "A", label: "a" }, { key: "B", label: "b" }];

var TabOneComponent = function TabOneComponent() {
  return _react2.default.createElement("div", null);
};
var TabTwoComponent = function TabTwoComponent() {
  return _react2.default.createElement("div", null);
};

var components = {
  A: TabOneComponent,
  B: TabTwoComponent
};

describe("TabPanel", function () {
  it("renders configured tabs", function () {
    var component = (0, _enzyme.mount)(_react2.default.createElement(_TabPanel2.default, { components: components, onTabChange: function onTabChange() {}, tabs: tabs }));

    var tabEls = component.find("li");
    expect(tabEls.length).toBe(tabs.length);

    var firstTab = tabEls.first();
    var secondTab = tabEls.last();

    var firstTabLabel = tabs[0].label;
    var secondTabLabel = tabs[1].label;

    expect(firstTab.text()).toBe(firstTabLabel);
    expect(firstTab.prop("data-role")).toBe("button");

    expect(secondTab.text()).toBe(secondTabLabel);
    expect(secondTab.prop("data-role")).toBe("button");
  });

  it("selects first tab by default", function () {
    var component = (0, _enzyme.mount)(_react2.default.createElement(_TabPanel2.default, { components: components, onTabChange: function onTabChange() {}, tabs: tabs }));

    var tabEls = component.find("li");
    var firstTab = tabEls.first();
    var secondTab = tabEls.last();

    expect(firstTab.hasClass(selectedClass)).toBe(true);
    expect(firstTab.prop("data-pressed")).toBe(true);

    expect(secondTab.hasClass(selectedClass)).toBe(false);
    expect(secondTab.prop("data-pressed")).toBe(false);
  });

  it("selects tab according to passed in `selectedTab`prop", function () {
    var component = (0, _enzyme.mount)(_react2.default.createElement(_TabPanel2.default, {
      components: components,
      onTabChange: function onTabChange() {},
      selectedTab: tabs[1].key,
      tabs: tabs
    }));

    var tabEls = component.find("li");
    var firstTab = tabEls.first();
    var secondTab = tabEls.last();

    expect(firstTab.hasClass(selectedClass)).toBe(false);
    expect(firstTab.prop("data-pressed")).toBe(false);

    expect(secondTab.hasClass(selectedClass)).toBe(true);
    expect(secondTab.prop("data-pressed")).toBe(true);
  });

  it("calls back with current and next tab keys when tab is clicked", function () {
    var onTabChange = jest.genMockFn();

    var component = (0, _enzyme.mount)(_react2.default.createElement(_TabPanel2.default, { components: components, onTabChange: onTabChange, tabs: tabs }));

    var tabEls = component.find("li");
    var secondTab = tabEls.last();
    var firstTabKey = tabs[0].key;
    var secondTabKey = tabs[1].key;

    secondTab.simulate("click");

    expect(onTabChange).toBeCalledWith(firstTabKey, secondTabKey);
  });
});
//# sourceMappingURL=TabPanel-test.js.map