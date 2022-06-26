import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useContext,
  Dispatch,
  SetStateAction,
} from "react";
import AlgoContext from "../../store/algo-context";
import { loadScaledImage } from "../../utils/load-scaled-image";

import styles from "./Canvas.module.scss";

export function SortCanvas({
  imageSrc,
  height,
  width,
  stopSorting,
  keepSorting,
  isSorted,
  setIsSorted,
}: {
  imageSrc: string;
  height: number;
  width: number;
  stopSorting: () => void;
  keepSorting?: boolean;
  isSorted: boolean;
  setIsSorted: Dispatch<SetStateAction<boolean>>;
}) {
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [remainingSort, setRemainingSort] = useState<number | null>(null);
  const algoCtx = useContext(AlgoContext);
  const algorithm = algoCtx.algos[algoCtx.algoIdx].function;
  const sortBy = algoCtx.sortByOptions[algoCtx.sortByIdx].function;

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
        let newSortPosition = algorithm(
          imgData.current.data,
          finishedSorting,
          sortBy,
          remainingSort,
        );
        setRemainingSort(newSortPosition);
        context.current.putImageData(imgData.current, 0, 0);
        requestId.current = requestAnimationFrame(draw);
      }
    }
  }, [
    algorithm,
    sortBy,
    keepSorting,
    stopSorting,
    isSorted,
    setIsSorted,
    context,
    remainingSort,
  ]);

  useEffect(() => {
    setImageLoaded(false);
    setRemainingSort(null);
    setIsSorted(false);
    stopSorting();
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
  }, [stopSorting, imageSrc, height, width, setIsSorted, sortBy, algorithm]);

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

  return (
    <div className={styles.canvas}>
      <canvas ref={canvasRef} height={height} width={width} />
    </div>
  );
}
