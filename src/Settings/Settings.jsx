import React from 'react'
import Breadcrumbs from '../components/pageProps/Breadcrumbs'
import SettingItems from '../components/Settings/SettingItems'


const Settings = () => {
  return (
    <div className='p-4'>
      <Breadcrumbs title={"Settings"}/>
      <div className="uppercase font-semibold m-auto text-xl w-fit"> </div>
      <SettingItems />
    </div>
  )
}

export default Settings