import React from 'react'
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import Header from '../home/Header/Header';
import SpecialCase from '../SpecialCase/SpecialCase';
import DarkModeSwitch from './components/DarkModeSwitch';
import SideCart from './SideCart';
import { AiOutlineCopyright } from 'react-icons/ai';

const Sidebar:React.FC = () => {
  const {t} = useTranslation(["layout"]);
  return (
    <div className='flex flex-col  h-[95%]'>
      <Link
        to="/">
        <div className="flex justify-center h-24 items-center">
          <div className=" text-black font-bold font-dancing text-2xl w-fit m-auto">   
                   {t("digital", { ns: "layout" })}</div>
        </div>
      </Link>
      <Header />
      <div className="flex  w-11/12 mx-auto justify-between absolute bottom-5 left-2">
       
      <p className="text-titleFont font-normal text-center flex md:items-center justify-center text-lightText duration-200 text-sm">
          <span className="text-md mr-[2px] mt-[2px] md:mt-0 text-center hidden md:inline-flex">
            <AiOutlineCopyright />
          </span>
          Copyright 2025 | Mansur


        </p>
      </div>

    </div>
  )
}


export default Sidebar