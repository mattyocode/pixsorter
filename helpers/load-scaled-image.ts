const scaleToFill = (img: HTMLImageElement, width: number, height: number) => {
  const scale = Math.max(width / img.width, height / img.height);
  const x = width / 2 - (img.width / 2) * scale;
  const y = height / 2 - (img.height / 2) * scale;
  const scaledWidth = img.width * scale;
  const scaledHeight = img.height * scale;
  return { x, y, scaledWidth, scaledHeight };
};

export const loadScaledImage = (
  context: CanvasRenderingContext2D,
  imageSrc: string,
  width: number,
  height: number
) => {
  const image = new Image();
  image.setAttribute("crossOrigin", "anonymous");
  image.src = imageSrc;
  image.onload = function () {
    const { x, y, scaledWidth, scaledHeight } = scaleToFill(
      image,
      width,
      height
    );
    context.drawImage(image, x, y, scaledWidth, scaledHeight);
  };
};
