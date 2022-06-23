import React from "react";
import { bubbleSortHelper } from "../../utils/algos/bubble-sort";

describe("Bubble sort tests", () => {
  const pixelIndexLength = 4;
  // compare red pixel value in RGBA value array
  const compareFirst = (array: Uint8ClampedArray, index: number): number => {
    return array[index];
  };
  test("sorts two pixels based on red value (first of 4)", () => {
    let testArray = new Uint8ClampedArray([1, 0, 0, 0, 0, 0, 0, 0]);
    const sortPositionStart = testArray.length;
    const endSortPosition = bubbleSortHelper(
      testArray,
      compareFirst,
      sortPositionStart,
      pixelIndexLength
    );
    expect(endSortPosition).toEqual(0);
    expect(testArray).toEqual(new Uint8ClampedArray([0,0,0,0,1,0,0,0]))
  });
  test("sorts remaining pixel values as well as selected (RGBA all move)", () => {
    let testArray = new Uint8ClampedArray([1, 7, 7, 7, 0, 8, 8, 8]);
    const sortPositionStart = testArray.length;
    const endSortPosition = bubbleSortHelper(
      testArray,
      compareFirst,
      sortPositionStart,
      pixelIndexLength
    );
    expect(endSortPosition).toEqual(0);
    expect(testArray).toEqual(new Uint8ClampedArray([0,8,8,8,1,7,7,7]))
  });
  test("sorts three pixels", () => {
    let testArray = new Uint8ClampedArray(
      [2, 0, 0, 0, 3, 0, 0, 0, 1, 0, 0, 0]
    );
    const sortPositionStart = testArray.length;
    const endSortPosition = bubbleSortHelper(
      testArray,
      compareFirst,
      sortPositionStart,
      pixelIndexLength
    );
    expect(endSortPosition).toEqual(0);
    expect(testArray).toEqual(new Uint8ClampedArray([0,0,0,0,1,0,0,0]))
  });
});
