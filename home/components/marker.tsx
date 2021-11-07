import React, { MouseEventHandler } from "react";
import styles from "./marker.module.scss";
interface MarkerProps {
  children: React.ReactNode;
  primary?: boolean;
  secondary?: boolean;
  dark?: boolean;
  color?: string;
  element?: "h1" | "h2" | "link";
  href?: string;
  onClick?: MouseEventHandler;
}

export default function Marker(props: MarkerProps) {
  const classNames = [styles.marker];
  if (props.primary) classNames.push(styles.primary);
  if (props.secondary) classNames.push(styles.secondary);
  if (props.dark) classNames.push(styles.dark);
  if (props.onClick) classNames.push(styles.clickable);

  const extraProps = {
    className: classNames.join(" "),
    onClick: props.onClick,
    style: props.color ? { backgroundColor: props.color } : {},
  };

  switch (props.element) {
    case "h1":
      return <h1 {...extraProps}>{props.children}</h1>;
    case "h2":
      return <h2 {...extraProps}>{props.children}</h2>;
    case "link":
      return (
        <a href={props.href} {...extraProps}>
          {props.children}
        </a>
      );
    default:
      return <span {...extraProps}>{props.children}</span>;
  }
}

export function Heading1(props: MarkerProps) {
  return <Marker element="h1" {...props} />;
}

export function Heading2(props: MarkerProps) {
  return <Marker element="h2" {...props} />;
}
