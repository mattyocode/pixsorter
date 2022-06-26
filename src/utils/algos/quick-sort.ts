import swap from "./pixel-swap";

export const quickSortHelper = (
  array: Uint8ClampedArray,
  compare: (array: Uint8ClampedArray, index: number) => number,
  pixelIdxLength: number,
  startIdx: number,
  endIdx: number,
) => {
  if (startIdx >= endIdx) {
    return;
  }
  
  let pivotIdx = startIdx;
  let leftIdx = pivotIdx + pixelIdxLength;
  let rightIdx = endIdx - pixelIdxLength;

  while (leftIdx <= rightIdx) {
    if(compare(array, leftIdx) > compare(array, pivotIdx) &&
      compare(array, rightIdx) < compare(array, pivotIdx)) {
        swap(leftIdx, rightIdx, array)
      }
    if(compare(array, leftIdx) <= compare(array, pivotIdx)) {
      leftIdx += pixelIdxLength;
    }
    if(compare(array, rightIdx) >= compare(array, pivotIdx)) {
      rightIdx -= pixelIdxLength;
    }
  }
  swap(pivotIdx, rightIdx, array);

  let leftSubArrayIsSmaller = rightIdx - pixelIdxLength - startIdx < endIdx - (rightIdx + pixelIdxLength);
  if (leftSubArrayIsSmaller) {
    quickSortHelper(array, compare, pixelIdxLength, startIdx, rightIdx - pixelIdxLength);
    quickSortHelper(array, compare, pixelIdxLength, rightIdx + pixelIdxLength, endIdx);    
  } else {
    quickSortHelper(array, compare, pixelIdxLength, rightIdx + pixelIdxLength, endIdx);
    quickSortHelper(array, compare, pixelIdxLength, startIdx, rightIdx - pixelIdxLength);
  }
};

const quickSort = (
  array: Uint8ClampedArray,
  sortedCallback: () => void,
  compare: (array: Uint8ClampedArray, index: number) => number,
  sortPosition: number | null,
  pixelIdxLength: number = 4,
) => {
  const startIdx = 0;
  const endIdx = array.length;
  quickSortHelper(array, compare, pixelIdxLength, startIdx, endIdx);
  sortedCallback();
  return array.length -1;
};

export default quickSort;