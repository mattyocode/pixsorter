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

export default swap;
