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
  return (
    <div className={styles.wrapper}>
      <label className={styles.label}>
        <input
          type="checkbox"
          checked={checked}
          onChange={() => toggleChecked()}
        />
        {label}
      </label>
    </div>
  );
}
