import { mount } from "enzyme";
import React from "react";
import MapboxStyleUrlController from "@workspace/components/widgets/MapboxStyleUrlController";
import MapboxTokenDropdown from "@workspace/components/widgets/MapboxTokenDropdown";
import { mockUser } from "_utils/testUtils";
import { currentUserOrNull } from "@workspace/utils/customPropTypes";

function LoggedInUserContextHolder({ children }) {
  return children;
}

LoggedInUserContextHolder.contextTypes = {
  currentUser: currentUserOrNull.isDefined,
};

describe("MapboxStyleUrlController", () => {
  function render(value) {
    const currentUser = mockUser({
      feature_set_id: "community",
      mapbox_access_tokens: [value.accesstoken],
    });

    const context = { currentUser };

    return mount(
      <LoggedInUserContextHolder>
        <MapboxStyleUrlController
          value={value}
          updatePlot={{
            style: jest.fn(),
            accesstoken: jest.fn(),
          }}
          dispatch={jest.fn()}
        />
      </LoggedInUserContextHolder>,
      { context }
    );
  }

  it("renders without warnings", () => {
    const wrapper = render({ style: "basic", accesstoken: "pk.eyJ1I" });
    expect(wrapper).toBeDefined();
  });

  it("renders accesstoken dropdown only when mapbox studio option is selected", () => {
    let wrapper = render({ style: "basic", accesstoken: "pk.eyJ1I" });
    expect(wrapper.find(MapboxTokenDropdown).length).toBe(0);
    wrapper = render({
      style: "mapbox://styles/veraz/cirm2",
      accesstoken: "pk.eyJ1I",
    });
    expect(wrapper.find(MapboxTokenDropdown).length).toBe(1);
  });
});
