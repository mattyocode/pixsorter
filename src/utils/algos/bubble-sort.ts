import swap from "./pixel-swap";
import { SortAlgoTypes } from "./algoTypes";
import { compareFnTypes } from "./pixel-comparison";

export const bubbleSortHelper = (
  array: Uint8ClampedArray,
  compare: compareFnTypes,
  sortPosition: number,
  pixelIdxLength: number
): number => {
  for (let j = 0; j < sortPosition; j += pixelIdxLength) {
    if (compare(array, j) > compare(array, j + pixelIdxLength)) {
      swap(j, j + pixelIdxLength, array);
    }
  }
  return (sortPosition -= pixelIdxLength);
};

const bubbleSort: SortAlgoTypes = (
  array,
  sortedCallback,
  compare,
  sortPosition,
  pixelIdxLength = 4,
  renderLoops = 70
) => {
  // starting on the red pixel value at the end of the array
  sortPosition =
    typeof sortPosition === "number"
      ? sortPosition
      : array.length - pixelIdxLength;
  for (let i = 0; i < renderLoops; i++) {
    if (sortPosition < pixelIdxLength) {
      sortedCallback();
      break;
    }
    sortPosition = bubbleSortHelper(
      array,
      compare,
      sortPosition,
      pixelIdxLength
    );
  }
  return sortPosition;
};

export default bubbleSort;
