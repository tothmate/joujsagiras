import React, { useCallback, useState } from "react";
import styles from "./dropdown.module.scss";
import { Heading2 } from "./marker";

export default function Dropdown(props: {
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
            <Heading2 color={props.color}>{e}</Heading2>
          </li>
        ))}
      </ul>
    </>
  );
}
