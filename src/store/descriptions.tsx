import React from "react";

export type DescriptionType = {
  heading: string | JSX.Element;
  bodyCopy: string;
};

export const algoDescriptions: { [key: string]: DescriptionType } = {
  quick: {
    heading: "Avg. time: O(n log n) | Avg. Space: O(n)",
    bodyCopy:
      "Find the correct position of a pivot point in the array (i.e. all values before are lower, and all following are higher), then divide the array at that point. Repeat until the subarrays are so small that moving the pivot sorts them.",
  },
  bubble: {
    heading: "Avg. time: O(n²) | Avg. Space: O(1)",
    bodyCopy:
      "Start at the beginning. Check if the next value in the array is lower: if so, swap with the current pixel; if not, don't. Move to the next value. This moves the largest number to the last index. Repeat the whole process, stopping one index earlier each time.",
  },
  insertion: {
    heading: "Avg. time: O(n²) | Avg. Space: O(1)",
    bodyCopy:
      "Consequat in dolore in nulla. Adipisicing excepteur velit occaecat consequat non nostrud consequat labore. Eu aute consectetur ea dolore minim aliqua esse. Amet excepteur amet velit aliquip consequat non labore ad laboris id.",
  },
  selection: {
    heading: "Avg. time: O(n²) | Avg. Space: O(1)",
    bodyCopy:
      "Consequat in dolore in nulla. Adipisicing excepteur velit occaecat consequat non nostrud consequat labore. Eu aute consectetur ea dolore minim aliqua esse. Amet excepteur amet velit aliquip consequat non labore ad laboris id.",
  },
};

const styledCombinedHeading = (
  <div>
    Adding <span className="red">Red</span>, <span className="blue">Blue</span>,
    and <span className="green">Green</span> pixel values
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
    bodyCopy:
      "Consequat in dolore in nulla. Adipisicing excepteur velit occaecat consequat non nostrud consequat labore. Eu aute consectetur ea dolore minim aliqua esse. Amet excepteur amet velit aliquip consequat non labore ad laboris id.",
  },
  red: {
    heading: styledRedHeading,
    bodyCopy:
      "Consequat in dolore in nulla. Adipisicing excepteur velit occaecat consequat non nostrud consequat labore. Eu aute consectetur ea dolore minim aliqua esse. Amet excepteur amet velit aliquip consequat non labore ad laboris id.",
  },
  green: {
    heading: styledGreenHeading,
    bodyCopy:
      "Consequat in dolore in nulla. Adipisicing excepteur velit occaecat consequat non nostrud consequat labore. Eu aute consectetur ea dolore minim aliqua esse. Amet excepteur amet velit aliquip consequat non labore ad laboris id.",
  },
  blue: {
    heading: styledBlueHeading,
    bodyCopy:
      "Consequat in dolore in nulla. Adipisicing excepteur velit occaecat consequat non nostrud consequat labore. Eu aute consectetur ea dolore minim aliqua esse. Amet excepteur amet velit aliquip consequat non labore ad laboris id.",
  },
};
