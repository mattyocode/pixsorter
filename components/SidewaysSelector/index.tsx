import React, { useEffect, useState, useRef } from "react";
import { ImageUIBtn } from "../Buttons";
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
}: {
  field: string;
  values: {
    value: string;
    label: string;
  }[];
}) {
  const [selectedIdx, setSelectedIdx] = useState<number>(0);

  const incrementSelected = (e: React.MouseEvent) => {
    e.preventDefault();
    setSelectedIdx((prev) => (prev + 1) % values.length);
  };

  const decrementSelected = (e: React.MouseEvent) => {
    e.preventDefault();
    setSelectedIdx((prev) => Math.abs((prev - 1) % values.length));
  };

  return (
    <form className={styles.wrapper}>
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
              key={`fieldvalue-${value.value}`}
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
    </form>
  );
}
