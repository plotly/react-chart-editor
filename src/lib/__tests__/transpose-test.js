import {transpose} from '../index';
/* eslint-disable no-magic-numbers */
describe('transpose', () => {
  it('correctly transposes 1d arrays', () => {
    const originalArray = [1, 2, 3];
    const transposedArray = transpose(originalArray);

    expect(transposedArray.length).toBe(3);

    transposedArray.forEach(subArray => {
      expect(Array.isArray(subArray)).toBe(true);
      expect(subArray.length).toBe(1);
    });

    expect(transposedArray[0][0]).toBe(1);
    expect(transposedArray[1][0]).toBe(2);
    expect(transposedArray[2][0]).toBe(3);
  });

  it('correctly transposes 2d arrays', () => {
    const originalArray = [[1, 2, 3], [9, 8, 7]];
    const transposedArray = transpose(originalArray);

    expect(transposedArray.length).toBe(3);
    transposedArray.forEach(subArray => {
      expect(Array.isArray(subArray)).toBe(true);
      expect(subArray.length).toBe(2);
    });

    expect(transposedArray[0][0]).toBe(1);
    expect(transposedArray[0][1]).toBe(9);
    expect(transposedArray[1][0]).toBe(2);
    expect(transposedArray[1][1]).toBe(8);
    expect(transposedArray[2][0]).toBe(3);
    expect(transposedArray[2][1]).toBe(7);
  });

  it('correctly fills non symmetrical 2d arrays', () => {
    const originalArray = [[1, 2], [9, 8, 7]];
    const transposedArray = transpose(originalArray);

    expect(transposedArray.length).toBe(3);
    transposedArray.forEach(subArray => {
      expect(Array.isArray(subArray)).toBe(true);
      expect(subArray.length).toBe(2);
    });

    expect(transposedArray[0][0]).toBe(1);
    expect(transposedArray[0][1]).toBe(9);
    expect(transposedArray[1][0]).toBe(2);
    expect(transposedArray[1][1]).toBe(8);
    expect(transposedArray[2][0]).toBe(null);
    expect(transposedArray[2][1]).toBe(7);
  });
});
