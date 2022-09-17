import React, { Dispatch, SetStateAction } from "react";

export type UIContextTypes = {
  askToConfirm: boolean;
  setAskToConfirm: Dispatch<SetStateAction<boolean>>;
};

const UIContext = React.createContext<UIContextTypes>({
  // Initialised with default state for IDE autocompletion.
  askToConfirm: true,
  setAskToConfirm: () => {},
});

export default UIContext;
