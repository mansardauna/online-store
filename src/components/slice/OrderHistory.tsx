import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Button from "../ui/Button";
import ReceiptModal from "./ReceiptModal";
import Receipt from "./Receipt";
import HistoryItem from "./HistoryItem";

interface OrderHistoryProps{
  item:any
}

const OrderHistory:React.FC<OrderHistoryProps> = () => {
  const { t } = useTranslation(["layout"]);
  const orderList = useSelector((state) => state.orebiReducer.orderHistory);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState("");
  const [currentLocation, setCurrentLocation] = useState(null);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null); // Track selected item

  useEffect(() => {
    // Function to get the current date and time
    const getCurrentDateTime = () => {
      const currentDateTime = new Date();
      return currentDateTime.toLocaleString(); 
    };

   
    const getCurrentLocation = () => {
      return new Promise((resolve, reject) => {
        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              resolve({ latitude, longitude });
            },
            (error) => {
              reject(error);
            }
          );
        } else {
          reject("Geolocation is not available in this browser.");
        }
      });
    };

    // Get the current date and time when the component mounts
    const date = getCurrentDateTime();
    setCurrentDate(date);

    // Get the user's current location when the component mounts
    getCurrentLocation()
      .then((location) => {
        setCurrentLocation(location);
      })
      .catch((error) => {
        console.error("Error getting location:", error);
      });
  }, []);

  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
  };

  const openModal = (index) => {
    setIsModalOpen(true);
    setSelectedItemIndex(index);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItemIndex(null);
  };

  return (
    <div className="max-w-container mx-auto px-4">
      {orderList.length > 0 ? (
        <div className="pb-20">
          <div className="w-full h-20 bg-[#F5F7F7] text-primeColor hidden lgl:grid grid-cols-5 place-content-center px-6 text-lg font-titleFont font-semibold">
            <h2 className="col-span-2">{t("Products")}</h2>
            <h2>{t("price")}</h2>
            <h2>{t("quantity")}</h2>
            <h2>{t("Grand")}</h2>
          </div>
          <div className="mt-2 h-72 overflow-y-auto">
            {orderList.map((item, index) => (
              <div key={item._id}>
                <HistoryItem item={item} />
                <Button
                  variant={"primary"}
                  className="float-right mb-2 text-xs"
                  onClick={() => openModal(index)} 
                >
                  {t("viewReceipt")}
                </Button>
              </div>
            ))}
          </div>

          {selectedItemIndex !== null && (
            <ReceiptModal
              isOpen={isModalOpen}
              closeModal={closeModal}
            >
              <Receipt
                user={user}
                item={orderList[selectedItemIndex]}
                dateTime={currentDate}
                location={currentLocation}
              />
              <Button
                variant={"secondary"}
                className="rounded-md capitalize float-right  mt-5"
                onClick={closeModal}
              >
                {t("close")}
              </Button>
            </ReceiptModal>
          )}
        </div>
      ) : (
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col mdl:flex-row justify-center items-center gap-4 pb-20"
        >
          <div></div>
          <div className="max-w-[500px] p-4 py-8 bg-white flex gap-4 flex-col items-center rounded-md shadow-lg">
            <h1 className="font-titleFont text-xl font-bold uppercase">
              {t("zeroOrder")}
            </h1>
            <p className="text-sm text-center px-10 -mt-2">{t("track")}</p>

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

export default OrderHistory;
