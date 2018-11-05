import sortMenu from '../sortMenu';

describe('sortMenu', () => {
  it('modifies original array to follow the group, then name order provided', () => {
    const initialArray = [
      {props: {group: 'DEV', name: 'Inspector'}},
      {props: {group: 'DEV', name: 'JSON'}},
    ];
    const orderProp = [{group: 'DEV', name: 'JSON'}, {group: 'DEV', name: 'Inspector'}];

    sortMenu(initialArray, orderProp);
    expect(initialArray).toEqual([
      {props: {group: 'DEV', name: 'JSON'}},
      {props: {group: 'DEV', name: 'Inspector'}},
    ]);
  });

  it('sorts the array by group, then by name', () => {
    const initialArray = [
      {props: {group: 'Structure', name: 'Create'}},
      {props: {group: 'Structure', name: 'Subplots'}},
      {props: {group: 'Style', name: 'Color Bars'}},
      {props: {group: 'Style', name: 'Annotation'}},
      {props: {group: 'DEV', name: 'Inspector'}},
      {props: {group: 'DEV', name: 'JSON'}},
    ];
    const orderProp = [
      {group: 'DEV', name: 'JSON'},
      {group: 'DEV', name: 'Inspector'},
      {group: 'Structure', name: 'Subplots'},
      {group: 'Structure', name: 'Create'},
      {group: 'Style', name: 'Color Bars'},
      {group: 'Style', name: 'Annotation'},
    ];

    sortMenu(initialArray, orderProp);
    expect(initialArray).toEqual([
      {props: {group: 'DEV', name: 'JSON'}},
      {props: {group: 'DEV', name: 'Inspector'}},
      {props: {group: 'Structure', name: 'Subplots'}},
      {props: {group: 'Structure', name: 'Create'}},
      {props: {group: 'Style', name: 'Color Bars'}},
      {props: {group: 'Style', name: 'Annotation'}},
    ]);
  });

  it('puts not mentionned panels to the bottom of list and sorts alphabetically', () => {
    const initialArray = [
      {props: {group: 'DEV', name: 'JSON'}},
      {props: {group: 'DEV', name: 'Inspector'}},
      {props: {group: 'Structure', name: 'Create'}},
      {props: {group: 'Structure', name: 'Subplots'}},
      {props: {group: 'Style', name: 'Color Bars'}},
      {props: {group: 'Style', name: 'Annotation'}},
    ];
    const orderProp = [
      {group: 'Structure', name: 'Subplots'},
      {group: 'Structure', name: 'Create'},
      {group: 'Style', name: 'Color Bars'},
      {group: 'Style', name: 'Annotation'},
    ];

    sortMenu(initialArray, orderProp);
    expect(initialArray).toEqual([
      {props: {group: 'Structure', name: 'Subplots'}},
      {props: {group: 'Structure', name: 'Create'}},
      {props: {group: 'Style', name: 'Color Bars'}},
      {props: {group: 'Style', name: 'Annotation'}},
      {props: {group: 'DEV', name: 'Inspector'}},
      {props: {group: 'DEV', name: 'JSON'}},
    ]);
  });

  it('orders not mentionned subpanels at the end, alphabetically', () => {
    const initialArray = [
      {props: {group: 'Style', name: 'General'}},
      {props: {group: 'Style', name: 'Traces'}},
      {props: {group: 'Style', name: 'Axes'}},
      {props: {group: 'Structure', name: 'Create'}},
    ];
    const orderProp = [{group: 'Style', name: 'Traces'}];

    sortMenu(initialArray, orderProp);
    expect(initialArray).toEqual([
      {props: {group: 'Style', name: 'Traces'}},
      {props: {group: 'Style', name: 'Axes'}},
      {props: {group: 'Style', name: 'General'}},
      {props: {group: 'Structure', name: 'Create'}},
    ]);
  });

  it('ignores non existent panel groups', () => {
    const initialArray = [
      {props: {group: 'Structure', name: 'Create'}},
      {props: {group: 'Structure', name: 'Subplots'}},
      {props: {group: 'Style', name: 'Color Bars'}},
      {props: {group: 'Style', name: 'Annotation'}},
    ];

    const orderProp = [
      {group: 'Non Existent', name: 'Subplots'},
      {group: 'Structure', name: 'Create'},
      {group: 'Style', name: 'Color Bars'},
      {group: 'Style', name: 'Annotation'},
    ];

    sortMenu(initialArray, orderProp);
    expect(initialArray).toEqual([
      {props: {group: 'Structure', name: 'Create'}},
      {props: {group: 'Structure', name: 'Subplots'}},
      {props: {group: 'Style', name: 'Color Bars'}},
      {props: {group: 'Style', name: 'Annotation'}},
    ]);
  });

  it('ignores non existent panel names', () => {
    const initialArray = [
      {props: {group: 'Structure', name: 'Subplots'}},
      {props: {group: 'Structure', name: 'Create'}},
      {props: {group: 'Style', name: 'Color Bars'}},
      {props: {group: 'Style', name: 'Annotation'}},
    ];

    const orderProp = [
      {group: 'Structure', name: 'Non Existent'},
      {group: 'Style', name: 'Color Bars'},
      {group: 'Style', name: 'Annotation'},
    ];

    sortMenu(initialArray, orderProp);
    expect(initialArray).toEqual([
      {props: {group: 'Style', name: 'Color Bars'}},
      {props: {group: 'Style', name: 'Annotation'}},
      {props: {group: 'Structure', name: 'Create'}},
      {props: {group: 'Structure', name: 'Subplots'}},
    ]);
  });

  it('ignores invalid combinations', () => {
    const initialArray = [
      {props: {group: 'Structure', name: 'Subplots'}},
      {props: {group: 'Structure', name: 'Create'}},
      {props: {group: 'Style', name: 'Color Bars'}},
      {props: {group: 'Style', name: 'Annotation'}},
    ];

    const orderProp = [
      {group: 'Structure', name: 'Annotation'},
      {group: 'Style', name: 'Color Bars'},
      {group: 'Style', name: 'Annotation'},
    ];

    sortMenu(initialArray, orderProp);
    expect(initialArray).toEqual([
      {props: {group: 'Style', name: 'Color Bars'}},
      {props: {group: 'Style', name: 'Annotation'}},
      {props: {group: 'Structure', name: 'Create'}},
      {props: {group: 'Structure', name: 'Subplots'}},
    ]);
  });
});
