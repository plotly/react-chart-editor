import LaTeXEditor from "../LaTeXEditor";
import React from "react";
import { shallow } from "enzyme";

describe("LaTeXEditor", () => {
  const simpleExpr = "_int";
  const complexExpr = "x^2 \frac{d^2 y}{dx^2} + alpha^2 = 0";
  const wrappedSimpleExpr = `$${simpleExpr}$`;
  const wrappedComplexExpr = `$${complexExpr}$`;

  it("renders", () => {
    const component = shallow(<LaTeXEditor onChange={() => {}} />);

    expect(component).toBeDefined();
  });

  it("renders the wrapped LaTeX expression without wrapping", () => {
    const component = shallow(
      <LaTeXEditor onChange={() => {}} value={wrappedSimpleExpr} />
    );

    expect(component.find("textarea").prop("value")).toBe(simpleExpr);
  });

  it("handles a non-wrapped LaTeX expression just fine", () => {
    const component = shallow(
      <LaTeXEditor onChange={() => {}} value={simpleExpr} />
    );

    expect(component.find("textarea").prop("value")).toBe(simpleExpr);
  });

  it("calls `onChange` with a wrapped LaTeX expression", () => {
    const mockOnChange = jest.genMockFn();
    const component = shallow(
      <LaTeXEditor onChange={mockOnChange} value={wrappedSimpleExpr} />
    );

    component
      .find("textarea")
      .simulate("blur", { target: { value: simpleExpr } });

    expect(mockOnChange).toBeCalledWith(wrappedSimpleExpr);
  });

  describe("unit tests", () => {
    let instance;

    beforeEach(() => {
      instance = shallow(<LaTeXEditor onChange={() => {}} />).instance();
    });

    describe("#wrap", () => {
      let wrap;

      beforeEach(() => {
        wrap = instance.wrap.bind(instance);
      });

      it("wraps a non-wrapped value", () => {
        expect(wrap("")).toBe("$$");
        expect(wrap(simpleExpr)).toBe(wrappedSimpleExpr);
        expect(wrap(complexExpr)).toBe(wrappedComplexExpr);
      });

      it("doesn't wrap a wrapped value", () => {
        expect(wrap("$$")).toBe("$$");
        expect(wrap(wrappedSimpleExpr)).toBe(wrappedSimpleExpr);
        expect(wrap(wrappedComplexExpr)).toBe(wrappedComplexExpr);
      });
    });

    describe("#unwrap", () => {
      let unwrap;

      beforeEach(() => {
        unwrap = instance.unwrap.bind(instance);
      });

      it("unwraps a wrapped value", () => {
        expect(unwrap("$$")).toBe("");
        expect(unwrap(wrappedSimpleExpr)).toBe(simpleExpr);
        expect(unwrap(wrappedComplexExpr)).toBe(complexExpr);
      });

      it("unwraps a wrapped value with linebreaks", () => {
        expect(unwrap("$int\n$")).toBe("int\n");
      });

      it("doesn't unwrap a non-wrapped value", () => {
        expect(unwrap("")).toBe("");
        expect(unwrap(simpleExpr)).toBe(simpleExpr);
        expect(unwrap(complexExpr)).toBe(complexExpr);
      });
    });
  });
});
