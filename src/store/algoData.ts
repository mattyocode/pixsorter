import { sortAlgoTypes } from "../utils/algos/algoTypes";
import {
  DescriptionType,
  algoDescriptions,
  sortByDescriptions,
} from "./descriptions";
import {
  bubbleSort,
  insertionSort,
  selectionSort,
  quickSort,
} from "../utils/algos";
import {
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
  description: DescriptionType;
};

export const AlgoOptions: AlgoItemType[] = [
  {
    label: "Quick Sort",
    value: "quick",
    function: quickSort,
    description: algoDescriptions.quick,
  },
  {
    label: "Bubble Sort",
    value: "bubble",
    function: bubbleSort,
    description: algoDescriptions.bubble,
  },
  {
    label: "Insertion Sort",
    value: "insertion",
    function: insertionSort,
    description: algoDescriptions.insertion,
  },
  {
    label: "Selection Sort",
    value: "selection",
    function: selectionSort,
    description: algoDescriptions.selection,
  },
];

export type SortByItemType = {
  label: string;
  value: string;
  function: compareFnTypes;
  description: DescriptionType;
};

export const SortByOptions: SortByItemType[] = [
  {
    label: "RGB Total",
    value: "brightness",
    function: compareBrightness,
    description: sortByDescriptions.combined,
  },
  {
    label: "Red",
    value: "red",
    function: compareRed,
    description: sortByDescriptions.red,
  },
  {
    label: "Green",
    value: "green",
    function: compareGreen,
    description: sortByDescriptions.green,
  },
  {
    label: "Blue",
    value: "Blue",
    function: compareBlue,
    description: sortByDescriptions.blue,
  },
];
