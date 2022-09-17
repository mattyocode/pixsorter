import React, { Dispatch, SetStateAction } from "react";

export type SortingContextTypes = {
  keepSorting: boolean;
  setKeepSorting: Dispatch<SetStateAction<boolean>>;
  isSorted: boolean;
  setIsSorted: Dispatch<SetStateAction<boolean>>;
  startedSorting: boolean;
  setStartedSorting: Dispatch<SetStateAction<boolean>>;
};

const SortingContext = React.createContext<SortingContextTypes>({
  // Initialised with default state for IDE autocompletion.
  keepSorting: false,
  setKeepSorting: () => {},
  isSorted: false,
  setIsSorted: () => {},
  startedSorting: false,
  setStartedSorting: () => {},
});

export default SortingContext;
