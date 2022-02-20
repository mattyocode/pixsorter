import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  MutableRefObject,
  Dispatch,
  SetStateAction,
} from "react";
import { loadScaledImage } from "../../helpers/load-scaled-image";

import { Algorithm } from "../../global";

export function SortCanvas({
  imageSrc,
  algorithm,
  height,
  width,
  setIsSorted,
  keepSorting = false,
}: {
  imageSrc: string;
  algorithm?: Algorithm | undefined;
  height: number;
  width: number;
  setIsSorted: Dispatch<SetStateAction<boolean>>;
  keepSorting?: boolean;
}) {
  // const [imgData, setImgData] = useState<ImageData | null>(null);
  const [imgDataURL, setImgDataURL] = useState<string | null>(null);
  // const [remainingSort, setremainingSort] = useState<number>(0);
  const [renderLoops, setRenderLoops] = useState<number>(100);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  let imgData = useRef<ImageData | null>(null);
  let remainingSort: number;
  // let context: CanvasRenderingContext2D | null;
  let context = useRef<CanvasRenderingContext2D | null>(null);

  const compareBrightness = (array: number[], index: number): number => {
    return array[index] + array[index + 1] + array[index + 2];
  };

  const swap = (
    firstStartingIdx: number,
    secondStartingIdx: number,
    array: Uint8ClampedArray
  ) => {
    for (let i = 0; i < 3; i++) {
      let temp = array[firstStartingIdx + i];
      array[firstStartingIdx + i] = array[secondStartingIdx + i];
      array[secondStartingIdx + i] = temp;
    }
  };

  const bubbleSort = useCallback(
    (array: Uint8ClampedArray, pixelIdxLength = 4): Uint8ClampedArray => {
      if (!remainingSort) remainingSort = array.length;
      for (let i = 0; i < renderLoops; i++) {
        for (let j = 0; j < remainingSort; j += pixelIdxLength) {
          if (array[j] > array[j + pixelIdxLength]) {
            swap(j, j + pixelIdxLength, array);
          }
        }
        remainingSort -= pixelIdxLength;
      }
      return array;
    },
    []
  );

  // const draw = useCallback(
  //   (context: CanvasRenderingContext2D) => {
  //     if (keepSorting && imgData.current?.data && context) {
  //       bubbleSort(imgData.current.data);
  //       context.putImageData(imgData.current, 0, 0);
  //       requestAnimationFrame(draw(context));
  //     } else {
  //       console.log("FINISHED!");
  //     }
  //   },
  //   [bubbleSort, keepSorting]
  // );

  const draw = useCallback(() => {
    if (keepSorting && imgData.current?.data && context.current) {
      bubbleSort(imgData.current.data);
      context.current.putImageData(imgData.current, 0, 0);
      requestAnimationFrame(draw);
    } else {
      console.log("FINISHED!");
      console.log(keepSorting, imgData.current?.data, context);
    }
  }, [bubbleSort, keepSorting, context]);

  useEffect(() => {
    if (canvasRef.current) {
      context.current = canvasRef.current.getContext("2d");
      if (context.current && imgData) {
        let image = loadScaledImage(context.current, imageSrc, width, height);
        imgData.current = context.current.getImageData(0, 0, width, height);
        // const dataURL = canvasRef.current.toDataURL();
      }
    }
    return () => {
      context.current = null;
    };
  }, [imageSrc, height, width]);

  useEffect(() => {
    if (canvasRef.current && keepSorting) {
      requestAnimationFrame(draw);
    }
    return () => {
      if (context.current) {
        cancelAnimationFrame(context.current);
      }
    };
  }, [canvasRef, keepSorting, draw]);

  return <canvas ref={canvasRef} height={height} width={width} />;
}
