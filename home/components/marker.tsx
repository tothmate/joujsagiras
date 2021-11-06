import React from "react";
import Link from "next/link";
import styles from "./marker.module.scss";

export default function Marker(props: {
  children: React.ReactNode;
  primary?: boolean;
  secondary?: boolean;
  dark?: boolean;
  element?: "h1" | "h2" | "link";
  href?: string;
}) {
  const classNames = [styles.marker];
  if (props.primary) classNames.push(styles.primary);
  if (props.secondary) classNames.push(styles.secondary);
  if (props.dark) classNames.push(styles.dark);

  switch (props.element) {
    case "h1":
      return <h1 className={classNames.join(" ")}>{props.children}</h1>;
    case "h2":
      return <h2 className={classNames.join(" ")}>{props.children}</h2>;
    case "link":
      return (
        <Link href={props.href}>
          <a className={classNames.join(" ")}>{props.children}</a>
        </Link>
      );
    default:
      return <span className={classNames.join(" ")}>{props.children}</span>;
  }
}
