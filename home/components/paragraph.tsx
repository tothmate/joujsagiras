import React from "react";
import styles from "./paragraph.module.scss";

export default function Paragraph(props: { children: React.ReactNode }) {
  return (
    <div className={styles.paragraph}>
      {props.children}
      <div className={styles.borderBottom}></div>
    </div>
  );
}
