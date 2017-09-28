"use strict";

var _convertFormats = require("../convertFormats");

describe("convertFormats", function () {
  describe("isLaTeXExpr", function () {
    var simpleExpr = "_int";
    var complexExpr = "x^2 \frac{d^2 y}{dx^2} + alpha^2 = 0";
    var wrappedSimpleExpr = "$" + simpleExpr + "$";
    var wrappedComplexExpr = "$" + complexExpr + "$";

    it("returns `true` for strings wrapped in `$...$`", function () {
      expect((0, _convertFormats.isLaTeXExpr)("$$")).toBe(true);
      expect((0, _convertFormats.isLaTeXExpr)(wrappedSimpleExpr)).toBe(true);
      expect((0, _convertFormats.isLaTeXExpr)(wrappedComplexExpr)).toBe(true);
    });

    it("returns `false` for strings not wrapped in `$...$`", function () {
      expect((0, _convertFormats.isLaTeXExpr)("")).toBe(false);
      expect((0, _convertFormats.isLaTeXExpr)("$")).toBe(false);
      expect((0, _convertFormats.isLaTeXExpr)("_$$_")).toBe(false);
      expect((0, _convertFormats.isLaTeXExpr)(simpleExpr)).toBe(false);
      expect((0, _convertFormats.isLaTeXExpr)(complexExpr)).toBe(false);
    });
  });

  describe("hasTextExpression", function () {
    it("returns true when LaTeX contains `\text` expression", function () {
      expect((0, _convertFormats.hasTextExpression)("$\text{}$")).toBe(true);
      expect((0, _convertFormats.hasTextExpression)("$\text{text}$")).toBe(true);
      expect((0, _convertFormats.hasTextExpression)("$\text{text}\text{more text}$")).toBe(true);
    });

    it("returns false when LaTeX has no `\text` expression", function () {
      expect((0, _convertFormats.hasTextExpression)("$$")).toBe(false);
      expect((0, _convertFormats.hasTextExpression)("$int{}$")).toBe(false);
    });
  });

  describe("htmlToLaTeX", function () {
    it("handles empty input", function () {
      var emptyLaTeXExpr = "$\\text{}$";

      expect((0, _convertFormats.htmlToLaTeX)("")).toBe(emptyLaTeXExpr);
      expect((0, _convertFormats.htmlToLaTeX)(" ")).toBe(emptyLaTeXExpr);
      expect((0, _convertFormats.htmlToLaTeX)("\n")).toBe(emptyLaTeXExpr);
      expect((0, _convertFormats.htmlToLaTeX)("\t")).toBe(emptyLaTeXExpr);
      expect((0, _convertFormats.htmlToLaTeX)("\n \t")).toBe(emptyLaTeXExpr);
      expect((0, _convertFormats.htmlToLaTeX)("<br>")).toBe(emptyLaTeXExpr);
    });

    it("converts a bare paragraph", function () {
      expect((0, _convertFormats.htmlToLaTeX)("A paragraph")).toBe("$\\text{A paragraph}$");
      expect((0, _convertFormats.htmlToLaTeX)("A\nparagraph")).toBe("$\\text{A\nparagraph}$");
      expect((0, _convertFormats.htmlToLaTeX)("A\tparagraph")).toBe("$\\text{A\tparagraph}$");
      expect((0, _convertFormats.htmlToLaTeX)("\nA paragraph")).toBe("$\\text{A paragraph}$");
    });

    it("converts a paragraph with inline styles", function () {
      expect((0, _convertFormats.htmlToLaTeX)("<b>Bold</b> <i>text</i> x<sup>2</sup> a<sub>b</sub>")).toBe("$\\text{Bold text x2 ab}$");
    });

    it("converts two paragraphs", function () {
      expect((0, _convertFormats.htmlToLaTeX)("First para<br>Second para")).toBe("$\\text{First para}\n\\text{Second para}$");

      expect((0, _convertFormats.htmlToLaTeX)("First para\n<br>\nSecond para")).toBe("$\\text{First para}\n\\text{Second para}$");
    });

    it("converts two paragraphs with inline styles", function () {
      expect((0, _convertFormats.htmlToLaTeX)("<b>First</b> para<br><i>Second</i> para")).toBe("$\\text{First para}\n\\text{Second para}$");
    });

    it("keeps empty newlines as newlines", function () {
      expect((0, _convertFormats.htmlToLaTeX)("Some text<br><br>More text")).toBe("$\\text{Some text}\n\n\\text{More text}$");
    });
  });

  describe("laTeXToHTML", function () {
    it("handles empty input", function () {
      expect((0, _convertFormats.laTeXToHTML)("")).toBe("");
      expect((0, _convertFormats.laTeXToHTML)("$$")).toBe("");
      expect((0, _convertFormats.laTeXToHTML)("$ $")).toBe("");
      expect((0, _convertFormats.laTeXToHTML)("$\n$")).toBe("");
    });

    it("converts empty text expression to empty string", function () {
      expect((0, _convertFormats.laTeXToHTML)("$\text{}$")).toBe("");
      expect((0, _convertFormats.laTeXToHTML)("$\text{ }$")).toBe("");
      expect((0, _convertFormats.laTeXToHTML)("$\text{\n}$")).toBe("");
    });

    it("converts a text expression to a paragraph", function () {
      expect((0, _convertFormats.laTeXToHTML)("$\text{A paragraph}$")).toBe("A paragraph");
    });

    it("ignores other LaTeX expressions", function () {
      expect((0, _convertFormats.laTeXToHTML)("$int{}alpha\text{A paragraph}\beta$")).toBe("A paragraph");
    });

    it("converts two text expressions to two paragraphs", function () {
      expect((0, _convertFormats.laTeXToHTML)("$\text{First paragraph}\text{Second paragraph}$")).toBe("First paragraph<br>Second paragraph");

      expect((0, _convertFormats.laTeXToHTML)("$int{}alpha\text{First paragraph}\beta\text{Second paragraph}$")).toBe("First paragraph<br>Second paragraph");
    });
  });
});
//# sourceMappingURL=convertFormats-test.js.map