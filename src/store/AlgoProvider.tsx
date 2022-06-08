import React, { useReducer } from "react";

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
  PREV_SORT_BY = "PREV_SORT_BY",
  NEXT_SORT_BY = "NEXT_SORT_BY",
}

type AlgoStateTypes = {
  algoIdx: number;
  algos: AlgoItemType[];
  sortByIdx: number;
  sortByOptions: SortByItemType[];
  pixelDistance: number;
};

type AlgoActionTypes =
  | { type: "PREV_ALGO" }
  | { type: "NEXT_ALGO" }
  | { type: "PREV_SORT_BY" }
  | { type: "NEXT_SORT_BY" };

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
    case AlgoActionOptions.PREV_SORT_BY:
      if (state.sortByIdx === 0) {
        let updatedIdx = state.sortByOptions.length - 1;
        return {
          ...state,
          sortByIdx: updatedIdx,
        };
      } else {
        let updatedIdx = state.sortByIdx - 1;
        return {
          ...state,
          sortByIdx: updatedIdx,
        };
      }
    case AlgoActionOptions.NEXT_SORT_BY:
      if (state.sortByIdx === state.sortByOptions.length - 1) {
        return {
          ...state,
          sortByIdx: 0,
        };
      } else {
        let updatedIdx = state.sortByIdx + 1;
        return {
          ...state,
          sortByIdx: updatedIdx,
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

  const prevSortByHandler = () => {
    dispatchAlgoAction({ type: "PREV_SORT_BY" });
  };

  const nextSortByHandler = () => {
    dispatchAlgoAction({ type: "NEXT_SORT_BY" });
  };

  const algoContext = {
    algoIdx: algoState.algoIdx,
    algos: algoState.algos,
    sortByIdx: algoState.sortByIdx,
    sortByOptions: algoState.sortByOptions,
    pixelDistance: algoState.pixelDistance,
    prevAlgo: prevAlgoHandler,
    nextAlgo: nextAlgoHandler,
    prevSortBy: prevSortByHandler,
    nextSortBy: nextSortByHandler,
  };

  return (
    <AlgoContext.Provider value={algoContext}>{children}</AlgoContext.Provider>
  );
};

export default AlgoProvider;
