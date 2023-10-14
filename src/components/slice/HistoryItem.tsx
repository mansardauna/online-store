import React from "react";
import { ImCross } from "react-icons/im";
import { useDispatch } from "react-redux";
import { removeOrderHistory } from "../../redux/orebiSlice";

interface HistoryItemProps{
  item:any
}
const HistoryItem:React.FC<HistoryItemProps> = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <div className="w-full grid md:grid-cols-3 gap-2 xl:grid-cols-5 border p-2">
      <div className="flex col-span-5 mdl:col-span-2 items-center gap-4 ml-2">
        <ImCross
          onClick={() => dispatch(removeOrderHistory(item._id))}
          className="text-primeColor text-xs hover:text-red-500 duration-300 cursor-pointer"
        />
        <img className="w-16 h-16" src={item.img} alt="productImage" />
        <h1 className="font-titleFont font-semibold text-sm">{item.productName}</h1>
      </div>
      <div className="col-span-5 mdl:col-span-3 flex items-center justify-between py-4 mdl:py-0 px-4 mdl:px-0 gap-6 mdl:gap-0">
        <div className="flex w-1/2 items-center text-sm">
          ${item.price}
        </div>
        <div className="w-1/3 flex items-center gap-6 text-lg">
          <p>{item.quantity}</p>
        </div>
        <div className="w-1/3 flex items-center font-titleFont text-sm">
          <p>${item.quantity * item.price}</p>
        </div>
      </div>
    </div>
  );
};

export default HistoryItem;
