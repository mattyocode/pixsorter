import React, { useContext } from "react";
import { Modal } from "../Modal";

import UIContext from "../../store/ui-context";

import styles from "./ConfirmationModal.module.scss";

export const ConfirmationModal = ({
  name,
  callback,
  close,
}: {
  name: string;
  callback: (e: React.MouseEvent) => void;
  close: (e: React.MouseEvent) => void;
}) => {
  const uiContext = useContext(UIContext);
  const closeHandler = (e: React.MouseEvent) => {
    close(e);
  };
  const continueHandler = (e: React.MouseEvent) => {
    callback(e);
    close(e);
  };

  return (
    <Modal openState={true} closeModal={closeHandler}>
      <div className={styles.wrapper}>
        <p className={styles.heading}>You sure about that?</p>
        <p className={styles.text}>
          Changing algorithm{name} will lose sorting data.
        </p>
        <div className={styles.buttonWrapper}>
          <button className={styles.back} onClick={closeHandler}>
            Nope
          </button>
          <button className={styles.continue} onClick={continueHandler}>
            Yes
          </button>
        </div>
      </div>
    </Modal>
  );
};
