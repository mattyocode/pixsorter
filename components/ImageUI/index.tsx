import React, { useRef, useState, useEffect, useCallback } from "react";
import useHttp from "../../hooks/use-http";
import { SortCanvas } from "../Canvas";
import { ImageUIBtn } from "../Buttons";
import { Loading } from "../Loading";
import useWindowDimensions from "../../hooks/use-window-dimensions";
import { Algorithm } from "../../global";

import styles from "./ImageUI.module.scss";

type imageUIProps = {
  algorithmToUse?: Algorithm | undefined;
};

type attributionData = {
  name: string;
  accountLink: string;
};

export function ImageUI() {
  const [image, setImage] = useState<string | null>(null);
  const [imgAttribution, setImgAttribution] = useState<attributionData | null>(
    null
  );
  const [canvasSize, setCanvasSize] = useState<number | null>(null);
  const [keepSorting, setKeepSorting] = useState<boolean>(false);
  const [isSorted, setIsSorted] = useState<boolean>(false);

  const { isLoading, error, sendRequest: fetchImg } = useHttp();
  const { width } = useWindowDimensions();
  const inputFile = useRef<HTMLInputElement | null>(null);

  const addImageData = (imgData: any) => {
    const imgUrl = imgData.urls.regular;
    const name = imgData.user.name;
    const accountLink = imgData.user.links.html;
    setImage(imgUrl);
    setImgAttribution({ name, accountLink });
  };

  const stopSort = useCallback(() => {
    setKeepSorting(false);
  }, [setKeepSorting]);

  const shuffleImage = async (e: React.MouseEvent) => {
    e.preventDefault();
    stopSort();
    fetchImg(
      {
        url: "/api/image",
      },
      addImageData
    );
  };

  const uploadFile = () => {
    stopSort();
    if (inputFile.current) {
      inputFile.current.click();
    }
  };

  const resetInputValue = (
    event: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => {
    const element = event.target as HTMLInputElement;
    element.value = "";
  };

  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files) {
      const file = e.target.files[0];
      const url = window.URL.createObjectURL(file);
      setImage(url);
    }
  };

  const toggleSort = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isSorted) setKeepSorting((prev) => !prev);
  };

  const resetSort = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isSorted) {
      setKeepSorting(false);
      setIsSorted(false);
      const imageSrc = image;
      setImage(null);
      setTimeout(() => {
        setImage(imageSrc);
      }, 200);
    }
  };

  let sortBtnData: {
    src: string;
    label: string;
    alt: string;
  } = { src: "/icons/sort.svg", label: "Sort", alt: "sort image" };

  if (!isSorted && keepSorting)
    sortBtnData = {
      src: "/icons/sort.svg",
      label: "Sorting",
      alt: "sort image",
    };
  else if (isSorted)
    sortBtnData = {
      src: "/icons/reset.svg",
      label: "Reset?",
      alt: "reset sorted image",
    };

  useEffect(() => {
    if (width && !keepSorting) {
      switch (true) {
        case width >= 450:
          setCanvasSize(400);
          break;
        case width >= 425:
          setCanvasSize(380);
          break;
        default:
          setCanvasSize(320);
      }
    }
  }, [width, keepSorting]);

  useEffect(() => {
    if (!image) {
      try {
        fetchImg(
          {
            url: "/api/image",
          },
          addImageData
        );
      } catch {
        setImage("img/test-image.jpg");
      }
    }
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.imageUI}>
        {canvasSize && image && (
          <SortCanvas
            imageSrc={image}
            width={canvasSize}
            height={canvasSize}
            keepSorting={keepSorting}
            stopSorting={stopSort}
            isSorted={isSorted}
            setIsSorted={setIsSorted}
          />
        )}
        {isLoading && <Loading />}
        <div className={styles.btnWrapper}>
          <ImageUIBtn
            src="/icons/shuffle.svg"
            label="New Img"
            alt="get new image"
            width={30}
            height={25}
            clickHandler={shuffleImage}
          />
          <input
            type="file"
            id="file"
            ref={inputFile}
            style={{ display: "none" }}
            onChange={onChangeFile}
            onClick={resetInputValue}
          />
          <ImageUIBtn
            src="/icons/upload.svg"
            label="Upload"
            alt="upload file"
            width={25}
            height={25}
            clickHandler={uploadFile}
          />
          <ImageUIBtn
            src={sortBtnData.src}
            label={sortBtnData.label}
            alt={sortBtnData.alt}
            width={25}
            height={25}
            clickHandler={!isSorted ? toggleSort : resetSort}
          />
        </div>
      </div>
      <div className={styles.attribution}>
        {imgAttribution && (
          <p>
            Photo by{" "}
            <a
              href={`${imgAttribution.accountLink}?utm_source=pixsorter&utm_medium=referral`}
            >
              {imgAttribution.name}
            </a>{" "}
            on{" "}
            <a href="https://unsplash.com/?utm_source=pixsorter&utm_medium=referral">
              Unsplash
            </a>
          </p>
        )}
      </div>
    </div>
  );
}
