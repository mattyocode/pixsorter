import swap from "./pixel-swap";

export const bubbleSort = (
  array: Uint8ClampedArray,
  sortedCallback: () => void,
  compare: (array: Uint8ClampedArray, index: number) => number,
  sortPosition: number = array.length,
  pixelIdxLength: number = 4,
  renderLoops: number = 100
): Uint8ClampedArray => {
  // if (!sortPosition) sortPosition = array.length;
  for (let i = 0; i < renderLoops; i++) {
    if (sortPosition <= pixelIdxLength) {
      console.log("bubble sort ends");
      sortedCallback();
    }
    for (let j = 0; j < sortPosition; j += pixelIdxLength) {
      if (compare(array, j) > compare(array, j + pixelIdxLength)) {
        swap(j, j + pixelIdxLength, array);
      }
    }
    sortPosition -= pixelIdxLength;
  }
  return array;
};
