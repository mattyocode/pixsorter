import React from "react";

import styles from "./SidewaysSelector.module.scss";

export function SidewaysSelector({
  field,
  values,
}: {
  field: string;
  values: string[];
}) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.field}>
        <h3>{field}</h3>
      </div>
      <div className={styles.optionsWrapper}>
        <ul>
          {values.map((value) => {
            return (
              <li key={value}>
                <input
                  type="radio"
                  className={styles.wordInput}
                  name={value}
                  defaultValue={value}
                  id={`${value}-input`}
                  // style={styles.radioWhite}
                />
                <label className={styles.radio} htmlFor="white">
                  {value}
                </label>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
