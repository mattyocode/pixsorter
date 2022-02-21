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
  stopSorting,
  // setKeepSorting,
  keepSorting,
}: {
  imageSrc: string;
  algorithm?: Algorithm | undefined;
  height: number;
  width: number;
  stopSorting: () => void;
  // setKeepSorting: Dispatch<SetStateAction<boolean>>;
  keepSorting?: boolean;
}) {
  const [renderLoops, setRenderLoops] = useState<number>(100);
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [isSorted, setIsSorted] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  let imgData = useRef<ImageData | null>(null);
  let remainingSort = useRef<number | null>(null);
  let context = useRef<CanvasRenderingContext2D | null>(null);
  let requestId = useRef<number | null>(null);

  let compare: (array: Uint8ClampedArray, index: number) => number;

  const compareBrightness = (
    array: Uint8ClampedArray,
    index: number
  ): number => {
    return array[index] + array[index + 1] + array[index + 2];
  };

  const compareRed = (array: Uint8ClampedArray, index: number): number => {
    return array[index];
  };

  const compareBlue = (array: Uint8ClampedArray, index: number): number => {
    return array[index + 1];
  };

  const compareGreen = (array: Uint8ClampedArray, index: number): number => {
    return array[index + 2];
  };

  const compareAlpha = (array: Uint8ClampedArray, index: number): number => {
    return array[index + 3];
  };

  compare = compareBrightness;

  const swap = (
    firstStartingIdx: number,
    secondStartingIdx: number,
    array: Uint8ClampedArray
  ) => {
    for (let i = 0; i < 4; i++) {
      let temp = array[firstStartingIdx + i];
      array[firstStartingIdx + i] = array[secondStartingIdx + i];
      array[secondStartingIdx + i] = temp;
    }
  };

  const bubbleSort = useCallback(
    (
      array: Uint8ClampedArray,
      sortedCallback: () => void,
      pixelIdxLength: number = 4
    ): Uint8ClampedArray => {
      if (!remainingSort.current) remainingSort.current = array.length;
      for (let i = 0; i < renderLoops; i++) {
        if (remainingSort.current <= pixelIdxLength) {
          sortedCallback();
        }
        for (let j = 0; j < remainingSort.current; j += pixelIdxLength) {
          if (compare(array, j) > compare(array, j + pixelIdxLength)) {
            swap(j, j + pixelIdxLength, array);
          }
        }
        remainingSort.current -= pixelIdxLength;
      }
      return array;
    },
    [renderLoops, compare]
  );

  const draw = useCallback(() => {
    if (keepSorting && !isSorted) {
      if (imgData.current?.data && context.current) {
        bubbleSort(imgData.current.data, stopSorting);
        context.current.putImageData(imgData.current, 0, 0);
        requestId.current = requestAnimationFrame(draw);
        console.log("Keep sorting in draw > ", keepSorting);
      }
    } else {
      console.log("FINISHED!");
      if (requestId.current) {
        cancelAnimationFrame(requestId.current);
      }
    }
  }, [bubbleSort, keepSorting, isSorted, context, stopSorting]);

  useEffect(() => {
    setImageLoaded(false);
    remainingSort.current = null;
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
      console.log("IMG DATA >", imgData.current);
      console.log("context.current >", context.current);
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
