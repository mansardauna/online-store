import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { motion } from "framer-motion";


const Notification:React.FC = () => {
  const cartItems = useSelector((state) => state.orebiReducer.products);
  const orderedItems = useSelector((state) => state.orebiReducer.orderHistory);
  const watchlistItems = useSelector((state) => state.orebiReducer.watchlist);
  const { t } = useTranslation(["layout"])
  const renderCartNotification = () => {
    if (cartItems.length === 0) {
      return null; 
    }

    return (
      <>
      <div className="text-lg text-gray-400">
       You Carted {cartItems.length} items
      </div>
      <div>
        {cartItems.map((item) =>(
          <div className="flex gap-5">
            <div className='w-40'>{item.productName}</div>
            <div>${item.price}</div>
             </div>
        ))}
      </div>
      </>
    );
  };

  const renderOrdersNotification = () => {
    if (orderedItems.length === 0) {
      return null; // No notification if there are no orders
    }

    return (
    
        <>
      <div className="text-lg text-gray-400">
       You Ordered {orderedItems.length} items
      </div>
      <div>
        {orderedItems.map((item) =>(
          <div className="flex gap-5">
            <div className='w-40'>{item.productName}</div>
            <div>${item.price}</div>
             </div>
        ))}
      </div>
      </>
    );
  };

  const renderWatchlistNotification = () => {
    if (watchlistItems.length === 0) {
      return null; // No notification if the watchlist is empty
    }

    return (
      <>
      <div className="text-lg text-gray-400">
       You Added {watchlistItems.length} items to Wish list
      </div>
      <div>
        {watchlistItems.map((item) =>(
          <div className="flex gap-5">
            <div className='w-40'>{item.productName}</div>
            <div>${item.price}</div>
             </div>
        ))}
      </div>
      </>
    );
  };

  return (
    <motion.div
    initial={{ y: 30, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.4 }}
    className="flex flex-col justify-center  items-center gap-4 pb-20"
  >
    <div className="max-w-[500px] p-4 bg-white gap-4 overflow-y-auto w-11/12 h-80 items-center rounded-md shadow-lg">
      <div className="w-fit uppercase font-bold text-gray-500 text-lg m-auto">{t("Notification")}</div>
      {renderCartNotification()}
      {renderOrdersNotification()}
      {renderWatchlistNotification()}
      </div>
    </motion.div>
  );
};

export default Notification;
