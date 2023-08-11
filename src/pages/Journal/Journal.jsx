import React, { useState } from 'react';
import Product from '../../components/home/Products/Product';
import NavTitle from '../../components/pageProps/shopPage/shopBy/NavTitle';
import { paginationItems } from '../../constants';
import Breadcrumbs from '../../components/pageProps/Breadcrumbs';
import ProductBanner from '../../components/pageProps/shopPage/ProductBanner';
import { BsCardList, BsMusicNoteBeamed, BsPhone } from 'react-icons/bs';
import { FaCarSide } from 'react-icons/fa';
import { GiAmpleDress, GiBookmarklet } from 'react-icons/gi';
import { BiDesktop } from 'react-icons/bi';

const ProductList = () => {
  const [data, setData] = useState(paginationItems)
  const filterResult = (catItems) => {
    const result = paginationItems.filter((curData) => {
      return curData.catergory === catItems;
    });
    setData(result)
  }

  return (
    <div className='p-3'>
      {/* <Breadcrumbs /> */}
      <ProductBanner />
      <div className='mt-5'>
        <NavTitle title="Shop by Category" icons={false} />

      </div>
      <div className="md:flex block">
        <div className='grid w-60 grid-cols-2 md:grid-cols-1 h-fit md:w-1/4  cursor-pointer text-gray-500 mr-7' >

          <div onClick={() => setData(paginationItems)} className="p-3 text-lg flex items-center border-b">
            <BsCardList />

            <div className="ml-3">
              All
            </div>
          </div>

          <div onClick={() => filterResult('fashion')} className="p-3 text-lg border-b flex items-center ">
            <GiAmpleDress />
            <div className="ml-3">
              Fashion
            </div>
          </div>

          <div onClick={() => filterResult('phone')} className="p-3 text-lg border-b flex items-center ">
            <BsPhone />

            <div className="ml-3">
              Phone</div>
          </div>

          <div onClick={() => filterResult('book')} className="p-3 text-lg border-b flex items-center ">
            <GiBookmarklet />
            <div className="ml-3">
              Book</div>
          </div>

          <div onClick={() => filterResult('music')} className="p-3 text-lg border-b flex items-center">
            <BsMusicNoteBeamed />
            <div className="ml-3">
              Music</div>
          </div>

          <div onClick={() => filterResult('car')} className="p-3 text-lg border-b flex items-center">
            <FaCarSide />
            <div className="ml-3">Car</div>
          </div>

          <div onClick={() => filterResult('Electronic')} className="p-3 text-lg border-b flex items-center">
            <BiDesktop />
            <div className="ml-3">
              Electronics</div>
            {/* Add more buttons for other categories */}
          </div>
        </div>
        <div className="md:grid block grid-cols-3 gap-4 w-full">
          {data.map(product => (
            <div className="shadow-xl p-2">
              <Product
                _id={product._id}
                img={product.img}
                productName={product.productName}
                price={product.price}
                category={product.catergory}
                color={product.color}
                // badge={product.badge}
                des={product.des}
              />
            </div>
          ))}
        </div></div>
    </div >
  );
};

export default ProductList;
