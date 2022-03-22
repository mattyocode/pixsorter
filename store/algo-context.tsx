import React from "react";

import { AlgoItemType, SortByItemType } from "./algoData";

type AlgoContextTypes = {
  algoIdx: number;
  algos: AlgoItemType[];
  sortByIdx: number;
  sortByOptions: SortByItemType[];
  pixelDistance: number;
  prevAlgo: () => void;
  nextAlgo: () => void;
  prevSortBy: () => void;
  nextSortBy: () => void;
};

const AlgoContext = React.createContext<AlgoContextTypes>({
  // Initialised with default state for IDE autocompletion.
  algoIdx: 0,
  algos: [],
  sortByIdx: 0,
  sortByOptions: [],
  pixelDistance: 4,
  prevAlgo: () => {},
  nextAlgo: () => {},
  prevSortBy: () => {},
  nextSortBy: () => {},
});

export default AlgoContext;
