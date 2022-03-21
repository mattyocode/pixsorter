import { useReducer } from "react";

import AlgoContext from "./algo-context";

const defaultAlgoState = {
  algoIdx: 0,
  algos: algorithmData,
  sortByIdx: 0,
  sortByOptions: sortByData,
  pixelDistance: 4,
};
