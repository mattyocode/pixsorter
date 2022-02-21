import React, { useEffect, useState, useRef, useCallback } from "react";
import { loadScaledImage } from "../../helpers/load-scaled-image";

import { compareBrightness } from "../../helpers/pixel-comparison";
import { bubbleSort } from "../../helpers/bubble-sort";
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
  const canvasRef = useRef<HTMLCanvasElement>(null);

  let imgData = useRef<ImageData | null>(null);
  let remainingSort = useRef<number | undefined>(undefined);
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
          compareBrightness,
          remainingSort.current
        );
        context.current.putImageData(imgData.current, 0, 0);
        requestId.current = requestAnimationFrame(draw);
      }
    } else {
      console.log("FINISHED!");
      if (requestId.current) {
        cancelAnimationFrame(requestId.current);
      }
    }
  }, [keepSorting, stopSorting, isSorted, context]);

  useEffect(() => {
    setImageLoaded(false);
    remainingSort.current = undefined;
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
