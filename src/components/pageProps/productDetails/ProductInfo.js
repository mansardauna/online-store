import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../../../redux/orebiSlice";
import Button from "../../ui/Button";
import CartModal from "../../ui/CartModal";


const ProductInfo = ({ productInfo }) => {
  const dispatch = useDispatch();
  const [isModalOpen, setModalOpen] = useState(false);

 const handleAddToCart = () => {
    dispatch(
      addToCart({
        _id: productInfo.id,
        name: productInfo.productName,
        quantity: 1,
        image: productInfo.img,
        badge: productInfo.badge,
        price: productInfo.price,
        colors: productInfo.color,
      })
    );
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false); // Close the modal
  };
  useEffect(() => {
    if (isModalOpen) {
      const timeoutId = setTimeout(() => {
        setModalOpen(false);
      }, 2000);
      return () => clearTimeout(timeoutId);
    }
  }, [isModalOpen]);
  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-4xl font-semibold">{productInfo.productName}</h2>
      <p className="text-xl font-semibold">${productInfo.price}</p>
      <p className="text-base text-gray-600">{productInfo.des}</p>
      <p className="text-sm">Be the first to leave a review.</p>
      <p className="font-medium text-lg">
        <span className="font-normal">Colors:</span> {productInfo.color}
      </p>
      <Button
      variant="secondary"
        onClick={handleAddToCart}
        className="w-full py-4  hover:bg-gray-300 duration-300 rounded text-lg font-titleFont"
      >
        Add to Cart
      </Button>
      <CartModal isOpen={isModalOpen} onClose={closeModal} item={productInfo.productName} type="cart"/>
      <Link to="/paymentgateway">
      <Button
      variant="primary"
        className="w-full rounded border-primeColor py-4 bg-primeColor hover:bg-gray-600 duration-300 text-white text-lg font-titleFont"
      >
        By Now
      </Button>
      </Link>
      <p className="font-normal text-sm">
        <span className="text-base font-medium"> Categories:</span> Spring
        collection, Streetwear, Women Tags: featured SKU: N/A
      </p>
    </div>
  );
};

export default ProductInfo;
