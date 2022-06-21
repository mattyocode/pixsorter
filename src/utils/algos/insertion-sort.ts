import { Dispatch, SetStateAction } from "react";
import swap from "./pixel-swap";


const insertionSortHelper = (
  sortPosition: number,
  array: Uint8ClampedArray,
  compare: (array: Uint8ClampedArray, index: number) => number,
  pixelIdxLength: number,
) => {
  let j = sortPosition;
  while (j > 0 && compare(array, j) < compare(array, j - pixelIdxLength)) {
    swap(j, j - pixelIdxLength, array);
    j -= pixelIdxLength;
  }
  return sortPosition += pixelIdxLength;
}

const insertionSort = (
  array: Uint8ClampedArray,
  sortedCallback: () => void,
  compare: (array: Uint8ClampedArray, index: number) => number,
  sortPosition: number | null = null,
  setSortPosition: Dispatch<SetStateAction<number | null>>,
  pixelIdxLength: number = 4,
  renderLoops: number = 100
): Uint8ClampedArray => {
  if (!sortPosition) {
    setSortPosition(pixelIdxLength);
  } else {
    for (let i = 0; i < renderLoops; i++) {
      if (sortPosition >= array.length) {
        sortedCallback();
        break;
      }
      sortPosition = insertionSortHelper(
        sortPosition,
        array,
        compare,
        pixelIdxLength,
      )
    }
    setSortPosition(sortPosition);
  }
  return array;
};

export default insertionSort;
