"use strict";

var _LaTeXEditor = require("../LaTeXEditor");

var _LaTeXEditor2 = _interopRequireDefault(_LaTeXEditor);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _enzyme = require("enzyme");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("LaTeXEditor", function () {
  var simpleExpr = "_int";
  var complexExpr = "x^2 \frac{d^2 y}{dx^2} + alpha^2 = 0";
  var wrappedSimpleExpr = "$" + simpleExpr + "$";
  var wrappedComplexExpr = "$" + complexExpr + "$";

  it("renders", function () {
    var component = (0, _enzyme.shallow)(_react2.default.createElement(_LaTeXEditor2.default, { onChange: function onChange() {} }));

    expect(component).toBeDefined();
  });

  it("renders the wrapped LaTeX expression without wrapping", function () {
    var component = (0, _enzyme.shallow)(_react2.default.createElement(_LaTeXEditor2.default, { onChange: function onChange() {}, value: wrappedSimpleExpr }));

    expect(component.find("textarea").prop("value")).toBe(simpleExpr);
  });

  it("handles a non-wrapped LaTeX expression just fine", function () {
    var component = (0, _enzyme.shallow)(_react2.default.createElement(_LaTeXEditor2.default, { onChange: function onChange() {}, value: simpleExpr }));

    expect(component.find("textarea").prop("value")).toBe(simpleExpr);
  });

  it("calls `onChange` with a wrapped LaTeX expression", function () {
    var mockOnChange = jest.genMockFn();
    var component = (0, _enzyme.shallow)(_react2.default.createElement(_LaTeXEditor2.default, { onChange: mockOnChange, value: wrappedSimpleExpr }));

    component.find("textarea").simulate("blur", { target: { value: simpleExpr } });

    expect(mockOnChange).toBeCalledWith(wrappedSimpleExpr);
  });

  describe("unit tests", function () {
    var instance = void 0;

    beforeEach(function () {
      instance = (0, _enzyme.shallow)(_react2.default.createElement(_LaTeXEditor2.default, { onChange: function onChange() {} })).instance();
    });

    describe("#wrap", function () {
      var wrap = void 0;

      beforeEach(function () {
        wrap = instance.wrap.bind(instance);
      });

      it("wraps a non-wrapped value", function () {
        expect(wrap("")).toBe("$$");
        expect(wrap(simpleExpr)).toBe(wrappedSimpleExpr);
        expect(wrap(complexExpr)).toBe(wrappedComplexExpr);
      });

      it("doesn't wrap a wrapped value", function () {
        expect(wrap("$$")).toBe("$$");
        expect(wrap(wrappedSimpleExpr)).toBe(wrappedSimpleExpr);
        expect(wrap(wrappedComplexExpr)).toBe(wrappedComplexExpr);
      });
    });

    describe("#unwrap", function () {
      var unwrap = void 0;

      beforeEach(function () {
        unwrap = instance.unwrap.bind(instance);
      });

      it("unwraps a wrapped value", function () {
        expect(unwrap("$$")).toBe("");
        expect(unwrap(wrappedSimpleExpr)).toBe(simpleExpr);
        expect(unwrap(wrappedComplexExpr)).toBe(complexExpr);
      });

      it("unwraps a wrapped value with linebreaks", function () {
        expect(unwrap("$int\n$")).toBe("int\n");
      });

      it("doesn't unwrap a non-wrapped value", function () {
        expect(unwrap("")).toBe("");
        expect(unwrap(simpleExpr)).toBe(simpleExpr);
        expect(unwrap(complexExpr)).toBe(complexExpr);
      });
    });
  });
});
//# sourceMappingURL=LaTeXEditor-test.js.map