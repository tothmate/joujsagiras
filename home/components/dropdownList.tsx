import React, { useCallback, useState } from "react";
import tinygradient from "tinygradient";
import styles from "./dropdownList.module.scss";
import Marker, { Heading2 } from "./marker";
interface DropdownListContent {
  title: string;
  list: string[];
}

export function Dropdown(props: {
  content: DropdownListContent;
  color: string;
  fadeInDelay: number;
}) {
  const [open, setOpen] = useState(false);
  const handleTitleClick = useCallback(
    () => setOpen((prev: boolean) => !prev),
    []
  );

  const listItemFadeInDelay =
    parseFloat(styles.fadeInDuration) / props.content.list.length;

  return (
    <div
      className={styles.fadeIn}
      style={{ animationDelay: `${props.fadeInDelay}s` }}
    >
      <Heading2 onClick={handleTitleClick} color={props.color}>
        {props.content.title}
      </Heading2>
      <ul
        className={`${styles.dropdown} ${open ? styles.open : styles.closed}`}
      >
        {props.content.list.map((e, i) => (
          <li
            key={i}
            className={styles.fadeIn}
            style={{ animationDelay: `${i * listItemFadeInDelay}s` }}
          >
            <Marker color={props.color}>{e}</Marker>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function DropdownList(props: {
  contents: DropdownListContent[];
}) {
  const gradient = tinygradient(styles.startColor, styles.endColor);
  const lastIndex = props.contents.length - 1;
  const fadeInDelay = parseFloat(styles.fadeInDuration) / props.contents.length;

  return (
    <>
      {props.contents.map((content, i) => (
        <Dropdown
          content={content}
          key={i}
          color={gradient.rgbAt(i / lastIndex).toHexString()}
          fadeInDelay={i * fadeInDelay}
        />
      ))}
    </>
  );
}
