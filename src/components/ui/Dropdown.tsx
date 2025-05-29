import React, { useState } from "react";
import { motion } from "framer-motion";
import { filterOption } from "../../constants";
interface DropdownProps{
  options:string;
  selectedOption:string;
  setSelectedOption:string;
  isOpen:string;
  toggleDropdown:string;
}
const Dropdown:React.FC<DropdownProps> = ({ options, selectedOption, setSelectedOption, isOpen, toggleDropdown }) => {
  return (
    <div className='w-fit relative'>
      <div onClick={toggleDropdown} className={`cursor-pointer p-2 hover:bg-gray-200 rounded-lg ${isOpen ? 'bg-gray-200' : ''}`}>
        <div className="flex items-center gap-4">
          <div className="mr-2">{filterOption.find(({ title }) => title === selectedOption)?.icon}</div>
          <span>{selectedOption}</span>
        </div>
      </div>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="absolute top-full left-0 mt-2 w-60 bg-white border border-gray-300 shadow-lg rounded-lg overflow-hidden"
        >
          {options.map((option) => (
            <motion.div
              key={option}
              className={`cursor-pointer p-2 hover:bg-gray-200`}
              onClick={() => {
                setSelectedOption(option);
                toggleDropdown();
              }}
            >
              <div className="flex items-center gap-4">
                <div className="mr-2">{filterOption.find(({ title }) => title === option)?.icon}</div>
                <span>{option}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};
export default Dropdown