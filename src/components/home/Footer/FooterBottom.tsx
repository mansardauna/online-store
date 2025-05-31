import React from "react";
import { AiOutlineCopyright } from "react-icons/ai";

const FooterBottom :React.FC = () => {
  return (
    <div className="w-full  md:fixed bottom-0 bg-[#e8f0e8f1] border-t border-gray-300 group">
      <div className="max-w-container mx-auto border-t-[1px] pt-2 pb-2">
        <p className="text-titleFont font-normal text-center flex md:items-center justify-center text-lightText duration-200 text-sm">
          <span className="text-md mr-[1px] mt-[2px] md:mt-0 text-center hidden md:inline-flex">
            <AiOutlineCopyright />
          </span>
          Copyright 2022 | Mansur | All Rights Reserved


        </p>
      </div>
    </div>
  );
};

export default FooterBottom;
