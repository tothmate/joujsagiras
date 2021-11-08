import React, { useCallback, useState } from "react";
import tinygradient from "tinygradient";
import styles from "./dropdownList.module.scss";
import Marker, { Heading2 } from "./marker";
interface DropdownListContent {
  title: string;
  list: string[];
}

export function Dropdown(props: {
  title: string;
  list: string[];
  color: string;
}) {
  const [open, setOpen] = useState(false);
  const handleTitleClick = useCallback(
    () => setOpen((prev: boolean) => !prev),
    []
  );

  return (
    <>
      <Heading2 onClick={handleTitleClick} color={props.color}>
        {props.title}
      </Heading2>
      <ul
        className={`${styles.dropdown} ${open ? styles.open : styles.closed}`}
      >
        {props.list.map((e, i) => (
          <li key={i}>
            <Marker color={props.color}>{e}</Marker>
          </li>
        ))}
      </ul>
    </>
  );
}

export default function DropdownList(props: {
  content: DropdownListContent[];
}) {
  const gradient = tinygradient(styles.startColor, styles.endColor);
  const lastIndex = props.content.length - 1;

  return (
    <>
      {props.content.map((row, i) => (
        <Dropdown
          title={row.title}
          list={row.list}
          key={i}
          color={gradient.rgbAt(i / lastIndex).toHexString()}
        />
      ))}
    </>
  );
}
