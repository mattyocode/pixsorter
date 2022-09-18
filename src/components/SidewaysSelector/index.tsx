import React, { useEffect, useRef, useState, RefObject } from "react";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
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
  }, [
    active,
    parentRef,
    optionRef.current?.offsetLeft,
    optionRef.current?.clientWidth,
  ]);

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
    height: 210,
    transition: {
      duration: 0.6,
      ease: "easeInOut",
    },
  },
};

const FieldInfo = ({
  active,
  parentRef,
  heading = null,
  bodyCopy = null,
  imageUrl = null,
  imageAlt = null,
  footer = null,
  ...restProps
}: {
  active: boolean;
  parentRef: RefObject<HTMLElement>;
  heading?: string | JSX.Element | null;
  bodyCopy?: string | null;
  imageUrl?: string | null;
  imageAlt?: string | null;
  footer?: string | null;
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
      {heading && <h4>{heading}</h4>}
      {bodyCopy && <p>{bodyCopy}</p>}
      {imageUrl && imageAlt && (
        <div className={styles.infoImage}>
          <Image src={imageUrl} alt={imageAlt} width={320} height={160} />
        </div>
      )}
      {footer && <p className={styles.footer}>{footer}</p>}
    </li>
  );
};

export function SidewaysSelector({
  field,
  values,
  selectedIdx,
  prevBtnHandler,
  nextBtnHandler,
  valueType = "",
}: {
  field: string;
  values: AlgoItemType[] | SortByItemType[];
  selectedIdx: number;
  prevBtnHandler: () => void;
  nextBtnHandler: () => void;
  valueType?: string;
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
  const fieldInfoWrapperRef = useRef<HTMLDivElement | null>(null);
  const loadedRef = useRef<boolean>(false);

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
      footer={value.description?.footer}
    />
  ));

  useEffect(() => {
    if (infoOpen) {
      controls.start("open");
    } else {
      controls.start("closed");
    }
  }, [controls, infoOpen]);

  useEffect(() => {
    preventScrollX(fieldValueRef);
    preventScrollX(fieldInfoRef);
  }, []);

  useEffect(() => {
    loadedRef.current = true;
  }, []);

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
            confirm={true}
            confirmationActionName={`Changing ${valueType}`}
          />
          <div>
            {loadedRef.current && (
              <ul ref={fieldValueRef} className={styles.fieldList}>
                {fieldValues}
              </ul>
            )}
          </div>
          <ImageUIBtn
            src="/icons/right.svg"
            alt="next option"
            width={25}
            height={25}
            clickHandler={incrementSelected}
            confirm={true}
            confirmationActionName={`Changing ${valueType}`}
          />
        </div>
        <div className={styles.actionIcon}>
          {infoOpen ? (
            <ImageUIBtn
              src="/icons/close.svg"
              alt="close information"
              width={18}
              height={18}
              clickHandler={toggleInfo}
              confirm={false}
            />
          ) : (
            <ImageUIBtn
              src="/icons/info.svg"
              alt="more information"
              width={18}
              height={18}
              clickHandler={toggleInfo}
              confirm={false}
            />
          )}
        </div>
      </div>
      <motion.div
        className={styles.infoRowWrapper}
        initial="closed"
        animate={controls}
        variants={fieldInfoVariants}
        ref={fieldInfoWrapperRef}
      >
        <ul ref={fieldInfoRef} className={styles.infoRow}>
          {fieldInfos}
        </ul>
      </motion.div>
    </div>
  );
}

const preventScrollX = (ref: RefObject<HTMLElement>) => {
  // Prevent selectors being scrollable - user has to click
  const stopScrolling = (e: WheelEvent) => {
    e.stopPropagation();
    e.preventDefault();
    window.scrollBy(0, e.deltaY);
  };

  let startY: number;

  const touchStart = (e: TouchEvent) => {
    startY = e.touches[0].pageY;
  };

  const stopSwiping = (e: TouchEvent) => {
    e.stopPropagation();
    e.preventDefault();

    const offsetY = startY - e.touches[0].pageY;
    window.scrollBy(0, offsetY);
  };

  const refCurrent = ref.current;
  refCurrent?.addEventListener("touchstart", touchStart);
  refCurrent?.addEventListener("touchmove", stopSwiping);
  refCurrent?.addEventListener("wheel", stopScrolling);

  return () => {
    refCurrent?.removeEventListener("touchstart", touchStart);
    refCurrent?.removeEventListener("touchmove", stopSwiping);
    refCurrent?.removeEventListener("wheel", stopScrolling);
  };
};
