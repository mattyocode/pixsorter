import React, { useEffect, useRef, useState, RefObject } from "react";
import Image from "next/image";
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
      duration: 0.6,
      ease: "easeInOut",
    },
  },
};

const FieldInfo = ({
  heading,
  active,
  parentRef,
  bodyCopy = null,
  imageUrl = null,
  imageAlt = null,
  ...restProps
}: {
  heading: string | JSX.Element;
  active: boolean;
  parentRef: RefObject<HTMLElement>;
  bodyCopy?: string | null;
  imageUrl?: string | null;
  imageAlt?: string | null;
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
      <h4>{heading}</h4>
      {bodyCopy && <p>{bodyCopy}</p>}
      {imageUrl && imageAlt && (
        <div className={styles.infoImage}>
          <Image src={imageUrl} alt={imageAlt} width={320} height={160} />
        </div>
      )}
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

  // const stopScrolling = (e: React.MouseEvent | React.TouchEvent) => {
  //   e.stopPropagation();
  //   e.preventDefault();
  // };

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
      active={values[selectedIdx] === value}
      parentRef={fieldInfoRef}
      bodyCopy={value.description?.bodyCopy}
      imageUrl={value.description?.imageUrl}
      imageAlt={value.description?.imageAlt}
    />
  ));

  useEffect(() => {
    if (infoOpen) {
      controls.start("open");
      console.log("infoOpen");
    } else {
      controls.start("closed");
      console.log("info closed");
    }
  }, [controls, infoOpen]);

  useEffect(() => {
    // Prevent selectors being scrollable - user has to click
    const stopScrolling = (ev: WheelEvent | TouchEvent) => {
      ev.stopPropagation();
      ev.preventDefault();
    };
    const fieldInfoRefCurrent = fieldInfoRef.current;
    fieldInfoRefCurrent?.addEventListener("wheel", stopScrolling);
    fieldInfoRefCurrent?.addEventListener("touchmove", stopScrolling);

    return () => {
      fieldInfoRefCurrent?.removeEventListener("wheel", stopScrolling);
      fieldInfoRefCurrent?.removeEventListener("touchmove", stopScrolling);
    };
  });

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
          {infoOpen ? (
            <ImageUIBtn
              src="/icons/close.svg"
              alt="more information"
              width={18}
              height={18}
              clickHandler={toggleInfo}
            />
          ) : (
            <ImageUIBtn
              src="/icons/info.svg"
              alt="more information"
              width={18}
              height={18}
              clickHandler={toggleInfo}
            />
          )}
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
