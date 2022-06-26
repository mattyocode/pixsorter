import swap from "./pixel-swap";


export const insertionSortHelper = (
  array: Uint8ClampedArray,
  compare: (array: Uint8ClampedArray, index: number) => number,
  sortPosition: number,
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
  sortPosition: number | null,
  pixelIdxLength: number = 4,
  renderLoops: number = 100
) => {
  sortPosition = sortPosition || pixelIdxLength;
  for (let i = 0; i < renderLoops; i++) {
    if (sortPosition >= array.length) {
      sortedCallback();
      break;
    }
    sortPosition = insertionSortHelper(
      array,
      compare,
      sortPosition,
      pixelIdxLength,
    )
  }
  return sortPosition;
};

export default insertionSort;
