jest.mock("../../../../common/actions/modal");
jest.mock("../../../../common/actions/requireAuthActionWrapper");

import React from "react";
import { Map } from "immutable";
import UpgradeLink from "@workspace/components/widgets/UpgradeLink";
import { mount } from "enzyme";
import { openModal } from "@common/actions/modal";
import { requireAuthActionWrapper } from "@common/actions/requireAuthActionWrapper";

describe("dialogues", () => {
  describe("Upgrade Link", () => {
    function render() {
      const props = {
        plan: new Map(),
        trackingProperties: {},
        dispatch: jest.fn(),
      };

      return mount(<UpgradeLink {...props} />);
    }

    it("should open Subscription modal if user is logged in", () => {
      const wrapper = render();

      wrapper.ref("upgrade").simulate("click");
      expect(openModal).toBeCalled();
      expect(requireAuthActionWrapper).toBeCalled();
    });
  });
});
