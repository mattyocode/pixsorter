import { Dispatch, SetStateAction } from "react";

export type SortDataTypes = {
  top: number;
  high: number;
  low: number;
  stack: number[];
};

export type SortAlgoTypes = (
  array: Uint8ClampedArray,
  sortedCallback: () => void,
  compare: (array: Uint8ClampedArray, index: number) => number,
  sortPosition: number | null,
  pixelIdxLength?: number,
  renderLoops?: number
) => number;

export type SortAlgoWithStackTypes = (
  array: Uint8ClampedArray,
  sortedCallback: () => void,
  compare: (array: Uint8ClampedArray, index: number) => number,
  sortPosition: SortDataTypes | null,
  pixelIdxLength?: number,
  renderLoops?: number
) => SortDataTypes;
