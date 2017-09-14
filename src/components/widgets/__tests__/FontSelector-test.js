jest.mock("../../../../common/actions/notification");

import FontSelector from "../FontSelector";
import React from "react";
import { MIXED_VALUES } from "@workspace/constants/workspace";
import { merge } from "ramda";
import { mockUser } from "_utils/testUtils";
import { mount } from "enzyme";
import { showNotification } from "@common/actions/notification";

describe("FontSelector", () => {
  function render(additionalProps = {}, user = "community") {
    const currentUser = mockUser({ feature_set_id: user });

    const defaultProps = {
      activeOption: "Open Sans",
      onChange: jest.fn(),
      dispatch: jest.fn(),
    };

    const context = { currentUser };

    const props = merge(defaultProps, additionalProps);

    return mount(<FontSelector {...props} />, { context });
  }

  it("passes on the new value on change and updates state", () => {
    const wrapper = render();
    const dropdown = wrapper.ref("dropdown");

    expect(wrapper).toBeDefined();
    expect(wrapper.state().activeOption).toEqual("Open Sans");
    expect(wrapper.props().onChange).not.toBeCalled();

    dropdown.props().onChange("Droid Serif");

    expect(wrapper.props().onChange).toBeCalledWith("Droid Serif");
    expect(wrapper.state().activeOption).toEqual("Droid Serif");
  });

  it("should update local state on new props from parent", () => {
    const wrapper = render();

    expect(wrapper.state().activeOption).toEqual("Open Sans");
    wrapper.setProps({
      activeOption: "Raleway",
    });
    expect(wrapper.state().activeOption).toEqual("Raleway");
  });

  it(`When received null props from parents still updates
        local state`, () => {
    const wrapper = render();

    expect(wrapper.state().activeOption).toEqual("Open Sans");
    wrapper.setProps({
      activeOption: null,
    });
    expect(wrapper.state().activeOption).toEqual(null);
  });

  it("adds new fonts if they don't already exist", () => {
    const newFont = '"Cindi Mayweather", Arial';
    const wrapper = render({ activeOption: newFont });
    const expectedOption = {
      label: "Cindi Mayweather",
      value: newFont,
      key: newFont,
    };
    expect(wrapper.state().activeOption).toEqual(expectedOption.value);
    expect(wrapper.state().fontList[0]).toEqual(expectedOption);
  });

  it("adds new fonts if they don't already exist on re-render", () => {
    const newFont = '"Cindi Mayweather", Arial';
    const expectedOption = {
      label: "Cindi Mayweather",
      value: newFont,
      key: newFont,
    };

    const wrapper = render();
    wrapper.setProps({ activeOption: newFont });

    expect(wrapper.state().activeOption).toEqual(expectedOption.value);
    expect(wrapper.state().fontList[0]).toEqual(expectedOption);
  });

  it("does not add MIXED_VALUES to the font list", () => {
    const value = MIXED_VALUES;

    const wrapper = render();
    wrapper.setProps({ activeOption: value });

    wrapper.state().fontList.forEach(font => {
      expect(font).not.toBe(value);
    });
  });

  it("sets active option empty if MIXED_VALUES is passed", () => {
    const value = MIXED_VALUES;

    const wrapper = render();
    wrapper.setProps({ activeOption: value });

    expect(wrapper.state().activeOption).toBe("");
  });

  it("should not open upgrade dialogue if free font is selected", () => {
    const freeFont = "Open Sans, To be Prettied";

    const wrapper = render();

    const dropdown = wrapper.ref("dropdown");
    dropdown.props().onChange(freeFont);

    expect(wrapper.props().dispatch).not.toBeCalled();
  });

  it("should open upgrade dialogue if pro font is selected", () => {
    const proFont = "Overpass";
    const wrapper = render();

    const dropdown = wrapper.ref("dropdown");
    dropdown.props().onChange(proFont);

    const callArgs = showNotification.mock.calls[0];
    const opts = callArgs[1];
    expect(opts.showOnce).toBe(true);
  });

  it("should not open upgrade dialogue if logged in as pro", () => {
    const proFont = "Overpass";
    const wrapper = render({}, "professional_2016_10");

    const dropdown = wrapper.ref("dropdown");
    dropdown.props().onChange(proFont);

    expect(wrapper.props().dispatch).not.toBeCalled();
  });
});
