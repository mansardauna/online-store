import React from 'react'
import { FaShoppingCart } from 'react-icons/fa'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

const SideCart:React.FC=()=> {
  const products = useSelector((state) => state.orebiReducer.products);
  return (
    <Link to="/cart">
    <div className="relative bg-white w-12 h-[50px] rounded-md flex flex-col gap-1 text-[#33475b] justify-center items-center shadow-testShadow overflow-x-hidden cursor-pointer">
      <FaShoppingCart />
      <span className="absolute font-titleFont bottom-1 right-2 text-xs w-4 h-4 flex items-center justify-center rounded-full bg-primeColor text-white">
        {products.length > 0 ? products.length : 0}
      </span>
   

    </div>
  </Link>
   )
}

export default SideCart