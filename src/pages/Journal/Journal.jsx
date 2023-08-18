import React, { useState } from 'react';
import Product from '../../components/home/Products/Product'
import NavTitle from '../../components/pageProps/shopPage/shopBy/NavTitle';
import { paginationItems } from '../../constants/index';
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
  const [filters, setFilters] = useState(paginationItems)

  const [selectOption, setSelectedOption] = useState("All")
  const filterResult = (catItems) => {
    const result = paginationItems.filter((curData) => {
      return curData.catergory === catItems;
    });
    setData(result)
    setSelectedOption(catItems)

  }
  return (
    <div className='p-3'>
      <div className="items-center flex w-full justify-between">
        <div className='mt-5 w-1/2 md:w-1/5 items-center justify-between flex'>
          <div className='text-[#737373]'> By category :</div>
          <div className='w-fit'>

            <select
              value={selectOption}
              onChange={(e) => filterResult(e.target.value)}
              className="w-60 md:w-40 border-[1px] border-gray-200 py-1 px-4 cursor-pointer text-primeColor text-base block dark:placeholder-gray-400 appearance-none focus-within:outline-none"

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
        <div>
          {
            selectOption === ('fashion') && (
              <>
                <div>Sex :</div>
                <select name="" value={data} id=""
                  onChange={(e) => filterResult(e.target.value)}>
                  <option value="phone">Male</option>
                  <option value="car">Female</option>
                </select>
              </>
            )
          }
        </div>


      </div>

      <div className="md:flex block">

        {selectOption === ("fashion") && (
          <div className='grid w-80 grid-cols-2 md:grid-cols-1 h-fit md:w-1/6  mt-20 cursor-pointer text-gray-500 mr-7 ' >

            <div className='w-fit m-auto text-xl'>Type</div>
            <div onClick={() => filterResult('fashion')} className="p-3 text-lg border-b border-t flex items-center hover:text-black">
              Cap
            </div>

            <div onClick={() => filterResult('phone')} className="p-3 text-lg border-b flex items-center hover:text-black ">

              Dress</div>


            <div onClick={() => filterResult('book')} className="p-3 text-lg border-b flex items-center 
          hover:text-black">
              Shoe</div>


          </div>
        )
        }
        {selectOption === ("phone") && (
          <div className='grid w-80 grid-cols-2 md:grid-cols-1 h-fit md:w-1/6  mt-20 cursor-pointer text-gray-500 mr-7 ' >

            <div className='w-fit m-auto text-xl'>By Brand</div>
            <div onClick={() => filterResult('fashion')} className="p-3 text-lg border-b border-t flex items-center hover:text-black">
              Apple
            </div>

            <div onClick={() => filterResult('phone')} className="p-3 text-lg border-b flex items-center hover:text-black ">

              Samsung</div>


            <div onClick={() => filterResult('book')} className="p-3 text-lg border-b flex items-center 
          hover:text-black">
              Vivo</div>


          </div>
        )
        }
        {selectOption === ("book") && (
          <div className='grid w-80 grid-cols-2 md:grid-cols-1 h-fit md:w-1/6  mt-20 cursor-pointer text-gray-500 mr-7 ' >

            <div className='w-fit m-auto text-xl'>Type</div>
            <div onClick={() => filterResult('fashion')} className="p-3 text-lg border-b border-t flex items-center hover:text-black">
              Novel
            </div>

            <div onClick={() => filterResult('phone')} className="p-3 text-lg border-b flex items-center hover:text-black ">

              Journal</div>


            <div onClick={() => filterResult('book')} className="p-3 text-lg border-b flex items-center 
          hover:text-black">
              Article</div>


          </div>
        )
        }
        {selectOption === ("music") && (
          <div className='grid w-80 grid-cols-2 md:grid-cols-1 h-fit md:w-1/6  mt-20 cursor-pointer text-gray-500 mr-7 ' >

            <div className='w-fit m-auto text-xl'>Type</div>
            <div onClick={() => filterResult('fashion')} className="p-3 text-lg border-b border-t flex items-center hover:text-black">
              Rap
            </div>

            <div onClick={() => filterResult('phone')} className="p-3 text-lg border-b flex items-center hover:text-black ">

              Afro-beat</div>


            <div onClick={() => filterResult('book')} className="p-3 text-lg border-b flex items-center 
          hover:text-black">
              Trap</div>


          </div>
        )
        }
        {selectOption === ("car") && (
          <div className='grid w-80 grid-cols-2 md:grid-cols-1 h-fit md:w-1/6  mt-20 cursor-pointer text-gray-500 mr-7 ' >

            <div className='w-fit m-auto text-xl'>By Brand</div>
            <div onClick={() => filterResult('fashion')} className="p-3 text-lg border-b border-t flex items-center hover:text-black">
              Mecedeze benz
            </div>

            <div onClick={() => filterResult('phone')} className="p-3 text-lg border-b flex items-center hover:text-black ">

              Toyota</div>


            <div onClick={() => filterResult('book')} className="p-3 text-lg border-b flex items-center 
          hover:text-black">
              Honda</div>


          </div>
        )
        }
        {selectOption === ("Electronic") && (
          <div className='grid w-80 grid-cols-2 md:grid-cols-1 h-fit md:w-1/6  mt-20 cursor-pointer text-gray-500 mr-7 ' >

            <div className='w-fit m-auto text-xl'>By Brand</div>
            <div onClick={() => filterResult('fashion')} className="p-3 text-lg border-b border-t flex items-center hover:text-black">
              television
            </div>

            <div onClick={() => filterResult('phone')} className="p-3 text-lg border-b flex items-center hover:text-black ">

              Speaker</div>


            <div onClick={() => filterResult('book')} className="p-3 text-lg border-b flex items-center 
          hover:text-black">
              Power Bank</div>


          </div>
        )
        }

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
    </div >
  );
};

export default ProductList;
