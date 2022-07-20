import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ImageUIBtn } from "../Buttons";
import { AlgoItemType, SortByItemType } from "../../store/algoData";

import styles from "./SidewaysSelector.module.scss";

const FieldValue = ({ value, active }: { value: string; active: boolean }) => {
  const optionRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (active && optionRef.current) {
      optionRef.current.scrollIntoView({
        inline: "center",
        block: "nearest",
        behavior: "smooth",
      });
    }
  }, [active]);

  return (
    <li ref={optionRef}>
      {value}
      {/* {active && (
        <div className={styles.fieldIcon}>
          <Image
            src="/icons/slow.svg"
            height={25}
            width={25}
            alt="more information"
            className={styles.fieldIcon}
          />
        </div>
      )} */}
    </li>
  );
};

const fieldInfoVariants = {
  closed: {
    height: 0,
  },
  open: {
    height: 200,
    transition: {
      duration: 0.3,
    },
  },
};

const FieldInfo = ({
  heading,
  bodyCopy,
  children,
  ...restProps
}: {
  heading: string;
  bodyCopy: string;
  children: React.Component;
  // imageSrc: string | null;
}) => {
  return (
    <motion.div
      initial="closed"
      animate="open"
      exit="closed"
      variants={fieldInfoVariants}
      className={styles.fieldInfoWrapper}
      {...restProps}
    >
      <h3>{heading}</h3>
      <p>{bodyCopy}</p>
    </motion.div>
  );
};

export function SidewaysSelector({
  field,
  values,
  selectedIdx,
  prevBtnHandler,
  nextBtnHandler,
}: {
  field: string;
  values: AlgoItemType[] | SortByItemType[];
  selectedIdx: number;
  prevBtnHandler: () => void;
  nextBtnHandler: () => void;
}) {
  const [infoOpen, setInfoOpen] = useState<boolean>(false);
  const decrementSelected = (e: React.MouseEvent) => {
    e.preventDefault();
    prevBtnHandler();
  };

  const incrementSelected = (e: React.MouseEvent) => {
    e.preventDefault();
    nextBtnHandler();
  };

  const toggleInfo = (e: React.MouseEvent) => {
    e.preventDefault();
    setInfoOpen((prev) => !prev);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.selectorRow}>
        <label htmlFor="fieldInput" className={styles.field}>
          <h3>{field}</h3>
        </label>
        <div className={styles.optionsWrapper}>
          <ImageUIBtn
            src="/icons/left.svg"
            alt="prev option"
            width={25}
            height={25}
            clickHandler={decrementSelected}
          />
          <div className={styles.fieldWrapper}>
            <ul>
              {values.map((value, idx) => (
                <FieldValue
                  key={`fieldValue-${value.value}-${idx}`}
                  value={value.label}
                  active={values[selectedIdx] === value}
                />
              ))}
            </ul>
          </div>
          <ImageUIBtn
            src="/icons/right.svg"
            alt="next option"
            width={25}
            height={25}
            clickHandler={incrementSelected}
          />
        </div>
        <div className={styles.actionIcon}>
          <ImageUIBtn
            src="/icons/info.svg"
            alt="more information"
            width={18}
            height={18}
            clickHandler={toggleInfo}
          />
        </div>
      </div>
      <div className={styles.infoRow}>
        <AnimatePresence>
          {infoOpen && (
            <FieldInfo
              heading="Avg. time: O(n²) | Avg Space: O(1)"
              bodyCopy="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut tempor ultrices enim, nec tincidunt nisi imperdiet sed. Morbi blandit sem in velit vulputate, suscipit interdum felis finibus. Sed suscipit tincidunt lorem, at rhoncus tellus rhoncus at. Vestibulum congue consectetur orci, sit amet pellentesque lacus vestibulum et."
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
