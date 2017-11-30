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

export const EDITOR_ACTIONS = {
  UPDATE_TRACES: 'plotly-editor-update-traces',
  ADD_TRACE: 'plotly-editor-add-trace',
  DELETE_TRACE: 'plotly-editor-delete-trace',
  UPDATE_LAYOUT: 'plotly-editor-update-layout',
  DELETE_ANNOTATION: 'plotly-editor-delete-annotation',
};

export const DEFAULT_FONTS = [
  {label: 'Arial', value: 'Arial, Roboto, sans-serif'},
  {
    label: 'Courier New',
    value: '"Courier New", Courier, "Droid Sans Mono", monospace',
  },
  {label: 'Times', value: '"Times New Roman", Times, "Droid Serif", serif'},
  {label: 'Futura', value: '"Century Gothic", Futura, Roboto, sans-serif'},
  {label: 'Georgia', value: 'Georgia, "Droid Serif", serif'},
  {label: 'Open Sans', value: '"Open Sans", verdana, arial, sans-serif'},
];

export const RETURN_KEY = 'Enter';
export const ESCAPE_KEY = 'Escape';
export const COMMAND_KEY = 'Meta';
export const CONTROL_KEY = 'Control';
