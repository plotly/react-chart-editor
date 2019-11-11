import {maybeTransposeData} from '../index';
/* eslint-disable no-magic-numbers */
describe('maybeTransposeData', () => {
  it('transposes 2d data for row based traceTypes', () => {
    const transposed = maybeTransposeData(
      [
        [1, 2, 3],
        [4, 5, 6],
      ],
      'zsrc',
      'heatmap'
    );

    // [[1, 4], [2, 5], [3, 6]]
    expect(transposed.length).toBe(3);
  });

  it('transposes 1d data for row based traceTypes', () => {
    const transposed = maybeTransposeData([1, 2, 3], 'zsrc', 'heatmap');

    // [[1], [2], [3]]
    expect(transposed.length).toBe(3);
  });

  it('does not transpose data for column based traceTypes', () => {
    const transposed = maybeTransposeData(
      [
        [1, 2, 3],
        [4, 5, 6],
      ],
      'header.valuessrc',
      'table'
    );

    // [[1, 2, 3], [4, 5, 6]]
    expect(transposed.length).toBe(2);
  });

  it('removes extra array wrapping for special cases in tables', () => {
    const transposed = maybeTransposeData([[1, 2, 3]], 'header.valuessrc', 'table');

    // [1, 2, 3]
    expect(Array.isArray(transposed[0])).toBe(false);
    expect(transposed.length).toBe(3);
  });
});
