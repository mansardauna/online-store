import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import { removeFromWatchlist } from "../../redux/orebiSlice";
import { emptyCart } from "../../assets/images/index";
import WatchItem from "./ItemWatch";

const Watch = () => {
  const dispatch = useDispatch();
  const watchlist = useSelector((state) => state.orebiReducer.watchlist);
  const [totalAmt, setTotalAmt] = useState("");
  const [shippingCharge, setShippingCharge] = useState("");
  useEffect(() => {
    let price = 0;
    watchlist.map((item) => {
      price += item.price * item.quantity;
      return price;
    });
    setTotalAmt(price);
  }, [watchlist]);
  useEffect(() => {
    if (totalAmt <= 200) {
      setShippingCharge(30);
    } else if (totalAmt <= 400) {
      setShippingCharge(25);
    } else if (totalAmt > 401) {
      setShippingCharge(20);
    }
  }, [totalAmt]);
  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Watch-List" />
      {watchlist.length > 0 ? (
        <div className="pb-20 ">

          <div className="mt-5 grid grid-cols-3">
            {watchlist.map((item) => (
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
          <div>
          </div>
          <div className="max-w-[500px] p-4 py-8 bg-white flex gap-4 flex-col items-center rounded-md shadow-lg">
            <h1 className="font-titleFont text-xl font-bold uppercase">
              Your Watch list is Empty
            </h1>
            <p className="text-sm text-center px-10 -mt-2">
              Your items will appear here once you click on watch-list
            </p>
            <Link to="/journal">
              <button className="bg-primeColor rounded-md cursor-pointer hover:bg-black active:bg-gray-900 px-8 py-2 font-titleFont font-semibold text-lg text-gray-200 hover:text-white duration-300">
                Continue Shopping
              </button>
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Watch;
