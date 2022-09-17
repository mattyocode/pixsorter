import React from "react";

import styles from "./Footer.module.scss";

export function Footer({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.footer}>
      <p className={styles.text}>{children}</p>
    </div>
  );
}
