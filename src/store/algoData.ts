import {
  SortAlgoTypes,
  SortAlgoWithStackTypes,
} from "../utils/algos/algoTypes";
import {
  bubbleSort,
  insertionSort,
  selectionSort,
  quickSort,
} from "../utils/algos";
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
  function: SortAlgoTypes | SortAlgoWithStackTypes;
  stack: boolean;
};

export const AlgoOptions: AlgoItemType[] = [
  {
    label: "Quick Sort",
    value: "quick",
    function: quickSort,
    stack: true,
  },
  {
    label: "Bubble Sort",
    value: "bubble",
    function: bubbleSort,
    stack: false,
  },
  {
    label: "Insertion Sort",
    value: "insertion",
    function: insertionSort,
    stack: false,
  },
  {
    label: "Selection Sort",
    value: "selection",
    function: selectionSort,
    stack: false,
  },
];

export type SortByItemType = {
  label: string;
  value: string;
  function: compareFnTypes;
};

export const SortByOptions: SortByItemType[] = [
  {
    label: "Combined RGB",
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
