import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import { useTranslation } from "react-i18next";
import WatchItem from "../../components/slice/ItemWatch";

const Watch: React.FC = () => {
  const { t } = useTranslation(["layout"]);
  const watchlist = useSelector((state: any) => state.orebiReducer.watchlist);
  const [totalAmt, setTotalAmt] = useState<number | string>("");
  const [shippingCharge, setShippingCharge] = useState<number | string>("");

  useEffect(() => {d
    let price = 0;
    watchlist.map((item: any) => {
      price += item.price * item.quantity;
      return price;
    });
    setTotalAmt(price.toFixed(2).toString()); // Ensure totalAmt is a string
  }, [watchlist]);

  useEffect(() => {
    if (parseFloat(totalAmt) <= 200) {
      setShippingCharge("30"); // Ensure shippingCharge is a string
    } else if (parseFloat(totalAmt) <= 400) {
      setShippingCharge("25"); // Ensure shippingCharge is a string
    } else if (parseFloat(totalAmt) > 401) {
      setShippingCharge("20"); // Ensure shippingCharge is a string
    }
  }, [totalAmt]);

  return (
    <div className="max-w-9/12 m-auto p-2">
      <Breadcrumbs title={t("wishList")} />
      {watchlist.length > 0 ? (
        <div className=" ">
          <div className="m-auto w-11/12 grid md:grid-cols-2 xl:grid-cols-3 grid-cols-1 gap-4">
            {watchlist.map((item: any) => (
              <div key={item._id}>
                <WatchItem item={item} />
              </div>
            ))}
          </div>
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
              {t("emptyCart")}
            </h1>
            <p className="text-sm text-center px-10 -mt-2">{t("track")}</p>
            <Link to="/products">
              <button className="bg-primeColor rounded-md cursor-pointer hover-bg-black active-bg-gray-900 px-8 py-2 font-titleFont font-semibold text-lg text-gray-200 hover-text-white duration-300">
                {t("Continue")}
              </button>
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Watch;
