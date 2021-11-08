import React from "react";
import styles from "./layout.module.scss";
import { MenuItem } from "./marker";

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <>
      <div className={styles.header}>
        <nav>
          <MenuItem href="/">Jó újságírás .hu</MenuItem>
        </nav>
        <nav>
          <MenuItem href="/van">Van.</MenuItem>
          <MenuItem href="/milyen">Milyen?</MenuItem>
          <MenuItem href="/hopp">Értékelj!</MenuItem>
        </nav>
      </div>
      <div className={styles.layout}>{props.children}</div>
    </>
  );
}

export function HomeLayout(props: { children: React.ReactNode }) {
  return <div className={styles.home}>{props.children}</div>;
}
