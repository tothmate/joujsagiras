import React, { useCallback, useEffect, useState } from "react";
import tinygradient from "tinygradient";
import styles from "./dropdownList.module.scss";
import { Heading2, Heading3, Heading4 } from "./marker";
import Paragraph from "./paragraph";
export interface DropdownListItem {
  subtitle: string;
  paragraphs: string[];
}
export interface DropdownListContent {
  title: string;
  list: DropdownListItem[];
}

export function Dropdown(props: {
  content: DropdownListContent;
  color: string;
  fadeInDelay: number;
  onItemSelect: (item: DropdownListItem) => void;
  onlyVisibleItem: DropdownListItem | null;
}) {
  const [open, setOpen] = useState(false);
  const handleTitleClick = useCallback(() => setOpen((prev: boolean) => !prev), []);

  const { onItemSelect } = props;
  const handleSubtitleClick = useCallback(
    (slug) => {
      onItemSelect(slug);
    },
    [onItemSelect]
  );

  const listItemFadeInDelay = parseFloat(styles.fadeInDuration) / props.content.list.length;
  const shouldHideItem = (item: DropdownListItem) => props.onlyVisibleItem && props.onlyVisibleItem !== item;

  return (
    <div className={styles.fadeIn} style={{ animationDelay: `${props.fadeInDelay}s` }}>
      <Heading2
        onClick={handleTitleClick}
        color={props.color}
        classNames={[styles.dropdownTitle, props.onlyVisibleItem ? styles.hidden : ""]}
      >
        {props.content.title}
      </Heading2>
      <ul className={`${styles.dropdown} ${open || props.onlyVisibleItem ? styles.open : styles.closed}`}>
        {props.content.list.map((item, i) => (
          <li
            key={i}
            className={styles.fadeIn}
            style={{
              animationDelay: `${i * listItemFadeInDelay}s`,
              display: shouldHideItem(item) ? "none" : "block",
            }}
          >
            <Heading4
              onClick={() => handleSubtitleClick(item)}
              color={props.color}
              classNames={[styles.dropdownTitle, shouldHideItem(item) ? styles.hidden : ""]}
            >
              {item.subtitle}
            </Heading4>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function DropdownList(props: {
  prefix: string;
  contents: DropdownListContent[];
  onItemSelect: (item: DropdownListItem) => void;
  initialSelectedItem?: DropdownListItem;
}) {
  const [selectedItem, setSelectedItem] = useState<DropdownListItem | null>(null);
  const { onItemSelect, initialSelectedItem } = props;
  const handleItemSelected = useCallback(
    (item) => {
      setSelectedItem(item);
      onItemSelect(item);
    },
    [onItemSelect]
  );
  useEffect(() => {
    setSelectedItem(initialSelectedItem);
  }, [initialSelectedItem]);

  const gradient = tinygradient(styles.startColor, styles.endColor);
  const lastIndex = props.contents.length - 1;
  const fadeInDelay = parseFloat(styles.fadeInDuration) / props.contents.length;

  return (
    <>
      <div className={styles.dropdownList}>
        <Heading3>{props.prefix}</Heading3>
        <div className={styles.dropdownListMain}>
          {props.contents.map((content, i) => (
            <Dropdown
              content={content}
              key={i}
              color={gradient.rgbAt(i / lastIndex).toHexString()}
              fadeInDelay={i * fadeInDelay}
              onItemSelect={handleItemSelected}
              onlyVisibleItem={selectedItem}
            />
          ))}
        </div>
      </div>
      {selectedItem?.paragraphs.map((paragraph: string, i) => (
        <Paragraph key={i}>{paragraph}</Paragraph>
      ))}
    </>
  );
}
