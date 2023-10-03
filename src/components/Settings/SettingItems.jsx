import React from 'react'
import { useTranslation } from 'react-i18next'
import { BsHouseFill } from 'react-icons/bs'
import { MdDarkMode, MdNotifications, MdSettings } from 'react-icons/md'

const SettingItems =() => {
const { t }= useTranslation(["layout"]);
  const list = [
    {
      title : "settings",
      icon : <MdSettings />
    },
    {
      title : "Notification",
      icon : <MdNotifications />
    },
    {
      title : "KYC",
      icon : <BsHouseFill />
    },
    {
      title : "theme",
      icon : <MdDarkMode />
    }
  ]
  return (
    <div className=' bg-white p-2 shadow-md cursor-pointer rounded-md'>
      {list.map((items) =>(
        <div className="flex gap-3 border-b p-2 hover:text-black ">
        <div className='text-2xl text-gray-500'>{items.icon}</div>
        <div className=" font-semibold text-gray-500 hover:text-black capitalize">{t(`${items.title}`)}</div>
        </div>
      ))}
    </div>
  )
}

export default SettingItems