import React, { useEffect, useRef } from "react";
import { Parallax } from "../Parallax";

import styles from "./Heading.module.scss";

export function Heading({
  title,
  subhead,
}: {
  title: string;
  subhead: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({
        inline: "center",
        block: "nearest",
        behavior: "smooth",
      });
    }
  }, []);

  return (
    <Parallax offset={70}>
      <div className={styles.wrapper} ref={ref}>
        <h1 className={styles.title}>{title}</h1>
        <h3 className={styles.subhead}>{subhead}</h3>
      </div>
    </Parallax>
  );
}
