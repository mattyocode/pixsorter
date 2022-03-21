import { sortAlgoTypes } from "../utils/algos/algoTypes";
import { bubbleSort } from "../utils/algos/bubble-sort";
import {
  compareAlpha,
  compareBlue,
  compareBrightness,
  compareGreen,
  compareRed,
  compareFnTypes,
} from "../utils/algos/pixel-comparison";

export type AlgoItem = {
  name: string;
  value: string;
  function: sortAlgoTypes;
};

const AlgoOptions: AlgoItem[] = [
  {
    name: "Bubble Sort",
    value: "bubble",
    function: bubbleSort,
  },
  {
    name: "Insertion Sort",
    value: "insertion",
    function: bubbleSort,
  },
  {
    name: "Selection Sort",
    value: "selection",
    function: bubbleSort,
  },
];

export type SortByItem = {
  name: string;
  value: string;
  function: compareFnTypes;
};

const SortByOptions: SortByItem[] = [
  {
    name: "Brightness",
    value: "brightness",
    function: compareBrightness,
  },
  {
    name: "Red",
    value: "red",
    function: compareRed,
  },
  {
    name: "Green",
    value: "green",
    function: compareGreen,
  },
  {
    name: "Blue",
    value: "Blue",
    function: compareBlue,
  },
  {
    name: "Alpha",
    value: "alpha",
    function: compareAlpha,
  },
];
