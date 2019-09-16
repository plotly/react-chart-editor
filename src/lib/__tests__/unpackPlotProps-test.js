import {computeCustomConfigVisibility} from '../index';

const validate = (string, expected, config, wrappedComponentDisplayName) => {
  const isVisible = computeCustomConfigVisibility(
    {attr: string},
    config,
    wrappedComponentDisplayName
  );
  expect(isVisible).toBe(expected[string]);
};

describe('computeCustomConfigVisibility', () => {
  const customConfig = {
    visibility_rules: {
      blacklist: [
        {
          type: 'attrName',
          regex_match: 'color',
          exceptions: [
            {
              type: 'attrName',
              regex_match: 'colorscale',
              exceptions: [
                {type: 'attrName', regex_match: 'colorscale.title.font.color'},
                {type: 'attrName', regex_match: 'colorscale.tickcolor'},
              ],
            },
          ],
        },
      ],
    },
  };

  it('correctly blacklists attributes taking into account exceptions', () => {
    const cases = {
      bg_color: false,
      'font.color': false,
      somethingElse: true,
      colorscale: true,
      'colorscale.somethingElse': true,
      'colorscale.title.font.color': false,
      'colorscale.tickcolor': false,
    };

    Object.keys(cases).forEach(c => validate(c, cases, customConfig));
  });

  it('correctly whitelists attributes taking into account exceptions', () => {
    const config = {visibility_rules: {whitelist: customConfig.visibility_rules.blacklist}};

    const cases = {
      bg_color: true,
      'font.color': true,
      somethingElse: false,
      colorscale: false,
      'colorscale.somethingElse': false,
      'colorscale.title.font.color': true,
      'colorscale.tickcolor': true,
    };

    Object.keys(cases).forEach(c => validate(c, cases, config));
  });

  it('correctly displays visibility based on controlType', () => {
    const config = {
      visibility_rules: {
        blacklist: [
          {
            type: 'attrName',
            regex_match: 'color',
            exceptions: [
              {
                type: 'attrName',
                regex_match: 'marker.color',
                exceptions: [{type: 'controlType', regex_match: '^ColorscalePicker$'}],
              },
            ],
          },
        ],
      },
    };

    const case1 = {'marker.color': false};
    const case2 = {'marker.color': true};
    Object.keys(case1).forEach(c => validate(c, case1, config, 'ColorscalePicker'));
    Object.keys(case2).forEach(c => validate(c, case2, config, 'AnotherPicker'));
  });
});
