import { Dispatch, SetStateAction } from "react";
import swap from "./pixel-swap";

export const bubbleSortHelper = (
  array: Uint8ClampedArray,
  compare: (array: Uint8ClampedArray, index: number) => number,
  sortPosition: number,
  pixelIdxLength: number,
): number => {
  for (let j = 0; j < sortPosition; j += pixelIdxLength) {
    if (compare(array, j) > compare(array, j + pixelIdxLength)) {
      swap(j, j + pixelIdxLength, array);
    }
  }
  return sortPosition -= pixelIdxLength;
};

const bubbleSort = (
  array: Uint8ClampedArray,
  sortedCallback: () => void,
  compare: (array: Uint8ClampedArray, index: number) => number,
  sortPosition: number | null,
  pixelIdxLength: number = 4,
  renderLoops: number = 150
): {
  sortPosition: number,
  array: Uint8ClampedArray,
} => {
  if (!sortPosition) {
    // starting on the red pixel value at the end of the array
    sortPosition = array.length - (pixelIdxLength);
  }
  for (let i = 0; i < renderLoops; i++) {
    if (sortPosition <= pixelIdxLength) {
      sortedCallback();
      break;
    }
    sortPosition = bubbleSortHelper(
      array, compare, sortPosition, pixelIdxLength
    )
  }
  return {
    sortPosition, array
  }
};

export default bubbleSort;
