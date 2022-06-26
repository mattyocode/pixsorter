import { Dispatch, SetStateAction } from "react";

export type sortAlgoTypes = (
  array: Uint8ClampedArray,
  sortedCallback: () => void,
  compare: (array: Uint8ClampedArray, index: number) => number,
  sortPosition: number | null,
  pixelIdxLength?: number,
  renderLoops?: number
) => number | null;
