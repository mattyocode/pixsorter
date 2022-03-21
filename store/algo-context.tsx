import React from "react";

import {
  AlgoOptions,
  SortByOptions,
  AlgoItemType,
  SortByItemType,
} from "./algoData";

const AlgoContext = React.createContext({
  // Initialised with default state for IDE autocompletion.
  algoIdx: 0,
  algos: AlgoOptions,
  sortByIdx: 0,
  sortByOptions: SortByOptions,
  pixelDistance: 4,
  prevAlgo: () => {},
  nextAlgo: () => {},
  // prevSortBy: () => {},
  // nextSortBy: () => {},
});

export default AlgoContext;
