import React, { useContext } from "react";
import { SidewaysSelector } from "../SidewaysSelector";
import { Parallax } from "../Parallax";

import AlgoContext from "../../store/algo-context";

import styles from "./Controls.module.scss";

export function Controls() {
  const algoCtx = useContext(AlgoContext);

  return (
    <div className={styles.wrapper}>
      <Parallax offset={25}>
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
      </Parallax>
    </div>
  );
}
