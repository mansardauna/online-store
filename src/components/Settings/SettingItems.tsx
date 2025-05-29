import React from 'react'
import { useTranslation } from 'react-i18next'
import { BsHouseFill } from 'react-icons/bs'
import { MdDarkMode, MdNotifications, MdSettings } from 'react-icons/md'
import { Link } from 'react-router-dom'

const SettingItems:React.FC =() => {
const { t }= useTranslation(["layout"]);
  const list = [
    {
      title : "settings",
      icon : <MdSettings />
    },
    {
      title : "Notification",
      icon : <MdNotifications />,
      link : "/notification",
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
    <div className=' bg-white p-2 shadow-md md:w-1/3 cursor-pointer rounded-md'>
      {list.map((items) =>(
          <Link to={items.link}>
        <div className="flex gap-3 border-b p-2 hover:text-black ">
        <div className='text-2xl text-gray-500'>{items.icon}</div>
        <div className=" font-semibold text-gray-500 hover:text-black capitalize">{t(`${items.title}`)}</div>
        </div>
        </Link>
      ))}
    </div>
  )
}

export default SettingItems