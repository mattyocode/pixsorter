import React from "react";
import { bubbleSort, insertionSort } from "../../utils/algos";
import { bubbleSortHelper } from "../../utils/algos/bubble-sort";
import { insertionSortHelper } from "../../utils/algos/insertion-sort";

// ---- Pixel comparison functions ---- //
// Compare red pixel value in RGBA value array
const compareFirst = (array: Uint8ClampedArray, index: number): number => {
  return array[index];
};
// Compare blue pixel value in RGBA value array
const compareSecond = (array: Uint8ClampedArray, index: number): number => {
  return array[index + 1];
};
// Compare green pixel value in RGBA value array
const compareThird = (array: Uint8ClampedArray, index: number): number => {
  return array[index + 2];
};

const pixelIndexLength = 4;

describe("Bubble sort tests", () => {
  test("sort helper sorts two pixels based on red value (first of 4)", () => {
    let testArray = new Uint8ClampedArray([1, 0, 0, 0, 0, 0, 0, 0]);
    const sortPositionStart = testArray.length - pixelIndexLength;
    const endSortPosition = bubbleSortHelper(
      testArray,
      compareFirst,
      sortPositionStart,
      pixelIndexLength
    );
    expect(endSortPosition).toEqual(0);
    expect(testArray).toEqual(new Uint8ClampedArray([0,0,0,0,1,0,0,0]))
  });
  test("sort helper sorts remaining 3 pixel values as well as selected", () => {
    let testArray = new Uint8ClampedArray([1, 9, 9, 9, 0, 10, 10, 10]);
    const sortPositionStart = testArray.length - pixelIndexLength;
    const endSortPosition = bubbleSortHelper(
      testArray,
      compareFirst,
      sortPositionStart,
      pixelIndexLength
    );
    expect(endSortPosition).toEqual(0);
    expect(testArray).toEqual(new Uint8ClampedArray([0,10,10,10,1,9,9,9]))
  });
  test("sorts three pixels", () => {
    let testArray = new Uint8ClampedArray(
      [2, 8, 8, 8, 3, 7, 7, 7, 1, 9, 9, 9]
    );
    let sortedCallback = jest.fn()
    const sortPositionStart = testArray.length - pixelIndexLength;
    const endSortPosition = bubbleSort(
      testArray,
      sortedCallback,
      compareFirst,
      sortPositionStart,
      pixelIndexLength
    );
    expect(endSortPosition).toEqual(0);
    expect(testArray).toEqual(new Uint8ClampedArray(
      [1, 9, 9, 9, 2, 8, 8, 8, 3, 7, 7, 7]
    ))
  });
  test("sorts three pixels without sortPosition provided", () => {
    let testArray = new Uint8ClampedArray(
      [2, 8, 8, 8, 3, 7, 7, 7, 1, 9, 9, 9]
    );
    let sortedCallback = jest.fn()
    const sortPositionStart = null;
    const endSortPosition = bubbleSort(
      testArray,
      sortedCallback,
      compareFirst,
      sortPositionStart,
      pixelIndexLength
    );
    expect(endSortPosition).toEqual(0);
    expect(testArray).toEqual(new Uint8ClampedArray(
      [1, 9, 9, 9, 2, 8, 8, 8, 3, 7, 7, 7]
    ))
  });
  test("sorts three digit numbers", () => {
    let testArray = new Uint8ClampedArray(
      [128, 200, 200, 200, 256, 300, 300, 300, 56, 100, 100, 100]
    );
    let sortedCallback = jest.fn()
    const sortPositionStart = null;
    const endSortPosition = bubbleSort(
      testArray,
      sortedCallback,
      compareFirst,
      sortPositionStart,
      pixelIndexLength
    );
    expect(endSortPosition).toEqual(0);
    expect(testArray).toEqual(new Uint8ClampedArray(
      [56, 100, 100, 100, 128, 200, 200, 200, 256, 300, 300, 300]
    ))
  });
  test("sort by second pixel value", () => {
    let testArray = new Uint8ClampedArray(
      [8, 2, 8, 8, 7, 3, 7, 7, 9, 1, 9, 9]
    );
    let sortedCallback = jest.fn()
    const sortPositionStart = null;
    const endSortPosition = bubbleSort(
      testArray,
      sortedCallback,
      compareSecond,
      sortPositionStart,
      pixelIndexLength
    );
    expect(endSortPosition).toEqual(0);
    expect(testArray).toEqual(new Uint8ClampedArray(
      [9, 1, 9, 9, 8, 2, 8, 8, 7, 3, 7, 7]
    ))
  });
});

describe("Insertion sort tests", () => {
  const sortPositionStart = pixelIndexLength;
  test("sort helper sorts two pixels based on red value (first of 4)", () => {
    let testArray = new Uint8ClampedArray([1, 0, 0, 0, 0, 0, 0, 0]);
    const endSortPosition = insertionSortHelper(
      testArray,
      compareFirst,
      sortPositionStart,
      pixelIndexLength
    );
    expect(endSortPosition).toEqual(testArray.length);
    expect(testArray).toEqual(new Uint8ClampedArray([0,0,0,0,1,0,0,0]))
  });
  test("sort helper sorts remaining 3 pixel values as well as selected", () => {
    let testArray = new Uint8ClampedArray([1, 9, 9, 9, 0, 10, 10, 10]);
    const endSortPosition = insertionSortHelper(
      testArray,
      compareFirst,
      sortPositionStart,
      pixelIndexLength
    );
    expect(endSortPosition).toEqual(testArray.length);
    expect(testArray).toEqual(new Uint8ClampedArray([0,10,10,10,1,9,9,9]))
  });
  test("sorts three pixels", () => {
    let testArray = new Uint8ClampedArray(
      [2, 8, 8, 8, 3, 7, 7, 7, 1, 9, 9, 9]
    );
    let sortedCallback = jest.fn()
    const endSortPosition = insertionSort(
      testArray,
      sortedCallback,
      compareFirst,
      sortPositionStart,
      pixelIndexLength
    );
    expect(endSortPosition).toEqual(testArray.length);
    expect(testArray).toEqual(new Uint8ClampedArray(
      [1, 9, 9, 9, 2, 8, 8, 8, 3, 7, 7, 7]
    ))
  });
  test("sorts three pixels without sortPosition provided", () => {
    let testArray = new Uint8ClampedArray(
      [2, 8, 8, 8, 3, 7, 7, 7, 1, 9, 9, 9]
    );
    let sortedCallback = jest.fn()
    const sortPositionStart = null;
    const endSortPosition = insertionSort(
      testArray,
      sortedCallback,
      compareFirst,
      sortPositionStart,
      pixelIndexLength
    );
    expect(endSortPosition).toEqual(testArray.length);
    expect(testArray).toEqual(new Uint8ClampedArray(
      [1, 9, 9, 9, 2, 8, 8, 8, 3, 7, 7, 7]
    ))
  });
  test("sorts three digit numbers", () => {
    let testArray = new Uint8ClampedArray(
      [128, 200, 200, 200, 256, 300, 300, 300, 56, 100, 100, 100]
    );
    let sortedCallback = jest.fn()
    const sortPositionStart = null;
    const endSortPosition = insertionSort(
      testArray,
      sortedCallback,
      compareFirst,
      sortPositionStart,
      pixelIndexLength
    );
    expect(endSortPosition).toEqual(testArray.length);
    expect(testArray).toEqual(new Uint8ClampedArray(
      [56, 100, 100, 100, 128, 200, 200, 200, 256, 300, 300, 300]
    ))
  });
  test("sort by second pixel value", () => {
    let testArray = new Uint8ClampedArray(
      [8, 2, 8, 8, 7, 3, 7, 7, 9, 1, 9, 9]
    );
    let sortedCallback = jest.fn()
    const sortPositionStart = null;
    const endSortPosition = insertionSort(
      testArray,
      sortedCallback,
      compareSecond,
      sortPositionStart,
      pixelIndexLength
    );
    expect(endSortPosition).toEqual(testArray.length);
    expect(testArray).toEqual(new Uint8ClampedArray(
      [9, 1, 9, 9, 8, 2, 8, 8, 7, 3, 7, 7]
    ))
  });
});
