import { sortAlgoTypes } from "../utils/algos/algoTypes";
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

type DescriptionType = { heading: string; bodyCopy: string };

const algoDescriptions: { [key: string]: DescriptionType } = {
  quick: {
    heading: "Avg. time: O(n log n) | Avg Space: O(n)",
    bodyCopy:
      "Find the correct position of a pivot point in the array (i.e. all values before are lower, and all following are higher), then divide the array at that point. Repeat until the subarrays are so small that moving the pivot sorts them.",
  },
  bubble: {
    heading: "Avg. time: O(n²) | Avg Space: O(1)",
    bodyCopy:
      "Start at the beginning. Check if the next value in the array is lower: if so, swap with the current pixel; if not, don't. Move to the next value. This moves the largest number to the last index. Repeat the whole process, stopping one index earlier each time.",
  },
  insertion: {
    heading: "Avg. time: O(n²) | Avg Space: O(1)",
    bodyCopy:
      "Consequat in dolore in nulla. Adipisicing excepteur velit occaecat consequat non nostrud consequat labore. Eu aute consectetur ea dolore minim aliqua esse. Amet excepteur amet velit aliquip consequat non labore ad laboris id.",
  },
  selection: {
    heading: "Avg. time: O(n²) | Avg Space: O(1)",
    bodyCopy:
      "Consequat in dolore in nulla. Adipisicing excepteur velit occaecat consequat non nostrud consequat labore. Eu aute consectetur ea dolore minim aliqua esse. Amet excepteur amet velit aliquip consequat non labore ad laboris id.",
  },
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

const sortByDescriptions: { [key: string]: DescriptionType } = {
  combined: {
    heading: "Avg. time: O(n²) | Avg Space: O(1)",
    bodyCopy:
      "Consequat in dolore in nulla. Adipisicing excepteur velit occaecat consequat non nostrud consequat labore. Eu aute consectetur ea dolore minim aliqua esse. Amet excepteur amet velit aliquip consequat non labore ad laboris id.",
  },
  red: {
    heading: "Avg. time: O(n²) | Avg Space: O(1)",
    bodyCopy:
      "Consequat in dolore in nulla. Adipisicing excepteur velit occaecat consequat non nostrud consequat labore. Eu aute consectetur ea dolore minim aliqua esse. Amet excepteur amet velit aliquip consequat non labore ad laboris id.",
  },
  green: {
    heading: "Avg. time: O(n²) | Avg Space: O(1)",
    bodyCopy:
      "Consequat in dolore in nulla. Adipisicing excepteur velit occaecat consequat non nostrud consequat labore. Eu aute consectetur ea dolore minim aliqua esse. Amet excepteur amet velit aliquip consequat non labore ad laboris id.",
  },
  blue: {
    heading: "Avg. time: O(n²) | Avg Space: O(1)",
    bodyCopy:
      "Consequat in dolore in nulla. Adipisicing excepteur velit occaecat consequat non nostrud consequat labore. Eu aute consectetur ea dolore minim aliqua esse. Amet excepteur amet velit aliquip consequat non labore ad laboris id.",
  },
};

export const SortByOptions: SortByItemType[] = [
  {
    label: "Combined RGB",
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
