import { Dispatch, SetStateAction } from "react";
import { compareFnTypes } from "./pixel-comparison";

export type SortDataTypes = {
  top: number;
  high: number;
  low: number;
  stack: number[];
};

export type SortAlgoTypes = (
  array: Uint8ClampedArray,
  sortedCallback: () => void,
  compare: compareFnTypes,
  sortPosition: number | SortDataTypes | null,
  pixelIdxLength?: number,
  renderLoops?: number
) => number | SortDataTypes;
