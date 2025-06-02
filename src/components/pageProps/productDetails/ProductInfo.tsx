import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addOrder, addToCart, addToOrderHistory } from '../../../redux/orebiSlice';
import Button from '../../ui/Button';
import CartModal from '../../ui/CartModal';
import { Product as ProductType } from '../../../constants/constant';
import { FaStar } from 'react-icons/fa';

interface InfoProps {
  productInfo: ProductType;
}

const ProductInfo: React.FC<InfoProps> = ({ productInfo }) => {
  const { t } = useTranslation(['layout']);
  const dispatch = useDispatch();
  const [isModalOpen, setModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        _id: productInfo.id,
        productName: productInfo.productName,
        quantity,
        img: Array.isArray(productInfo.img)
          ? productInfo.img
          : [productInfo.img || '/img/placeholder.jpg'].filter(Boolean),
        badge: productInfo.badge,
        price: productInfo.price,
        colors: productInfo.color,
        category: productInfo.category,
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
    dispatch(
      addOrder({
        ...productInfo,
        quantity,
        img: Array.isArray(productInfo.img)
          ? productInfo.img
          : [productInfo.img || '/img/placeholder.jpg'].filter(Boolean),
      })
    );
    dispatch(
      addToOrderHistory({
        ...productInfo,
        quantity,
        img: Array.isArray(productInfo.img)
          ? productInfo.img
          : [productInfo.img || '/img/placeholder.jpg'].filter(Boolean),
      })
    );
    setModalOpen(true);
  };

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-3xl font-bold text-gray-800">{productInfo.productName}</h2>
      <div className="flex items-center gap-2">
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <FaStar
              key={i}
              className={i < 4 ? 'text-yellow-400' : 'text-gray-300'}
            />
          ))}
        </div>
        <span className="text-sm text-gray-600">(4.0)</span>
      </div>
      <p className="text-2xl font-semibold text-gray-800">${productInfo.price}</p>
      <p className="text-base text-gray-600">{productInfo.des}</p>
      <p className="text-base text-gray-600">
        <span className="font-medium">Category:</span> {productInfo.category}
      </p>
      <p className="text-base text-gray-600">
        <span className="font-medium">Colors:</span> {productInfo.color || 'N/A'}
      </p>
      <div className="flex items-center gap-4">
        <span className="text-base font-medium text-gray-600">Quantity:</span>
        <div className="flex items-center border rounded-lg">
          <button
            className="px-3 py-1 text-gray-600 hover:bg-gray-100"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
          >
            -
          </button>
          <span className="px-4 py-1 text-gray-800">{quantity}</span>
          <button
            className="px-3 py-1 text-gray-600 hover:bg-gray-100"
            onClick={() => setQuantity(quantity + 1)}
          >
            +
          </button>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          variant="secondary"
          onClick={handleAddToCart}
          className="w-full sm:w-auto py-3 px-6 bg-gray-200 text-gray-800 hover:bg-gray-300 rounded-lg text-base font-medium"
        >
          {t('addCart')}
        </Button>
        <Link to="/order">
          <Button
            variant="primary"
            onClick={handleBuy}
            className="w-full sm:w-auto py-3 px-6 bg-blue-600 text-white hover:bg-blue-700 rounded-lg text-base font-medium"
          >
            {t('buyNow')}
          </Button>
        </Link>
      </div>
      <CartModal
        isOpen={isModalOpen}
        onClose={closeModal}
        item={productInfo.productName}
        type="cart"
      />
    </div>
  );
};

export default ProductInfo;