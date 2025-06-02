import React from "react";
import { Link } from "react-router-dom";
import { RiShoppingCart2Fill } from "react-icons/ri";
import { MdSwitchAccount } from "react-icons/md";
import { useSelector } from "react-redux";
import { FaSwatchbook } from "react-icons/fa";
import { AiFillEye } from "react-icons/ai";

const SpecialCase:React.FC = () => {
  const products = useSelector((state) => state.orebiReducer.products);

  const watchlist = useSelector((state) => state.orebiReducer.watchlist);
  return (
    <div className= " flex flex-col gap-2">
      <Link to="/watchlist">
        <div className="h-[50px] rounded-md flex flex-col gap-1 text-[#33475b] justify-center items-center overflow-x-hidden group cursor-pointer relative">
          <div className="flex justify-center items-center">
            <AiFillEye className="text-2xl -translate-x-12 group-hover:translate-x-3 transition-transform duration-200" />

            <AiFillEye className="text-2xl -translate-x-3 group-hover:translate-x-12 transition-transform duration-200" />
          </div>
          
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
