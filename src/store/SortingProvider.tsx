import React, { useState } from "react";

import SortingContext from "./sorting-context";

const SortingProvider = ({ children }: { children: React.ReactNode }) => {
  const [keepSorting, setKeepSorting] = useState<boolean>(false);
  const [isSorted, setIsSorted] = useState<boolean>(false);
  const [startedSorting, setStartedSorting] = useState<boolean>(false);

  const sortingContext = {
    keepSorting,
    setKeepSorting,
    isSorted,
    setIsSorted,
    startedSorting,
    setStartedSorting,
  };

  return (
    <SortingContext.Provider value={sortingContext}>
      {children}
    </SortingContext.Provider>
  );
};

export default SortingProvider;
