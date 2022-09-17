import React, { useState, useEffect } from "react";

import UIContext from "./ui-context";

const UIProvider = ({ children }: { children: React.ReactNode }) => {
  const [askToConfirm, setAskToConfirm] = useState<boolean>(true);
  const uiContext = {
    askToConfirm,
    setAskToConfirm,
  };

  useEffect(() => {
    const showConfirmationModal =
      localStorage.getItem("pixSorter.showConfirmationModal") || "";
    const confirmValue = JSON.parse(showConfirmationModal);
    setAskToConfirm(confirmValue || true);
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "pixSorter.showConfirmationModal",
      JSON.stringify(askToConfirm)
    );
  }, [askToConfirm]);

  return <UIContext.Provider value={uiContext}>{children}</UIContext.Provider>;
};

export default UIProvider;
