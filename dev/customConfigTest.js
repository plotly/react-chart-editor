export const customConfigTest = {
  visibility_rules: {
    blacklist: [
      {type: 'attrName', regex_match: 'font.family'},
      {type: 'attrName', regex_match: 'font.size'},
      {
        type: 'attrName',
        regex_match: 'color',
        exceptions: [
          {
            type: 'attrName',
            regex_match: 'colorbar',
            exceptions: [
              {type: 'attrName', regex_match: 'colorbar.bgcolor'},
              {type: 'attrName', regex_match: 'colorbar.tickfont.color'},
              {type: 'attrName', regex_match: 'colorbar.title.font.color'},
              {type: 'attrName', regex_match: 'colorbar.outlinecolor'},
              {type: 'attrName', regex_match: 'colorbar.bordercolor'},
              {type: 'attrName', regex_match: 'colorbar.tickcolor'},
            ],
          },
          {
            type: 'attrName',
            regex_match: 'coloraxis',
            exceptions: [
              {type: 'attrName', regex_match: 'coloraxis.colorscale'},
              {type: 'attrName', regex_match: 'coloraxis.colorbar.outlinecolor'},
              {type: 'attrName', regex_match: 'coloraxis.colorbar.bordercolor'},
              {type: 'attrName', regex_match: 'coloraxis.colorbar.bgcolor'},
              {type: 'attrName', regex_match: 'coloraxis.colorbar.tickcolor'},
              {type: 'attrName', regex_match: 'coloraxis.colorbar.tickfont.color'},
              {type: 'attrName', regex_match: 'coloraxis.colorbar.title.font.color'},
            ],
          },
          {
            type: 'attrName',
            regex_match: 'colorscales',
            exceptions: [
              {
                type: 'attrName',
                regex_match: 'colorscales.items.concentrationscales.colorscale',
              },
            ],
          },
          {type: 'attrName', regex_match: 'autocolorscale'},
          {type: 'attrName', regex_match: 'usecolormap'},
          {type: 'attrName', regex_match: 'bundlecolors'},
          {
            type: 'attrName',
            regex_match: 'marker.color',
            exceptions: [
              {type: 'controlType', regex_match: '^UnconnectedMultiColorPicker$'},
              {type: 'controlType', regex_match: '^UnconnectedColorscalePicker$'},
              {type: 'attrName', regex_match: 'marker.colorbar.outlinecolor'},
              {type: 'attrName', regex_match: 'marker.colorbar.bordercolor'},
              {type: 'attrName', regex_match: 'marker.colorbar.bgcolor'},
              {type: 'attrName', regex_match: 'marker.colorbar.tickcolor'},
              {type: 'attrName', regex_match: 'marker.colorbar.tickfont.color'},
              {type: 'attrName', regex_match: 'marker.colorbar.title.font.color'},
            ],
          },
        ],
      },
    ],
  },
};
