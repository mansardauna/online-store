import React from 'react'
import { FaShoppingCart } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Sort from '../../pages/ProductList/Sort';
import Flex from '../designLayouts/Flex';
import FooterBottom from '../home/Footer/FooterBottom';
import Header from '../home/Header/Header';

 const Sidebar=() => {
  const products = useSelector((state) => state.orebiReducer.products);
    return (
      <div className='flex flex-col justify-between h-[95%]'>
        <Link
         to="/">
            <div>
              <div className=" text-black font-bold uppercase text-2xl mt-5 w-full m-auto">Digital Market</div>
            </div>
          </Link>
           <Header />
           <div className="flex">
            <div>
           <Link to="/cart">
              <div className="relative">
                <FaShoppingCart />
                <span className="absolute font-titleFont top-3 -right-2 text-xs w-4 h-4 flex items-center justify-center rounded-full bg-primeColor text-white">
                  {products.length > 0 ? products.length : 0}
                </span>

              </div>
            </Link>
              </div>
              <div></div>
            
           </div>
          
      </div>
    )
  }


export default Sidebar