import { Dispatch, SetStateAction } from "react";
import { compareFnTypes } from "./pixel-comparison";

export type SortDataTypes = {
  top: number;
  high: number;
  low: number;
  stack: number[];
};

// export type MergeDataTypes = {
//   width: number;
//   position: number;
//   low: number;
//   stack: number[];
// };

export type SortAlgoTypes = (
  array: Uint8ClampedArray,
  sortedCallback: () => void,
  compare: compareFnTypes,
  sortPosition: number | SortDataTypes | null,
  pixelIdxLength?: number,
  renderLoops?: number
) => number | SortDataTypes;

// export type SortAlgoWithStackTypes = (
//   array: Uint8ClampedArray,
//   sortedCallback: () => void,
//   compare: (array: Uint8ClampedArray, index: number) => number,
//   sortPosition: SortDataTypes | null,
//   pixelIdxLength?: number,
//   renderLoops?: number
// ) => SortDataTypes;

// sortPosition is SortDataTypes | null
