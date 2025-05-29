import React, { useEffect, useState } from 'react';
import { BiPlay } from 'react-icons/bi';
import { BsSuitHeartFill } from 'react-icons/bs';
import { FaShoppingCart } from 'react-icons/fa';
import { MdOutlineLabelImportant } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Image from '../../components/designLayouts/Image';
import Badge from '../../components/home/Products/Badge';
import Button from '../../components/ui/Button';
import CartModal from '../../components/ui/CartModal';
import { addToCart, addToWatchlist } from '../../redux/orebiSlice';

interface ListViewProps {
  productName: string;
  img: string;
  badge: string;
  category: string;
  price: number;
  color: string;
  _id: any;
  videoUrl?: string;
  videoThumbnail?: string;
}

const ListView: React.FC<ListViewProps> = (props) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [iswhatchOpen, setIsWatchOpen] = useState(false);
  const [isVideoPlaying, setVideoPlaying] = useState(false);

  const handlePlayVideo = () => {
    setVideoPlaying(true);
  };

  const dispatch = useDispatch();
  const _id = props.productName;
  const idString = (_id: string) => {
    return String(_id).toLowerCase().split(' ').join('');
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
        name: props.productName,
        quantity: 1,
        image: props.img,
        badge: props.badge,
        category: props.category,
        price: props.price,
        colors: props.color,
      })
    );
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false); // Close the modal
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
        name: props.productName,
        quantity: 1,
        image: props.img,
        badge: props.badge,
        category: props.category,
        price: props.price,
        colors: props.color,
      })
    );
    setIsWatchOpen(true);
  };

  return (
    <div className="w-full m-auto w relative flex border p-2">
      <div className="max-w-full max-h-80 relative overflow-y-hidden">
        <div>
          {videoUrl ? (
            <div>
              {isVideoPlaying ? (
                <video
                  width="100%"
                  height="auto"
                  controls
                  autoPlay
                  onClick={() => setVideoPlaying(false)} // Pause when clicked
                >
                  <source src={videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <div
                  onClick={handlePlayVideo} // Start playing when clicked
                  className="relative cursor-pointer"
                >
                  <img
                    src={videoThumbnail || props.img}
                    alt={props.productName}
                    className="w-full h-56 md:h-56"
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
            <Image className="w-40 h-44 md:h-40" imgSrc={props.img} />
          )}
        </div>
        <div className="absolute top-2 left-8" onClick={handleProductDetails}>
          {props.badge && <Badge text="View" />}
        </div>
      </div>
      <div>
        <div className="max-w-full md:py-5 py-1 flex flex-row gap-5 px-2">
          <div className="justify-between w-full uppercase font-titleFont md:flex grid grid-cols-2 gap-5">
            <div className="md:w-40 flex flex-col w-24 md:gap-5 gap-2">
              <span className="mx-auto w-fit text-gray-400 text-sm">Name</span>
              <h2 className="md:text-2xl text-primeColor text-lg text-center product-name font-bold">
                {props.productName}
              </h2>
            </div>
            <div className="flex flex-col w-20 md:gap-5 gap-2">
              <span className="mx-auto w-fit text-gray-400 text-sm">Price</span>
              <h2 className="text-lg text-gray-500 text-center product-name ">
                ${props.price}
              </h2>
            </div>
            <div className="w-20 flex flex-col md:gap-5 gap-2">
              <span className="mx-auto w-fit text-gray-400 text-sm">Category</span>
              <h2 className="text-sm text-primeColor text-center product-name ">
                {props.category}
              </h2>
            </div>
            <Button
              variant="primary"
              className="text-sm m-auto h-10 rounded font-semibold border-none"
              onClick={handleProductDetails}
            >
              Buy
            </Button>
            <div></div>
          </div>
        </div>
        <div className="flex gap-3 w-fit md:float-none float-right mx-auto">
          <div
            onClick={handleAddToCart}
            className="text-[#767676] hover:text-primeColor md:text-sm text-xl font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-start gap-2 hover:cursor-pointer pb-1 duration-300 w-fit"
          >
            <span className="hidden md:block">Add to Cart</span>
            <FaShoppingCart />
          </div>
          <div
            onClick={handleProductDetails}
            className="text-[#767676] hover:text-primeColor md:text-sm text-xl font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-start gap-2 hover:cursor-pointer pb-1 duration-300 w-fit"></div>
