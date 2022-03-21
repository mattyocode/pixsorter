import React, { useReducer, Reducer } from "react";

import AlgoContext from "./algo-context";
import {
  AlgoOptions,
  SortByOptions,
  AlgoItemType,
  SortByItemType,
} from "./algoData";

const defaultAlgoState = {
  algoIdx: 0,
  algos: AlgoOptions,
  sortByIdx: 0,
  sortByOptions: SortByOptions,
  pixelDistance: 4,
};

enum AlgoActionOptions {
  PREV_ALGO = "PREV_ALGO",
  NEXT_ALGO = "NEXT_ALGO",
}

type AlgoStateTypes = {
  algoIdx: number;
  algos: AlgoItemType[];
  sortByIdx: number;
  sortByOptions: SortByItemType[];
  pixelDistance: number;
};
type AlgoActionTypes = { type: "PREV_ALGO" } | { type: "NEXT_ALGO" };

const algoReducer = (
  state: AlgoStateTypes,
  action: AlgoActionTypes
): AlgoStateTypes => {
  const { type } = action;
  switch (type) {
    case AlgoActionOptions.PREV_ALGO:
      if (state.algoIdx === 0) {
        let updatedIdx = state.algos.length - 1;
        return {
          ...state,
          algoIdx: updatedIdx,
        };
      } else {
        let updatedIdx = state.algoIdx - 1;
        return {
          ...state,
          algoIdx: updatedIdx,
        };
      }
    case AlgoActionOptions.NEXT_ALGO:
      if (state.algoIdx === state.algos.length - 1) {
        return {
          ...state,
          algoIdx: 0,
        };
      } else {
        let updatedIdx = state.algoIdx + 1;
        return {
          ...state,
          algoIdx: updatedIdx,
        };
      }
    default:
      return state;
  }
};

const AlgoProvider = ({ children }: { children: React.ReactNode }) => {
  const [algoState, dispatchAlgoAction] = useReducer(
    algoReducer,
    defaultAlgoState
  );
  const prevAlgoHandler = () => {
    dispatchAlgoAction({ type: "PREV_ALGO" });
  };

  const nextAlgoHandler = () => {
    dispatchAlgoAction({ type: "NEXT_ALGO" });
  };

  const algoContext = {
    algoIdx: algoState.algoIdx,
    algos: algoState.algos,
    sortByIdx: algoState.sortByIdx,
    sortByOptions: algoState.sortByOptions,
    pixelDistance: algoState.pixelDistance,
    prevAlgo: prevAlgoHandler,
    nextAlgo: nextAlgoHandler,
  };
  return (
    <AlgoContext.Provider value={algoContext}>{children}</AlgoContext.Provider>
  );
};

export default AlgoProvider;
