import { Elements } from "@stripe/react-stripe-js";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import ItemCard from "./OrderCard";
import { loadStripe } from "@stripe/stripe-js"; // Import 'load
import PaymentMethod from "./PaymentMethod";
import Settings from "./Settings";
import UserCard from "./UserCard";
import PaymentHistory from "../payment/PaymentHistory";

const UserProfile = () => {
  const { t } = useTranslation(["layout"])

  const stripePromise = loadStripe("your_stripe_publishable_key");

  const userProfile = useSelector((state) => state.auth.userProfile);

  if (!userProfile) {
    // Handle case when userProfile is not available (e.g., user is not logged in)
    return <div>{t("userNot", { ns: "layout" })}</div>;
  }

  return (
    <>  
      <div className="flex-col hidden md:flex-row  xl:flex  gap-5 m-auto md:w-full">
      <div className="md:w-2/3 w-full rounded-md bg-[#F5F5F3] border border-gray-200  p-4 ">
        <div>
          <ItemCard />
        </div>
        <PaymentHistory />

      </div>
      <div className="flex flex-col gap-5 bg-[#F5F5F3] border border-gray-200  p-4 rounded-md">
        <UserCard />
        <Settings />
      </div>
    </div>
{/* mobile */}
      <div className="flex-col xl:hidden flex  gap-5 m-auto md:w-full">
        <div className="flex flex-col gap-5 bg-[#F5F5F3] border border-gray-200  p-4 rounded-md">
          <UserCard />
          <Settings />
        </div>
        <div className="xl:w-2/3 w-full rounded-md bg-[#F5F5F3] border border-gray-200  p-4 ">
          <div>
            <ItemCard />
          </div>
          <Elements stripe={stripePromise}>
        <PaymentMethod userProfile={userProfile} />
      </Elements>


        </div>
      </div>
    </>

  );
};

export default UserProfile;
