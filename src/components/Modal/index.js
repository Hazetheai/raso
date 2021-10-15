import React, { useEffect } from "react";
import ReactModal from "react-modal";
import Button from "../Button";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

ReactModal.setAppElement("#root");

const Modal = ({
  children,
  buttonText,
  openModal,
  closeModal,
  afterOpen,
  onClose,
  contentLabel,
  overRideStyles = { content: {} },
}) => {
  const [modalIsOpen, setIsOpen] = React.useState(false);

  useEffect(() => {
    if (openModal) {
      setIsOpen(true);
    }
    if (closeModal) {
      setIsOpen(false);
    }
    return () => {};
  }, [openModal, closeModal]);

  function openReactModal() {
    setIsOpen(true);
  }

  function afterOpenReactModal() {
    afterOpen && afterOpen();
  }

  function closeReactModal() {
    setIsOpen(false);
  }
  const styles = {
    ...customStyles,
    ...overRideStyles,
    content: { ...customStyles.content, ...overRideStyles.content },
  };

  return (
    <div>
      {buttonText && <Button func={openReactModal} text={buttonText} />}
      <ReactModal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenReactModal}
        onRequestClose={() => {
          onClose && onClose();
          closeReactModal();
        }}
        style={styles}
        contentLabel={contentLabel}
      >
        {children}
      </ReactModal>
    </div>
  );
};

export default Modal;
