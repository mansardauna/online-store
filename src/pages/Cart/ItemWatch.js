import React from "react";
import { useDispatch } from "react-redux";
import Button from "../../components/ui/Button";
import {
  removeFromWatchlist,
} from "../../redux/orebiSlice";

const WatchItem = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <div className=" w-96 mb-4 border  p-2">
      <div className="m-auto flex w-fit">
      <img className="w-40 h-40" src={item.image} alt="productImage" />
      <div className="flex flex-col justify-between items-center ml-4">
      <h1 className="font-titleFont uppercase font-semibold text-lg text-center">{item.name}</h1>
   
        <div className="flex text-sm font-thin">
          ${item.price}
        </div>
        <div className=" flex gap-1 text-lg">
        <Button
      variant="primary"
      className=" text-xs "
      >
        By Now
      </Button>
        <Button variant="primary" onClick={() => dispatch(removeFromWatchlist(item._id))}
          className=" w-fit p-2 border-none bg-red-500 rounded-md text-xs font-bold text-white cursor-pointer ">
          Remove
        </Button>
      </div>
      </div>
      </div>
    </div>
  );
};

export default WatchItem;
