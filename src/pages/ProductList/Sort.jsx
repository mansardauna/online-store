import React, { useState } from 'react';
import { motion } from 'framer-motion';
import NavTitle from '../../components/pageProps/shopPage/shopBy/NavTitle';

const Sort = ({ filterOption, selectOption, filterResult, sortResult, categoriesData }) => {
  const [showSortingOptions, setShowSortingOptions] = useState(false);

  return (
    <div className="md:relative cursor-pointer bg-white p-2">
      <div className="space-x-3">
        <div onClick={() => setShowSortingOptions(!showSortingOptions)}>   
      <NavTitle title="Category" icons={true} />   
      </div>
        {showSortingOptions && (
          <>
          
            {filterOption.map(({ title, icon }) => (
              <motion.div
                key={title}
                className={`cursor-pointer p-2 hover:bg-gray-200 text-sm md:text-lg rounded-lg ${
                  selectOption === title ? 'bg-gray-200' : ''
                }`}
                onClick={() => filterResult(title)}
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex items-center gap-4">
                  <div className="mr-2">{icon}</div>
                  <span>{title}</span>
                </div>
                {selectOption === title && categoriesData[selectOption] && (
                  <div className="block w-fit h-fit md:w-fit mt-2 cursor-pointer text-gray-500 mr-7">
                    {categoriesData[selectOption].items.map((item) => (
                      <motion.div
                        key={item}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={() => sortResult(item)}
                        className="p-3 text-sm block items-center hover:text-black"
                      >
                        {item}
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Sort;
