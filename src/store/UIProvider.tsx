import React, { useState } from "react";

import UIContext from "./ui-context";

const UIProvider = ({ children }: { children: React.ReactNode }) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const uiContext = {
    showModal,
    setShowModal,
  };

  return <UIContext.Provider value={uiContext}>{children}</UIContext.Provider>;
};

export default UIProvider;
