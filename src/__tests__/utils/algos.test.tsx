import React from "react";
import { bubbleSortHelper } from "../../utils/algos/bubble-sort";

describe("Bubble sort tests", () => {
  const pixelIndexLength = 4;
  // compare red pixel value in RGBA value array
  const compareFirst = (array: Uint8ClampedArray, index: number): number => {
    return array[0];
  };
  test("sorts two subarrays but 0th value", () => {
    const testArray = new Uint8ClampedArray([1, 0, 0, 0, 0, 0, 0, 0]);
    const sortPositionStart = 4;
    const endSortPosition = bubbleSortHelper(
      testArray,
      compareFirst,
      sortPositionStart,
      pixelIndexLength
    );
    expect(endSortPosition).toEqual(0);
  });
});
