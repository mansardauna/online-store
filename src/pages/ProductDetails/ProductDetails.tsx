import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Breadcrumbs from '../../components/pageProps/Breadcrumbs';
import ProductInfo from '../../components/pageProps/productDetails/ProductInfo';
import ReactPlayer from 'react-player';
import Button from '../../components/ui/Button';
import { useTranslation } from 'react-i18next';
import JSZip from 'jszip';
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
  const [activeTab, setActiveTab] = useState<'description' | 'reviews'>('description');
  const [currentImage, setCurrentImage] = useState<string>('');

  // Define openImageModal
  const openImageModal = (img: string) => setModalImage(img);

  // Define handleImageUpload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setImage(e.target.files[0]);
    }
  };

  useEffect(() => {
    if (location.state?.item) {
      const item = location.state.item;
      setProductInfo(item);
      setPrevLocation(location.pathname);
      setVideoUrl(item.videoUrl || '');
      // Ensure img is an array; convert to array if it's a string
      setCurrentImage(
        Array.isArray(item.img) && item.img.length > 0
          ? item.img[0]
          : typeof item.img === 'string'
          ? item.img
          : '/img/placeholder.jpg'
      );
    } else {
      // Handle direct navigation
      navigate('/products');
    }
  }, [location, navigate]);

  const similarProducts = paginationItems
    .filter(
      (item) =>
        item.category === productInfo?.category && item.id !== productInfo?.id
    )
    .slice(0, 4);

  const handleDownload = async () => {
    const zip = new JSZip();
    if (productInfo?.img) {
      const images = Array.isArray(productInfo.img)
        ? productInfo.img
        : [productInfo.img].filter(Boolean);
      for (let i = 0; i < images.length; i++) {
        try {
          const response = await fetch(images[i]);
          if (response.ok) {
            const imageBlob = await response.blob();
            zip.file(`product_image_${i + 1}.png`, imageBlob);
          }
        } catch (error) {
          console.error(`Failed to fetch image ${images[i]}:`, error);
        }
      }
    }
    const content = await zip.generateAsync({ type: 'blob' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(content);
    a.download = 'product_images.zip';
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

  const closeImageModal = () => setModalImage(null);

  return (
    <div className="w-11/12 mx-auto bg-white min-h-screen">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumbs */}
        <Breadcrumbs title={t('productDetails')} prevLocation={prevLocation} />

        {/* Product Details */}
        {productInfo ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
            {/* Image/Video Section */}
            <div className="flex flex-col gap-4">
              {videoUrl ? (
                <ReactPlayer
                  url={videoUrl}
                  controls
                  width="100%"
                  height="400px"
                  className="rounded-lg"
                />
              ) : (
                <>
                  <img
                    src={currentImage}
                    alt={productInfo.productName || 'Product'}
                    className="w-full h-[400px] object-contain rounded-lg cursor-pointer"
                    onClick={() => openImageModal(currentImage)}
                    onError={(e) => {
                      e.currentTarget.src = '/img/placeholder.jpg';
                    }}
                  />
                  <div className="flex gap-2 overflow-x-auto">
                    {(Array.isArray(productInfo.img)
                      ? productInfo.img
                      : [productInfo.img].filter(Boolean)
                    ).map(
                      (img, index) =>
                        img && (
                          <img
                            key={index}
                            src={img}
                            alt={`${productInfo.productName} ${index + 1}`}
                            className={`w-20 h-20 object-cover rounded cursor-pointer ${
                              currentImage === img ? 'border-2 border-blue-500' : ''
                            }`}
                            onClick={() => setCurrentImage(img)}
                            onError={(e) => {
                              e.currentTarget.src = '/img/placeholder.jpg';
                            }}
                          />
                        )
                    )}
                  </div>
                </>
              )}
              <Button
                variant="secondary"
                onClick={handleDownload}
                className="mt-4 w-full bg-gray-200 text-gray-800 hover:bg-gray-300 rounded-lg py-3"
              >
                {videoUrl ? t('downloadVideo') : t('downloadImages')}
              </Button>
            </div>

            {/* Product Info */}
            <ProductInfo productInfo={productInfo} />
          </div>
        ) : (
          <div className="text-center text-gray-600">Loading product details...</div>
        )}

        {/* Tabs: Description and Reviews */}
        <div className="mt-12 bg-white rounded-lg shadow-md p-6">
          <div className="flex border-b">
            <button
              className={`px-4 py-2 font-semibold ${
                activeTab === 'description'
                  ? 'border-b-2 border-blue-500 text-blue-500'
                  : 'text-gray-600'
              }`}
              onClick={() => setActiveTab('description')}
            >
              {t('description')}
            </button>
            <button
              className={`px-4 py-2 font-semibold ${
                activeTab === 'reviews'
                  ? 'border-b-2 border-blue-500 text-blue-500'
                  : 'text-gray-600'
              }`}
              onClick={() => setActiveTab('reviews')}
            >
              {t('reviews')}
            </button>
          </div>
          <div className="mt-4">
            {activeTab === 'description' ? (
              <p className="text-gray-600">{productInfo?.des || 'No description available'}</p>
            ) : (
              <div>
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
                          <FaStar className="text-yellow-400 w-5 h-5" />
                        ) : (
                          <FaRegStar className="text-gray-300 w-5 h-5" />
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
                      className="bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-400 rounded-lg py-3"
                    >
                      {t('submit')}
                    </Button>
                  </div>
                </div>

                {/* Display Reviews */}
                {submittedFeedbacks.length > 0 ? (
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
                            className="w-16 h-16 object-cover rounded cursor-pointer"
                            onClick={() => openImageModal(fb.image)}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">No reviews yet.</p>
                )}
              </div>
            )}
          </div>
        </div>

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
                    img={Array.isArray(product.img) ? product.img : [product.img].filter(Boolean)}
                    productName={product.productName}
                    price={product.price}
                    category={product.category}
                    color={product.color || 'N/A'}
                    des={product.des}
                    videoUrl={''}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Image Modal */}
        {modalImage && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="relative max-w-4xl w-full">
              <img
                src={modalImage}
                alt="Full view"
                className="w-full h-auto rounded-lg"
              />
              <button
                onClick={closeImageModal}
                className="absolute top-4 right-4 text-white bg-gray-800 p-2 rounded-full hover:bg-gray-900"
              >
                <FaTimes size={24} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;