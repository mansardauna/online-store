import React from "react";
import Modal from 'react-modal';

const ReceiptModal = ({ isOpen, closeModal, children }) => {
  return (
    <Modal isOpen={isOpen} onClose={closeModal}
    className="m-auto mt-40 md:h-1/2 h-[65%] w-10/12 md:w-4/12 border border-gray-400 rounded-md p-4  bg-gray-100">
      {children}
    </Modal>
  );
};

export default ReceiptModal;
