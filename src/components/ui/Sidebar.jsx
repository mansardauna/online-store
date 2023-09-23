import React from 'react'
import { useTranslation } from 'react-i18next';
import { FaShoppingCart } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Header from '../home/Header/Header';
import SpecialCase from '../SpecialCase/SpecialCase';
import SideCart from './SideCart';

const Sidebar = () => {
  const {t} = useTranslation(["layout"]);
  const products = useSelector((state) => state.orebiReducer.products);
  return (
    <div className='flex flex-col  h-[95%]'>
      <Link
        to="/">
        <div className=" border-b border-gray-200 flex justify-center h-24 items-center">
          <div className=" text-black font-bold font-dancing text-2xl w-fit m-auto">            {t("digital", { ns: "layout" })}</div>
        </div>
      </Link>
      <Header />
      <div className="flex  w-11/12 mx-auto justify-between absolute bottom-5 left-2">
        <SideCart />
        <SpecialCase />

      </div>

    </div>
  )
}


export default Sidebar