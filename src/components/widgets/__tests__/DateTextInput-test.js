import DelayedTextInput from "@workspace/components/widgets/DelayedTextInput";
import DateTextInput from "../DateTextInput";
import React from "react";
import { MIXED_VALUES, MIXED_MODE_VALUE } from "@workspace/constants/workspace";
import { mount } from "enzyme";

const Plotly = require("@workspace/__mocks__/plotly");

const globalUtils = require("_utils/globalUtils");
globalUtils.getWindow = jest.fn().mockReturnValue({ Plotly });

describe("DateTextInput", () => {
  function addTextToInput(input, text) {
    input.simulate("change", { target: { value: text } });
  }

  function render(props) {
    return mount(<DateTextInput {...props} />);
  }

  let originalLib;

  beforeEach(() => {
    originalLib = Plotly.Lib;
    // any string with "not" is not a date; otherwise it is a date
    Plotly.Lib = {
      isDateTime: v => {
        return v.indexOf("not") === -1;
      },
    };
  });

  afterEach(() => {
    Plotly.Lib = originalLib;
  });

  it("should show MIXED_MODE_VALUE and pass only dates to onUpdate", () => {
    const onUpdate = jest.fn();
    const wrapper = render({
      value: MIXED_VALUES,
      onUpdate,
      calendar: "gregorian",
    });
    const input = wrapper.find(DelayedTextInput).find("input");
    const nonDate = "not a date";
    const newDate = "tomorrow";

    expect(input.prop("value")).toBe(MIXED_MODE_VALUE);

    addTextToInput(input, nonDate);

    // you're allowed to type a non-date
    expect(input.prop("value")).toBe(nonDate);

    // but on blur it reverts without calling onUpdate
    input.simulate("blur");
    expect(input.prop("value")).toBe(MIXED_MODE_VALUE);
    expect(onUpdate).not.toBeCalled();

    // now type a "real" date
    addTextToInput(input, newDate);

    // still haven't called onUpdate
    expect(onUpdate).not.toBeCalled();

    input.simulate("blur");
    expect(onUpdate).toBeCalledWith(newDate);
    expect(input.prop("value")).toBe(newDate);
  });
});
