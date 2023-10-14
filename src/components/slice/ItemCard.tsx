import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { ImCross } from "react-icons/im";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import {
  addOrder,
  addToOrderHistory,
  deleteItem,
} from "../../redux/orebiSlice";

interface ItemCardProps{
  item:any
}

const ItemCard:React.FC<ItemCardProps> = ({ item }) => {
  const {t } = useTranslation(["layout"])
  const [order, setOrder] = useState([]); // Track the user's order
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

  const handleBuy = () => {
    dispatch(addOrder(item)
    );
    dispatch(addToOrderHistory(item)
    );
    

    const updatedOrder = [...order];
   setOrder(updatedOrder);

   
  };
  const dispatch = useDispatch();
  return (
    <div className="w-full grid xl:grid-cols-5 md:grid-cols-3 mb-4 relative border gap-2 p-2">
      <div className="flex col-span-5 mdl:col-span-2 items-center gap-4 ml-4">
        <ImCross
          onClick={() => dispatch(deleteItem(item._id))}
          className="text-primeColor hover:text-red-500 duration-300 cursor-pointer"
        />
        <img className="w-32 h-32" src={item.img} alt="productImage" />
        <h1 className="font-titleFont font-semibold">{item.productName}</h1>
      </div>
      <div className="col-span-5 mdl:col-span-3 flex items-center justify-between py-4 mdl:py-0 px-4 mdl:px-0 gap-6 mdl:gap-0">
        <div className="flex w-1/3 items-center text-lg font-semibold">
          ${item.price}
        </div>
        <div className="w-1/4 items-center gap-6 text-lg">
          <p>{item.quantity}</p>
        </div>
        <div className="w-1/3 flex items-center font-titleFont font-bold text-lg">
          <p>${item.quantity * item.price}</p>
        </div>
        </div>
        <Link to="/order">
        <Button variant={"primary"}
        onClick={handleBuy}
        className="w-16 font-semibold rounded-md float-right shadow-md md:absolute right-5 top-14 text-xs h-8">{t("buy")}</Button>
        </Link>
    </div>
  );
};

export default ItemCard;
