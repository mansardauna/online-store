import React from 'react'
import { FaShoppingCart } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Header from '../home/Header/Header';
import SpecialCase from '../SpecialCase/SpecialCase';
import SideCart from './SideCart';

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
           <div className="flex  w-11/12 mx-auto justify-between">
         <SideCart />
         
            <SpecialCase />
            
           </div>
          
      </div>
    )
  }


export default Sidebar