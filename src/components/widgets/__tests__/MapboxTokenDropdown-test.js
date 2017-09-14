import DropdownWithTextInput from "../DropdownWithTextInput";
import Environment from "@common/utils/environment";
import MapboxTokenDropdown, { customTokenLabel } from "../MapboxTokenDropdown";
import React from "react";
import { merge } from "ramda";
import { mockUser } from "_utils/testUtils";
import { shallow } from "enzyme";

const defaultToken = {
  value: Environment.get("MAPBOX_DEFAULT_ACCESS_TOKEN"),
  label: "Plotly token",
};

const customToken = {
  value: "custom",
  label: customTokenLabel,
};

describe("<MapboxTokenDropdown />", () => {
  function render(props, tokens = []) {
    const mergeDefault = merge({
      onChange: jest.fn(),
      selectedToken: "",
    });
    const currentUser = mockUser({
      feature_set_id: "community",
      mapbox_access_tokens: tokens,
    });

    const finalProps = mergeDefault(props);
    const context = { currentUser };

    return shallow(<MapboxTokenDropdown {...finalProps} />, { context });
  }

  it("passes plotly token as default to dropdown", () => {
    const wrapper = render();
    const dropdown = wrapper.find(DropdownWithTextInput);

    expect(dropdown.prop("options")).toEqual([defaultToken, customToken]);
  });

  it("correctly extracts mapbox tokens from currentUser", () => {
    const tokens = ["pk.dank.memes", "pk.ay.lmao"];

    const wrapper = render({}, tokens);
    const dropdown = wrapper.find(DropdownWithTextInput);
    expect(dropdown.prop("options")).toEqual([
      defaultToken,
      {
        value: tokens[0],
        label: tokens[0],
      },
      {
        value: tokens[1],
        label: tokens[1],
      },
      customToken,
    ]);
  });

  it("filters out private tokens", () => {
    const tokens = ["sk.dank.memes", "sk.ay.lmao"];

    const wrapper = render({}, tokens);
    const dropdown = wrapper.find(DropdownWithTextInput);
    expect(dropdown.prop("options")).toEqual([defaultToken, customToken]);
  });

  it("only shows plotly icon if user is not logged in", () => {
    const context = { currentUser: {} };
    const wrapper = shallow(<MapboxTokenDropdown onChange={jest.fn()} />, {
      context,
    });
    const dropdown = wrapper.find(DropdownWithTextInput);

    expect(dropdown.prop("options")[0]).toEqual(defaultToken);
  });
});
