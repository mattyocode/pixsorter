export type compareFnTypes = (
  array: Uint8ClampedArray,
  index: number
) => number;

export const compareBrightness = (
  array: Uint8ClampedArray,
  index: number
): number => {
  return array[index] + array[index + 1] + array[index + 2];
};

export const compareRed = (array: Uint8ClampedArray, index: number): number => {
  return array[index];
};

export const compareBlue = (
  array: Uint8ClampedArray,
  index: number
): number => {
  return array[index + 1];
};

export const compareGreen = (
  array: Uint8ClampedArray,
  index: number
): number => {
  return array[index + 2];
};

export const compareAlpha = (
  array: Uint8ClampedArray,
  index: number
): number => {
  return array[index + 3];
};
