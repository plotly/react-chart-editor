import dereference from '../dereference';

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
});
