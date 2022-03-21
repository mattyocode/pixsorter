import React from "react";

let algorithmData;
let sortByData;

const AlgoContext = React.createContext({
  // Initialised with default state for IDE autocompletion.
  algoIdx: 0,
  algos: algorithmData,
  sortByIdx: 0,
  sortByOptions: sortByData,
  pixelDistance: 4,
  prevAlgo: () => {},
  nextAlgo: () => {},
  prevSortBy: () => {},
  nextSortBy: () => {},
});

export default AlgoContext;
