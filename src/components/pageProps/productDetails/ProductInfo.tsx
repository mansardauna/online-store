import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addOrder, addToCart, addToOrderHistory } from "../../../redux/orebiSlice";
import Button from "../../ui/Button";
import CartModal from "../../ui/CartModal";

interface InfoProps{
  productInfo: String;

}

const ProductInfo:React.FC<InfoProps> = ({ productInfo }) => {
  const { t } = useTranslation (["layout"])
  const dispatch = useDispatch();
  const [isModalOpen, setModalOpen] = useState(false);
  
  const [order, setOrder] = useState([]); 


 const handleAddToCart = () => {
    dispatch(
      addToCart({
        _id: productInfo.id,
        productName: productInfo.productName,
        quantity: 1,
        img: productInfo.img,
        badge: productInfo.badge,
        price: productInfo.price,
        colors: productInfo.color,
        category: productInfo.category
      })
    );
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false); 
  };
  useEffect(() => {
    if (isModalOpen) {
      const timeoutId = setTimeout(() => {
        setModalOpen(false);
      }, 2000);
      return () => clearTimeout(timeoutId);
    }
  }, [isModalOpen]);

  const handleBuy = () => {
    dispatch(addOrder(productInfo)
    );
    dispatch(addToOrderHistory(productInfo));
    
    setModalOpen(true);

    const updatedOrder = [...order, productInfo];
   setOrder(updatedOrder);
  };

  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-4xl font-semibold">{productInfo.productName}</h2>
      <p className="text-xl font-semibold">${productInfo.price}</p>
      <p className="text-base text-gray-600">{productInfo.des}</p>
      
      <p className="font-medium text-lg">
        <span className="font-normal">Colors:</span> {productInfo.color}
      </p>
      <Button
      variant="secondary"
        onClick={handleAddToCart}
        className="w-full py-4  hover:bg-gray-300 duration-300 rounded text-lg font-titleFont"
      >
        {t("addCart")}
      </Button>
      <CartModal isOpen={isModalOpen} onClose={closeModal} item={productInfo.productName} type="cart"/>
      <Link to="/Order">
      <Button
      variant="primary"
      onClick={handleBuy}
        className="w-full rounded border-primeColor py-4 bg-primeColor hover:bg-gray-600 duration-300 text-white text-lg font-titleFont"
      >
       {t("buyNow")}
      </Button>
     </Link>
    </div>
  );
};

export default ProductInfo;
