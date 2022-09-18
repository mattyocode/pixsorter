import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  useContext,
} from "react";
import { AnimatePresence } from "framer-motion";
import useHttp from "../../hooks/use-http";
import { SortCanvas } from "../Canvas";
import { ImageUIBtn, ImageUIBtnRound } from "../Buttons";
import { Loading } from "../Loading";
import { Parallax } from "../Parallax";
import useWindowDimensions from "../../hooks/use-window-dimensions";

import SortingContext from "../../store/sorting-context";

import styles from "./ImageUI.module.scss";
import AlgoContext from "../../store/algo-context";

type attributionData = {
  name: string;
  accountLink: string;
};

export function ImageUI() {
  const [image, setImage] = useState<string | null>(null);
  const [imgAttribution, setImgAttribution] = useState<attributionData | null>(
    null
  );
  const [imgDataUrl, setImgDataUrl] = useState<string | null>(null);
  const [canvasSize, setCanvasSize] = useState<number | null>(null);

  const {
    keepSorting,
    setKeepSorting,
    isSorted,
    setIsSorted,
    startedSorting,
    setStartedSorting,
  } = useContext(SortingContext);
  const algoCtx = useContext(AlgoContext);

  const { isLoading, error, sendRequest: fetchImg } = useHttp();
  const { width } = useWindowDimensions();
  const inputFile = useRef<HTMLInputElement | null>(null);

  const addImageData = useCallback(
    (imgData: any) => {
      const imgUrl = imgData.urls.regular;
      const name = imgData.user.name;
      const accountLink = imgData.user.links.html;
      if (imgData.urls.regular) {
        setImage(imgUrl);
        setImgAttribution({ name, accountLink });
        setStartedSorting(false);
      }
    },
    [setStartedSorting]
  );

  const shuffleImage = async (e: React.MouseEvent) => {
    e.preventDefault();
    setKeepSorting(false);
    fetchImg(
      {
        url: "/api/image",
      },
      addImageData
    );
  };

  const uploadFile = () => {
    setKeepSorting(false);
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
    setStartedSorting(true);
    if (!isSorted) setKeepSorting((prev) => !prev);
  };

  const resetSort = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isSorted) {
      setKeepSorting(false);
      setIsSorted(false);
      setStartedSorting(false);
      const imageSrc = image;
      setImage("");
      setTimeout(() => {
        setImage(imageSrc);
      }, 200);
    }
  };

  const downloader = (dataUrl: string, filename: string) => {
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = filename;
    link.click();
  };

  const downloadClickHandler = (e: React.MouseEvent) => {
    if (imgDataUrl) {
      downloader(imgDataUrl, "PixSorter download image");
    }
  };

  let sortBtnData: {
    src: string;
    label: string;
    alt: string;
    animate?: boolean;
  };

  sortBtnData = { src: "/icons/sort.svg", label: "Sort", alt: "sort image" };

  if (!isSorted && keepSorting)
    sortBtnData = {
      src: "/icons/pause.svg",
      label: "Pause",
      alt: "pause sorting",
    };
  else if (!isSorted && !keepSorting && startedSorting) {
    sortBtnData = {
      src: "/icons/sort.svg",
      label: "Resume",
      alt: "continue sorting",
    };
  } else if (isSorted)
    sortBtnData = {
      src: "/icons/reset.svg",
      label: "Reset",
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
    if (!image && image !== "") {
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
  }, [fetchImg, addImageData, setImage, image]);

  useEffect(() => {
    setStartedSorting(false);
  }, [algoCtx, setStartedSorting]);

  return (
    <Parallax offset={Math.round(canvasSize ? canvasSize / 12 : 25)}>
      <div className={styles.wrapper}>
        <div className={styles.topButtonWrapper}>
          <AnimatePresence>
            {startedSorting && (
              <ImageUIBtnRound
                src="/icons/save.svg"
                label="Save"
                alt="download file"
                width={25}
                height={25}
                clickHandler={downloadClickHandler}
              />
            )}
          </AnimatePresence>
        </div>
        <div className={styles.imageUI}>
          <div className={styles.canvas}>
            {canvasSize && image && (
              <SortCanvas
                imageSrc={image}
                width={canvasSize}
                height={canvasSize}
                setImgDataUrl={setImgDataUrl}
              />
            )}
          </div>
          {isLoading && <Loading />}
          <div className={styles.btnWrapper}>
            <ImageUIBtn
              src="/icons/shuffle.svg"
              label="New Img"
              alt="get new image"
              width={30}
              height={25}
              clickHandler={shuffleImage}
              confirm={true}
              confirmationActionName="Shuffling image"
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
              confirm={true}
              confirmationActionName="Uploading new image"
            />
            <ImageUIBtn
              src={sortBtnData.src}
              label={sortBtnData.label}
              alt={sortBtnData.alt}
              width={25}
              height={25}
              clickHandler={!isSorted ? toggleSort : resetSort}
              confirm={!isSorted ? false : true}
              confirmationActionName={!isSorted ? "" : "Resetting"}
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
    </Parallax>
  );
}
