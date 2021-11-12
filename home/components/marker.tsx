import React, { MouseEventHandler } from "react";
import Link from "next/link";
import styles from "./marker.module.scss";
interface MarkerProps {
  children: React.ReactNode;
  classNames?: string[];
  color?: string;
  element?: "h1" | "h2" | "h3" | "link";
  href?: string;
  onClick?: MouseEventHandler;
}

export default function Marker(props: MarkerProps) {
  const classNames = [styles.marker];
  if (props.classNames) {
    classNames.push(...props.classNames);
  }
  if (props.onClick) {
    classNames.push(styles.clickable);
  }

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
    case "h3":
      return <h3 {...extraProps}>{props.children}</h3>;
    case "link":
      return (
        <Link href={props.href}>
          <a {...extraProps}>{props.children}</a>
        </Link>
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

export function Heading3(props: MarkerProps) {
  return <Marker element="h3" {...props} />;
}

export function PrimaryMarker(props: MarkerProps) {
  return <Marker classNames={[styles.primary]} {...props} />;
}

export function SecondaryMarker(props: MarkerProps) {
  return <Marker classNames={[styles.secondary]} {...props} />;
}
