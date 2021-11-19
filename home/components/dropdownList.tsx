import React, { useCallback, useState } from "react";
import AnimateHeight from "react-animate-height";
import tinygradient from "tinygradient";
import styles from "./dropdownList.module.scss";
import Marker, { Heading2 } from "./marker";
import Paragraph from "./paragraph";
export interface DropdownListItem {
  subtitle: string;
  paragraphs: string[];
}
export interface DropdownListCategory {
  title: string;
  list: DropdownListItem[];
}

interface DropdownVisibility {
  isTitleVisible: boolean;
  isItemsVisible: boolean;
  selectedItem: DropdownListItem;
}

const animateHeightDuration = parseFloat(styles.fadeInDuration) * 1000;
const gradient = tinygradient(styles.startColor, styles.endColor);

function Closable(props: { closed: boolean; children: React.ReactNode }) {
  return (
    <div className={styles.closable}>
      {props.children}
      <span className={styles.closableButton} style={{ visibility: props.closed ? "hidden" : "visible" }}>
        ✕
      </span>
    </div>
  );
}

function Dropdown(props: {
  category: DropdownListCategory;
  color: string;
  fadeInDelay: number;
  visibility: DropdownVisibility;
  onCategorySelect: (category: DropdownListCategory) => void;
  onItemSelect: (item: DropdownListItem) => void;
}) {
  return (
    <div className={styles.fadeIn} style={{ animationDelay: `${props.fadeInDelay}s` }}>
      <AnimateHeight
        duration={animateHeightDuration}
        height={props.visibility.isTitleVisible ? "auto" : 0}
        animateOpacity
      >
        <Heading2 onClick={() => props.onCategorySelect(props.category)} color={props.color}>
          <Closable closed={!props.visibility.isItemsVisible}>{props.category.title}</Closable>
        </Heading2>
      </AnimateHeight>
      {props.category.list.map((item, i) => (
        <AnimateHeight
          key={i}
          duration={animateHeightDuration}
          height={props.visibility.isItemsVisible || props.visibility.selectedItem === item ? "auto" : 0}
          animateOpacity
        >
          <Heading2
            onClick={() => props.onItemSelect(item)}
            color={props.color}
            classNames={[props.visibility.selectedItem === item ? "" : styles.shrinkedDropdownItem]}
          >
            <Closable closed={props.visibility.selectedItem !== item}>{item.subtitle}</Closable>
          </Heading2>
        </AnimateHeight>
      ))}
    </div>
  );
}

export default function DropdownList(props: {
  prefix: string;
  categories: DropdownListCategory[];
  onItemSelect: (item: DropdownListItem) => void;
  selectedItem?: DropdownListItem;
}) {
  const { onItemSelect } = props;

  const [selectedCategory, setSelectedCategory] = useState<DropdownListCategory | undefined>(
    props.categories.find((category) => category.list.some((item) => item === props.selectedItem))
  );
  const [selectedItem, setSelectedItem] = useState<DropdownListItem | undefined>(props.selectedItem);

  const handleCategorySelected = useCallback(
    (category) => setSelectedCategory((prev) => (prev === category ? undefined : category)),
    []
  );
  const handleItemSelected = useCallback(
    (item) => {
      onItemSelect(item);
      setSelectedItem((prev) => (prev === item ? undefined : item));
    },
    [onItemSelect]
  );

  const noCategorySelected = selectedCategory === undefined;
  const lastIndex = props.categories.length - 1;
  const fadeInDelay = parseFloat(styles.fadeInDuration) / props.categories.length;

  return (
    <>
      <div className={styles.dropdownListWrapper}>
        <Marker element="link" href="/milyen" classNames={[styles.dropdownTitle]}>
          {props.prefix}
        </Marker>
        <div className={styles.dropdownList}>
          <AnimateHeight duration={animateHeightDuration} height={noCategorySelected ? "auto" : 0}>
            <div className={styles.spacerItem}></div>
          </AnimateHeight>
          {props.categories.map((category, i) => (
            <Dropdown
              key={i}
              category={category}
              color={gradient.rgbAt(i / lastIndex).toHexString()}
              fadeInDelay={i * fadeInDelay}
              visibility={{
                isTitleVisible: selectedItem === undefined && (noCategorySelected || selectedCategory === category),
                isItemsVisible: selectedItem === undefined && selectedCategory === category,
                selectedItem,
              }}
              onCategorySelect={handleCategorySelected}
              onItemSelect={handleItemSelected}
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
