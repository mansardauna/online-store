import React, { useEffect, useState } from "react";
import { BsSuitHeartFill } from "react-icons/bs";
import { FaShoppingCart } from "react-icons/fa";
import { MdOutlineLabelImportant } from "react-icons/md";
import Image from "../../designLayouts/Image";
import Badge from "./Badge";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart, addToWatchlist } from "../../../redux/orebiSlice";
import CartModal from "../../ui/CartModal";
import { BiPlay } from "react-icons/bi";
import { useTranslation } from "react-i18next";

interface ProductProps {
  _id: string;
  productName: string;
  img: string | string[]; // Updated to handle string or array
  badge: string;
  category: string;
  price: number;
  color: string | string[];
  videoUrl: string;
  videoThumbnail: string;
  des: string;
}

const Product: React.FC<ProductProps> = (props) => {
  const { t } = useTranslation(["layout"]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isWatchOpen, setIsWatchOpen] = useState(false);
  const [isVideoPlaying, setVideoPlaying] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const _id = props.productName;
  const idString = (_id: string) => String(_id).toLowerCase().split(" ").join("");
  const rootId = idString(_id);

  const handleProductDetails = () => {
    navigate(`/product/${rootId}`, {
      state: { item: props },
    });
  };

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        _id: props._id,
        productName: props.productName,
        quantity: 1,
        img: Array.isArray(props.img) ? props.img[0] : props.img,
        badge: props.badge,
        category: props.category,
        price: props.price,
        colors: Array.isArray(props.color) ? props.color : [props.color],
      })
    );
    setModalOpen(true);
  };

  const handleAddToWatch = () => {
    dispatch(
      addToWatchlist({
        _id: props._id,
        productName: props.productName,
        quantity: 1,
        img: Array.isArray(props.img) ? props.img[0] : props.img,
        badge: props.badge,
        category: props.category,
        price: props.price,
        des: props.des,
        colors: Array.isArray(props.color) ? props.color : [props.color],
      })
    );
    setIsWatchOpen(true);
  };

  const handlePlayVideo = () => {
    setVideoPlaying(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setIsWatchOpen(false);
  };

  useEffect(() => {
    if (isModalOpen || isWatchOpen) {
      const timeoutId = setTimeout(() => {
        setModalOpen(false);
        setIsWatchOpen(false);
      }, 2000);
      return () => clearTimeout(timeoutId);
    }
  }, [isModalOpen, isWatchOpen]);

  // Ensure img is a string for display
  const displayImage = Array.isArray(props.img) ? props.img[0] : props.img || "/img/placeholder.jpg";

  return (
    <>
    <div className="w-full relative group shadow-lg rounded-lg overflow-hidden transition-shadow">
      <div className="relative rounded-lg  border hover:shadow-md">
        {/* Image or Video */}
        {props.videoUrl && !isVideoPlaying ? (
          <div onClick={handlePlayVideo} className="relative rounded-lg cursor-pointer">
            <img
              src={props.videoThumbnail || displayImage}
              alt={props.productName}
              className="w-full rounded-lg h-auto object-cover"
              onError={(e) => {
                e.currentTarget.src = "/img/placeholder.jpg";
              }}
            />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <button className="bg-opacity-80 bg-black text-white rounded-full p-3">
                <BiPlay size={24} />
              </button>
            </div>
          </div>
        ) : props.videoUrl && isVideoPlaying ? (
          <video
            width="100%"
            height="auto"
            controls
            autoPlay
            onClick={() => setVideoPlaying(false)}
            className="w-full h-auto object-cover"
          >
            <source src={props.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <Image
            className="w-full h-auto object-cover"
            imgSrc={displayImage}
          />
        )}

        {/* Badge */}
        {props.badge && (
          <div className="absolute top-4 left-4">
            <Badge text={t(props.badge)} />
          </div>
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="flex gap-3">
            <button
              onClick={handleAddToCart}
              className="p-3 bg-white text-gray-800 rounded-full hover:bg-blue-500 hover:text-white transition-colors"
              aria-label={t("addCart")}
            >
              <FaShoppingCart size={20} />
            </button>
            <button
              onClick={handleProductDetails}
              className="p-3 bg-white text-gray-800 rounded-full hover:bg-blue-500 hover:text-white transition-colors"
              aria-label={t("view")}
            >
              <MdOutlineLabelImportant size={20} />
            </button>
            <button
              onClick={handleAddToWatch}
              className="p-3 bg-white text-gray-800 rounded-full hover:bg-red-500 hover:text-white transition-colors"
              aria-label={t("addWish")}
            >
              <BsSuitHeartFill size={20} />
            </button>
          </div>
        </div>
      </div>
      

      {/* Modals */}
      <CartModal
        isOpen={isModalOpen}
        onClose={closeModal}
        item={props.productName}
        type="cart"
      />
      <CartModal
        isOpen={isWatchOpen}
        onClose={closeModal}
        item={props.productName}
        type="Watch List"
      />
    </div>
    <div className="flex p-2 items-center justify-between">
          <h2 className="text-base font-semibold text-gray-800 truncate">
            {t(props.productName)}
          </h2>
          <p className="text-sm text-gray-600 capitalize">
          ${props.price}
          </p>
        </div>
    </>
  );
};

export default Product;