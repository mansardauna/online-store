import React from "react";
import { useSelector } from "react-redux";
import BrowserHistory from "./BrowserHistory";
import ItemCard from "./OrderCard";
import PaymentMethod from "./PaymentMethod";
import Settings from "./Settings";
import UserCard from "./UserCard";

const UserProfile = () => {
  // Use useSelector to access userProfile from the Redux store
  const userProfile = useSelector((state) => state.auth.userProfile);

  if (!userProfile) {
    // Handle case when userProfile is not available (e.g., user is not logged in)
    return <div>User is not logged in.</div>;
  }

  return (
    <div className="flex  gap-5 m-auto w-11/12">
      <div className="w-2/3 rounded-md bg-[#F5F5F3] border border-gray-200  p-4 ">
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
