import {INLINE_STYLE} from 'draft-js-utils';
import {LinkIcon} from 'plotly-icons';
import {COLORS} from 'lib/constants';

export const SUPERSCRIPT = 'SUPERSCRIPT';
export const SUBSCRIPT = 'SUBSCRIPT';
export const LINK = 'LINK';

export const {BOLD, ITALIC} = INLINE_STYLE;

export const STYLES_TO_HTML_TAGS = {
  [BOLD]: {element: 'b'},
  [ITALIC]: {element: 'i'},
  [SUPERSCRIPT]: {element: 'sup'},
  [SUBSCRIPT]: {element: 'sub'},
  [LINK]: {element: 'a'},
};

export const STYLE_MAP = {
  [BOLD]: {
    fontWeight: 'bolder',
  },
  [ITALIC]: {
    fontStyle: 'italic',
  },
  [SUBSCRIPT]: {
    /*
     * Can't use text-align; IE renders `text-bottom` properly, but
     * FF doesn't (same height as `bottom`). Chrome doesn't understand
     * `text-align: bottom`. Use relative positioning instead.
     */
    lineHeight: 0,
    fontSize: '65%',
    position: 'relative',
    bottom: '-3px',
  },
  [SUPERSCRIPT]: {
    /*
     * Can't use text-align; IE renders `text-top` properly, but
     * FF doesn't (same height as `top`). Chrome doesn't understand
     * `text-align: top`. Use relative positioning instead.
     */
    lineHeight: 0,
    fontSize: '65%',
    position: 'relative',
    top: '-5px',
  },
  [LINK]: {
    color: COLORS.editorLink,
    linkDecoration: 'none',
    cursor: 'pointer',
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
        <LinkIcon className="icon-link" />
      </span>
    ),
    value: LINK,
  },
];
