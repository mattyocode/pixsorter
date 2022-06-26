import { Dispatch, SetStateAction } from "react";
import swap from "./pixel-swap";

const selectionSortHelper = (
  array: Uint8ClampedArray,
  compare: (array: Uint8ClampedArray, index: number) => number,
  sortPosition: number,
  pixelIdxLength: number
) => {
  let minIdx = sortPosition;
  for (let j = sortPosition; j < array.length; j += pixelIdxLength) {
    if (compare(array, j) < compare(array, minIdx)) {
      minIdx = j;
    }
  }
  swap(sortPosition, minIdx, array);
  return (sortPosition += pixelIdxLength);
};

const selectionSort = (
  array: Uint8ClampedArray,
  sortedCallback: () => void,
  compare: (array: Uint8ClampedArray, index: number) => number,
  sortPosition: number = 0,
  pixelIdxLength: number = 4,
  renderLoops: number = 150
) => {
  // if (sortPosition == null) {
  //   sortPosition = 0;
  // }
  for (let i = 0; i < renderLoops; i++) {
    if (sortPosition >= array.length) {
      sortedCallback();
      break;
    }
    sortPosition = selectionSortHelper(
      array,
      compare,
      sortPosition,
      pixelIdxLength
    );
  }
  return sortPosition;
};

export default selectionSort;
