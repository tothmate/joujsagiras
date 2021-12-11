import React from "react";
import styles from "./layout.module.scss";
import Menu from "./menu";

export default function Layout(props: { children: React.ReactNode; withMenu: boolean }) {
  return (
    <>
      {props.withMenu && <Menu />}
      <main className={styles.layout}>{props.children}</main>
    </>
  );
}

export function NewSectionLayout(props: { children: React.ReactNode; isDarkSection: boolean }) {
  return (
    <section className={props.isDarkSection ? styles.darkSection : styles.lightSection}>
      <div className={styles.borderTop} />
      <Layout withMenu={false}>{props.children}</Layout>
      <div className={styles.borderBottom} />
    </section>
  );
}

export function HomeLayout(props: { children: React.ReactNode }) {
  return (
    <div className={styles.homeWrapper}>
      <Menu />
      <main className={styles.home}>{props.children}</main>
    </div>
  );
}
