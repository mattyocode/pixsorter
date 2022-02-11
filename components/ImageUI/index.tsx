import React from "react";

import styles from "./ImageUI.module.scss";

export function ImageUI() {
  return (
    <div className={styles.imageUIWrapper}>
      <canvas className={styles.cavas}></canvas>
      <div className={styles.btnWrapper}></div>
    </div>
  );
}
