import React from "react";
import SelectTrace from "../SelectTrace";
import Dropdown from "@workspace/components/widgets/Dropdown";
import { CHART_TYPE_ICON } from "@workspace/constants/workspace";
import { shallow } from "enzyme";

describe("<SelectTrace>", () => {
  it("renders <Dropdown> with a formatted list of options", () => {
    const traceSelectHandler = jest.fn();
    const selectedTraceValue = "";
    const traceOptions = [
      {
        value: "ed45tr",
        type: "scatter",
        label: "Scatter",
        disabled: false,
      },
    ];

    const wrapper = shallow(
      <SelectTrace
        traceSelectHandler={traceSelectHandler}
        selectedTraceValue={selectedTraceValue}
        traceOptions={traceOptions}
      />
    );

    const { options } = wrapper.find(Dropdown).get(0).props;
    const { value, label } = options[0];

    const icon = label.props.children[0];
    const text = label.props.children[1];

    expect(value).toEqual("ed45tr");
    expect(
      icon.props.className.indexOf(CHART_TYPE_ICON.scatter)
    ).toBeGreaterThan(-1);
    expect(text).toBe("Scatter");
  });
});
