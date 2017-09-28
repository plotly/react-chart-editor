"use strict";

var _AccordionMenu = require("@workspace/components/widgets/AccordionMenu");

var _AccordionMenu2 = _interopRequireDefault(_AccordionMenu);

var _AccordionMenuItem = require("@workspace/components/widgets/AccordionMenuItem");

var _AccordionMenuItem2 = _interopRequireDefault(_AccordionMenuItem);

var _Dropdown = require("@workspace/components/widgets/Dropdown");

var _Dropdown2 = _interopRequireDefault(_Dropdown);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _assignDeep = require("assign-deep");

var _assignDeep2 = _interopRequireDefault(_assignDeep);

var _enzyme = require("enzyme");

var _ramda = require("ramda");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("<AccordionMenu />", function () {
  function render() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    props = (0, _assignDeep2.default)({
      subMenus: [{
        title: "first",
        iconClass: "icon-plotlylogo",
        isOpen: false,
        content: _react2.default.createElement(
          "div",
          null,
          "Some stuff to pass in"
        )
      }, {
        title: "second",
        iconClass: "icon-plotlylogo",
        isOpen: true,
        content: _react2.default.createElement(
          "div",
          null,
          "Some stuff to pass in"
        )
      }]
    }, props);

    return (0, _enzyme.mount)(_react2.default.createElement(_AccordionMenu2.default, props));
  }

  it('collapses when you click on the "collapse all" button', function () {
    var wrapper = render();

    // Check if initial states are rendered correctly
    expect(wrapper.state().subMenuStates["0"]).toEqual(false);
    expect(wrapper.state().subMenuStates["1"]).toEqual(true);

    /*
         * Check if clicking 'collapse all' changes the state of all to
         * Not Active.
         */
    wrapper.ref("collapse").simulate("click");
    expect(wrapper.state().subMenuStates["0"]).toEqual(false);
    expect(wrapper.state().subMenuStates["1"]).toEqual(false);
  });

  it("string ids: collapses and render open function", function () {
    var props = {
      subMenus: [{
        title: "first",
        id: "aaaaaa",
        iconClass: "icon-plotlylogo",
        isOpen: true,
        content: _react2.default.createElement(
          "div",
          { className: "contentA" },
          "A"
        )
      }, {
        title: "second",
        id: "bbbbbb",
        iconClass: "icon-plotlylogo",
        isOpen: true,
        content: _react2.default.createElement(
          "div",
          { className: "contentB" },
          "B"
        )
      }]
    };

    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_AccordionMenu2.default, props));

    expect(wrapper.state().subMenuStates.aaaaaa).toEqual(true);
    expect(wrapper.state().subMenuStates.bbbbbb).toEqual(true);

    var displays = wrapper.find(".accordion-item__content").map(function (node) {
      var elem = node.get(0);
      if (elem.style) {
        return elem.style.display;
      }
      return "";
    });

    expect(displays[0]).toBe("");
    expect(displays[1]).toBe("");

    wrapper.ref("collapse").simulate("click");
    expect(wrapper.state().subMenuStates.aaaaaa).toEqual(false);
    expect(wrapper.state().subMenuStates.bbbbbb).toEqual(false);

    displays = wrapper.find(".accordion-item__content").map(function (node) {
      var elem = node.get(0);
      return elem.style.display;
    });

    expect(displays[0]).toBe("none");
    expect(displays[1]).toBe("none");
  });

  it("presents an AddMenu when AddMenu Handler is provided", function () {
    var addNewMenuHandler = jest.fn();
    var wrapper = render({ addNewMenuHandler: addNewMenuHandler });

    expect(wrapper.find(_AccordionMenu.SimpleAddMenu).length).toBe(1);
    expect(wrapper.find(_AccordionMenu.DropdownAddMenu).length).toBe(0);
  });

  it("updates the sub-menu states after a sub-menu is added", function () {
    var wrapper = render();
    var newMenu = wrapper.props().subMenus[1];
    newMenu.title = "third";
    newMenu.isOpen = true;

    var addNewMenuHandler = jest.fn(function () {
      var newMenus = (0, _ramda.append)(newMenu, wrapper.props().subMenus);
      wrapper.setProps({ subMenus: newMenus });
    });

    wrapper.setProps({ addNewMenuHandler: addNewMenuHandler });
    expect(wrapper.props().subMenus.length).toEqual(2);
    wrapper.find(".js-test-add-new-layer").simulate("click");
    expect(wrapper.props().subMenus.length).toEqual(3);
    expect(wrapper.state().subMenuStates[2]).toEqual(true);
  });

  it("should retain state of previous sub-menu states", function () {
    var wrapper = render();
    var newMenu = wrapper.props().subMenus[1];
    newMenu.title = "third";
    newMenu.isOpen = true;

    var addNewMenuHandler = jest.fn(function () {
      var newMenus = (0, _ramda.append)(newMenu, wrapper.props().subMenus);
      wrapper.setProps({ subMenus: newMenus });
    });

    wrapper.setProps({ addNewMenuHandler: addNewMenuHandler });

    // Collapse first two sub-menus
    wrapper.find(".js-test-collapse-text").simulate("click");
    wrapper.find(".js-test-add-new-layer").simulate("click");

    expect(wrapper.state().subMenuStates[0]).toEqual(false);
    expect(wrapper.state().subMenuStates[1]).toEqual(false);
    expect(wrapper.state().subMenuStates[2]).toEqual(true);
  });

  it('should show "Expand All" after collapsing sub-menus.', function () {
    var wrapper = render();
    // Check if initial states are rendered correctly

    expect(wrapper.state().subMenuStates["0"]).toEqual(false);
    expect(wrapper.state().subMenuStates["1"]).toEqual(true);
    // Check that button says 'Collapse All'
    expect(wrapper.find(".js-test-collapse-text").text()).toEqual("Collapse All");

    // Collapse all sub-menus
    wrapper.find(".js-test-collapse-text").simulate("click");

    // Check that button says 'Expand all'
    expect(wrapper.find(".js-test-collapse-text").text()).toEqual("Expand All");
  });

  it("should expand all sub-menus if the expand-all button is pressed.", function () {
    var wrapper = render();
    // Check if initial states are rendered correctly

    expect(wrapper.state().subMenuStates["0"]).toEqual(false);
    expect(wrapper.state().subMenuStates["1"]).toEqual(true);

    // Collapse all sub-menus
    wrapper.find(".js-test-collapse-text").simulate("click");

    expect(wrapper.state().subMenuStates["0"]).toEqual(false);
    expect(wrapper.state().subMenuStates["1"]).toEqual(false);

    // Expand all sub-menus
    wrapper.find(".js-test-collapse-text").simulate("click");

    // Check if sub-menus are all expanded.
    expect(wrapper.state().subMenuStates["0"]).toEqual(true);
    expect(wrapper.state().subMenuStates["1"]).toEqual(true);
  });

  it("should update child props given the sub-menu states.", function () {
    var wrapper = render();

    // Check if initial states are rendered correctly
    expect(wrapper.state().subMenuStates["0"]).toEqual(false);
    expect(wrapper.state().subMenuStates["1"]).toEqual(true);

    var submenus = wrapper.find(_AccordionMenuItem2.default);

    expect(submenus.get(0).props.isOpen).toEqual(false);
    expect(submenus.get(1).props.isOpen).toEqual(true);

    wrapper.find(".js-test-collapse-text").simulate("click");

    expect(wrapper.state().subMenuStates["0"]).toEqual(false);
    expect(wrapper.state().subMenuStates["1"]).toEqual(false);
    expect(submenus.get(0).props.isOpen).toEqual(false);
    expect(submenus.get(1).props.isOpen).toEqual(false);

    wrapper.find(".js-test-collapse-text").simulate("click");

    expect(wrapper.state().subMenuStates["0"]).toEqual(true);
    expect(wrapper.state().subMenuStates["1"]).toEqual(true);
    expect(submenus.get(0).props.isOpen).toEqual(true);
    expect(submenus.get(1).props.isOpen).toEqual(true);
  });

  it("does not present an AddMenu when AddMenu Handler absent", function () {
    var wrapper = render();

    expect(wrapper.find(_AccordionMenu.SimpleAddMenu).length).toBe(0);
    expect(wrapper.find(_AccordionMenu.DropdownAddMenu).length).toBe(0);
  });

  it("builds a newMenu dropdown when passed a config", function () {
    var addNewMenuHandler = jest.fn();
    var addNewMenuConfig = {
      title: "Hodor's Menu",
      options: [{ label: "HodorHodor", value: "hodorhodor" }]
    };

    var wrapper = render({
      addNewMenuHandler: addNewMenuHandler,
      addNewMenuConfig: addNewMenuConfig
    });

    expect(wrapper.find(_AccordionMenu.DropdownAddMenu).length).toBe(1);
  });

  it("fires addNewMenuHandler on addNewMenu button click", function () {
    var addNewMenuHandler = jest.fn();
    var wrapper = render({ addNewMenuHandler: addNewMenuHandler });

    wrapper.find(_AccordionMenu.SimpleAddMenu).simulate("click");
    expect(addNewMenuHandler).toBeCalled();
  });

  it("displays a header when a header was passed as prop", function () {
    var header = _react2.default.createElement("div", { id: "testHeader" });
    var wrapper = render({ header: header });
    expect(wrapper.find("#testHeader").length).toBe(1);
  });
});
//# sourceMappingURL=AccordionMenu-test.js.map