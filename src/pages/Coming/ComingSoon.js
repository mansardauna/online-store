import React from 'react'
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';

const ComingSoon =() => {
  return (
    <motion.div
    initial={{ y: 30, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.4 }}
    className="flex flex-col mdl:flex-row justify-center items-center gap-4 pb-20"
  >
   
    <div className="max-w-[500px] p-4 py-8 bg-white flex gap-4 flex-col items-center rounded-md shadow-lg">
      <h1 className="font-titleFont text-xl font-bold uppercase">
        Cooming Soon !
      </h1>
      <p className="text-sm text-center px-10 -mt-2">
    This page will be active soon
      </p>
      <Link to="/filter">
        <Button
        variant="primary" className="bg-primeColor rounded-md cursor-pointer hover:bg-black active:bg-gray-900 px-8 py-2 font-titleFont font-semibold text-lg text-gray-200 hover:text-white duration-300">
          Continue Shopping
        </Button>
      </Link>
    </div>
  </motion.div>

  )
}

export default ComingSoon