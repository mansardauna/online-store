import React from "react";
import { ImCross } from "react-icons/im";
import { useDispatch } from "react-redux";
import {
  removeFromWatchlist,
} from "../../redux/orebiSlice";

const WatchItem = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <div className="w-80 block mb-4 border py-2">
      <img className="w-full h-80" src={item.image} alt="productImage" />
      <h1 className="font-titleFont uppercase font-semibold text-2xl text-center">{item.name}</h1>
      <div className="col-span-5 mdl:col-span-3  items-center justify-between py-4 mdl:py-0 px-4 mdl:px-0 gap-6 mdl:gap-0">
        <div className="flex w-1/3 items-center text-xl font-thin">
          ${item.price}
        </div>
        <div className="w-1/3 flex items-center gap-6 text-lg">

        </div>
        <div onClick={() => dispatch(removeFromWatchlist(item._id))}
          className=" w-fit p-2 border bg-red-400 rounded-md text-xs font-bold text-white cursor-pointer">
          Remove
        </div>
      </div>
    </div>
  );
};

export default WatchItem;
