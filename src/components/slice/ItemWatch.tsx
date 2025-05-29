import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import {
  removeFromWatchlist,
} from "../../redux/orebiSlice";

interface WatchItemsProps{
  item:any
}
const WatchItem:React.FC<WatchItemsProps> = ({ item }) => {
  const { t } = useTranslation (["layout"])
  const dispatch = useDispatch();
  const _id = item.productName;
  const idString = (_id) => {
    return String(_id).toLowerCase().split(" ").join("");
  };
  const rootId = idString(_id);

  const navigate = useNavigate();
  const productItem = item;

  const handleProductDetails = () => {
    navigate(`/product/${rootId}`, {
      state: {
        item: productItem,
      },
    });
  };

  return (
    <div className=" rounded-md border p-2">
      <div className="m-auto flex flex-col gap-3 w-fit">
      <img className="w-52 h-40" src={item.img} alt="productImage" />
      <div className="flex flex-col justify-between items-center">
      <h1 className="font-titleFont uppercase font-semibold text-xl text-center">{t(`${item.productName}`)}</h1>
   
        <div className="flex text-gray-400 text-lg font-thin">
        {t(`$${item.price}`)}
        </div>
        <div className=" flex gap-5 mt-4 text-lg">
        <Button variant="primary" onClick={() => dispatch(removeFromWatchlist(item._id))}
          className=" w-fit p-2 border-none bg-red-500 rounded-md text-xs font-bold text-white cursor-pointer ">
          {t("remove")}
        </Button>
        <Button
        onClick={handleProductDetails}
      variant="primary"
      className=" rounded-md shadow-md font-semibold text-xs "
      >
        {t("buyNow")}
      </Button>
      </div>
      </div>
      </div>
    </div>
  );
};

export default WatchItem;
