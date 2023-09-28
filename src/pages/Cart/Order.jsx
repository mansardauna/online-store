import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import { resetOrders } from "../../redux/orebiSlice";
import { emptyCart } from "../../assets/images/index";
import Button from "../../components/ui/Button";
import { useTranslation } from "react-i18next";
import ItemOrder from "./itemOrder";
import Receipt from "./Receipt"; // Import the Receipt component


const Order = () => {
  const { t } = useTranslation(["layout"]);
  const dispatch = useDispatch();
  const products = useSelector((state) => state.orebiReducer.orders);
  const [isReceiptVisible, setIsReceiptVisible] = useState(false); // State to toggle receipt visibility


  useEffect(() => {
    let price = 0;
    products.map((item) => {
      price += item.price * item.quantity;
      return price;
    });
    setTotalAmt(price.toFixed(2)); // Set totalAmt here
  }, [products]);

  const [totalAmt, setTotalAmt] = useState(""); // Initialize totalAmt here

  useEffect(() => {
    let shippingCharge = 0; // Initialize shippingCharge here based on totalAmt
    if (parseFloat(totalAmt) <= 200) {
      shippingCharge = 30;
    } else if (parseFloat(totalAmt) <= 400) {
      shippingCharge = 25;
    } else if (parseFloat(totalAmt) > 401) {
      shippingCharge = 20;
    }
    setShippingCharge(shippingCharge);
  }, [totalAmt]);

  const [shippingCharge, setShippingCharge] = useState("");

  const user = { name: "John Doe", email: "john@example.com" }; // Replace with user data

  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title={t("Order")} />
      {products.length > 0 ? (
        <div className="pb-20">
          <div className="w-full h-20 bg-[#F5F7F7] text-primeColor hidden lgl:grid grid-cols-5 place-content-center px-6 text-lg font-titleFont font-semibold">
            <h2 className="col-span-2">{t("Products")}</h2>
            <h2>{t("price")}</h2>
            <h2>{t("quantity")}</h2>
            <h2>{t("Grand")}</h2>
          </div>
          <div className="mt-5">
            {products.map((item) => (
              <div key={item._id}>
                <ItemOrder item={item} />
              </div>
            ))}
          </div>
          <button
            onClick={() => dispatch(resetOrders())}
            className="py-2 px-10 bg-red-500 text-white font-semibold uppercase mb-4 hover:bg-red-700 duration-300"
          >
            {t("DeleteAll")}
          </button>
          
          <div className="max-w-7xl gap-4 flex justify-end mt-4">
            <div className="w-96 flex flex-col gap-4">
              <h1 className="text-2xl font-semibold ">{t("Total")}</h1>
              <div>
                <p className="flex items-center justify-between border-[1px] border-gray-400 border-b-0 py-1.5 text-lg px-4 font-medium">
                  {t("Grand")}
                  <span className="font-semibold tracking-widefont-titleFont">
                    {t(`$${totalAmt}`)}
                  </span>
                </p>
                <p className="flex items-center justify-between border-[1px] border-gray-400 border-b-0 py-1.5 text-lg px-4 font-medium">
                  {t("ShippingFee")}
                  <span className="font-semibold tracking-wide font-titleFont">
                    ${shippingCharge}
                  </span>
                </p>
                <p className="flex items-center justify-between border-[1px] border-gray-400 py-1.5 text-lg px-4 font-medium">
                  {t("Total")}
                  <span className="font-bold tracking-wide text-lg font-titleFont">
                    {(parseFloat(totalAmt) + parseFloat(shippingCharge)).toFixed(2)}
                  </span>
                </p>
              </div>
              <div className="flex justify-end">
                <Link to="/paymentgateway">
                  <button className="w-52 h-10 bg-primeColor text-white hover:bg-black duration-300">
                    {t("proceed")}
                  </button>
                </Link>
              </div>
            </div>
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
            <img
              className="w-80 rounded-lg p-4 mx-auto"
              src={emptyCart}
              alt="emptyCart"
            />
          </div>
          <div className="max-w-[500px] p-4 py-8 bg-white flex gap-4 flex-col items-center rounded-md shadow-lg">
            <h1 className="font-titleFont text-xl font-bold uppercase">
              {t("zeroOrder")}
            </h1>
            <p className="text-sm text-center px-10 -mt-2">{t("track")}</p>
            <Link to="/products">
              <Button
                variant="primary"
                className="bg-primeColor rounded-md cursor-pointer hover:bg-black active:bg-gray-900 px-8 py-2 font-titleFont font-semibold text-lg text-gray-200 hover:text-white duration-300"
              >
                {t("Continue")}
              </Button>
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Order;
