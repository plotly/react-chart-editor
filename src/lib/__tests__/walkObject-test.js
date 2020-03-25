import walkObject, {makeAttrSetterPath} from '../walkObject';

const UNDEF = undefined; // eslint-disable-line

/* eslint-disable no-magic-numbers */
describe('objectUtils', () => {
  describe('walkObject', () => {
    let object;
    let callback;

    beforeEach(() => {
      object = {
        [null]: {ugly: 'code'},
        foo: 'foo',
        bar: 0,
        [10]: {20: 'three'},
        [UNDEF]: {really: {fugly: 'code'}},
        _private: {gasp: 'o__o'},
        public: {_secret: {shock: '*__*'}},
        array: [{}, {}, {}],
      };
      callback = jest.fn();
    });

    it('calls callback with the right args for each key/value pair', () => {
      walkObject(object, callback);

      // The callback should be called for *every* node in the object.
      expect(callback.mock.calls.length).toEqual(15); // eslint-disable-line no-magic-numbers

      // Note that keys for objects come back as strings in JS.
      const expectedCounts = {
        ['']: 8,
        ['10']: 1,
        _private: 1,
        null: 1,
        public: 1,
        ['public._secret']: 1,
        ['undefined']: 1,
        ['undefined.really']: 1,
      };
      const expectedKeys = [
        'null',
        'ugly',
        'foo',
        'bar',
        '10',
        '20',
        'undefined',
        'really',
        'fugly',
        '_private',
        'gasp',
        'public',
        '_secret',
        'shock',
        'array',
      ];
      const actualCounts = {};
      const actualKeys = [];

      callback.mock.calls.forEach((call) => {
        const [key, parent, path] = call;
        const pathString = path.join('.');
        actualCounts[pathString] = (actualCounts[pathString] || 0) + 1;
        actualKeys.push(key);

        // The parent should have the key we're given.
        expect(parent[key]).toBeDefined();
      });

      // We should have been given keys at the expected paths.
      expect(actualCounts).toEqual(expectedCounts);

      // We should get each key *once*.
      expect(actualKeys.length).toEqual(expectedKeys.length);
      expectedKeys.forEach((key) => {
        expect(actualKeys.indexOf(key)).not.toEqual(-1);
      });
    });

    it('does not traverse when the callback returns true', () => {
      // Always return `true`, which tells walkObject not to traverse.
      callback.mockReturnValue(true);

      walkObject(object, callback);

      // The callback should be called only for top-level nodes.
      expect(callback.mock.calls.length).toEqual(8); // eslint-disable-line no-magic-numbers
    });

    it('can be used as a reducer by leveraging a function closure', () => {
      // Use the given cache to keep a count of the node count.
      let count = 0;
      callback.mockImplementation(() => {
        count++;
      });

      walkObject(object, callback);

      // Make sure that the reduction was altered as expected.
      expect(count).toEqual(15); // eslint-disable-line no-magic-numbers
    });

    it('walks into arrays if walkArrays is true', () => {
      walkObject(object, callback, {walkArrays: true});

      // The callback should be called for *every* node in the object.
      expect(callback.mock.calls.length).toEqual(18); // eslint-disable-line no-magic-numbers

      // Note that keys for objects come back as strings in JS.
      const expectedCounts = {
        ['']: 8,
        ['10']: 1,
        _private: 1,
        null: 1,
        public: 1,
        ['public._secret']: 1,
        ['undefined']: 1,
        ['undefined.really']: 1,
        array: 3,
      };
      const expectedKeys = [
        'null',
        'ugly',
        'foo',
        'bar',
        '10',
        '20',
        'undefined',
        'really',
        'fugly',
        '_private',
        'gasp',
        'public',
        '_secret',
        'shock',
        'array',
        '0',
        '1',
        '2',
      ];
      const actualCounts = {};
      const actualKeys = [];

      callback.mock.calls.forEach((call) => {
        const [key, parent, path] = call;
        const pathString = path.join('.');
        actualCounts[pathString] = (actualCounts[pathString] || 0) + 1;
        actualKeys.push(key);

        // The parent should have the key we're given.
        expect(parent[key]).toBeDefined();
      });

      // We should have been given keys at the expected paths.
      expect(actualCounts).toEqual(expectedCounts);

      // We should get each key *once*.
      expect(actualKeys.length).toEqual(expectedKeys.length);
      expectedKeys.forEach((key) => {
        expect(actualKeys.indexOf(key)).not.toEqual(-1);
      });
    });

    it('walks into arrays specified by walkArraysMatchingKeys', () => {
      walkObject(
        [
          {
            type: 'scatter',
            x: [1, 2, 3],
            y: [1, 2, 3],
            transforms: [
              {
                filterId: 'ababab',
                type: 'filter',
                targetsrc: 'hodor:99:aaaaaa',
              },
              {
                filterId: 'bababa',
                type: 'filter',
                targetsrc: 'hodor:99:aaaaaa',
              },
            ],
          },
          {
            z: [
              [1, 2, 3],
              [1, 2, 3],
            ],
            type: 'heatmap',
            transforms: [
              {
                type: 'fit',
              },
              {
                filterId: 'bababa',
                type: 'filter',
                targetsrc: 'hodor:99:aaaaaa',
              },
            ],
          },
        ],
        callback,
        {walkArraysMatchingKeys: ['transforms', 'data']}
      );

      const actualCounts = {};
      const actualKeys = [];

      callback.mock.calls.forEach((call) => {
        const [key, parent, path] = call;
        const pathString = path.join('.');
        actualCounts[pathString] = (actualCounts[pathString] || 0) + 1;
        actualKeys.push(key);

        // The parent should have the key we're given.
        expect(parent[key]).toBeDefined();
      });

      expect(actualCounts).toEqual({
        ['0']: 4,
        ['1']: 3,
        ['']: 2,
        ['0.transforms']: 2,
        ['0.transforms.0']: 3,
        ['0.transforms.1']: 3,
        ['1.transforms']: 2,
        ['1.transforms.0']: 1,
        ['1.transforms.1']: 3,
      });
      expect(actualKeys).toEqual([
        '0',
        'type',
        'x',
        'y',
        'transforms',
        '0',
        'filterId',
        'type',
        'targetsrc',
        '1',
        'filterId',
        'type',
        'targetsrc',
        '1',
        'z',
        'type',
        'transforms',
        '0',
        'type',
        '1',
        'filterId',
        'type',
        'targetsrc',
      ]);
    });

    it('produces nestedProperty style paths', () => {
      walkObject({a: 1, b: [{c: 4}, 2, 3]}, callback, {
        walkArraysMatchingKeys: ['b'],
        pathType: 'nestedProperty',
      });

      let actualPaths = callback.mock.calls.map((args) => args[2]);
      let expectedPaths = ['a', 'b', 'b[0]', 'b[0].c', 'b[1]', 'b[2]'];

      expect(actualPaths).toEqual(expectedPaths);

      callback.mockClear();

      walkObject({[UNDEF]: 1, b: [{c: [{a: 1, d: [{a: 1}]}]}, 2, 3]}, callback, {
        walkArraysMatchingKeys: ['b', 'c'],
        pathType: 'nestedProperty',
      });

      actualPaths = callback.mock.calls.map((args) => args[2]);
      expectedPaths = [
        'undefined',
        'b',
        'b[0]',
        'b[0].c',
        'b[0].c[0]',
        'b[0].c[0].a',
        'b[0].c[0].d',
        'b[1]',
        'b[2]',
      ];

      expect(actualPaths).toEqual(expectedPaths);
    });
  });

  describe('makeAttrSetterPath', () => {
    function test(input, expected) {
      expect(makeAttrSetterPath(input)).toEqual(expected);
    }

    it('creates a basic path', () => {
      test(['foo', 'bar', 3, 'value'], 'foo.bar[3].value');
    });

    it('accepts array index notation', () => {
      test(['foo', 'bar', [3], 'value'], 'foo.bar[3].value');
    });

    it('accepts array index notation with strings', () => {
      test(['foo', 'bar', ['3'], 'value'], 'foo.bar[3].value');
    });

    it('strips _fullData prefix', () => {
      test(['_fullData', 2, 'bar', 3, 'value'], 'bar[3].value');
    });

    it('strips _fullInput prefix', () => {
      test(['_fullData', 2, '_fullInput', 'bar', 3, 'value'], 'bar[3].value');
    });

    it('strips _fullLayout prefix', () => {
      test(['_fullLayout', 'bar', 3, 'value'], 'bar[3].value');
    });
  });
});
