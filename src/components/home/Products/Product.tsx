import React, { useEffect, useState } from "react";
import { BsSuitHeartFill } from "react-icons/bs";
import { FaShoppingCart } from "react-icons/fa";
import { MdOutlineLabelImportant } from "react-icons/md";
import Image from "../../designLayouts/Image";
import Badge from "./Badge";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart, addToWatchlist } from "../../../redux/orebiSlice";
import Button from "../../ui/Button";
import CartModal from "../../ui/CartModal";
import { BiPlay } from "react-icons/bi";
import { useTranslation } from "react-i18next";

interface ProductProps {
  _id: string;
  productName: string;
  img: string;
  badge: string;
  category: string;
  price: number;
  color: string[];
  videoUrl: string;
  videoThumbnail: string;
  des: string;
}

const Product: React.FC<ProductProps> = (props) => {
  const { t } = useTranslation(["layout"]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [iswhatchOpen, setIsWatchOpen] = useState(false);
  const [isVideoPlaying, setVideoPlaying] = useState(false);

  const handlePlayVideo = () => {
    setVideoPlaying(true);
  };

  const dispatch = useDispatch();
  const _id = props.productName;
  const idString = (_id: string) => {
    return String(_id).toLowerCase().split(" ").join("");
  };
  const rootId = idString(_id);

  const navigate = useNavigate();
  const productItem = props;
  const handleProductDetails = () => {
    navigate(`/product/${rootId}`, {
      state: {
        item: productItem,
      },
    }); 
  };

  const { videoUrl, videoThumbnail } = props;

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        _id: props._id,
        productName: props.productName,
        quantity: 1,
        img: props.img,
        badge: props.badge,
        category: props.category,
        price: props.price,
        colors: props.color,
      })
    );
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    if (isModalOpen) {
      const timeoutId = setTimeout(() => {
        setModalOpen(false);
      }, 2000);
      return () => clearTimeout(timeoutId);
    }
    if (iswhatchOpen) {
      const timeoutwatch = setTimeout(() => {
        setIsWatchOpen(false);
      }, 2000);
      return () => clearTimeout(timeoutwatch);
    }
  }, [isModalOpen, iswhatchOpen]);

  const handleAddToWatch = () => {
    dispatch(
      addToWatchlist({
        _id: props._id,
        productName: props.productName,
        quantity: 1,
        img: props.img,
        badge: props.badge,
        category: props.category,
        price: props.price,
        des: props.des,
        colors: props.color,
      })
    );
    setIsWatchOpen(true);
  };

  return (
    <div className="md:w-full m-auto w-64 relative group">
      <div className="max-w-80  max-h-80 relative overflow-y-hidden">
        <div>
          {videoUrl ? (
            <div>
              {isVideoPlaying ? (
                <video
                  width="100%"
                  height="80%"
                  controls
                  autoPlay
                  onClick={() => setVideoPlaying(false)}
                >
                  <source src={videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <div onClick={handlePlayVideo} className="relative cursor-pointer">
                  <img
                    src={videoThumbnail || props.img}
                    alt={props.productName}
                    className="w-full h-52 md:h-52"
                  />
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <button className="bg-opacity-80 bg-black text-white rounded-full p-2">
                      <BiPlay />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Image className="w-full h-52 md:h-52" imgSrc={props.img} />
          )}
        </div>
        <div className="absolute top-6 left-8">
          {props.badge && <Badge text={t("new")} />}
        </div>
        <div className="w-full h-32 absolute bg-white -bottom-[130px] group-hover:bottom-0 duration-700">
          <ul className="w-full h-full flex flex-col items-end justify-center gap-2 font-titleFont px-2 border-l border-r">
            <li
              onClick={handleAddToCart}
              className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full"
            >
              {t("addCart")}
              <span>
                <FaShoppingCart />
              </span>
            </li>
            <li
              onClick={handleProductDetails}
              className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full"
            >
              {t("view")}
              <span className="text-lg">
                <MdOutlineLabelImportant />
                <CartModal isOpen={isModalOpen} onClose={closeModal} item={props.productName} type="cart" />
              </span>
            </li>
            <li
              onClick={handleAddToWatch}
              className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full"
            >
              {t("addWish")}
              <span>
                <BsSuitHeartFill />
              </span>
              <CartModal isOpen={iswhatchOpen} onClose={closeModal} item={props.productName} type="Watch List" />
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-80 py-6 flex flex-col gap-1 border-[1px] border-t-0 px-4">
        <div className="flex items-center justify-between uppercase font-titleFont">
          <h2 className="text-sm text-primeColor product-name font-bold">
            {t(`${props.productName}`)}
          </h2>
          <p className="text-[#767676] text-[14px]">
            ${t(`${props.price}`)}
          </p>
        </div>
        
        <div className=" justify-between items-center mt-2 flex">
          <p className="text-[#767676] text-xs capitalize">{t("category")}:{t(`${props.category}`)}
</p>
          <Button variant="primary"
          className="text-sm rounded font-semibold border-none" 
          onClick={handleProductDetails}>{t("buy")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Product;
