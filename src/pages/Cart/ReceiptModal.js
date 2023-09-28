import React from "react";
import Modal from 'react-modal';

const ReceiptModal = ({ isOpen, closeModal, children }) => {
  return (
    <Modal isOpen={isOpen} onClose={closeModal}
    className="m-auto mt-40 h-1/2 w-4/12 p-4  bg-gray-100">
      {children}
    </Modal>
  );
};

export default ReceiptModal;
