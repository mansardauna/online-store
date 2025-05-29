import React from 'react';
import { useTranslation } from 'react-i18next';
import Modal from 'react-modal';

interface CartModalProps{
  isOpen:string;
  onClose:string;
  item:string;
  type:string;
}
const CartModal:React.FC<CartModalProps> = ({ isOpen, onClose,item,type }) => {
  const { t } = useTranslation(["layout"])
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="Added to Cart"
    className="h-fit shadow-xl text-sm p-4 rounded-lg md:top-28 top-36 relative m-auto z-50 w-8/12 md:w-1/4 text-center text-white bg-gray-500"
    >
      <p>{item} {t("added")} {type}</p>
    </Modal>
  );
};
export default CartModal;
