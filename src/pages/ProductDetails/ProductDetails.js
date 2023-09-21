import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Breadcrumbs from '../../components/pageProps/Breadcrumbs';
import ProductInfo from '../../components/pageProps/productDetails/ProductInfo';
import ProductsOnSale from '../../components/pageProps/productDetails/ProductsOnSale';
import JSZip from 'jszip';
import ReactPlayer from 'react-player';

const ProductDetails = () => {
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState('');
  const [productInfo, setProductInfo] = useState([]);
  const [videoUrl, setVideoUrl] = useState('');
  const [feedback, setFeedback] = useState('');
  const [image, setImage] = useState(null); // State variable to store the uploaded image

  useEffect(() => {
    setProductInfo(location.state.item);
    setPrevLocation(location.pathname);
    setVideoUrl(location.state.item.videoUrl);
  }, [location, productInfo]);

  // Function to handle the download button click event
  const handleDownload = async () => {
    // ... your existing download logic ...
  };

  // Function to handle user feedback submission
  const handleFeedbackSubmit = () => {
    // Here, you can send the `feedback` and `image` data to your backend or perform any other actions.
    // You may want to use an API call or a state management library like Redux to handle this.

    // Clear the feedback input field and image after submission
    setFeedback('');
    setImage(null);
  };

  // Function to handle image upload
  const handleImageUpload = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  return (
    <div className="w-full mx-auto border-b-[1px] border-b-gray-300">
      <div className="max-w-container mx-auto px-4">
        <div className="xl:-mt-10 -mt-7">
          <Breadcrumbs title="" prevLocation={prevLocation} />
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-4 h-full -mt-5 xl:-mt-8 pb-10 bg-gray-100 p-4">
          <div className="h-full">
            <ProductsOnSale />
          </div>
          <div className="h-full xl:col-span-2">
            {videoUrl && (
              <ReactPlayer
                url={videoUrl}
                controls
                width="100%"
                height="100%"
              />
            )}
          </div>
          <div className="h-full w-full md:col-span-2 xl:col-span-3 xl:p-14 flex flex-col gap-6 justify-center">
            <ProductInfo productInfo={productInfo} />
            {videoUrl ? (
              <button onClick={handleDownload}>Download Video</button>
            ) : (
              <button onClick={handleDownload}>Download Product Image</button>
            )}

            {/* Feedback section */}
            <div className="mt-4">
              <h2 className="text-xl font-semibold mb-2">Product Feedback</h2>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Write your feedback here..."
                rows="4"
                className="w-full p-2 border border-gray-300 rounded"
              ></textarea>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="mt-2"
              />
              <button
                onClick={handleFeedbackSubmit}
                className="mt-2 bg-primeColor text-white px-4 py-2 rounded hover:bg-black duration-300"
              >
                Submit Feedback
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
