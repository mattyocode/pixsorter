import React, { useEffect, useState, useRef, useCallback } from "react";
import { loadScaledImage } from "../../utils/load-scaled-image";

import {
  compareBrightness,
  compareBlue,
} from "../../utils/algos/pixel-comparison";
import { bubbleSort } from "../../utils/algos/bubble-sort";
import { Algorithm } from "../../global";

export function SortCanvas({
  imageSrc,
  algorithm,
  height,
  width,
  stopSorting,
  keepSorting,
}: {
  imageSrc: string;
  algorithm?: Algorithm | undefined;
  height: number;
  width: number;
  stopSorting: () => void;
  keepSorting?: boolean;
}) {
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [isSorted, setIsSorted] = useState<boolean>(false);
  const [remainingSort, setRemainingSort] = useState<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  let imgData = useRef<ImageData | null>(null);
  let context = useRef<CanvasRenderingContext2D | null>(null);
  let requestId = useRef<number | null>(null);

  const draw = useCallback(() => {
    const finishedSorting = () => {
      setIsSorted(true);
      stopSorting();
    };
    if (keepSorting && !isSorted) {
      if (imgData.current?.data && context.current) {
        bubbleSort(
          imgData.current.data,
          finishedSorting,
          compareBlue,
          remainingSort,
          setRemainingSort
        );
        context.current.putImageData(imgData.current, 0, 0);
        requestId.current = requestAnimationFrame(draw);
      }
    }
    // else {
    //   console.log("FINISHED!");
    //   if (requestId.current) {
    //     cancelAnimationFrame(requestId.current);
    //   }
    // }
  }, [keepSorting, stopSorting, isSorted, context, remainingSort]);

  useEffect(() => {
    setImageLoaded(false);
    setRemainingSort(null);
    setIsSorted(false);
    if (canvasRef.current) {
      context.current = canvasRef.current.getContext("2d");
      if (context.current) {
        loadScaledImage(
          context.current,
          imageSrc,
          width,
          height,
          setImageLoaded
        );
      }
    }
  }, [imageSrc, height, width]);

  useEffect(() => {
    if (imageLoaded && context.current) {
      imgData.current = context.current.getImageData(0, 0, width, height);
    }
  }, [imageLoaded, context, height, width]);

  useEffect(() => {
    if (canvasRef.current && keepSorting && !isSorted) {
      requestId.current = requestAnimationFrame(draw);
    }
    return () => {
      if (context.current && requestId.current) {
        cancelAnimationFrame(requestId.current);
      }
    };
  }, [canvasRef, keepSorting, isSorted, draw]);

  return <canvas ref={canvasRef} height={height} width={width} />;
}
