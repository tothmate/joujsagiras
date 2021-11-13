import React, { useCallback, useEffect, useState } from "react";
import AnimateHeight from "react-animate-height";
import tinygradient from "tinygradient";
import styles from "./dropdownList.module.scss";
import { Heading1, Heading2, Heading3 } from "./marker";
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

  const { onItemSelect, onlyVisibleItem, content } = props;
  const handleSubtitleClick = useCallback(
    (item) => {
      onItemSelect(onlyVisibleItem === item ? null : item);
    },
    [onItemSelect, onlyVisibleItem]
  );
  useEffect(() => {
    if (content.list.indexOf(onlyVisibleItem) > -1) {
      setOpen(true);
    }
  }, [onlyVisibleItem, content]);

  const fadeInDuration = parseFloat(styles.fadeInDuration);

  return (
    <div className={styles.fadeIn} style={{ animationDelay: `${props.fadeInDelay}s` }}>
      <AnimateHeight duration={fadeInDuration * 1000} height={props.onlyVisibleItem ? 0 : "auto"} animateOpacity>
        <Heading2 onClick={handleTitleClick} color={props.color}>
          {props.content.title}
        </Heading2>
      </AnimateHeight>
      {props.content.list.map((item, i) => (
        <AnimateHeight
          key={i}
          duration={fadeInDuration * 1000}
          height={
            (!props.onlyVisibleItem && open) || (props.onlyVisibleItem && props.onlyVisibleItem === item) ? "auto" : 0
          }
          animateOpacity
        >
          <Heading2 onClick={() => handleSubtitleClick(item)} color={props.color} classNames={[styles.dropdownItem]}>
            {item.subtitle}
          </Heading2>
        </AnimateHeight>
      ))}
    </div>
  );
}

export default function DropdownList(props: {
  prefix: string;
  contents: DropdownListContent[];
  onItemSelect: (item: DropdownListItem) => void;
  initialSelectedItem?: DropdownListItem;
}) {
  const [selectedItem, setSelectedItem] = useState<DropdownListItem | null>(props.initialSelectedItem);
  const { onItemSelect } = props;
  const handleItemSelected = useCallback(
    (item) => {
      onItemSelect(item);
      setSelectedItem(item);
    },
    [onItemSelect]
  );

  const gradient = tinygradient(styles.startColor, styles.endColor);
  const lastIndex = props.contents.length - 1;
  const fadeInDelay = parseFloat(styles.fadeInDuration) / props.contents.length;

  return (
    <>
      <Heading1>{props.prefix}</Heading1>
      <div>
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
      {selectedItem?.paragraphs.map((paragraph: string, i) => (
        <Paragraph key={i}>{paragraph}</Paragraph>
      ))}
    </>
  );
}
