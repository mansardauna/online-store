import React, { useState } from "react";
import { motion } from "framer-motion";
import NavTitle from "./NavTitle";
import { filterOption } from "../../../../constants";


const Categories = () => {
  const [showCategories, setShowCategories] = useState(true);

  const handleCategoryClick = (selectedCategory) => {
   
    console.log(`Selected Category: ${selectedCategory}`);
  };


  return (
    <div>
      <div
        onClick={() => setShowCategories(!showCategories)}
        className="cursor-pointer"
      >
        <NavTitle title="Shop by Category" icons={true} />
      </div>
      {showCategories && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ul className="flex flex-col gap-4 text-sm lg:text-base text-[#767676]">
            {filterOption.map((category) => (
              <li
                key={category.title}
                className="border-b-[1px] border-b-[#F0F0F0] pb-2 flex 
                cursor-pointer items-center gap-4 hover:text-primeColor hover:border-gray-400 duration-300"
                onClick={() => handleCategoryClick(category.title)}
              >
                <span>{category.icon}</span>
                <span>{category.title}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  );
            }

export default Categories;
