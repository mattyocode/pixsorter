import React, { useEffect, useRef, useState, RefObject } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { ImageUIBtn } from "../Buttons";
import { AlgoItemType, SortByItemType } from "../../store/algoData";

import styles from "./SidewaysSelector.module.scss";

const FieldValue = ({
  value,
  active,
  parentRef,
}: {
  value: string;
  active: boolean;
  parentRef: RefObject<HTMLElement>;
}) => {
  const optionRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (active && optionRef.current && parentRef?.current) {
      parentRef.current.scrollTo({
        left: optionRef.current.offsetLeft - optionRef.current.clientWidth,
        behavior: "smooth",
      });
    }
  }, [active, parentRef]);

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
    height: 250,
    transition: {
      duration: 1,
      ease: "easeInOut",
    },
  },
};

const FieldInfo = ({
  heading,
  bodyCopy,
  active,
  parentRef,
  ...restProps
}: {
  heading: string | JSX.Element;
  bodyCopy: string;
  active: boolean;
  parentRef: RefObject<HTMLElement>;
}) => {
  const infoRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (active && infoRef.current && parentRef.current) {
      parentRef.current.scrollTo({
        left: infoRef.current?.offsetLeft,
        behavior: "smooth",
      });
    }
  }, [active, parentRef]);

  return (
    <li ref={infoRef} className={styles.fieldInfoWrapper} {...restProps}>
      <h3>{heading}</h3>
      <p>{bodyCopy}</p>
    </li>
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

  const fieldValueRef = useRef<HTMLUListElement | null>(null);
  const fieldInfoRef = useRef<HTMLUListElement | null>(null);
  const controls = useAnimation();

  const fieldValues = values.map((value, idx) => (
    <FieldValue
      key={`fieldValue-${value.value}-${idx}`}
      value={value.label}
      active={values[selectedIdx] === value}
      parentRef={fieldValueRef}
    />
  ));

  const fieldInfos = values.map((value, idx) => (
    <FieldInfo
      key={`fieldInfo-${value.value}-${idx}`}
      heading={value.description.heading}
      bodyCopy={value.description.bodyCopy}
      active={values[selectedIdx] === value}
      parentRef={fieldInfoRef}
    />
  ));

  useEffect(() => {
    if (infoOpen) {
      controls.start("open");
    } else {
      controls.start("closed");
    }
  }, [controls, infoOpen]);

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
            <ul ref={fieldValueRef} className={styles.fieldList}>
              {fieldValues}
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
      <motion.div
        className={styles.infoRowWrapper}
        initial="closed"
        animate={controls}
        variants={fieldInfoVariants}
      >
        <ul ref={fieldInfoRef} className={styles.infoRow}>
          {fieldInfos}
        </ul>
      </motion.div>
    </div>
  );
}
