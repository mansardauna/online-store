import React from 'react'
import { useTranslation } from 'react-i18next'
import { elect2 } from '../../assets/images'
import ShopNow from '../designLayouts/buttons/ShopNow'
import Image from '../designLayouts/Image'

const DayProduct: React.FC =() => {
  const {t}= useTranslation(["layout"])

  return (
    <div className=''>
      <div className="bg-[#f3f3f3] p-0 md:p-2 md:gap-4 gap-1 md:flex">
        <Image
          className="md:w-[60%] w-[100%] h-[40%} md-h-[60%]"
          imgSrc={elect2}
        />
        <div className="flex p-2 flex-col gap-1 md:gap-7 md:mt-2 mt-0">
          <h1 className=" text-2xl font-semibold text-center">
          {t("productDay", { ns: "layout" })}
          </h1>
          <p className="">
          {t("lorem", { ns: "layout" })}
          </p>
          <ShopNow/>
        </div>
      </div>
    </div>
  )
}

export default DayProduct