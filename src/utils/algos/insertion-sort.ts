import swap from "./pixel-swap";
import { SortAlgoTypes } from "./algoTypes";
import { compareFnTypes } from "./pixel-comparison";

export const insertionSortHelper = (
  array: Uint8ClampedArray,
  compare: compareFnTypes,
  sortPosition: number,
  pixelIdxLength: number
) => {
  let j = sortPosition;
  while (j > 0 && compare(array, j) < compare(array, j - pixelIdxLength)) {
    swap(j, j - pixelIdxLength, array);
    j -= pixelIdxLength;
  }
  return (sortPosition += pixelIdxLength);
};

const insertionSort: SortAlgoTypes = (
  array,
  sortedCallback,
  compare,
  sortPosition,
  pixelIdxLength = 4,
  renderLoops = 100
) => {
  sortPosition = typeof sortPosition === "number" ? sortPosition : 0;

  for (let i = 0; i < renderLoops; i++) {
    if (sortPosition >= array.length) {
      sortedCallback();
      break;
    }
    sortPosition = insertionSortHelper(
      array,
      compare,
      sortPosition,
      pixelIdxLength
    );
  }
  return sortPosition;
};

export default insertionSort;
