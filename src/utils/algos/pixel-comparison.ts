export type compareFnTypes = (
  array: Uint8ClampedArray | number[],
  index: number
) => number;

export const compareBrightness: compareFnTypes = (array, index) => {
  return array[index] + array[index + 1] + array[index + 2];
};

export const compareRed: compareFnTypes = (array, index) => {
  return array[index];
};

export const compareBlue: compareFnTypes = (array, index) => {
  return array[index + 1];
};

export const compareGreen: compareFnTypes = (array, index) => {
  return array[index + 2];
};

export const compareAlpha: compareFnTypes = (array, index) => {
  return array[index + 3];
};
