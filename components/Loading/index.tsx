import React from "react";

import styles from "./Loading.module.scss";

export function Loading() {
  return (
    <div className={styles.spinner}>
      <span className={styles["spinner-inner-1"]}></span>
      <span className={styles["spinner-inner-2"]}></span>
      <span className={styles["spinner-inner-3"]}></span>
    </div>
  );
}
