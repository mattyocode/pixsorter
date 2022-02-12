import React, { useState } from "react";

import { Canvas } from "../Canvas";
import { ImageUIBtn } from "../Buttons";

import styles from "./ImageUI.module.scss";

export function ImageUI() {
  const [canvasImg, setCanvasImg] = useState<string>("/img/test-image.jpg");

  const shuffleImage = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/image");
      const data = await response.json();
      setCanvasImg(data.urls.regular);
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
          size={25}
          clickHandler={shuffleImage}
        />
        <ImageUIBtn
          src="/icons/upload.svg"
          label="Upload"
          alt="icon"
          size={25}
        />
        <ImageUIBtn src="/icons/sort.svg" label="Sort!" alt="icon" size={25} />
      </div>
    </div>
  );
}
