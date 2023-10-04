import React from "react";
import { useTranslation } from "react-i18next";

const ShopNow = () => {
  const {t}= useTranslation (["loyout"])
  return (
    <button className="bg-primeColor text-white text-lg w-36  font-bodyFont capitalize  h-[50px] hover:bg-black duration-300 font-bold">
       {t("shopNow", { ns: "layout" })}
    </button>
  );
};

export default ShopNow;
