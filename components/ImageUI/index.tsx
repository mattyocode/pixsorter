import React, { useRef, useState, useEffect } from "react";
import useHttp from "../../hooks/use-http";
import { Canvas } from "../Canvas";
import { ImageUIBtn } from "../Buttons";
import { Loading } from "../Loading";
import useWindowDimensions from "../../hooks/use-window-dimensions";

import styles from "./ImageUI.module.scss";

type attributionData = {
  name: string;
  accountLink: string;
};

export function ImageUI() {
  const [image, setimage] = useState<string>("/img/test-image.jpg");
  const [imgAttribution, setImgAttribution] = useState<attributionData | null>(
    null
  );
  const [canvasSize, setCanvasSize] = useState<number | null>(null);
  const { isLoading, error, sendRequest: fetchImg } = useHttp();
  const { width } = useWindowDimensions();
  const inputFile = useRef<HTMLInputElement | null>(null);

  const addImageData = (imgData: any) => {
    const imgUrl = imgData.urls.regular;
    const name = imgData.user.name;
    const accountLink = imgData.user.links.html;
    setimage(imgUrl);
    setImgAttribution({ name, accountLink });
  };

  const shuffleImage = async (e: React.MouseEvent) => {
    e.preventDefault();
    fetchImg(
      {
        url: "/api/image",
      },
      addImageData
    );
  };

  const uploadFile = () => {
    if (inputFile.current) {
      inputFile.current.click();
    }
  };

  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files) {
      const file = e.target.files[0];
      console.log(file);
      const url = window.URL.createObjectURL(file);
      setimage(url);
    }
  };

  useEffect(() => {
    if (width) {
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
  }, [width]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.imageUI}>
        {canvasSize && (
          <Canvas imageSrc={image} width={canvasSize} height={canvasSize} />
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
            src="/icons/sort.svg"
            label="Sort!"
            alt="sort image"
            width={25}
            height={25}
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
