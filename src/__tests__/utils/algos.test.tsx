import React from "react";
import {
  bubbleSort,
  insertionSort,
  selectionSort,
  quickSort,
} from "../../utils/algos";
import { bubbleSortHelper } from "../../utils/algos/bubble-sort";
import { insertionSortHelper } from "../../utils/algos/insertion-sort";
import { selectionSortHelper } from "../../utils/algos/selection-sort";
import { SortDataTypes } from "../../utils/algos/algoTypes";

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
// Compare sum of RGB pixels
const compareAll = (array: Uint8ClampedArray, index: number): number => {
  return array[index] + array[index + 1] + array[index + 2];
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
    expect(testArray).toEqual(new Uint8ClampedArray([0, 0, 0, 0, 1, 0, 0, 0]));
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
    expect(testArray).toEqual(
      new Uint8ClampedArray([0, 10, 10, 10, 1, 9, 9, 9])
    );
  });
  test("sorts three pixels", () => {
    let testArray = new Uint8ClampedArray([2, 8, 8, 8, 3, 7, 7, 7, 1, 9, 9, 9]);
    let sortedCallback = jest.fn();
    const sortPositionStart = testArray.length - pixelIndexLength;
    const endSortPosition = bubbleSort(
      testArray,
      sortedCallback,
      compareFirst,
      sortPositionStart,
      pixelIndexLength
    );
    expect(endSortPosition).toEqual(0);
    expect(testArray).toEqual(
      new Uint8ClampedArray([1, 9, 9, 9, 2, 8, 8, 8, 3, 7, 7, 7])
    );
  });
  test("sorts three pixels with sortPosition as null", () => {
    let testArray = new Uint8ClampedArray([2, 8, 8, 8, 3, 7, 7, 7, 1, 9, 9, 9]);
    let sortedCallback = jest.fn();
    const sortPositionStart = null;
    const endSortPosition = bubbleSort(
      testArray,
      sortedCallback,
      compareFirst,
      sortPositionStart,
      pixelIndexLength
    );
    expect(endSortPosition).toEqual(0);
    expect(testArray).toEqual(
      new Uint8ClampedArray([1, 9, 9, 9, 2, 8, 8, 8, 3, 7, 7, 7])
    );
  });
  test("sorts three digit numbers", () => {
    let testArray = new Uint8ClampedArray([
      128, 200, 200, 200, 256, 300, 300, 300, 56, 100, 100, 100,
    ]);
    let sortedCallback = jest.fn();
    const sortPositionStart = null;
    const endSortPosition = bubbleSort(
      testArray,
      sortedCallback,
      compareFirst,
      sortPositionStart,
      pixelIndexLength
    );
    expect(endSortPosition).toEqual(0);
    expect(testArray).toEqual(
      new Uint8ClampedArray([
        56, 100, 100, 100, 128, 200, 200, 200, 256, 300, 300, 300,
      ])
    );
  });
  test("sort by second pixel value", () => {
    let testArray = new Uint8ClampedArray([8, 2, 8, 8, 7, 3, 7, 7, 9, 1, 9, 9]);
    let sortedCallback = jest.fn();
    const sortPositionStart = null;
    const endSortPosition = bubbleSort(
      testArray,
      sortedCallback,
      compareSecond,
      sortPositionStart,
      pixelIndexLength
    );
    expect(endSortPosition).toEqual(0);
    expect(testArray).toEqual(
      new Uint8ClampedArray([9, 1, 9, 9, 8, 2, 8, 8, 7, 3, 7, 7])
    );
  });
  test("sort by third pixel value", () => {
    let testArray = new Uint8ClampedArray([8, 8, 2, 8, 7, 7, 3, 7, 9, 9, 1, 9]);
    let sortedCallback = jest.fn();
    const sortPositionStart = null;
    const endSortPosition = bubbleSort(
      testArray,
      sortedCallback,
      compareThird,
      sortPositionStart,
      pixelIndexLength
    );
    expect(endSortPosition).toEqual(0);
    expect(testArray).toEqual(
      new Uint8ClampedArray([9, 9, 1, 9, 8, 8, 2, 8, 7, 7, 3, 7])
    );
  });
  test("sort by combined pixel value", () => {
    let testArray = new Uint8ClampedArray([
      8, 7, 6, 5, 12, 11, 10, 9, 4, 3, 2, 1,
    ]);
    let sortedCallback = jest.fn();
    const sortPositionStart = null;
    const endSortPosition = bubbleSort(
      testArray,
      sortedCallback,
      compareAll,
      sortPositionStart,
      pixelIndexLength
    );
    expect(endSortPosition).toEqual(0);
    expect(testArray).toEqual(
      new Uint8ClampedArray([4, 3, 2, 1, 8, 7, 6, 5, 12, 11, 10, 9])
    );
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
    expect(testArray).toEqual(new Uint8ClampedArray([0, 0, 0, 0, 1, 0, 0, 0]));
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
    expect(testArray).toEqual(
      new Uint8ClampedArray([0, 10, 10, 10, 1, 9, 9, 9])
    );
  });
  test("sorts three pixels", () => {
    let testArray = new Uint8ClampedArray([2, 8, 8, 8, 3, 7, 7, 7, 1, 9, 9, 9]);
    let sortedCallback = jest.fn();
    const endSortPosition = insertionSort(
      testArray,
      sortedCallback,
      compareFirst,
      sortPositionStart,
      pixelIndexLength
    );
    expect(endSortPosition).toEqual(testArray.length);
    expect(testArray).toEqual(
      new Uint8ClampedArray([1, 9, 9, 9, 2, 8, 8, 8, 3, 7, 7, 7])
    );
  });
  test("sorts three pixels with sortPosition as null", () => {
    let testArray = new Uint8ClampedArray([2, 8, 8, 8, 3, 7, 7, 7, 1, 9, 9, 9]);
    let sortedCallback = jest.fn();
    const sortPositionStart = null;
    const endSortPosition = insertionSort(
      testArray,
      sortedCallback,
      compareFirst,
      sortPositionStart,
      pixelIndexLength
    );
    expect(endSortPosition).toEqual(testArray.length);
    expect(testArray).toEqual(
      new Uint8ClampedArray([1, 9, 9, 9, 2, 8, 8, 8, 3, 7, 7, 7])
    );
  });
  test("sorts three digit numbers", () => {
    let testArray = new Uint8ClampedArray([
      128, 200, 200, 200, 256, 300, 300, 300, 56, 100, 100, 100,
    ]);
    let sortedCallback = jest.fn();
    const sortPositionStart = null;
    const endSortPosition = insertionSort(
      testArray,
      sortedCallback,
      compareFirst,
      sortPositionStart,
      pixelIndexLength
    );
    expect(endSortPosition).toEqual(testArray.length);
    expect(testArray).toEqual(
      new Uint8ClampedArray([
        56, 100, 100, 100, 128, 200, 200, 200, 256, 300, 300, 300,
      ])
    );
  });
  test("sort by second pixel value", () => {
    let testArray = new Uint8ClampedArray([8, 2, 8, 8, 7, 3, 7, 7, 9, 1, 9, 9]);
    let sortedCallback = jest.fn();
    const sortPositionStart = null;
    const endSortPosition = insertionSort(
      testArray,
      sortedCallback,
      compareSecond,
      sortPositionStart,
      pixelIndexLength
    );
    expect(endSortPosition).toEqual(testArray.length);
    expect(testArray).toEqual(
      new Uint8ClampedArray([9, 1, 9, 9, 8, 2, 8, 8, 7, 3, 7, 7])
    );
  });
  test("sort by third pixel value", () => {
    let testArray = new Uint8ClampedArray([8, 8, 2, 8, 7, 7, 3, 7, 9, 9, 1, 9]);
    let sortedCallback = jest.fn();
    const sortPositionStart = null;
    const endSortPosition = insertionSort(
      testArray,
      sortedCallback,
      compareThird,
      sortPositionStart,
      pixelIndexLength
    );
    expect(endSortPosition).toEqual(testArray.length);
    expect(testArray).toEqual(
      new Uint8ClampedArray([9, 9, 1, 9, 8, 8, 2, 8, 7, 7, 3, 7])
    );
  });
  test("sort by combined pixel value", () => {
    let testArray = new Uint8ClampedArray([
      8, 7, 6, 5, 12, 11, 10, 9, 4, 3, 2, 1,
    ]);
    let sortedCallback = jest.fn();
    const sortPositionStart = null;
    const endSortPosition = insertionSort(
      testArray,
      sortedCallback,
      compareAll,
      sortPositionStart,
      pixelIndexLength
    );
    expect(endSortPosition).toEqual(testArray.length);
    expect(testArray).toEqual(
      new Uint8ClampedArray([4, 3, 2, 1, 8, 7, 6, 5, 12, 11, 10, 9])
    );
  });
});

describe("Selection sort tests", () => {
  const sortPositionStart = 0;
  test("sort helper sorts two pixels based on red value (first of 4)", () => {
    let testArray = new Uint8ClampedArray([1, 0, 0, 0, 0, 0, 0, 0]);
    const endSortPosition = selectionSortHelper(
      testArray,
      compareFirst,
      sortPositionStart,
      pixelIndexLength
    );
    expect(endSortPosition).toEqual(pixelIndexLength);
    expect(testArray).toEqual(new Uint8ClampedArray([0, 0, 0, 0, 1, 0, 0, 0]));
  });
  test("sort helper sorts remaining 3 pixel values as well as selected", () => {
    let testArray = new Uint8ClampedArray([1, 9, 9, 9, 0, 10, 10, 10]);
    const endSortPosition = selectionSortHelper(
      testArray,
      compareFirst,
      sortPositionStart,
      pixelIndexLength
    );
    expect(endSortPosition).toEqual(pixelIndexLength);
    expect(testArray).toEqual(
      new Uint8ClampedArray([0, 10, 10, 10, 1, 9, 9, 9])
    );
  });
  test("sorts three pixels", () => {
    let testArray = new Uint8ClampedArray([2, 8, 8, 8, 3, 7, 7, 7, 1, 9, 9, 9]);
    let sortedCallback = jest.fn();
    const endSortPosition = selectionSort(
      testArray,
      sortedCallback,
      compareFirst,
      sortPositionStart,
      pixelIndexLength
    );
    expect(endSortPosition).toEqual(testArray.length);
    expect(testArray).toEqual(
      new Uint8ClampedArray([1, 9, 9, 9, 2, 8, 8, 8, 3, 7, 7, 7])
    );
  });
  test("sorts three pixels with sortPosition as null", () => {
    let testArray = new Uint8ClampedArray([2, 8, 8, 8, 3, 7, 7, 7, 1, 9, 9, 9]);
    let sortedCallback = jest.fn();
    const sortPositionStart = null;
    const endSortPosition = selectionSort(
      testArray,
      sortedCallback,
      compareFirst,
      sortPositionStart,
      pixelIndexLength
    );
    expect(endSortPosition).toEqual(testArray.length);
    expect(testArray).toEqual(
      new Uint8ClampedArray([1, 9, 9, 9, 2, 8, 8, 8, 3, 7, 7, 7])
    );
  });
  test("sorts three digit numbers", () => {
    let testArray = new Uint8ClampedArray([
      128, 200, 200, 200, 256, 300, 300, 300, 56, 100, 100, 100,
    ]);
    let sortedCallback = jest.fn();
    const sortPositionStart = null;
    const endSortPosition = selectionSort(
      testArray,
      sortedCallback,
      compareFirst,
      sortPositionStart,
      pixelIndexLength
    );
    expect(endSortPosition).toEqual(testArray.length);
    expect(testArray).toEqual(
      new Uint8ClampedArray([
        56, 100, 100, 100, 128, 200, 200, 200, 256, 300, 300, 300,
      ])
    );
  });
  test("sort by second pixel value", () => {
    let testArray = new Uint8ClampedArray([8, 2, 8, 8, 7, 3, 7, 7, 9, 1, 9, 9]);
    let sortedCallback = jest.fn();
    const sortPositionStart = null;
    const endSortPosition = selectionSort(
      testArray,
      sortedCallback,
      compareSecond,
      sortPositionStart,
      pixelIndexLength
    );
    expect(endSortPosition).toEqual(testArray.length);
    expect(testArray).toEqual(
      new Uint8ClampedArray([9, 1, 9, 9, 8, 2, 8, 8, 7, 3, 7, 7])
    );
  });
  test("sort by third pixel value", () => {
    let testArray = new Uint8ClampedArray([8, 8, 2, 8, 7, 7, 3, 7, 9, 9, 1, 9]);
    let sortedCallback = jest.fn();
    const sortPositionStart = null;
    const endSortPosition = selectionSort(
      testArray,
      sortedCallback,
      compareThird,
      sortPositionStart,
      pixelIndexLength
    );
    expect(endSortPosition).toEqual(testArray.length);
    expect(testArray).toEqual(
      new Uint8ClampedArray([9, 9, 1, 9, 8, 8, 2, 8, 7, 7, 3, 7])
    );
  });
  test("sort by combined pixel value", () => {
    let testArray = new Uint8ClampedArray([
      8, 7, 6, 5, 12, 11, 10, 9, 4, 3, 2, 1,
    ]);
    let sortedCallback = jest.fn();
    const sortPositionStart = null;
    const endSortPosition = selectionSort(
      testArray,
      sortedCallback,
      compareAll,
      sortPositionStart,
      pixelIndexLength
    );
    expect(endSortPosition).toEqual(testArray.length);
    expect(testArray).toEqual(
      new Uint8ClampedArray([4, 3, 2, 1, 8, 7, 6, 5, 12, 11, 10, 9])
    );
  });
});

describe("Quick sort tests", () => {
  let testSortPosition: null | SortDataTypes = null;
  // test("sort helper sorts two pixels based on red value (first of 4)", () => {
  //   let testArray = new Uint8ClampedArray([1, 0, 0, 0, 0, 0, 0, 0]);
  //   const startIdx = 0;
  //   const endIdx = testArray.length;
  //   const endSortPosition = quickSortHelper(
  //     testArray,
  //     compareFirst,
  //     pixelIndexLength,
  //     startIdx,
  //     endIdx
  //   );
  //   expect(testArray).toEqual(new Uint8ClampedArray([0,0,0,0,1,0,0,0]))
  // });
  // test("sort helper sorts remaining 3 pixel values as well as selected", () => {
  //   let testArray = new Uint8ClampedArray([1, 9, 9, 9, 0, 10, 10, 10]);
  //   const startIdx = 0;
  //   const endIdx = testArray.length;
  //   const endSortPosition = quickSortHelper(
  //     testArray,
  //     compareFirst,
  //     pixelIndexLength,
  //     startIdx,
  //     endIdx
  //   );
  //   expect(testArray).toEqual(new Uint8ClampedArray([0,10,10,10,1,9,9,9]))
  // });

  test("sorts three pixels", () => {
    let testArray = new Uint8ClampedArray([2, 8, 8, 8, 3, 7, 7, 7, 1, 9, 9, 9]);
    let sortedCallback = jest.fn();
    const endSortPosition = quickSort(
      testArray,
      sortedCallback,
      compareFirst,
      testSortPosition,
      pixelIndexLength
    );
    expect(testArray).toEqual(
      new Uint8ClampedArray([1, 9, 9, 9, 2, 8, 8, 8, 3, 7, 7, 7])
    );
  });
  test("sorts three pixels with sortPosition as null", () => {
    let testArray = new Uint8ClampedArray([2, 8, 8, 8, 3, 7, 7, 7, 1, 9, 9, 9]);
    let sortedCallback = jest.fn();
    const sortPositionStart = null;
    const endSortPosition = quickSort(
      testArray,
      sortedCallback,
      compareFirst,
      testSortPosition,
      pixelIndexLength
    );
    expect(testArray).toEqual(
      new Uint8ClampedArray([1, 9, 9, 9, 2, 8, 8, 8, 3, 7, 7, 7])
    );
  });
  test("sorts three digit numbers", () => {
    let testArray = new Uint8ClampedArray([
      128, 200, 200, 200, 256, 300, 300, 300, 56, 100, 100, 100,
    ]);
    let sortedCallback = jest.fn();
    const sortPositionStart = null;
    const endSortPosition = quickSort(
      testArray,
      sortedCallback,
      compareFirst,
      testSortPosition,
      pixelIndexLength
    );
    expect(testArray).toEqual(
      new Uint8ClampedArray([
        56, 100, 100, 100, 128, 200, 200, 200, 256, 300, 300, 300,
      ])
    );
  });
  test("sort by second pixel value", () => {
    let testArray = new Uint8ClampedArray([8, 2, 8, 8, 7, 3, 7, 7, 9, 1, 9, 9]);
    let sortedCallback = jest.fn();
    const sortPositionStart = null;
    const endSortPosition = quickSort(
      testArray,
      sortedCallback,
      compareSecond,
      testSortPosition,
      pixelIndexLength
    );
    expect(testArray).toEqual(
      new Uint8ClampedArray([9, 1, 9, 9, 8, 2, 8, 8, 7, 3, 7, 7])
    );
  });
  test("sort by third pixel value", () => {
    let testArray = new Uint8ClampedArray([8, 8, 2, 8, 7, 7, 3, 7, 9, 9, 1, 9]);
    let sortedCallback = jest.fn();
    const sortPositionStart = null;
    const endSortPosition = quickSort(
      testArray,
      sortedCallback,
      compareThird,
      testSortPosition,
      pixelIndexLength
    );
    expect(testArray).toEqual(
      new Uint8ClampedArray([9, 9, 1, 9, 8, 8, 2, 8, 7, 7, 3, 7])
    );
  });
  test("sort by combined pixel value", () => {
    let testArray = new Uint8ClampedArray([
      8, 7, 6, 5, 12, 11, 10, 9, 4, 3, 2, 1,
    ]);
    let sortedCallback = jest.fn();
    quickSort(
      testArray,
      sortedCallback,
      compareAll,
      testSortPosition,
      pixelIndexLength
    );
    console.log(">>>", testArray);
    expect(testArray).toEqual(
      new Uint8ClampedArray([4, 3, 2, 1, 8, 7, 6, 5, 12, 11, 10, 9])
    );
  });
});
