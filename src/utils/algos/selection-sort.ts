import swap from "./pixel-swap";
import { SortAlgoTypes } from "./algoTypes";

export const selectionSortHelper = (
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

const selectionSort: SortAlgoTypes = (
  array,
  sortedCallback,
  compare,
  sortPosition,
  pixelIdxLength = 4,
  renderLoops = 50
) => {
  sortPosition = typeof sortPosition === "number" ? sortPosition : 0;
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
