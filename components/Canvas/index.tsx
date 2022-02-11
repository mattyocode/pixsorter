import React, { useEffect, useRef } from "react";

export function Canvas({
  draw,
  height,
  width,
}: {
  draw: (context: CanvasRenderingContext2D | null) => void;
  height: number;
  width: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      draw(context);
    }
  });

  return <canvas ref={canvasRef} height={height} width={width} />;
}
