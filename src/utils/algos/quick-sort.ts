import swap from "./pixel-swap";
import { SortAlgoTypes, SortDataTypes } from "./algoTypes";

export const partition = (
  array: Uint8ClampedArray,
  low: number,
  high: number,
  compare: (array: Uint8ClampedArray, index: number) => number,
  pixelIdxLength: number
) => {
  let pivot = compare(array, high);
  let index = low - pixelIdxLength;
  for (let j = low; j <= high - pixelIdxLength; j += pixelIdxLength) {
    // If current element is smaller than or equal to pivot
    if (compare(array, j) <= pivot) {
      index += pixelIdxLength;
      swap(index, j, array);
    }
  }
  swap(index + pixelIdxLength, high, array);

  return index + pixelIdxLength;
};

function isSortDataObject(object: any): object is SortDataTypes {
  return true;
}

const quickSort: SortAlgoTypes = (
  array,
  sortedCallback,
  compare,
  sortPosition,
  pixelIdxLength = 4,
  renderLoops = 320
) => {
  let top, high, low, stack;
  if (!sortPosition || typeof sortPosition === "number") {
    let numPixels = Math.floor(array.length / 4);
    stack = new Array(numPixels);
    stack.fill(0);

    top = -1;

    stack[++top] = 0;
    stack[++top] = array.length - pixelIdxLength;
  } else {
    top = sortPosition.top;
    high = sortPosition.high;
    low = sortPosition.low;
    stack = sortPosition.stack;
  }

  for (let i = 0; i <= renderLoops; i++) {
    if (top < 0) {
      sortedCallback();
      break;
    }

    high = stack[top--];
    low = stack[top--];

    let p = partition(array, low, high, compare, pixelIdxLength);

    if (p - pixelIdxLength > low) {
      stack[++top] = low;
      stack[++top] = p - pixelIdxLength;
    }

    if (p + pixelIdxLength < high) {
      stack[++top] = p + pixelIdxLength;
      stack[++top] = high;
    }
  }

  return {
    top: top,
    high: high,
    low: low,
    stack: stack,
  };
};

export default quickSort;

// export const quickSortHelper = (
//   array: Uint8ClampedArray,
//   compare: (array: Uint8ClampedArray, index: number) => number,
//   pixelIdxLength: number,
//   startIdx: number,
//   endIdx: number,
// ) => {
//   if (startIdx >= endIdx) {
//     return;
//   }

//   let pivotIdx = startIdx;
//   let leftIdx = pivotIdx + pixelIdxLength;
//   let rightIdx = endIdx - pixelIdxLength;

//   while (leftIdx <= rightIdx) {
//     if(compare(array, leftIdx) > compare(array, pivotIdx) &&
//       compare(array, rightIdx) < compare(array, pivotIdx)) {
//         swap(leftIdx, rightIdx, array)
//       }
//     if(compare(array, leftIdx) <= compare(array, pivotIdx)) {
//       leftIdx += pixelIdxLength;
//     }
//     if(compare(array, rightIdx) >= compare(array, pivotIdx)) {
//       rightIdx -= pixelIdxLength;
//     }
//   }
//   swap(pivotIdx, rightIdx, array);

//   let leftSubArrayIsSmaller = rightIdx - pixelIdxLength - startIdx < endIdx - (rightIdx + pixelIdxLength);
//   if (leftSubArrayIsSmaller) {
//     quickSortHelper(array, compare, pixelIdxLength, startIdx, rightIdx - pixelIdxLength);
//     quickSortHelper(array, compare, pixelIdxLength, rightIdx + pixelIdxLength, endIdx);
//   } else {
//     quickSortHelper(array, compare, pixelIdxLength, rightIdx + pixelIdxLength, endIdx);
//     quickSortHelper(array, compare, pixelIdxLength, startIdx, rightIdx - pixelIdxLength);
//   }
// };

// const quickSort = (
//   array: Uint8ClampedArray,
//   sortedCallback: () => void,
//   compare: (array: Uint8ClampedArray, index: number) => number,
//   sortPosition: number | null,
//   pixelIdxLength: number = 4,
// ) => {
//   const startIdx = 0;
//   const endIdx = array.length;
//   quickSortHelper(array, compare, pixelIdxLength, startIdx, endIdx);
//   sortedCallback();
//   return array.length -1;
// };
