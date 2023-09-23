import React from 'react'
import { useTranslation } from 'react-i18next'
import ComingSoon from '../Coming/ComingSoon'


const Settings = () => {
  const { t } = useTranslation(["layout"])
  return (
    <div>
      <div className="uppercase font-semibold m-auto text-xl w-fit"> {t("settings", { ns: "layout" })}</div>
      <ComingSoon />
    </div>
  )
}

export default Settings