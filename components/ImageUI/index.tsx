import React, { useState } from "react";
import useHttp from "../../hooks/use-http";
import { Canvas } from "../Canvas";
import { ImageUIBtn } from "../Buttons";

import styles from "./ImageUI.module.scss";

export function ImageUI() {
  const [canvasImg, setCanvasImg] = useState<string>("/img/test-image.jpg");
  const { isLoading, error, sendRequest: fetchImg } = useHttp();

  const addImageData = (imgData: any) => {
    setCanvasImg(imgData.urls.regular);
  };

  const shuffleImage = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      // const response = await fetch("/api/image");
      fetchImg(
        {
          url: "/api/image",
        },
        addImageData
      );
    } catch (error) {
      console.log("error in imageUI", error);
    }
  };

  return (
    <div className={styles.imageUIWrapper}>
      <Canvas imageSrc={canvasImg} width={400} height={400} />
      <div className={styles.btnWrapper}>
        <ImageUIBtn
          src="/icons/shuffle.svg"
          label="New Img"
          alt="icon"
          width={30}
          height={25}
          clickHandler={shuffleImage}
        />
        <ImageUIBtn
          src="/icons/upload.svg"
          label="Upload"
          alt="icon"
          width={25}
          height={25}
        />
        <ImageUIBtn
          src="/icons/sort.svg"
          label="Sort!"
          alt="icon"
          width={25}
          height={25}
        />
      </div>
    </div>
  );
}
