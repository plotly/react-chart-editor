/*
 * Configuration constants used by the RichTextEditor.
 */

import React from "react";
import { INLINE_STYLE } from "draft-js-tools";

import {
  INLINE_STYLE_SUPER as SUPERSCRIPT,
  INLINE_STYLE_SUB as SUBSCRIPT,
  INLINE_STYLE_LINK as LINK,
} from "@workspace/constants/workspace";

export { SUPERSCRIPT, SUBSCRIPT, LINK };

export const { BOLD, ITALIC } = INLINE_STYLE;

export const STYLES_TO_HTML_TAGS = {
  [BOLD]: "b",
  [ITALIC]: "i",
  [SUPERSCRIPT]: "sup",
  [SUBSCRIPT]: "sub",
  [LINK]: "a",
};

export const STYLE_MAP = {
  [BOLD]: {
    fontWeight: "bolder",
  },
  [ITALIC]: {
    fontStyle: "italic",
  },
  [SUBSCRIPT]: {
    /*
         * Can't use text-align; IE renders `text-bottom` properly, but
         * FF doesn't (same height as `bottom`). Chrome doesn't understand
         * `text-align: bottom`. Use relative positioning instead.
         */
    lineHeight: 0,
    fontSize: "65%",
    position: "relative",
    bottom: "-3px",
  },
  [SUPERSCRIPT]: {
    /*
         * Can't use text-align; IE renders `text-top` properly, but
         * FF doesn't (same height as `top`). Chrome doesn't understand
         * `text-align: top`. Use relative positioning instead.
         */
    lineHeight: 0,
    fontSize: "65%",
    position: "relative",
    top: "-5px",
  },
  [LINK]: {
    color: "#447bdc", // $color-link
    linkDecoration: "none",
    cursor: "pointer",
  },
};

export const INLINE_STYLES = [
  {
    label: <span style={STYLE_MAP[BOLD]}>B</span>,
    value: BOLD,
  },
  {
    label: <span style={STYLE_MAP[ITALIC]}>I</span>,
    value: ITALIC,
  },
  {
    label: (
      <span>
        x<span style={STYLE_MAP[SUBSCRIPT]}>2</span>
      </span>
    ),
    value: SUBSCRIPT,
  },
  {
    label: (
      <span>
        x<span style={STYLE_MAP[SUPERSCRIPT]}>2</span>
      </span>
    ),
    value: SUPERSCRIPT,
  },
  {
    label: (
      <span>
        <i className="icon icon-link" />
      </span>
    ),
    value: LINK,
  },
];

// TODO Calculate text height rather than hard-coding.
export const EDITOR_TEXT_HEIGHT = 15;
export const LINK_EDITOR_VERTICAL_OFFSET = EDITOR_TEXT_HEIGHT + 5;
export const LINK_EDITOR_HORIZONTAL_OFFSET = 30;
