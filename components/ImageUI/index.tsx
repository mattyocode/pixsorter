import React from "react";

import { Canvas } from "../Canvas";

import styles from "./ImageUI.module.scss";

export function ImageUI() {
  return (
    <div className={styles.imageUIWrapper}>
      <Canvas imageSrc="/img/test-image.jpg" width={400} height={400} />
      <div className={styles.btnWrapper}></div>
    </div>
  );
}
