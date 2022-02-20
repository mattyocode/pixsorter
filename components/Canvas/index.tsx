import React, { useEffect, useRef } from "react";
import { loadScaledImage } from "../../helpers/load-scaled-image";

import { Algorithm } from "../../global";

export function SortCanvas({
  imageSrc,
  algorithm,
  height,
  width,
}: {
  imageSrc: string;
  algorithm?: Algorithm | undefined;
  height: number;
  width: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        loadScaledImage(context, imageSrc, width, height);
      }
    }
  }, [imageSrc, height, width]);

  return <canvas ref={canvasRef} height={height} width={width} />;
}
