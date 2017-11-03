const {findAttrs} = require('../find-attrs');

describe('findAttrs', function() {
  it('recurses', function() {
    expect(
      findAttrs(
        {
          xrsc: 'asdf',
          x: 5,
          marker: {
            sizesrc: 'foo',
            color: 'red',
          },
          transforms: [
            {
              type: 'groupby',
              targetsrc: 'bar',
              groups: [1, 2, 3, 4, 5],
            },
          ],
        },
        /src$/
      )
    ).toEqual(['marker.sizesrc', 'transforms[0].targetsrc']);
  });
});
