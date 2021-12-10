import React from "react";
import styles from "./layout.module.scss";
import Menu from "./menu";

export default function Layout(props: { children: React.ReactNode; withMenu: boolean }) {
  return (
    <>
      {props.withMenu && <Menu />}
      <div className={styles.layout}>{props.children}</div>
    </>
  );
}

export function NewSectionLayout(props: { children: React.ReactNode; isDarkSection: boolean }) {
  return (
    <div className={props.isDarkSection ? styles.darkSection : styles.lightSection}>
      <div className={styles.borderTop} />
      <Layout withMenu={false}>{props.children}</Layout>
      <div className={styles.borderBottom} />
    </div>
  );
}

export function HomeLayout(props: { children: React.ReactNode }) {
  return (
    <div className={styles.homeWrapper}>
      <Menu />
      <div className={styles.home}>{props.children}</div>
    </div>
  );
}
