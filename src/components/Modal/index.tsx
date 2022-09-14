import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { motion } from "framer-motion";

import styles from "./Modal.module.scss";

const backdrop = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: { duration: 0.5 },
  },
  exit: {
    opacity: 0,
    transition: { ease: "easeInOut" },
  },
};

const Backdrop = ({ closeFn }: { closeFn: (e: React.MouseEvent) => void }) => {
  return (
    <motion.div
      variants={backdrop}
      initial="hidden"
      animate="visible"
      exit="exit"
      data-testid="modal-backdrop"
      onClick={closeFn}
      className={styles.backdrop}
    ></motion.div>
  );
};

let portalElement: Element | DocumentFragment =
  document.getElementById("modal-root");

// if (!portalElement) {
//   portalElement = document.createElement("div");
//   portalElement.setAttribute("id", "modal-root");
//   document.body.appendChild(portalElement);
// }

export function Modal({
  openState,
  closeModal,
  children,
  ...restProps
}: {
  openState: boolean;
  closeModal: (e: React.MouseEvent) => void;
  children?: React.ReactNode;
}) {
  const [hasLoaded, setHasLoaded] = useState<boolean>(false);

  useEffect(() => {
    setHasLoaded(true);
  }, []);

  if (hasLoaded) {
    return (
      <>
        {ReactDOM.createPortal(
          <Backdrop closeFn={closeModal} />,
          portalElement
        )}
        {ReactDOM.createPortal(
          <div className={styles.modalWrapper} {...restProps}>
            <div className={styles.modalBackground}>
              <div className={styles.close}></div>
              <div className={styles.modalContent}>{children}</div>
            </div>
          </div>,
          portalElement
        )}
      </>
    );
  } else {
    return null;
  }
}

const ModalWrapper = ({
  children,
  ...restProps
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className={styles.modalWrapper} {...restProps}>
      {children}
    </div>
  );
};

const Overlay = ({
  children,
  ...restProps
}: {
  children: React.ReactNode[];
}) => {
  return (
    <motion.div
      // variants={dropIn}
      // initial="hidden"
      // animate="visible"
      // exit="exit"
      data-testid="modal"
      className={styles.overlay}
      {...restProps}
    >
      {children}
    </motion.div>
  );
};

// const ModalReleaseBody = () => {
//   return <div className={styles.releaseBody} />;
// };

// const ModalOverlayOnly = ({ children, ...restProps }) => {
//   return (
//     <ModalWrapper>
//       <Overlay data-testid="modal" {...restProps}>
//         <ModalContent>{children}</ModalContent>
//       </Overlay>
//     </ModalWrapper>
//   );
// };
