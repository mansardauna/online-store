import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface SortProps {
  filterOption: { title: string }[];
  selectOption: string;
  filterResult: (value: string) => void;
  sortResult: (item: string) => void;
  categoriesData: Record<string, { items: string[] }>;
}

const Sort: React.FC<SortProps> = ({
  filterOption,
  selectOption,
  filterResult,
  sortResult,
  categoriesData,
}) => {
  const [showSortingOptions, setShowSortingOptions] = useState(false);
  const { t } = useTranslation(['layout']);

  return (
    <div className="md:relative cursor-pointer bg-white p-2">
      <div className="space-x-3">
        <select
          className="p-2 hover:bg-gray-200 text-sm md:text-lg rounded-md"
          value={selectOption}
          onChange={(event) => filterResult(event.target.value)}
        >
          {filterOption.map(({ title }) => (
            <option key={title} value={title}>
              {t(title, { ns: 'layout' })}
            </option>
          ))}
        </select>
        {showSortingOptions && categoriesData[selectOption] && (
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
      </div>
    </div>
  );
};

export default Sort;
