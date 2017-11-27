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

export const SYMBOLS = [
  {
    value: 'circle',
    alias: 0,
    label: 'M5,0A5,5 0 1,1 0,-5A5,5 0 0,1 5,0Z',
    threeD: true,
    gl: true,
  },
  {
    value: 'circle-open',
    alias: 0,
    label: 'M5,0A5,5 0 1,1 0,-5A5,5 0 0,1 5,0Z',
    fill: 'none',
    threeD: true,
    gl: true,
  },
  {
    value: 'circle-open-dot',
    alias: 0,
    label: 'M5,0A5,5 0 1,1 0,-5A5,5 0 0,1 5,0ZM0,0.5L0.5,0L0,-0.5L-0.5,0Z',
    fill: 'none',
  },

  {value: 'square', alias: 1, label: 'M5,5H-5V-5H5Z', threeD: true, gl: true},
  {
    value: 'square-open',
    alias: 1,
    label: 'M5,5H-5V-5H5Z',
    fill: 'none',
    threeD: true,
    gl: true,
  },
  {
    value: 'square-open-dot',
    alias: 1,
    label: 'M5,5H-5V-5H5ZM0,0.5L0.5,0L0,-0.5L-0.5,0Z',
    fill: 'none',
  },

  {
    value: 'diamond',
    alias: 2,
    label: 'M6.5,0L0,6.5L-6.5,0L0,-6.5Z',
    threeD: true,
    gl: true,
  },
  {
    value: 'diamond-open',
    alias: 2,
    label: 'M6.5,0L0,6.5L-6.5,0L0,-6.5Z',
    fill: 'none',
    threeD: true,
    gl: true,
  },
  {
    value: 'diamond-open-dot',
    alias: 2,
    label: 'M6.5,0L0,6.5L-6.5,0L0,-6.5ZM0,0.5L0.5,0L0,-0.5L-0.5,0Z',
    fill: 'none',
  },

  {
    value: 'cross',
    alias: 3,
    label: 'M6,2H2V6H-2V2H-6V-2H-2V-6H2V-2H6Z',
    threeD: true,
    gl: true,
  },
  {
    value: 'cross-open',
    alias: 3,
    label: 'M6,2H2V6H-2V2H-6V-2H-2V-6H2V-2H6Z',
    fill: 'none',
    gl: true,
  },

  {
    value: 'x',
    alias: 4,
    label:
      'M0,2.83l2.83,2.83l2.83,-2.83l-2.83,-2.83l2.83,-2.83l-2.83,-2.83l-2.83,2.83l-2.83,-2.83l-2.83,2.83l2.83,2.83l-2.83,2.83l2.83,2.83Z',
    threeD: true,
    gl: true,
  },
  {
    value: 'x-open',
    alias: 4,
    label:
      'M0,2.83l2.83,2.83l2.83,-2.83l-2.83,-2.83l2.83,-2.83l-2.83,-2.83l-2.83,2.83l-2.83,-2.83l-2.83,2.83l2.83,2.83l-2.83,2.83l2.83,2.83Z',
    fill: 'none',
    gl: true,
  },

  {value: 'triangle-up', alias: 5, label: 'M-5.77,2.5H5.77L0,-5Z', gl: true},
  {
    value: 'triangle-up-open',
    alias: 5,
    label: 'M-5.77,2.5H5.77L0,-5Z',
    fill: 'none',
    gl: true,
  },

  {value: 'triangle-down', alias: 6, label: 'M-5.77,-2.5H5.77L0,5Z', gl: true},
  {
    value: 'triangle-down-open',
    alias: 6,
    label: 'M-5.77,-2.5H5.77L0,5Z',
    fill: 'none',
    gl: true,
  },

  {value: 'triangle-left', alias: 7, label: 'M2.5,-5.77V5.77L-5,0Z', gl: true},
  {
    value: 'triangle-left-open',
    alias: 7,
    label: 'M2.5,-5.77V5.77L-5,0Z',
    fill: 'none',
    gl: true,
  },

  {value: 'triangle-right', alias: 8, label: 'M-2.5,-5.77V5.77L5,0Z', gl: true},
  {
    value: 'triangle-right-open',
    alias: 8,
    label: 'M-2.5,-5.77V5.77L5,0Z',
    fill: 'none',
    gl: true,
  },

  {value: 'triangle-ne', alias: 9, label: 'M-6,-3H3V6Z', gl: true},
  {
    value: 'triangle-ne-open',
    alias: 9,
    label: 'M-6,-3H3V6Z',
    fill: 'none',
    gl: true,
  },

  {value: 'triangle-se', alias: 10, label: 'M3,-6V3H-6Z', gl: true},
  {
    value: 'triangle-se-open',
    alias: 10,
    label: 'M3,-6V3H-6Z',
    fill: 'none',
    gl: true,
  },

  {value: 'triangle-sw', alias: 11, label: 'M6,3H-3V-6Z', gl: true},
  {
    value: 'triangle-sw-open',
    alias: 11,
    label: 'M6,3H-3V-6Z',
    fill: 'none',
    gl: true,
  },

  {value: 'triangle-nw', alias: 12, label: 'M-3,6V-3H6Z', gl: true},
  {
    value: 'triangle-nw-open',
    alias: 12,
    label: 'M-3,6V-3H6Z',
    fill: 'none',
    gl: true,
  },

  {
    value: 'pentagon',
    alias: 13,
    label: 'M4.76,-1.54L2.94,4.05H-2.94L-4.76,-1.54L0,-5Z',
    gl: true,
  },
  {
    value: 'pentagon-open',
    alias: 13,
    label: 'M4.76,-1.54L2.94,4.05H-2.94L-4.76,-1.54L0,-5Z',
    fill: 'none',
    gl: true,
  },

  {
    value: 'hexagon',
    alias: 14,
    label: 'M4.33,-2.5V2.5L0,5L-4.33,2.5V-2.5L0,-5Z',
    gl: true,
  },
  {
    value: 'hexagon-open',
    alias: 14,
    label: 'M4.33,-2.5V2.5L0,5L-4.33,2.5V-2.5L0,-5Z',
    fill: 'none',
    gl: true,
  },

  {
    value: 'hexagon2',
    alias: 15,
    label: 'M-2.5,4.33H2.5L5,0L2.5,-4.33H-2.5L-5,0Z',
    gl: true,
  },
  {
    value: 'hexagon2-open',
    alias: 15,
    label: 'M-2.5,4.33H2.5L5,0L2.5,-4.33H-2.5L-5,0Z',
    fill: 'none',
    gl: true,
  },

  {
    value: 'octagon',
    alias: 16,
    label:
      'M-1.92,-4.62H1.92L4.62,-1.92V1.92L1.92,4.62H-1.92L-4.62,1.92V-1.92Z',
  },
  {
    value: 'octagon-open',
    alias: 16,
    label:
      'M-1.92,-4.62H1.92L4.62,-1.92V1.92L1.92,4.62H-1.92L-4.62,1.92V-1.92Z',
    fill: 'none',
  },

  {
    value: 'star',
    alias: 17,
    label:
      'M1.58,-2.16H6.66L2.54,0.83L4.12,5.66L0,2.67L-4.12,5.66L-2.54,0.83L-6.66,-2.16H-1.58L0,-7Z',
    gl: true,
  },
  {
    value: 'star-open',
    alias: 17,
    label:
      'M1.58,-2.16H6.66L2.54,0.83L4.12,5.66L0,2.67L-4.12,5.66L-2.54,0.83L-6.66,-2.16H-1.58L0,-7Z',
    fill: 'none',
    gl: true,
  },

  {
    value: 'hexagram',
    alias: 18,
    label:
      'M-3.8,0l-1.9,-3.3h3.8l1.9,-3.3l1.9,3.3h3.8l-1.9,3.3l1.9,3.3h-3.8l-1.9,3.3l-1.9,-3.3h-3.8Z',
  },
  {
    value: 'hexagram-open',
    alias: 18,
    label:
      'M-3.8,0l-1.9,-3.3h3.8l1.9,-3.3l1.9,3.3h3.8l-1.9,3.3l1.9,3.3h-3.8l-1.9,3.3l-1.9,-3.3h-3.8Z',
    fill: 'none',
  },

  {
    value: 'star-triangle-up',
    alias: 19,
    label:
      'M-6.93,4A 20,20 0 0 1 6.93,4A 20,20 0 0 1 0,-8A 20,20 0 0 1 -6.93,4Z',
  },
  {
    value: 'star-triangle-up-open',
    alias: 19,
    label:
      'M-6.93,4A 20,20 0 0 1 6.93,4A 20,20 0 0 1 0,-8A 20,20 0 0 1 -6.93,4Z',
    fill: 'none',
  },

  {
    value: 'star-triangle-down',
    alias: 20,
    label:
      'M6.93,-4A 20,20 0 0 1 -6.93,-4A 20,20 0 0 1 0,8A 20,20 0 0 1 6.93,-4Z',
  },
  {
    value: 'star-triangle-down-open',
    alias: 20,
    label:
      'M6.93,-4A 20,20 0 0 1 -6.93,-4A 20,20 0 0 1 0,8A 20,20 0 0 1 6.93,-4Z',
    fill: 'none',
  },

  {
    value: 'star-square',
    alias: 21,
    label:
      'M-5.5,-5.5A 10,10 0 0 1 -5.5,5.5A 10,10 0 0 1 5.5,5.5A 10,10 0 0 1 5.5,-5.5A 10,10 0 0 1 -5.5,-5.5Z',
  },
  {
    value: 'star-square-open',
    alias: 21,
    label:
      'M-5.5,-5.5A 10,10 0 0 1 -5.5,5.5A 10,10 0 0 1 5.5,5.5A 10,10 0 0 1 5.5,-5.5A 10,10 0 0 1 -5.5,-5.5Z',
    fill: 'none',
  },

  {
    value: 'star-diamond',
    alias: 22,
    label:
      'M-7,0A 9.5,9.5 0 0 1 0,7A 9.5,9.5 0 0 1 7,0A 9.5,9.5 0 0 1 0,-7A 9.5,9.5 0 0 1 -7,0Z',
  },
  {
    value: 'star-diamond-open',
    alias: 22,
    label:
      'M-7,0A 9.5,9.5 0 0 1 0,7A 9.5,9.5 0 0 1 7,0A 9.5,9.5 0 0 1 0,-7A 9.5,9.5 0 0 1 -7,0Z',
    fill: 'none',
  },

  {
    value: 'diamond-tall',
    alias: 23,
    label: 'M0,7L3.5,0L0,-7L-3.5,0Z',
    gl: true,
  },
  {
    value: 'diamond-tall-open',
    alias: 23,
    label: 'M0,7L3.5,0L0,-7L-3.5,0Z',
    fill: 'none',
    gl: true,
  },

  {value: 'diamond-wide', alias: 24, label: 'M0,3.5L7,0L0,-3.5L-7,0Z'},
  {
    value: 'diamond-wide-open',
    alias: 24,
    label: 'M0,3.5L7,0L0,-3.5L-7,0Z',
    fill: 'none',
  },

  {value: 'hourglass', alias: 25, label: 'M5,5H-5L5,-5H-5Z'},
  {value: 'bowtie', alias: 26, label: 'M5,5V-5L-5,5V-5Z', gl: true},
  {
    value: 'cross-thin-open',
    alias: 33,
    label: 'M0,7V-7M7,0H-7',
    fill: 'none',
    gl: true,
  },
  {
    value: 'x-thin-open',
    alias: 34,
    label: 'M5,5L-5,-5M5,-5L-5,5',
    fill: 'none',
  },
  {
    value: 'asterisk-open',
    alias: 35,
    label: 'M0,6V-6M6,0H-6M4.25,4.25L-4.25,-4.25M4.25,-4.25L-4.25,4.25',
    fill: 'none',
    gl: true,
  },

  {
    value: 'hash-open',
    alias: 36,
    label: 'M2.5,5V-5m-5,0V5M5,2.5H-5m0,-5H5',
    fill: 'none',
  },
  {
    value: 'hash-open-dot',
    alias: 36,
    label: 'M2.5,5V-5m-5,0V5M5,2.5H-5m0,-5H5M0,0.5L0.5,0L0,-0.5L-0.5,0Z',
    fill: 'none',
  },

  {
    value: 'y-up-open',
    alias: 37,
    label: 'M-6,4L0,0M6,4L0,0M0,-8L0,0',
    fill: 'none',
    gl: true,
  },
  {
    value: 'y-down-open',
    alias: 38,
    label: 'M-6,-4L0,0M6,-4L0,0M0,8L0,0',
    fill: 'none',
    gl: true,
  },
  {
    value: 'y-left-open',
    alias: 39,
    label: 'M4,6L0,0M4,-6L0,0M-8,0L0,0',
    fill: 'none',
  },
  {
    value: 'y-right-open',
    alias: 40,
    label: 'M-4,6L0,0M-4,-6L0,0M8,0L0,0',
    fill: 'none',
  },
  {value: 'line-ew-open', alias: 41, label: 'M7,0H-7', fill: 'none', gl: true},
  {value: 'line-ns-open', alias: 42, label: 'M0,7V-7', fill: 'none', gl: true},
  {value: 'line-ne-open', alias: 43, label: 'M5,-5L-5,5', fill: 'none'},
  {value: 'line-nw-open', alias: 44, label: 'M5,5L-5,-5', fill: 'none'},
];
