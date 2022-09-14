import React, { useContext } from "react";
import { Modal } from "../Modal";
import { InlineBtn } from "../Buttons";

import UIContext from "../../store/ui-context";

import styles from "./ConfirmationModal.module.scss";

const Confirmation: React.FC = () => {
  const uiContext = useContext(UIContext);
  const closeHandler = (e: React.MouseEvent) => {
    uiContext.setShowModal(false);
  };

  return (
    <Modal openState={true} closeModal={closeHandler}>
      You sure about that?
      <div className={styles.buttonWrapper}>
        <button className={styles.back}>back</button>
        <button className={styles.continue}>forward</button>
      </div>
    </Modal>
  );
};
