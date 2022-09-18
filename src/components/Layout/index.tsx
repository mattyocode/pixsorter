import React from "react";
import Image from "next/image";

import styles from "./Layout.module.scss";

export function ImageBackground({
  src,
  children,
}: {
  src: string;
  children: React.ReactNode;
}) {
  return (
    <div className={styles.imageBackground}>
      <Image
        alt="bright black and white art gallery"
        src={src}
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        quality={100}
        priority={true}
      />
      {children}
    </div>
  );
}
