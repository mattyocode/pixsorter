import React, { useContext } from "react";
import { SidewaysSelector } from "../SidewaysSelector";

import AlgoContext from "../../store/algo-context";

export function Controls() {
  const algoCtx = useContext(AlgoContext);

  return (
    <>
      <SidewaysSelector
        field="Using"
        values={algoCtx.algos}
        selectedIdx={algoCtx.algoIdx}
        prevBtnHandler={algoCtx.prevAlgo}
        nextBtnHandler={algoCtx.nextAlgo}
      />
      <SidewaysSelector
        field="Sort by"
        values={algoCtx.sortByOptions}
        selectedIdx={algoCtx.sortByIdx}
        prevBtnHandler={algoCtx.prevSortBy}
        nextBtnHandler={algoCtx.nextSortBy}
      />
    </>
  );
}
