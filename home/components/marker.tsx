import React, { MouseEventHandler } from "react";
import styles from "./marker.module.scss";
interface MarkerProps {
  children: React.ReactNode;
  classNames?: string[];
  color?: string;
  element?: "h1" | "h2" | "link";
  href?: string;
  onClick?: MouseEventHandler;
}

export default function Marker(props: MarkerProps) {
  const classNames = props.classNames ? props.classNames : [];
  classNames.push(styles.marker);
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

export function PrimaryMarker(props: MarkerProps) {
  return <Marker classNames={[styles.primary]} {...props} />;
}

export function SecondaryMarker(props: MarkerProps) {
  return <Marker classNames={[styles.secondary]} {...props} />;
}

export function MenuItem(props: { href: string; children: React.ReactNode }) {
  return (
    <Marker
      element="link"
      href={props.href}
      classNames={[styles.menuItem]}
      children={props.children}
    ></Marker>
  );
}
