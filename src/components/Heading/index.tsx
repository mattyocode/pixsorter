import React from "react";
import { Parallax } from "../Parallax";

import styles from "./Heading.module.scss";

export function Heading({
  title,
  subhead,
}: {
  title: string;
  subhead: string;
}) {
  return (
    <Parallax offset={70}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>{title}</h1>
        <h3 className={styles.subhead}>{subhead}</h3>
      </div>
    </Parallax>
  );
}
