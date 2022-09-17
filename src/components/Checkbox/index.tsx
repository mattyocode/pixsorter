import React from "react";

import styles from "./Checkbox.module.scss";

export function Checkbox({
  label,
  checked,
  toggleChecked,
}: {
  label: string;
  checked: boolean;
  toggleChecked: () => void;
}) {
  const changeHandler = (e: React.MouseEvent) => {
    toggleChecked();
  };
  return (
    <div className={styles.wrapper}>
      <label className={styles.label}>
        <input
          type="checkbox"
          checked={checked}
          onChange={() => changeHandler}
        />
        {label}
      </label>
    </div>
  );
}
