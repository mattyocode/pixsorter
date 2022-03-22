import React, { useEffect, useRef, Dispatch, SetStateAction } from "react";
import { ImageUIBtn } from "../Buttons";
import { AlgoItemType, SortByItemType } from "../../store/algoData";

import styles from "./SidewaysSelector.module.scss";

const FieldValue = ({ value, active }: { value: string; active: boolean }) => {
  const optionRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (active && optionRef.current) {
      optionRef.current.scrollIntoView();
    }
  }, [active]);

  return <li ref={optionRef}>{value}</li>;
};

export function SidewaysSelector({
  field,
  values,
  selectedIdx,
  prevBtnHandler,
  nextBtnHandler,
}: {
  field: string;
  values: AlgoItemType[] | SortByItemType[];
  selectedIdx: number;
  prevBtnHandler: () => void;
  nextBtnHandler: () => void;
}) {
  const decrementSelected = (e: React.MouseEvent) => {
    e.preventDefault();
    prevBtnHandler();
  };

  const incrementSelected = (e: React.MouseEvent) => {
    e.preventDefault();
    nextBtnHandler();
  };

  return (
    <div className={styles.wrapper}>
      <label htmlFor="algorithms" className={styles.field}>
        <h3>{field}</h3>
      </label>
      <div className={styles.optionsWrapper}>
        <ImageUIBtn
          src="/icons/left.svg"
          alt="prev option"
          width={25}
          height={25}
          clickHandler={decrementSelected}
        />
        <ul>
          {values.map((value) => (
            <FieldValue
              key={`fieldValue-${value.value}`}
              value={value.label}
              active={values[selectedIdx] === value}
            />
          ))}
        </ul>
        <ImageUIBtn
          src="/icons/right.svg"
          alt="next option"
          width={25}
          height={25}
          clickHandler={incrementSelected}
        />
      </div>
    </div>
  );
}
