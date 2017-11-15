export const baseClass = 'plotly-editor';

/*
 * Control represents multiple settings (like for several axes)
 * and the values are different.
 *
 * Because this is sometimes used in contexts where users can enter freeform
 * strings, we include a non-printable character (ESC) so it's not something
 * people could type.
 */
export const MULTI_VALUED = '\x1bMIXED_VALUES';

// how mixed values are represented in text inputs
export const MULTI_VALUED_PLACEHOLDER = '---';

export const multiValueText = {
  title: 'Multiple Values',
  text:
    'This input has multiple values associated with it. ' +
    'Changing this setting will override these custom inputs.',
  subText:
    "Common Case: An 'All' tab might display this message " +
    'because the X and Y tabs contain different settings.',
};
