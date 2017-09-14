import {
  hasTextExpression,
  isLaTeXExpr,
  htmlToLaTeX,
  laTeXToHTML,
} from "../convertFormats";

describe("convertFormats", () => {
  describe("isLaTeXExpr", () => {
    const simpleExpr = "_int";
    const complexExpr = "x^2 \frac{d^2 y}{dx^2} + alpha^2 = 0";
    const wrappedSimpleExpr = `$${simpleExpr}$`;
    const wrappedComplexExpr = `$${complexExpr}$`;

    it("returns `true` for strings wrapped in `$...$`", () => {
      expect(isLaTeXExpr("$$")).toBe(true);
      expect(isLaTeXExpr(wrappedSimpleExpr)).toBe(true);
      expect(isLaTeXExpr(wrappedComplexExpr)).toBe(true);
    });

    it("returns `false` for strings not wrapped in `$...$`", () => {
      expect(isLaTeXExpr("")).toBe(false);
      expect(isLaTeXExpr("$")).toBe(false);
      expect(isLaTeXExpr("_$$_")).toBe(false);
      expect(isLaTeXExpr(simpleExpr)).toBe(false);
      expect(isLaTeXExpr(complexExpr)).toBe(false);
    });
  });

  describe("hasTextExpression", () => {
    it("returns true when LaTeX contains `\text` expression", () => {
      expect(hasTextExpression("$\text{}$")).toBe(true);
      expect(hasTextExpression("$\text{text}$")).toBe(true);
      expect(hasTextExpression("$\text{text}\text{more text}$")).toBe(true);
    });

    it("returns false when LaTeX has no `\text` expression", () => {
      expect(hasTextExpression("$$")).toBe(false);
      expect(hasTextExpression("$int{}$")).toBe(false);
    });
  });

  describe("htmlToLaTeX", () => {
    it("handles empty input", () => {
      const emptyLaTeXExpr = "$\\text{}$";

      expect(htmlToLaTeX("")).toBe(emptyLaTeXExpr);
      expect(htmlToLaTeX(" ")).toBe(emptyLaTeXExpr);
      expect(htmlToLaTeX("\n")).toBe(emptyLaTeXExpr);
      expect(htmlToLaTeX("\t")).toBe(emptyLaTeXExpr);
      expect(htmlToLaTeX("\n \t")).toBe(emptyLaTeXExpr);
      expect(htmlToLaTeX("<br>")).toBe(emptyLaTeXExpr);
    });

    it("converts a bare paragraph", () => {
      expect(htmlToLaTeX("A paragraph")).toBe("$\\text{A paragraph}$");
      expect(htmlToLaTeX("A\nparagraph")).toBe("$\\text{A\nparagraph}$");
      expect(htmlToLaTeX("A\tparagraph")).toBe("$\\text{A\tparagraph}$");
      expect(htmlToLaTeX("\nA paragraph")).toBe("$\\text{A paragraph}$");
    });

    it("converts a paragraph with inline styles", () => {
      expect(
        htmlToLaTeX("<b>Bold</b> <i>text</i> x<sup>2</sup> a<sub>b</sub>")
      ).toBe("$\\text{Bold text x2 ab}$");
    });

    it("converts two paragraphs", () => {
      expect(htmlToLaTeX("First para<br>Second para")).toBe(
        "$\\text{First para}\n\\text{Second para}$"
      );

      expect(htmlToLaTeX("First para\n<br>\nSecond para")).toBe(
        "$\\text{First para}\n\\text{Second para}$"
      );
    });

    it("converts two paragraphs with inline styles", () => {
      expect(htmlToLaTeX("<b>First</b> para<br><i>Second</i> para")).toBe(
        "$\\text{First para}\n\\text{Second para}$"
      );
    });

    it("keeps empty newlines as newlines", () => {
      expect(htmlToLaTeX("Some text<br><br>More text")).toBe(
        "$\\text{Some text}\n\n\\text{More text}$"
      );
    });
  });

  describe("laTeXToHTML", () => {
    it("handles empty input", () => {
      expect(laTeXToHTML("")).toBe("");
      expect(laTeXToHTML("$$")).toBe("");
      expect(laTeXToHTML("$ $")).toBe("");
      expect(laTeXToHTML("$\n$")).toBe("");
    });

    it("converts empty text expression to empty string", () => {
      expect(laTeXToHTML("$\text{}$")).toBe("");
      expect(laTeXToHTML("$\text{ }$")).toBe("");
      expect(laTeXToHTML("$\text{\n}$")).toBe("");
    });

    it("converts a text expression to a paragraph", () => {
      expect(laTeXToHTML("$\text{A paragraph}$")).toBe("A paragraph");
    });

    it("ignores other LaTeX expressions", () => {
      expect(laTeXToHTML("$int{}alpha\text{A paragraph}\beta$")).toBe(
        "A paragraph"
      );
    });

    it("converts two text expressions to two paragraphs", () => {
      expect(
        laTeXToHTML("$\text{First paragraph}\text{Second paragraph}$")
      ).toBe("First paragraph<br>Second paragraph");

      expect(
        laTeXToHTML(
          "$int{}alpha\text{First paragraph}\beta\text{Second paragraph}$"
        )
      ).toBe("First paragraph<br>Second paragraph");
    });
  });
});
