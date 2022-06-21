import React from "react";

import styles from "./Heading.module.scss";

export function Heading({
  title,
  subhead,
}: {
  title: string;
  subhead: string;
}) {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>{title}</h1>
      <h3 className={styles.subhead}>{subhead}</h3>
    </div>
  );
}
