import React from "react";
import styles from "./paragraph.module.scss";

export default function Paragraph(props: { children: React.ReactNode }) {
  return (
    <p className={styles.paragraph}>
      {props.children}
      <span className={styles.borderBottom} />
    </p>
  );
}
