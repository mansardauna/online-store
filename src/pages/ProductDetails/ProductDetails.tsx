import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Breadcrumbs from '../../components/pageProps/Breadcrumbs';
import ProductInfo from '../../components/pageProps/productDetails/ProductInfo';
import ReactPlayer from 'react-player';
import Button from '../../components/ui/Button';
import { useTranslation } from 'react-i18next';
import JSZip from 'jszip';
import Userfeed from '../../components/ui/Userfeed';

const ProductDetails:React.FC = () => {
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState('');
  const [productInfo, setProductInfo] = useState([]);
  const [videoUrl, setVideoUrl] = useState('');
  const [feedback, setFeedback] = useState('');
  const [image, setImage] = useState(null);
  const [submittedFeedback, setSubmittedFeedback] = useState(''); // Track submitted feedback

  useEffect(() => {
    setProductInfo(location.state.item);
    setPrevLocation(location.pathname);
    setVideoUrl(location.state.item.videoUrl);
  }, [location, productInfo]);


  const handleDownload = async () => {
    const zip = new JSZip();

    const response = await fetch(productInfo.img);
    const imageBlob = await response.blob();

    zip.file('product_image.png', imageBlob);

    const content = await zip.generateAsync({ type: 'blob' });

    // Create a download link
    const a = document.createElement('a');
    a.href = URL.createObjectURL(content);
    a.download = 'product_image.zip';
    a.style.display = 'none';

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleFeedbackSubmit = () => {
    setSubmittedFeedback(feedback);
    setFeedback('');
    setImage(null);
  };

  const handleImageUpload = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  const { t } = useTranslation(['layout']);

  return (
    <div className="w-full mx-auto border-b-[1px] border-b-gray-300">
      <div className="max-w-container mx-auto px-4">
        <div className="xl:-mt-10 -mt-7">
          <Breadcrumbs title={t('productDetails')} prevLocation={prevLocation} />
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-4 h-full -mt-5 xl:-mt-8 pb-10 bg-gray-100 p-4">
          {/* <div className="h-full">
            <ProductsOnSale />
          </div> */}
          <div className="h-80 md:h-96 md:w-[100%] m-auto xl:col-span-2">
            {videoUrl ? (
              <ReactPlayer url={videoUrl} controls width="100%" height="100%"
              className="" />
            ) : (
              <img
                src={productInfo.img}
                alt={productInfo.img}
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <div className="h-full w-full md:col-span-2 xl:col-span-3 xl:p-14 flex flex-col gap-6 justify-center">
            <ProductInfo productInfo={productInfo} />
            {videoUrl ? (
              <button onClick={handleDownload}>{t('downloadVideo')}</button>
            ) : (
              <button onClick={handleDownload}>{t('downloadImage')}</button>
            )}
          </div>
        </div>
        {/* Feedback section */}
        {submittedFeedback && (
            <div className="mt-4 w-full border border-gray-200 rounded-md p-2">
              <Userfeed />
              <span className=" bg-gray-100 ml-[7%] lg:ml-[5%] px-4 mb-5 p-2 rounded-lg">{submittedFeedback}</span>
            </div>
          )}
        <div className="mt-4 w-9/12 lg:w-1/2 m-auto mb-10">
          <h2 className="text-xl font-semibold mb-2 text-center">{t('productFeed')}</h2>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder={t('writeFeed')}
            rows="2"
            className="w-full p-2 border border-gray-300 rounded"
          ></textarea>
          <div className="flex md:flex-row flex-col justify-between">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="mt-2 w-1/2"
            />
            <Button
              variant="primary"
              onClick={handleFeedbackSubmit}
              className="mt-2 bg-primeColor text-white rounded hover:bg-black duration-300"
            >
              {t('submit')}
            </Button>
          </div>
          {/* Display submitted feedback */}
         
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
