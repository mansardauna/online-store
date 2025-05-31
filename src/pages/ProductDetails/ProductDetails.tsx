// ProductDetails.tsx
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Breadcrumbs from '../../components/pageProps/Breadcrumbs';
import ProductInfo from '../../components/pageProps/productDetails/ProductInfo';
import ReactPlayer from 'react-player';
import Button from '../../components/ui/Button';
import { useTranslation } from 'react-i18next';
import JSZip from 'jszip';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { paginationItems, Product as ProductType } from '../../constants/constant';
import { FaStar, FaRegStar, FaTimes } from 'react-icons/fa';
import Product from '../../components/home/Products/Product';

const ProductDetails: React.FC = () => {
  const { t } = useTranslation(['layout']);
  const location = useLocation();
  const navigate = useNavigate();
  const [prevLocation, setPrevLocation] = useState('');
  const [productInfo, setProductInfo] = useState<ProductType | null>(null);
  const [videoUrl, setVideoUrl] = useState('');
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);
  const [image, setImage] = useState<File | null>(null);
  const [submittedFeedbacks, setSubmittedFeedbacks] = useState<
    { text: string; rating: number; image?: string }[]
  >([]);
  const [modalImage, setModalImage] = useState<string | null>(null);

  useEffect(() => {
    if (location.state?.item) {
      setProductInfo(location.state.item);
      setPrevLocation(location.pathname);
      setVideoUrl(location.state.item.videoUrl);
    }
  }, [location]);

  // Get similar products (same category, exclude current product)
  const similarProducts = paginationItems
    .filter(
      (item) =>
        item.category === productInfo?.category && item.id !== productInfo?.id
    )
    .slice(0, 4);

  // Carousel settings
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const handleDownload = async () => {
    const zip = new JSZip();
    if (productInfo?.img) {
      for (let i = 0; i < productInfo.img.length; i++) {
        const response = await fetch(productInfo.img[i]);
        const imageBlob = await response.blob();
        zip.file(`product_image_${i + 1}.png`, imageBlob);
      }
    }
    const content = await zip.generateAsync({ type: 'blob' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(content);
    a.download = 'product_img.zip';
    a.click();
  };

  const handleFeedbackSubmit = () => {
    if (feedback.trim() && rating > 0) {
      const newFeedback = {
        text: feedback,
        rating,
        image: image ? URL.createObjectURL(image) : undefined,
      };
      setSubmittedFeedbacks([...submittedFeedbacks, newFeedback]);
      setFeedback('');
      setRating(0);
      setImage(null);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setImage(e.target.files[0]);
    }
  };

  const openImageModal = (img: string) => setModalImage(img);
  const closeImageModal = () => setModalImage(null);

  return (
    <div className="w-full mx-auto bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumbs */}
        <Breadcrumbs title={t('productDetails')} prevLocation={prevLocation} />

        {/* Product Details */}
        {productInfo && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6 bg-white rounded-lg shadow-md p-6">
            {/* Image/Video Section */}
            <div className="relative">
              {videoUrl ? (
                <ReactPlayer
                  url={videoUrl}
                  controls
                  width="100%"
                  height="400px"
                  className="rounded-lg"
                />
              ) : productInfo.img.length > 1 ? (
                <Slider {...carouselSettings} className="rounded-lg">
                  {productInfo.img.map((img, index) => (
                    <div
                      key={index}
                      className="cursor-pointer"
                      onClick={() => openImageModal(img)}
                    >
                      <img
                        src={img}
                        alt={`${productInfo.productName} ${index + 1}`}
                        className="w-full h-96 object-cover rounded-lg"
                        onError={(e) => {
                          e.currentTarget.src = '/img/placeholder.jpg';
                        }}
                      />
                    </div>
                  ))}
                </Slider>
              ) : (
                <img
                  src={productInfo.img[0]}
                  alt={productInfo.productName}
                  className="w-full h-96 object-cover rounded-lg cursor-pointer"
                  onClick={() => openImageModal(productInfo.img[0])}
                  onError={(e) => {
                    e.currentTarget.src = '/img/placeholder.jpg';
                  }}
                />
              )}
              <Button
                variant="secondary"
                onClick={handleDownload}
                className="mt-4 w-full bg-gray-700 text-white hover:bg-gray-800"
              >
                {videoUrl ? t('downloadVideo') : t('downloadImages')}
              </Button>
            </div>

            {/* Product Info */}
            <div className="flex flex-col gap-4">
              <ProductInfo productInfo={productInfo} />
              <div className="flex gap-4">
                <Button
                  variant="primary"
                  className="bg-blue-600 text-white hover:bg-blue-700"
                >
                  {t('addToCart')}
                </Button>
                <Button
                  variant="outline"
                  className="border-blue-600 text-blue-600 hover:bg-blue-50"
                >
                  {t('buyNow')}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              {t('similarProducts')}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {similarProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
                  onClick={() =>
                    navigate(`/products/${product.id}`, { state: { item: product } })
                  }
                >
                  <Product
                    _id={product.id}
                    img={product.img[0]} // Use first image
                    productName={product.productName}
                    price={product.price}
                    category={product.category}
                    color={product.color || 'N/A'}
                    des={product.des}
                    videoUrl={product.videoUrl || ''}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reviews Section */}
        <div className="mt-12 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            {t('productFeed')}
          </h2>

          {/* Submit Review */}
          <div className="mb-6">
            <div className="flex items-center mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className="focus:outline-none"
                >
                  {star <= rating ? (
                    <FaStar className="text-yellow-400 w-6 h-6" />
                  ) : (
                    <FaRegStar className="text-gray-300 w-6 h-6" />
                  )}
                </button>
              ))}
            </div>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder={t('writeFeed')}
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="text-sm text-gray-600"
              />
              <Button
                variant="primary"
                onClick={handleFeedbackSubmit}
                disabled={!feedback.trim() || rating === 0}
                className="bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-400"
              >
                {t('submit')}
              </Button>
            </div>
          </div>

          {/* Display Reviews */}
          {submittedFeedbacks.length > 0 && (
            <div className="space-y-4">
              {submittedFeedbacks.map((fb, index) => (
                <div
                  key={index}
                  className="border-t pt-4 flex flex-col sm:flex-row gap-4"
                >
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={
                            i < fb.rating ? 'text-yellow-400' : 'text-gray-300'
                          }
                        />
                      ))}
                    </div>
                    <p className="text-gray-700">{fb.text}</p>
                  </div>
                  {fb.image && (
                    <img
                      src={fb.image}
                      alt="Feedback"
                      className="w-20 h-20 object-cover rounded cursor-pointer"
                      onClick={() => openImageModal(fb.image)}
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Image Modal */}
      {modalImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative max-w-3xl w-full">
            <img
              src={modalImage}
              alt="Full view"
              className="w-full h-auto rounded-lg"
            />
            <button
              onClick={closeImageModal}
              className="absolute top-4 right-4 text-white bg-gray-800 p-2 rounded-full hover:bg-gray-700"
            >
              <FaTimes size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;