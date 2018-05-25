import dereference from '../dereference';
/* eslint-disable no-magic-numbers */
describe('dereference', () => {
  it('does not search into data arrays', () => {
    const container = [{y: [{ysrc: 'x1'}], xsrc: 'x1'}];
    dereference(container, {x1: [1, 2, 3]});

    expect(container[0].y[0].y).toBeUndefined();
    expect(Array.isArray(container[0].x)).toBe(true);
  });

  it('does searches into transform arrays', () => {
    const container = [{transforms: [{ysrc: 'x1'}], xsrc: 'x1'}];
    dereference(container, {x1: [1, 2, 3]});

    expect(Array.isArray(container[0].transforms[0].y)).toBe(true);
    expect(Array.isArray(container[0].x)).toBe(true);
  });

  it('handles multidimensional srcs correctly', () => {
    const container = [{zsrc: ['z1', 'z2'], type: 'heatmap'}];
    dereference(container, {z1: [1, 2, 3], z2: [2, 2, 2]});

    // contents should have been transposed
    expect(Array.isArray(container[0].z[0])).toBe(true);
    expect(Array.isArray(container[0].z[1])).toBe(true);
    expect(Array.isArray(container[0].z[2])).toBe(true);

    expect(container[0].z[0][0]).toBe(1);
    expect(container[0].z[0][1]).toBe(2);
    expect(container[0].z[1][0]).toBe(2);
    expect(container[0].z[1][1]).toBe(2);
    expect(container[0].z[2][0]).toBe(3);
    expect(container[0].z[2][1]).toBe(2);
  });

  it('handles ambiguous 2d srcs correctly', () => {
    const container = [{zsrc: ['z1'], type: 'heatmap'}];
    dereference(container, {z1: [1, 2, 3]});

    // contents should have been transposed
    expect(Array.isArray(container[0].z[0])).toBe(true);
    expect(Array.isArray(container[0].z[1])).toBe(true);
    expect(Array.isArray(container[0].z[2])).toBe(true);

    expect(container[0].z[0][0]).toBe(1);
    expect(container[0].z[1][0]).toBe(2);
    expect(container[0].z[2][0]).toBe(3);
  });

  it('uses custom function if provided in config', () => {
    const customParsing = src => src.split(',');
    const container = [{zsrc: 'z1,z2', type: 'heatmap'}];
    dereference(
      container,
      {z1: [1, 2, 3], z2: [2, 2, 2]},
      {toSrc: customParsing}
    );

    // contents should have been transposed
    expect(Array.isArray(container[0].z[0])).toBe(true);
    expect(Array.isArray(container[0].z[1])).toBe(true);
    expect(Array.isArray(container[0].z[2])).toBe(true);

    expect(container[0].z[0][0]).toBe(1);
    expect(container[0].z[0][1]).toBe(2);
    expect(container[0].z[1][0]).toBe(2);
    expect(container[0].z[1][1]).toBe(2);
    expect(container[0].z[2][0]).toBe(3);
    expect(container[0].z[2][1]).toBe(2);
  });
});
