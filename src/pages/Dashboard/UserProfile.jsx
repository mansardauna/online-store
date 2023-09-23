import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import ItemCard from "./OrderCard";
import PaymentMethod from "./PaymentMethod";
import Settings from "./Settings";
import UserCard from "./UserCard";

const UserProfile = () => {
  const {t} = useTranslation (["layout"])
  const userProfile = useSelector((state) => state.auth.userProfile);

  if (!userProfile) {
    // Handle case when userProfile is not available (e.g., user is not logged in)
    return <div>{t("userNot" ,{ns:"layout"})}</div>;
  }

  return (
    <div className="flex-col md:flex-row flex  gap-5 m-auto md:w-11/12">
      <div className="md:w-2/3 w-full rounded-md bg-[#F5F5F3] border border-gray-200  p-4 ">
        <div>
          <ItemCard />
        </div>
        <PaymentMethod />
        
      </div>
      <div className="flex flex-col gap-5 bg-[#F5F5F3] border border-gray-200  p-4 rounded-md">
      <UserCard />
      <Settings />
      </div>
    </div>
  );
};

export default UserProfile;
