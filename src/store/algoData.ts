import { sortAlgoTypes } from "../utils/algos/algoTypes";
import { bubbleSort, insertionSort, selectionSort, quickSort } from "../utils/algos";
import {
  compareAlpha,
  compareBlue,
  compareBrightness,
  compareGreen,
  compareRed,
  compareFnTypes,
} from "../utils/algos/pixel-comparison";

export type AlgoItemType = {
  label: string;
  value: string;
  function: sortAlgoTypes;
};

export const AlgoOptions: AlgoItemType[] = [
  {
    label: "Quick Sort",
    value: "quick",
    function: quickSort,
  },
  {
    label: "Bubble Sort",
    value: "bubble",
    function: bubbleSort,
  },
  {
    label: "Insertion Sort",
    value: "insertion",
    function: insertionSort,
  },
  {
    label: "Selection Sort",
    value: "selection",
    function: selectionSort,
  },
];

export type SortByItemType = {
  label: string;
  value: string;
  function: compareFnTypes;
};

export const SortByOptions: SortByItemType[] = [
  {
    label: "Brightness",
    value: "brightness",
    function: compareBrightness,
  },
  {
    label: "Red",
    value: "red",
    function: compareRed,
  },
  {
    label: "Green",
    value: "green",
    function: compareGreen,
  },
  {
    label: "Blue",
    value: "Blue",
    function: compareBlue,
  },
];
