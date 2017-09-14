jest.useFakeTimers();

import Hint from "../Hint";
import React, { Component } from "react";
import { mount } from "enzyme";

const HINT_DELAY = 500;

class HintWrapper extends Component {
  constructor() {
    super();

    this.state = { hint: "" };
  }

  setHint(hint) {
    this.setState({ hint });
  }
  render() {
    return <Hint hint={this.state.hint} delayMilliseconds={HINT_DELAY} />;
  }
}

describe("<Hint />", () => {
  it("delays hint", () => {
    const wrapper = mount(<HintWrapper />);

    // the hint is blank so we expect no hint to be shown
    expect(wrapper.find(Hint).length).toBe(1);
    expect(wrapper.find(".hint--always").length).toBe(0);

    wrapper.instance().setHint("hodor");

    // the hint has a delay so we expect the hint to still not be shown
    expect(wrapper.find(".hint--always").length).toBe(0);

    jest.runAllTimers();

    // now it will have run the hint and will show the hint
    expect(wrapper.find(".hint--always").length).toBe(1);

    // rerendering the hint will result in no hint until the timer once again fires
    wrapper.instance().setHint("modor");

    expect(wrapper.find(".hint--always").length).toBe(0);
    jest.runAllTimers();

    expect(wrapper.find(".hint--always").length).toBe(1);
  });
});
