import DownloadDropdown from "../DownloadDropdown";
import React from "react";
import { shallow } from "enzyme";
import { mockUser } from "_utils/testUtils";

describe("<DownloadDropdown>", () => {
  it("renders community feature set when user null", () => {
    const wrapper = shallow(
      <DownloadDropdown currentUser={null} graphURLBase={"hodor.com"} />
    );

    expect(
      wrapper
        .find("a")
        .filterWhere(node => node.text() === "PNG")
        .hasClass("dropdown-menu-item")
    ).toBe(true);

    expect(
      wrapper
        .find("a")
        .filterWhere(node => node.text() === "PDF")
        .hasClass("dropdown-menu-item-restricted")
    ).toBe(true);
  });

  it("renders community feature set by default", () => {
    const loggedInUser = mockUser({ feature_set_id: "" });
    const wrapper = shallow(
      <DownloadDropdown currentUser={loggedInUser} graphURLBase={"hodor.com"} />
    );

    expect(
      wrapper
        .find("a")
        .filterWhere(node => node.text() === "PNG")
        .hasClass("dropdown-menu-item")
    ).toBe(true);

    expect(
      wrapper
        .find("a")
        .filterWhere(node => node.text() === "PDF")
        .hasClass("dropdown-menu-item-restricted")
    ).toBe(true);
  });

  it("renders professional_2016_10 feature set", () => {
    const loggedInUser = mockUser({ feature_set_id: "professional_2016_10" });
    const wrapper = shallow(
      <DownloadDropdown currentUser={loggedInUser} graphURLBase={"hodor.com"} />
    );

    expect(
      wrapper
        .find("a")
        .filterWhere(node => node.text() === "PNG")
        .hasClass("dropdown-menu-item")
    ).toBe(true);

    expect(
      wrapper
        .find("a")
        .filterWhere(node => node.text() === "PDF")
        .hasClass("dropdown-menu-item")
    ).toBe(true);
  });

  it("renders on-prem feature set", () => {
    const loggedInUser = mockUser({ feature_set_id: "on_premise" });
    const wrapper = shallow(
      <DownloadDropdown currentUser={loggedInUser} graphURLBase={"hodor.com"} />
    );

    expect(
      wrapper
        .find("a")
        .filterWhere(node => node.text() === "PNG")
        .hasClass("dropdown-menu-item")
    ).toBe(true);

    expect(
      wrapper
        .find("a")
        .filterWhere(node => node.text() === "PDF")
        .hasClass("dropdown-menu-item")
    ).toBe(true);
  });
});
