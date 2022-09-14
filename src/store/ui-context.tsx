import React, { Dispatch, SetStateAction } from "react";

export type UIContextTypes = {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
};

const UIContext = React.createContext<UIContextTypes>({
  // Initialised with default state for IDE autocompletion.
  showModal: false,
  setShowModal: () => {},
});

export default UIContext;
