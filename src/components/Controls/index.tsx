import React, { useContext, useEffect, useState } from "react";
import { SidewaysSelector } from "../SidewaysSelector";
import { Parallax } from "../Parallax";

import AlgoContext from "../../store/algo-context";

import styles from "./Controls.module.scss";

export function Controls() {
  const algoCtx = useContext(AlgoContext);
  // const [loaded, setLoaded] = useState<boolean>(false);

  // useEffect(() => {
  //   setLoaded(true);
  // }, []);
  return (
    <div className={styles.wrapper}>
      {/* {loaded && ( */}
      <Parallax offset={25}>
        <SidewaysSelector
          field="Using"
          values={algoCtx.algos}
          selectedIdx={algoCtx.algoIdx}
          prevBtnHandler={algoCtx.prevAlgo}
          nextBtnHandler={algoCtx.nextAlgo}
          valueType="algorithm"
        />
        <SidewaysSelector
          field="Sort by"
          values={algoCtx.sortByOptions}
          selectedIdx={algoCtx.sortByIdx}
          prevBtnHandler={algoCtx.prevSortBy}
          nextBtnHandler={algoCtx.nextSortBy}
          valueType="pixel value"
        />
      </Parallax>
      {/* )} */}
    </div>
  );
}
