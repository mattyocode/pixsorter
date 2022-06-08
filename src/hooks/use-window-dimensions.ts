import { useState, useEffect } from "react";

const getWindowDimensions = (): {
  width: number | undefined;
  height: number | undefined;
} => {
  let width, height;
  if (typeof window !== "undefined") {
    width = window.innerWidth;
    height = window.innerHeight;
  }
  return {
    width,
    height,
  };
};

const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState<{
    width: number | undefined;
    height: number | undefined;
  }>(getWindowDimensions());

  useEffect(() => {
    const handleResize = (): void => {
      setWindowDimensions(getWindowDimensions());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowDimensions;
};

export default useWindowDimensions;
