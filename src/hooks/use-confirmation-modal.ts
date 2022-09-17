import React, { useState, useCallback, useContext } from "react";

import SortingContext from "../store/sorting-context";

const useConfirmationModal = (
  clickHandler: (e: React.MouseEvent) => void,
  confirm: boolean = true
) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const sortingContext = useContext(SortingContext);

  const closeModal = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowModal(false);
  };

  const confirmIfSortingStarted = (e: React.MouseEvent) => {
    const hasStartedSorting = sortingContext.startedSorting;
    const isSorting = sortingContext.keepSorting;
    if (isSorting && confirm) {
      setShowModal(true);
    } else {
      clickHandler(e);
    }
  };
  return {
    showModal,
    closeModal,
    confirmIfSortingStarted,
  };
};

export default useConfirmationModal;
