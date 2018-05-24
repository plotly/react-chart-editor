import {maybeAdjustSrc} from '../index';
/* eslint-disable no-magic-numbers */
describe('maybeAdjustSrc', () => {
  it('uses custom joinSrcs function if one is provided', () => {
    const customJoin = srcs => srcs.join('$');
    const adjusted = maybeAdjustSrc(['z1', 'z2'], 'zsrc', 'heatmap', {
      joinSrcs: customJoin,
    });
    expect(adjusted).toBe('z1$z2');
  });

  it('reduces src to string when just one src element in array', () => {
    const adjusted = maybeAdjustSrc(['z1'], 'zsrc', 'heatmap');
    expect(adjusted).toBe('z1');
  });

  it('reduces src to string for special table case', () => {
    const adjusted = maybeAdjustSrc(['z1'], 'header.valuessrc', 'table');
    expect(adjusted).toBe('z1');
  });
});
