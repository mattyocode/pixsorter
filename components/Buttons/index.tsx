import React from "react";
import Image from "next/image";

import styles from "./Buttons.module.scss";

export function ImageUIBtn({
  src,
  width,
  height,
  label,
  alt,
  clickHandler,
}: {
  src: string;
  width: number;
  height: number;
  label?: string;
  alt: string;
  clickHandler?: (e: React.MouseEvent) => void;
}) {
  return (
    <button className={styles.button} onClick={clickHandler}>
      <Image
        src={src}
        height={height}
        width={width}
        alt={alt}
        className={styles.image}
      />
      {label && <p className={styles.label}>{label}</p>}
    </button>
  );
}

export function InlineBtn({
  src,
  width,
  height,
  alt,
  clickHandler,
}: {
  src: string;
  width: number;
  height: number;
  label: string;
  alt: string;
  clickHandler?: (e: React.MouseEvent) => void;
}) {
  return (
    <button className={styles.button} onClick={clickHandler}>
      <Image
        src={src}
        height={height}
        width={width}
        alt={alt}
        className={styles.image}
      />
    </button>
  );
}
