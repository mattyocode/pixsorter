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
  algoIdx: 1,
  algos: [],
  sortByIdx: 1,
  sortByOptions: [],
  pixelDistance: 4,
  prevAlgo: () => {},
  nextAlgo: () => {},
  prevSortBy: () => {},
  nextSortBy: () => {},
});

export default AlgoContext;
