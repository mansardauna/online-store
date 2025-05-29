import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import ItemCard from "./OrderCard";
import Settings from "../../../Settings/Settings";
import UserCard from "./UserCard";
import PaymentHistory from "../../payment/PaymentHistory";
import Notification from "../../../components/ui/Notification";

const UserProfile:React.FC = () => {
  const { t } = useTranslation(["layout"])


  const userProfile = useSelector((state) => state.auth.userProfile);

  if (!userProfile) {
    
    return <div>{t("userNot", { ns: "layout" })}</div>;
  }

  return (
    <>  
      <div className="flex-col hidden md:flex-row mb-5 xl:flex  gap-5 m-auto md:w-full">
      <div className="md:w-2/3 w-full rounded-md bg-[#F5F5F3] border border-gray-200  p-4 ">
        <div>
          <ItemCard />
        </div>
        <PaymentHistory />

      </div>
      <div className="flex right-10 flex-col gap-5 bg-[#F5F5F3] border border-gray-200  p-4 rounded-md">
        <UserCard />
        <Notification />
      </div>
    </div>
{/* mobile */}
      <div className="flex-col xl:hidden flex   gap-5 m-auto md:w-full">
        <div className="flex flex-col gap-5 bg-[#F5F5F3] border border-gray-200  p-4 rounded-md">
          <UserCard />
        </div>
        <div className="xl:w-2/3 w-full rounded-md bg-[#F5F5F3] border border-gray-200  p-4 ">
          <div>
            <ItemCard />
          </div>
          <PaymentHistory />
        </div>
      </div>
    </>

  );
};

export default UserProfile;
