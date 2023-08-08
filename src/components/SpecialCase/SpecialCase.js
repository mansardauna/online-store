import React from "react";
import { Link } from "react-router-dom";
import { RiShoppingCart2Fill } from "react-icons/ri";
import { MdSwitchAccount } from "react-icons/md";
import { useSelector } from "react-redux";
import { FaSwatchbook } from "react-icons/fa";
import { AiFillEye } from "react-icons/ai";

const SpecialCase = () => {
  const products = useSelector((state) => state.orebiReducer.products);

  const watchlist = useSelector((state) => state.orebiReducer.watchlist);
  return (
    <div className="fixed bottom-20 right-5 z-20 flex flex-col gap-2">
      <Link to="/watchlist">
        <div className="bg-white w-16 h-[70px] rounded-md flex flex-col gap-1 text-[#33475b] justify-center items-center shadow-testShadow overflow-x-hidden group cursor-pointer relative">
          <div className="flex justify-center items-center">
            <AiFillEye className="text-2xl -translate-x-12 group-hover:translate-x-3 transition-transform duration-200" />

            <AiFillEye className="text-2xl -translate-x-3 group-hover:translate-x-12 transition-transform duration-200" />
          </div>
          <p className="text-xs font-semibold font-titleFont">watchlist</p>
          {watchlist.length > 0 && (
            <p className="absolute top-1 right-2 bg-primeColor text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-semibold">
              {watchlist.length}
            </p>
          )}
        </div>
      </Link>

    </div>
  );
};

export default SpecialCase;
