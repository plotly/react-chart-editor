import React from "react";
import { shallow } from "enzyme";
import { OrderedSet } from "immutable";

import StyleButton from "../StyleButton";
import StyleButtonGroup from "../StyleButtonGroup";

const styles = [
  {
    label: <span>B</span>,
    value: "BOLD",
  },
  {
    label: <span>I</span>,
    value: "ITALIC",
  },
];

describe("StyleButtonGroup", () => {
  it("Renders configured style buttons", () => {
    const component = shallow(
      <StyleButtonGroup styles={styles} onToggle={() => {}} />
    );

    expect(component.children().length).toBe(styles.length);

    const boldButton = component.find(StyleButton).at(0);
    const italicButton = component.find(StyleButton).at(1);

    expect(boldButton.props().value).toBe(styles[0].value);
    expect(italicButton.props().value).toBe(styles[1].value);
  });

  it("Sets active state for correct button", () => {
    const currentStyle = OrderedSet([styles[1].value]);

    const component = shallow(
      <StyleButtonGroup
        currentStyle={currentStyle}
        styles={styles}
        onToggle={() => {}}
      />
    );

    const boldButton = component.find(StyleButton).at(0);
    const italicButton = component.find(StyleButton).at(1);

    expect(boldButton.props().active).toBe(false);
    expect(italicButton.props().active).toBe(true);
  });
});
