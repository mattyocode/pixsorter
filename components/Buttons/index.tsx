import React from "react";
import Image from "next/image";

import styles from "./Buttons.module.scss";

export function ImageUIBtn({
  src,
  size,
  label,
  alt,
  clickHandler,
}: {
  src: string;
  size: number;
  label: string;
  alt: string;
  clickHandler?: (e: React.MouseEvent) => void;
}) {
  return (
    <button className={styles.button} onClick={clickHandler}>
      <Image
        src={src}
        height={size}
        width={size}
        alt={alt}
        className={styles.img}
      />
      <p className={styles.label}>{label}</p>
    </button>
  );
}
