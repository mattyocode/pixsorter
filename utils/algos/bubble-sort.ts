import { Dispatch, SetStateAction } from "react";
import swap from "./pixel-swap";

const bubbleSort = (
  array: Uint8ClampedArray,
  sortedCallback: () => void,
  compare: (array: Uint8ClampedArray, index: number) => number,
  sortPosition: number | null = array.length,
  setSortPosition: Dispatch<SetStateAction<number | null>>,
  pixelIdxLength: number = 4,
  renderLoops: number = 100
): Uint8ClampedArray => {
  if (!sortPosition) {
    setSortPosition(array.length);
  } else {
    for (let i = 0; i < renderLoops; i++) {
      if (sortPosition <= pixelIdxLength) {
        sortedCallback();
        break;
      }
      for (let j = 0; j < sortPosition; j += pixelIdxLength) {
        if (compare(array, j) > compare(array, j + pixelIdxLength)) {
          swap(j, j + pixelIdxLength, array);
        }
      }
      sortPosition -= pixelIdxLength;
    }
    setSortPosition(sortPosition);
  }
  return array;
};

export default bubbleSort;