import React from "react";

export type DescriptionType = {
  heading?: string | JSX.Element;
  bodyCopy?: string;
  imageUrl?: string;
  imageAlt?: string;
  footer?: string;
};

export const algoDescriptions: { [key: string]: DescriptionType } = {
  quick: {
    footer: "Avg. time: O(n log(n)) | Avg. Space: O(n log(n))",
    bodyCopy:
      "Find the correct position of a pivot point in the pixel array (i.e. all values before are lower, all following are higher), then divide the array at that point. Repeat until the subarrays are so small that moving the pivot sorts them.",
  },
  merge: {
    footer: "Avg. time: O(n log(n)) | Avg. Space: O(n)",
    bodyCopy:
      "Recursively split the pixel array into halves, until it cannot be divided further, then merge the atomic single-pixel subarrays back together in size order until all subarrays are merged back together.",
  },
  bubble: {
    footer: "Avg. time: O(n²) | Avg. Space: O(1)",
    bodyCopy:
      "Start at the beginning. Check if the next value in the pixel array is lower: if so, swap with the current pixel; if not, don't. Move to the next value until the largest number is last. Repeat, stopping one index earlier.",
  },
  insertion: {
    footer: "Avg. time: O(n²) | Avg. Space: O(1)",
    bodyCopy:
      "Iterate through the pixel array in reverse, swapping lower value pixels to their correct place at the start of the array. This creates a sorted section which grows with each loop through the pixel array.",
  },
  selection: {
    footer: "Avg. time: O(n²) | Avg. Space: O(1)",
    bodyCopy:
      "Loop through the pixel array to find the lowest value and then move it into the first position. Find the next lowest and move it into position two. Repeat until reaching the end of the array.",
  },
};

const styledCombinedHeading = (
  <div>
    Adding <span className="red">Red</span>,{" "}
    <span className="green">Green</span> &amp;{" "}
    <span className="blue">Blue</span> pixel values
  </div>
);

const styledRedHeading = (
  <div>
    Using the <span className="red">Red</span> pixel value
  </div>
);

const styledGreenHeading = (
  <div>
    Using the <span className="green">Green</span> pixel value
  </div>
);

const styledBlueHeading = (
  <div>
    Using the <span className="blue">Blue</span> pixel value
  </div>
);

export const sortByDescriptions: { [key: string]: DescriptionType } = {
  combined: {
    heading: styledCombinedHeading,
    imageUrl: "/img/combined.png",
    imageAlt: "combined pixel value image",
  },
  red: {
    heading: styledRedHeading,
    imageUrl: "/img/red.png",
    imageAlt: "red pixel value image",
  },
  green: {
    heading: styledGreenHeading,
    imageUrl: "/img/green.png",
    imageAlt: "green pixel value image",
  },
  blue: {
    heading: styledBlueHeading,
    imageUrl: "/img/blue.png",
    imageAlt: "blue pixel value image",
  },
};
