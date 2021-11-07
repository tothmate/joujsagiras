import React from "react";
import styles from "./layout.module.scss";
import Marker from "./marker";

export default function Layout(props: {
  children: React.ReactNode;
  darkLogo?: "primary" | "secondary";
}) {
  return (
    <>
      <div className={styles.logo}>
        <Marker
          dark={props.darkLogo === "primary"}
          primary={props.darkLogo !== "primary"}
          element="link"
          href="/"
        >
          Van
        </Marker>
        <Marker
          dark={props.darkLogo === "secondary"}
          secondary={props.darkLogo !== "secondary"}
          element="link"
          href="/"
        >
          Jó újságírás
        </Marker>
      </div>
      <div className={styles.layout}>{props.children}</div>
    </>
  );
}

export function HomeLayout(props: { children: React.ReactNode }) {
  return <div className={styles.home}>{props.children}</div>;
}
