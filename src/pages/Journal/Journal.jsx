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


const ground = [
  { play: 'All', icon: <BsCardList /> },
  { play: 'fashion', icon: <GiAmpleDress /> },
  { play: 'phone', icon: <BsPhone /> },
  { play: 'book', icon: <GiBookmarklet /> },
  { play: 'music', icon: <BsMusicNoteBeamed /> },
  { play: 'car', icon: <FaCarSide /> },
  { play: 'Electronic', icon: <BiDesktop /> },
];

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
      <div className="items-center flex w-full justify-between">
        <div className='mt-5 w-1/2 md:w-1/5 items-center justify-between flex'>
          <div className='text-[#737373]'> By category :</div>
          <div className='w-fit'>

            <select
              value={data}
              onChange={(e) => filterResult(e.target.value)}
              className="w-16 md:w-20 border-[1px] border-gray-200 py-1 px-4 cursor-pointer text-primeColor text-base block dark:placeholder-gray-400 appearance-none focus-within:outline-none focus-visible:border-primeColor"

            >
              {ground.map(({ play, icon }) => (
                <option key={play} value={play}>
                  {icon}
                  <span className='ml-3'>{play}</span>
                </option>
              ))}
            </select>
          </div >
        </div >

        <div className='mt-5 w-1/2 md:w-1/5 items-center justify-between flex'>
          <div className='text-[#737373]'> By Brand :</div>
          <div className='w-fit'>

            <select
              value={data}
              onChange={(e) => filterResult(e.target.value)}
              className="w-16 md:w-20 border-[1px] border-gray-200 py-1 px-4 cursor-pointer text-primeColor text-base block dark:placeholder-gray-400 appearance-none focus-within:outline-none focus-visible:border-primeColor"

            >
              {ground.map(({ play, icon }) => (
                <option key={play} value={play}>
                  {icon}
                  <span className='ml-3'>{play}</span>
                </option>
              ))}
            </select>
          </div >
        </div >
      </div>

      <div className="md:flex block">


        <div className='grid w-80 grid-cols-2 md:grid-cols-1 h-fit md:w-1/4  mt-20 cursor-pointer text-gray-500 mr-7 ' >


          <div onClick={() => filterResult('fashion')} className="p-3 text-lg border-b border-t flex items-center hover:text-black">
            New Arrival
          </div>

          <div onClick={() => filterResult('phone')} className="p-3 text-lg border-b flex items-center hover:text-black ">

            Best Sells</div>


          <div onClick={() => filterResult('book')} className="p-3 text-lg border-b flex items-center 
          hover:text-black">
            Special Offers</div>


        </div>

        <div className="md:grid block grid-cols-3 gap-4 w-fit m-auto">
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
    </div>
  );
};

export default ProductList;
