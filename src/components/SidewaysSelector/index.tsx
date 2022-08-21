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
      // requestAnimationFrame(() => {
      if (optionRef.current) {
        optionRef.current.scrollIntoView({
          inline: "center",
          block: "nearest",
          behavior: "smooth",
        });
      }
      // });
    }
  }, [active]);

  return (
    <li ref={optionRef} className={styles.fieldListItem}>
      {value}
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
  active,
  ...restProps
}: {
  heading: string;
  bodyCopy: string;
  active: boolean;
}) => {
  const infoRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (active && infoRef.current) {
      setTimeout(() => {
        requestAnimationFrame(() => {
          if (infoRef.current) {
            infoRef.current.scrollIntoView({
              inline: "center",
              block: "nearest",
              behavior: "smooth",
            });
          }
        });
      }, 600);
    }
  }, [active]);

  return (
    <motion.li
      ref={infoRef}
      initial="closed"
      animate="open"
      exit="closed"
      variants={fieldInfoVariants}
      className={styles.fieldInfoWrapper}
      {...restProps}
    >
      <p>{bodyCopy}</p>
      <h3>{heading}</h3>
    </motion.li>
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

  const fieldValues = values.map((value, idx) => (
    <FieldValue
      key={`fieldValue-${value.value}-${idx}`}
      value={value.label}
      active={values[selectedIdx] === value}
    />
  ));

  const fieldInfos = values.map((value, idx) => (
    <FieldInfo
      key={`fieldInfo-${value.value}-${idx}`}
      heading={value.description.heading}
      bodyCopy={value.description.bodyCopy}
      active={values[selectedIdx] === value}
    />
  ));

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
          <div>
            <ul className={styles.fieldList}>{fieldValues}</ul>
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
      <div className={styles.infoRowWrapper}>
        <AnimatePresence>
          {infoOpen && <ul className={styles.infoRow}>{fieldInfos}</ul>}
        </AnimatePresence>
      </div>
    </div>
  );
}
