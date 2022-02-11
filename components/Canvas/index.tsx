import React, { useEffect, useRef } from "react";

const draw = (
  context: CanvasRenderingContext2D,
  imageSrc: string,
  width: number,
  height: number
) => {
  const image = new Image();
  image.setAttribute("crossOrigin", "anonymous");
  image.src = imageSrc;
  image.onload = function () {
    context.drawImage(image, 0, 0, width, height);
  };
};

export function Canvas({
  imageSrc,
  height,
  width,
}: {
  imageSrc: string;
  height: number;
  width: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        draw(context, imageSrc, width, height);
      }
    }
  });

  return <canvas ref={canvasRef} height={height} width={width} />;
}
