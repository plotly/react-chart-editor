import AccordionMenu, {
  SimpleAddMenu,
  DropdownAddMenu,
} from "@workspace/components/widgets/AccordionMenu";
import AccordionMenuItem from "@workspace/components/widgets/AccordionMenuItem";
import Dropdown from "@workspace/components/widgets/Dropdown";
import React from "react";
import deepAssign from "assign-deep";
import { mount } from "enzyme";
import { append } from "ramda";

describe("<AccordionMenu />", () => {
  function render(props = {}) {
    props = deepAssign(
      {
        subMenus: [
          {
            title: "first",
            iconClass: "icon-plotlylogo",
            isOpen: false,
            content: <div>Some stuff to pass in</div>,
          },
          {
            title: "second",
            iconClass: "icon-plotlylogo",
            isOpen: true,
            content: <div>Some stuff to pass in</div>,
          },
        ],
      },
      props
    );

    return mount(<AccordionMenu {...props} />);
  }

  it('collapses when you click on the "collapse all" button', () => {
    const wrapper = render();

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

  it("string ids: collapses and render open function", () => {
    const props = {
      subMenus: [
        {
          title: "first",
          id: "aaaaaa",
          iconClass: "icon-plotlylogo",
          isOpen: true,
          content: <div className="contentA">A</div>,
        },
        {
          title: "second",
          id: "bbbbbb",
          iconClass: "icon-plotlylogo",
          isOpen: true,
          content: <div className="contentB">B</div>,
        },
      ],
    };

    const wrapper = mount(<AccordionMenu {...props} />);

    expect(wrapper.state().subMenuStates.aaaaaa).toEqual(true);
    expect(wrapper.state().subMenuStates.bbbbbb).toEqual(true);

    let displays = wrapper.find(".accordion-item__content").map(node => {
      const elem = node.get(0);
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

    displays = wrapper.find(".accordion-item__content").map(node => {
      const elem = node.get(0);
      return elem.style.display;
    });

    expect(displays[0]).toBe("none");
    expect(displays[1]).toBe("none");
  });

  it("presents an AddMenu when AddMenu Handler is provided", () => {
    const addNewMenuHandler = jest.fn();
    const wrapper = render({ addNewMenuHandler });

    expect(wrapper.find(SimpleAddMenu).length).toBe(1);
    expect(wrapper.find(DropdownAddMenu).length).toBe(0);
  });

  it("updates the sub-menu states after a sub-menu is added", () => {
    const wrapper = render();
    const newMenu = wrapper.props().subMenus[1];
    newMenu.title = "third";
    newMenu.isOpen = true;

    const addNewMenuHandler = jest.fn(() => {
      const newMenus = append(newMenu, wrapper.props().subMenus);
      wrapper.setProps({ subMenus: newMenus });
    });

    wrapper.setProps({ addNewMenuHandler });
    expect(wrapper.props().subMenus.length).toEqual(2);
    wrapper.find(".js-test-add-new-layer").simulate("click");
    expect(wrapper.props().subMenus.length).toEqual(3);
    expect(wrapper.state().subMenuStates[2]).toEqual(true);
  });

  it("should retain state of previous sub-menu states", () => {
    const wrapper = render();
    const newMenu = wrapper.props().subMenus[1];
    newMenu.title = "third";
    newMenu.isOpen = true;

    const addNewMenuHandler = jest.fn(() => {
      const newMenus = append(newMenu, wrapper.props().subMenus);
      wrapper.setProps({ subMenus: newMenus });
    });

    wrapper.setProps({ addNewMenuHandler });

    // Collapse first two sub-menus
    wrapper.find(".js-test-collapse-text").simulate("click");
    wrapper.find(".js-test-add-new-layer").simulate("click");

    expect(wrapper.state().subMenuStates[0]).toEqual(false);
    expect(wrapper.state().subMenuStates[1]).toEqual(false);
    expect(wrapper.state().subMenuStates[2]).toEqual(true);
  });

  it('should show "Expand All" after collapsing sub-menus.', () => {
    const wrapper = render();
    // Check if initial states are rendered correctly

    expect(wrapper.state().subMenuStates["0"]).toEqual(false);
    expect(wrapper.state().subMenuStates["1"]).toEqual(true);
    // Check that button says 'Collapse All'
    expect(wrapper.find(".js-test-collapse-text").text()).toEqual(
      "Collapse All"
    );

    // Collapse all sub-menus
    wrapper.find(".js-test-collapse-text").simulate("click");

    // Check that button says 'Expand all'
    expect(wrapper.find(".js-test-collapse-text").text()).toEqual("Expand All");
  });

  it("should expand all sub-menus if the expand-all button is pressed.", () => {
    const wrapper = render();
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

  it("should update child props given the sub-menu states.", () => {
    const wrapper = render();

    // Check if initial states are rendered correctly
    expect(wrapper.state().subMenuStates["0"]).toEqual(false);
    expect(wrapper.state().subMenuStates["1"]).toEqual(true);

    const submenus = wrapper.find(AccordionMenuItem);

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

  it("does not present an AddMenu when AddMenu Handler absent", () => {
    const wrapper = render();

    expect(wrapper.find(SimpleAddMenu).length).toBe(0);
    expect(wrapper.find(DropdownAddMenu).length).toBe(0);
  });

  it("builds a newMenu dropdown when passed a config", () => {
    const addNewMenuHandler = jest.fn();
    const addNewMenuConfig = {
      title: "Hodor's Menu",
      options: [{ label: "HodorHodor", value: "hodorhodor" }],
    };

    const wrapper = render({
      addNewMenuHandler,
      addNewMenuConfig,
    });

    expect(wrapper.find(DropdownAddMenu).length).toBe(1);
  });

  it("fires addNewMenuHandler on addNewMenu button click", () => {
    const addNewMenuHandler = jest.fn();
    const wrapper = render({ addNewMenuHandler });

    wrapper.find(SimpleAddMenu).simulate("click");
    expect(addNewMenuHandler).toBeCalled();
  });

  it("displays a header when a header was passed as prop", () => {
    const header = <div id="testHeader" />;
    const wrapper = render({ header });
    expect(wrapper.find("#testHeader").length).toBe(1);
  });
});
