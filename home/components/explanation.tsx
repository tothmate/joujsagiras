import React from "react";
import styles from "./explanation.module.scss";

export default function Explanation(props: { children: React.ReactNode }) {
  return (
    <div className={styles.explanation}>
      {props.children}
      <div className={styles.borderBottom}></div>
    </div>
  );
}
