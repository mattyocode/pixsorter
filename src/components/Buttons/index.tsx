import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

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
      <p className={styles.label}>{label || null}</p>
      {/* <p className={styles.label}>Test!</p> */}
    </button>
  );
}

const containerVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    delay: 0.3,
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 100, delay: 0.2, duration: 0.2 },
  },
};

export function ImageUIBtnRound({
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
    <motion.button
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={styles.roundButton}
      onClick={clickHandler}
    >
      <Image
        src={src}
        height={height}
        width={width}
        alt={alt}
        className={styles.image}
      />
      <p className={styles.label}>{label || null}</p>
    </motion.button>
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
