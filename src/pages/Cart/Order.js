import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ItemOrder from "./itemOrder";
import { useTranslation } from "react-i18next";

const Order = () => {
  const { t } = useTranslation (["layout"])
  const dispatch = useDispatch();
  const orderlist = useSelector((state) => state.orebiReducer.orders);
  const [totalAmt, setTotalAmt] = useState("");
  const [showReceipt, setShowReceipt] = useState(false);

  const [shippingCharge, setShippingCharge] = useState("");
  useEffect(() => {
    let price = 0;
    orderlist.map((item) => {
      price += item.price * item.quantity;
      return price;
    });
    setTotalAmt(price);
  }, [orderlist]);
  useEffect(() => {
    if (totalAmt <= 200) {
      setShippingCharge(30);
    } else if (totalAmt <= 400) {
      setShippingCharge(25);
    } else if (totalAmt > 401) {
      setShippingCharge(20);
    }
  }, [totalAmt]);

  const generateReceipt = () => {
    // Create a string containing the HTML structure of the receipt
    const receiptContent = `
      <div>
        <h1>Order Receipt</h1>
        <p><strong>Order ID:</strong> ABC123</p>
        <p><strong>Customer Name:</strong> John Doe</p>
        <!-- Add more order details here -->
      </div>
    `;
    
    return receiptContent;
  };

  // Function to open the receipt
  const openReceipt = () => {
    const receiptContent = generateReceipt();
    
    // Open the receipt in a new window or modal
    const receiptWindow = window.open("", "Receipt", "width=600,height=400");
    receiptWindow.document.write(receiptContent);
  };

  return (
    <div className="max-w-container mx-auto px-4">
    
      {orderlist.length > 0 ? (
        <div className="pb-20">
          <div className="w-full h-20 bg-[#F5F7F7] text-primeColor hidden lgl:grid grid-cols-5 place-content-center px-6 text-lg font-titleFont font-semibold">
            <h2 className="col-span-2">{t("Products")}</h2>
            <h2>{t("price")}</h2>
            <h2>{t("quantity")}</h2>
            <h2>{t("Grand")}</h2>
          </div>
          <div className="mt-5">
            {orderlist.map((item) => (
              <div key={item._id}>
                <ItemOrder item={item} />
              </div>
            ))}
          </div>

         
          <div className="flex justify-center">
          <button
            onClick={() => {
              setShowReceipt(true);
              openReceipt();
            }}
            className="w-52 h-10 bg-primeColor text-white hover:bg-black duration-300"
          >
            {t("reciept")}
          </button>
        </div>
        </div>
      ) : (
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col mdl:flex-row justify-center items-center gap-4 pb-20"
        >
          <div>

          </div>
          <div className="max-w-[500px] p-4 py-8 bg-white flex gap-4 flex-col items-center rounded-md shadow-lg">
            <h1 className="font-titleFont text-xl font-bold uppercase">
            {t("zeroOrder")}
            </h1>
            <p className="text-sm text-center px-10 -mt-2">
              {t("track")}
            </p>
            
            <Link to="/products">
              <button className="bg-primeColor rounded-md cursor-pointer hover:bg-black active:bg-gray-900 px-8 py-2 font-titleFont font-semibold text-lg text-gray-200 hover:text-white duration-300">
               {t("Continue")}
              </button>
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Order;
