import React from 'react';
import Modal from 'react-modal';

const CartModal = ({ isOpen, onClose,item,type }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="Added to Cart"
    className="h-fit shadow-xl text-sm p-4 rounded-lg top-20 relative m-auto w-8/12 md:w-1/4 text-center text-white bg-gray-500"
    >
      <p>{item} has been added to the {type}</p>
    </Modal>
  );
};
export default CartModal;
