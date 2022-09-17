import React, { useState, useCallback, useContext } from "react";

import SortingContext from "../store/sorting-context";
import UIContext from "../store/ui-context";

const useConfirmationModal = (
  clickHandler: (e: React.MouseEvent) => void,
  confirm: boolean = true
) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const sortingContext = useContext(SortingContext);
  const uiContext = useContext(UIContext);

  const closeModal = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowModal(false);
  };

  const confirmIfSortingStarted = (e: React.MouseEvent) => {
    const isSorting = sortingContext.keepSorting;
    const remindMe = uiContext.askToConfirm;
    if (isSorting && confirm && remindMe) {
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
