import copy from "./pixel-copy";
import { SortAlgoTypes, SortDataTypes } from "./algoTypes";
import { compareFnTypes } from "./pixel-comparison";

// const sleep = (ms: number) => {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// };

const mergeSort: SortAlgoTypes = (
  array,
  sortedCallback,
  compare,
  sortPosition,
  pixelIdxLength = 4,
  renderLoops = 1
) => {
  let width: number =
    typeof sortPosition === "number" ? sortPosition : pixelIdxLength;
  let length = array.length;
  for (let i = 0; i <= renderLoops; i++) {
    if (width >= length) {
      sortedCallback();
      break;
    }
    let left: number = 0;
    while (left < length) {
      let right = Math.min(
        left + (width * 2 - pixelIdxLength),
        length - pixelIdxLength
      );
      let middle = Math.min(
        left + width - pixelIdxLength,
        length - pixelIdxLength
      );
      merge(array, left, right, middle, compare, pixelIdxLength);
      left += width * 2;
    }
    width *= 2;
  }
  return width;
};

const merge = async (
  array: Uint8ClampedArray,
  left: number,
  right: number,
  middle: number,
  compare: compareFnTypes,
  pixelIdxLength: number
) => {
  let n1 = middle - left + pixelIdxLength;
  let n2 = right - middle;
  let L: number[] = new Array(n1).fill(0);
  let R: number[] = new Array(n2).fill(0);

  for (let i = 0; i < n1; i++) {
    L[i] = array[left + i];
  }
  for (let i = 0; i < n2; i++) {
    R[i] = array[middle + i + pixelIdxLength];
  }

  let i: number = 0;
  let j: number = 0;
  let k: number = left;

  while (i < n1 && j < n2) {
    if (compare(L, i) <= compare(R, j)) {
      copy(L, i, array, k);
      i += pixelIdxLength;
    } else {
      copy(R, j, array, k);
      j += pixelIdxLength;
    }
    k += pixelIdxLength;
  }

  while (i < n1) {
    copy(L, i, array, k);
    i += pixelIdxLength;
    k += pixelIdxLength;
  }

  while (j < n2) {
    copy(R, j, array, k);
    j += pixelIdxLength;
    k += pixelIdxLength;
  }
};

export default mergeSort;
