const copy = (
  fromArray: Uint8ClampedArray | number[],
  fromArrayIdx: number,
  toArray: Uint8ClampedArray | number[],
  toArrayIdx: number
) => {
  for (let i = 0; i < 4; i++) {
    toArray[toArrayIdx + i] = fromArray[fromArrayIdx + i];
  }
};

export default copy;
