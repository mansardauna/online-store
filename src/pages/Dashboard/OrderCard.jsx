import React from 'react'
import { useTranslation } from 'react-i18next'
import Order from '../Cart/Order'

const ItemCard =() =>{
  const {t} = useTranslation (["layout"])
  return (
    <div>
      <div className="uppercase font-semibold m-auto text-xl w-fit"> {t("order", { ns: "layout" })}</div>
      <Order />
    </div>
  )
}

export default ItemCard